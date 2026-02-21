import Map "mo:core/Map";
import Nat "mo:core/Nat";

module {
  type OldSectionScores = {
    sleep : Nat;
    hydration : Nat;
    exercise : Nat;
    diet : Nat;
  };

  type OldWellnessReport = {
    scores : OldSectionScores;
    timestamp : Int;
    recommendations : [Text];
    problems : [Text];
  };

  type OldActor = {
    wellnessReports : Map.Map<Nat, OldWellnessReport>;
    nextWellnessReportId : Nat;
  };

  type NewSectionScores = {
    sleep : Nat;
    hydration : Nat;
    exercise : Nat;
    diet : Nat;
  };

  type NewMedicalHistory = {
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

  type NewUserAnswers = {
    sleep : [Nat];
    hydration : [Nat];
    exercise : [Nat];
    diet : [Nat];
  };

  type NewSolutionTip = {
    section : { #sleep; #hydration; #exercise; #diet };
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

  type NewCompleteWellnessReport = {
    healthProfile : {
      answers : NewUserAnswers;
      medicalHistory : NewMedicalHistory;
    };
    scores : NewSectionScores;
    timestamp : Int;
    recommendations : [NewSolutionTip];
    problems : [Text];
  };

  type NewActor = {
    wellnessReports : Map.Map<Nat, NewCompleteWellnessReport>;
    nextWellnessReportId : Nat;
  };

  public func run(old : OldActor) : NewActor {
    let convertedReports = old.wellnessReports.map<Nat, OldWellnessReport, NewCompleteWellnessReport>(
      func(_id, report) {
        // Default empty answers and medical history for now
        {
          healthProfile = {
            answers = { sleep = []; hydration = []; exercise = []; diet = [] };
            medicalHistory = {
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
            };
          };
          scores = {
            sleep = report.scores.sleep;
            hydration = report.scores.hydration;
            exercise = report.scores.exercise;
            diet = report.scores.diet;
          };
          timestamp = report.timestamp;
          recommendations = [];
          problems = report.problems;
        };
      }
    );
    {
      wellnessReports = convertedReports;
      nextWellnessReportId = old.nextWellnessReportId;
    };
  };
};
