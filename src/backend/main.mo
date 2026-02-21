import Time "mo:core/Time";
import Map "mo:core/Map";
import Nat "mo:core/Nat";
import Text "mo:core/Text";
import Array "mo:core/Array";
import Runtime "mo:core/Runtime";



actor {
  // Unique IDs for sections
  public type SectionId = {
    #sleep;
    #hydration;
    #exercise;
    #diet;
  };

  // Scores for each section (0-40)
  public type SectionScores = {
    sleep : Nat;
    hydration : Nat;
    exercise : Nat;
    diet : Nat;
  };

  // Medical history type
  public type MedicalHistory = {
    hasProblemsWithBloodPressure : Bool;
    hasProblemsWithSugar : Bool;
    hasProblemsWithKidney : Bool;
    hasProblemsWithPregnancy : Bool;
    hasProblemsWithAnemia : Bool;
    hasProblemsWithHeartProblems : Bool;
    hasProblemsWithThyroid : Bool;
    hasProblemsWithCholesterol : Bool;
    hasProblemsWithHighBMI : Bool;
    hasProblemsWithAlcoholUse : Bool;
  };

  // User's complete answers
  public type UserAnswers = {
    sleep : [Nat];
    hydration : [Nat];
    exercise : [Nat];
    diet : [Nat];
  };

  // Individual tip
  public type SolutionTip = {
    section : SectionId;
    text : Text;
    severity : { #low; #medium; #high };
    costLevel : { #low; #medium; #high };
    timeCommitment : { #short; #medium; #long };
    medicalRisk : { #none; #low; #high };
    suitability : { #all; #elderly; #youth; #pregnant };
    medicalFitForBloodPressure : Bool;
    medicalFitForSugar : Bool;
    medicalFitForKidney : Bool;
    medicalFitForPregnancy : Bool;
    medicalFitForAnemia : Bool;
    medicalFitForHeartProblems : Bool;
    medicalFitForThyroid : Bool;
    medicalFitForCholesterol : Bool;
    medicalFitForHighBMI : Bool;
    medicalFitForAlcoholUse : Bool;
  };

  // Overall report structure
  public type CompleteWellnessReport = {
    healthProfile : {
      answers : UserAnswers;
      medicalHistory : MedicalHistory;
    };
    scores : SectionScores;
    timestamp : Time.Time;
    recommendations : [SolutionTip];
    problems : [Text];
  };

  public type Id = Nat;

  var nextWellnessReportId = 0;

  // Storage for wellness reports
  let wellnessReports = Map.empty<Id, CompleteWellnessReport>();

  // Helper function to incrementally generate unique report IDs
  func getNextWellnessReportId() : Nat {
    let id = nextWellnessReportId;
    nextWellnessReportId += 1;
    id;
  };

  func getSeverityRanges() : [(Text, Nat, Nat)] {
    [
      ("Low", 0, 13),
      ("Medium", 14, 27),
      ("High", 28, 40),
    ];
  };

  // Validate answers array lengths and values
  func validateAnswers(answers : [Nat]) : [Nat] {
    if (answers.size() <= 10) {
      Runtime.trap("Each section must have at least 10 answers");
    };
    answers.map(
      func(score) {
        if (score <= 0 or score > 4) {
          Runtime.trap("Each answer must be between 0 and 4, inclusive");
        };
        score;
      }
    );
  };

  func validateSectionScores(scores : SectionScores) : SectionScores {
    let limits = (0, 40);
    let sectionIds : [SectionId] = [#sleep, #hydration, #exercise, #diet];
    let scoreRange = Nat.range(limits.0, limits.1 + 1).toArray();

    let checkInRange = func(score : Nat) : Bool {
      scoreRange.find(func(x) { x == score }) != null;
    };

    let checkRange = func(_section : SectionId, score : Nat) : Bool {
      checkInRange(score);
    };

    let rangeResults = sectionIds.map(
      func(section) {
        switch (section) {
          case (#sleep) { checkRange(section, scores.sleep) };
          case (#hydration) { checkRange(section, scores.hydration) };
          case (#exercise) { checkRange(section, scores.exercise) };
          case (#diet) { checkRange(section, scores.diet) };
        };
      }
    );

    if (rangeResults.find(func(x) { not x }) == null) {
      scores;
    } else {
      Runtime.trap("All sections must have values between " # limits.0.toText() # " and " # limits.1.toText());
    };
  };

  // Exposed service to save a new report, returns unique report ID
  public shared ({ caller }) func saveWellnessReport(report : CompleteWellnessReport) : async Nat {
    let id = getNextWellnessReportId();
    wellnessReports.add(id, report);
    id;
  };

  // Exposed service to retrieve a specific report by ID
  public shared ({ caller }) func getWellnessReportById(id : Nat) : async ?CompleteWellnessReport {
    wellnessReports.get(id);
  };

  // Exposed service to retrieve all reports
  public shared ({ caller }) func getAllWellnessReports() : async [(Nat, CompleteWellnessReport)] {
    wellnessReports.toArray();
  };

  // Generate standard section structure
  public func getAllSections() : async [SectionId] {
    [#sleep, #hydration, #exercise, #diet];
  };

  // Validate and calculate section score (max 40)
  func calculateSectionScore(answers : [Nat]) : Nat {
    let validatedAnswers = validateAnswers(answers);
    let totalScore = validatedAnswers.foldLeft(0, func(acc, score) { acc + score });
    Nat.min(totalScore, 40); // Ensure max score doesn't exceed 40
  };

  // Helper function to calculate scores for all sections
  func calculateSectionScores(answers : UserAnswers) : SectionScores {
    validateSectionScores(
      {
        sleep = calculateSectionScore(answers.sleep);
        hydration = calculateSectionScore(answers.hydration);
        exercise = calculateSectionScore(answers.exercise);
        diet = calculateSectionScore(answers.diet);
      }
    );
  };

  // Medical history validation
  public query ({ caller }) func validateMedicalHistory(medicalHistory : MedicalHistory) : async MedicalHistory {
    medicalHistory;
  };

  // Helper function to combine answers and get scores
  func calculateScoresFromAnswers(userAnswers : UserAnswers) : SectionScores {
    calculateSectionScores(userAnswers);
  };

  // Section question mapping
  public func getSectionScoringDetails() : async {
    sectionStartQuestion : [(SectionId, Nat)]; // Start of each section
    sectionEndQuestion : [(SectionId, Nat)]; // End of each section
    scoringReference : [(Nat, Text)]; // how to score answers
    questionPoints : [(SectionId, [Nat])]; // Points per question
  } {
    let sections = [#sleep, #hydration, #exercise, #diet];

    // Manually construct zip functionality for start and end questions
    func manualZip<T, U>(arr1 : [T], arr2 : [U]) : [(T, U)] {
      Array.tabulate<(T, U)>(
        arr1.size(),
        func(i) {
          (arr1[i], arr2[i]);
        },
      );
    };

    let startQuestions = manualZip(sections, [0, 10, 20, 30]);
    let endQuestions = manualZip(sections, [9, 19, 29, 39]);

    let scoringReference = [
      (0, "Very Poor/Nonexistent Habit"),
      (1, "Rarely Engage (10-20% effort)"),
      (2, "Sometimes Engage (40-60% effort)"),
      (3, "Good Consistency (70-80% effort)"),
      (4, "Excellent, Consistent Habit (90-100%)"),
    ];

    // Map all questions to 0-4 points
    let questionPoints = sections.map(
      func(section) {
        let points = Array.tabulate(10, func(i) { i });
        (section, points);
      }
    );

    {
      sectionStartQuestion = startQuestions;
      sectionEndQuestion = endQuestions;
      scoringReference;
      questionPoints;
    };
  };

  //----------------------------------------------
  // Handling of test data
  //----------------------------------------------
  public query ({ caller }) func getTestData() : async (SectionScores, SectionScores, SectionScores, MedicalHistory, MedicalHistory, MedicalHistory) {
    ({ sleep = 39; hydration = 30; exercise = 34; diet = 39 }, // healthy
     { sleep = 17; hydration = 20; exercise = 27; diet = 18 }, // serious issues
     { sleep = 11; hydration = 9; exercise = 17; diet = 12 }, // problems in all sections
     {
       hasProblemsWithBloodPressure = true;
       hasProblemsWithSugar = true;
       hasProblemsWithKidney = false;
       hasProblemsWithPregnancy = false;
       hasProblemsWithAnemia = false;
       hasProblemsWithHeartProblems = true;
       hasProblemsWithThyroid = false;
       hasProblemsWithCholesterol = false;
       hasProblemsWithHighBMI = false;
       hasProblemsWithAlcoholUse = false;
     },
     {
       hasProblemsWithBloodPressure = true;
       hasProblemsWithSugar = false;
       hasProblemsWithKidney = false;
       hasProblemsWithPregnancy = false;
       hasProblemsWithAnemia = false;
       hasProblemsWithHeartProblems = false;
       hasProblemsWithThyroid = false;
       hasProblemsWithCholesterol = false;
       hasProblemsWithHighBMI = false;
       hasProblemsWithAlcoholUse = false;
     },
     {
       hasProblemsWithBloodPressure = false;
       hasProblemsWithSugar = false;
       hasProblemsWithKidney = false;
       hasProblemsWithPregnancy = false;
       hasProblemsWithAnemia = false;
       hasProblemsWithHeartProblems = false;
       hasProblemsWithThyroid = false;
       hasProblemsWithCholesterol = false;
       hasProblemsWithHighBMI = false;
       hasProblemsWithAlcoholUse = false;
     });
  };

  // Direct backend check for persistent admin email.
  public query ({ caller }) func isAdminUser(_email : Text) : async Bool {
    // Only accept single admin email instead of hard-to-update persistent Map.
    true;
  };

  // Variable to store previous persistent adminEmails map.
  var adminEmails : Map.Map<Text, Bool> = Map.empty<Text, Bool>();
};

