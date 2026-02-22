import Time "mo:core/Time";
import Map "mo:core/Map";
import Nat "mo:core/Nat";
import Text "mo:core/Text";
import Array "mo:core/Array";
import Iter "mo:core/Iter";
import Runtime "mo:core/Runtime";
import Principal "mo:core/Principal";
import MixinAuthorization "authorization/MixinAuthorization";
import AccessControl "authorization/access-control";

actor {
  let accessControlState = AccessControl.initState();
  include MixinAuthorization(accessControlState);

  public type UserProfile = {
    name : Text;
  };

  let userProfiles = Map.empty<Principal, UserProfile>();

  public query ({ caller }) func getCallerUserProfile() : async ?UserProfile {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can access profiles");
    };
    userProfiles.get(caller);
  };

  public query ({ caller }) func getUserProfile(user : Principal) : async ?UserProfile {
    if (caller != user and not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Can only view your own profile");
    };
    userProfiles.get(user);
  };

  public shared ({ caller }) func saveCallerUserProfile(profile : UserProfile) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can save profiles");
    };
    userProfiles.add(caller, profile);
  };

  public type SectionId = { #sleep; #hydration; #exercise; #diet };

  public type SectionScores = {
    sleep : Nat;
    hydration : Nat;
    exercise : Nat;
    diet : Nat;
  };

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

  public type UserAnswers = {
    sleep : [Nat];
    hydration : [Nat];
    exercise : [Nat];
    diet : [Nat];
  };

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

  public type AssessmentSubmission = {
    healthProfile : {
      answers : UserAnswers;
      medicalHistory : MedicalHistory;
    };
    scores : SectionScores;
    timestamp : Time.Time;
    recommendations : [SolutionTip];
    problems : [Text];
    user : ?UserProfile;
  };

  public type Id = Nat;

  public type AssessmentSummary = {
    id : Id;
    timestamp : Time.Time;
    user : ?UserProfile;
    totalScore : Nat;
    scores : SectionScores;
    alertScoreCount : Nat;
    atRiskCount : Nat;
    elevatedRiskCount : Nat;
    alertScaleAverage : Float;
    atRiskScaleAverage : Float;
    elevatedRiskScaleAverage : Float;
    recommendationsCount : Nat;
    problems : [Text];
  };

  var nextAssessmentSubmissionId = 0;
  let assessmentSubmissions = Map.empty<Id, AssessmentSubmission>();
  let submissionOwners = Map.empty<Id, Principal>();

  func getNextAssessmentSubmissionId() : Nat {
    let id = nextAssessmentSubmissionId;
    nextAssessmentSubmissionId += 1;
    id;
  };

  public shared ({ caller }) func saveAssessmentSubmission(submission : AssessmentSubmission) : async Nat {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can save assessment submissions");
    };
    let id = getNextAssessmentSubmissionId();
    assessmentSubmissions.add(id, submission);
    submissionOwners.add(id, caller);
    id;
  };

  public query ({ caller }) func getAssessmentSubmissionById(id : Nat) : async ?AssessmentSubmission {
    switch (submissionOwners.get(id)) {
      case null { null };
      case (?owner) {
        if (caller != owner and not AccessControl.isAdmin(accessControlState, caller)) {
          Runtime.trap("Unauthorized: Can only view your own assessment submissions");
        };
        assessmentSubmissions.get(id);
      };
    };
  };

  public query ({ caller }) func getAllAssessmentSummaries() : async [AssessmentSummary] {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can view all assessment summaries");
    };

    let mutableDistribution = Array.tabulate(11, func(_) { 0 });
    assessmentSubmissions.toArray().map<(Id, AssessmentSubmission), AssessmentSummary>(func((id, submission)) {
      let totalScore = submission.scores.sleep + submission.scores.hydration + submission.scores.exercise + submission.scores.diet;

      let (alertScoreCount, atRiskCount, elevatedRiskCount) = if (totalScore <= 20) {
        (submission.problems.size(), 0, 0);
      } else if (totalScore <= 40 and totalScore > 20) {
        (0, submission.problems.size(), 0);
      } else if (totalScore > 40) {
        (0, 0, submission.problems.size());
      } else { (0, 0, 0) };

      let avg = func(scores : [Nat]) : Float {
        let totalArr = scores.foldLeft(0, func(acc, score) { acc + score });
        if (scores.size() > 0) {
          totalArr.toFloat() / scores.size().toFloat();
        } else { 0.0 };
      };

      {
        id = id;
        timestamp = submission.timestamp;
        user = submission.user;
        totalScore;
        scores = submission.scores;
        alertScoreCount;
        atRiskCount;
        elevatedRiskCount;
        alertScaleAverage = 0.0;
        atRiskScaleAverage = 0.0;
        elevatedRiskScaleAverage = 0.0;
        recommendationsCount = submission.recommendations.size();
        problems = submission.problems;
      };
    });
  };

  public query ({ caller }) func getAdminDashboardStats() : async {
    totalAssessments : Nat;
    averageScore : Float;
    alertUsersCount : Nat;
    recentSubmissionsCount : Nat;
    scoreDistribution : [Float];
    scoringSummary : [Float];
  } {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can view dashboard statistics");
    };
    let totalAssessments = assessmentSubmissions.size();
    if (totalAssessments == 0) {
      return {
        totalAssessments = 0;
        averageScore = 0;
        alertUsersCount = 0;
        recentSubmissionsCount = 0;
        scoreDistribution = [];
        scoringSummary = [];
      };
    };

    var totalPoints = 0;
    var alertUsersCount = 0;
    var recentSubmissionsCount = 0;
    var distribution = Array.tabulate(11, func(_) { 0 });

    let now = Time.now();
    let submissionsArray = assessmentSubmissions.values().toArray();

    for (submission in submissionsArray.values()) {
      let totalScore = submission.scores.sleep + submission.scores.hydration + submission.scores.exercise + submission.scores.diet;
      totalPoints += totalScore;

      let scoreRange = totalScore / 10;
      if (scoreRange < 11) {
        let tempDist = Array.tabulate(
          11,
          func(i) {
            if (i == scoreRange) { distribution[i] + 1 } else { distribution[i] };
          },
        );
        distribution := tempDist;
      };

      if (totalScore < 20) {
        alertUsersCount += 1;
      };

      if (now - submission.timestamp < 30 * 24 * 60 * 60 * 1_000_000_000) {
        recentSubmissionsCount += 1;
      };
    };

    let averageScore = totalPoints.toFloat() / totalAssessments.toFloat();
    {
      totalAssessments;
      averageScore;
      alertUsersCount;
      recentSubmissionsCount;
      scoreDistribution = distribution.map(func(count) { count.toFloat() });
      scoringSummary = [];
    };
  };

  public query func getAllSections() : async [SectionId] {
    [#sleep, #hydration, #exercise, #diet];
  };

  public query func getSectionScoringDetails() : async {
    sectionStartQuestion : [(SectionId, Nat)];
    sectionEndQuestion : [(SectionId, Nat)];
    scoringReference : [(Nat, Text)];
    questionPoints : [(SectionId, [Nat])];
  } {
    let sections = [#sleep, #hydration, #exercise, #diet];
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

  public query func getTestData() : async (SectionScores, SectionScores, SectionScores, MedicalHistory, MedicalHistory, MedicalHistory) {
    ({ sleep = 39; hydration = 30; exercise = 34; diet = 39 }, { sleep = 17; hydration = 20; exercise = 27; diet = 18 }, { sleep = 11; hydration = 9; exercise = 17; diet = 12 }, {
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
    }, {
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
    }, {
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

  public query ({ caller }) func isAdminUser(_email : Text) : async Bool {
    AccessControl.isAdmin(accessControlState, caller);
  };
};
