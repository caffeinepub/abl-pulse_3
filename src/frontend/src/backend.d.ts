import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export type Time = bigint;
export interface SolutionTip {
    medicalFitForHeartProblems: boolean;
    medicalFitForThyroid: boolean;
    medicalFitForHighBMI: boolean;
    text: string;
    section: SectionId;
    costLevel: Variant_low_high_medium;
    timeCommitment: Variant_long_short_medium;
    medicalFitForAlcoholUse: boolean;
    medicalFitForAnemia: boolean;
    severity: Variant_low_high_medium;
    medicalFitForKidney: boolean;
    medicalFitForPregnancy: boolean;
    medicalFitForBloodPressure: boolean;
    medicalRisk: Variant_low_high_none;
    medicalFitForCholesterol: boolean;
    suitability: Variant_all_elderly_pregnant_youth;
    medicalFitForSugar: boolean;
}
export interface SectionScores {
    diet: bigint;
    exercise: bigint;
    sleep: bigint;
    hydration: bigint;
}
export interface MedicalHistory {
    hasProblemsWithPregnancy: boolean;
    hasProblemsWithAlcoholUse: boolean;
    hasProblemsWithCholesterol: boolean;
    hasProblemsWithAnemia: boolean;
    hasProblemsWithBloodPressure: boolean;
    hasProblemsWithKidney: boolean;
    hasProblemsWithSugar: boolean;
    hasProblemsWithHeartProblems: boolean;
    hasProblemsWithThyroid: boolean;
    hasProblemsWithHighBMI: boolean;
}
export interface CompleteWellnessReport {
    recommendations: Array<SolutionTip>;
    scores: SectionScores;
    problems: Array<string>;
    timestamp: Time;
    healthProfile: {
        answers: UserAnswers;
        medicalHistory: MedicalHistory;
    };
}
export interface UserProfile {
    name: string;
}
export interface UserAnswers {
    diet: Array<bigint>;
    exercise: Array<bigint>;
    sleep: Array<bigint>;
    hydration: Array<bigint>;
}
export enum SectionId {
    diet = "diet",
    exercise = "exercise",
    sleep = "sleep",
    hydration = "hydration"
}
export enum UserRole {
    admin = "admin",
    user = "user",
    guest = "guest"
}
export enum Variant_all_elderly_pregnant_youth {
    all = "all",
    elderly = "elderly",
    pregnant = "pregnant",
    youth = "youth"
}
export enum Variant_long_short_medium {
    long_ = "long",
    short_ = "short",
    medium = "medium"
}
export enum Variant_low_high_medium {
    low = "low",
    high = "high",
    medium = "medium"
}
export enum Variant_low_high_none {
    low = "low",
    high = "high",
    none = "none"
}
export interface backendInterface {
    assignCallerUserRole(user: Principal, role: UserRole): Promise<void>;
    getAllSections(): Promise<Array<SectionId>>;
    getAllWellnessReports(): Promise<Array<[bigint, CompleteWellnessReport]>>;
    getCallerUserProfile(): Promise<UserProfile | null>;
    getCallerUserRole(): Promise<UserRole>;
    getSectionScoringDetails(): Promise<{
        questionPoints: Array<[SectionId, Array<bigint>]>;
        scoringReference: Array<[bigint, string]>;
        sectionEndQuestion: Array<[SectionId, bigint]>;
        sectionStartQuestion: Array<[SectionId, bigint]>;
    }>;
    getTestData(): Promise<[SectionScores, SectionScores, SectionScores, MedicalHistory, MedicalHistory, MedicalHistory]>;
    getUserProfile(user: Principal): Promise<UserProfile | null>;
    getWellnessReportById(id: bigint): Promise<CompleteWellnessReport | null>;
    isAdminUser(_email: string): Promise<boolean>;
    isCallerAdmin(): Promise<boolean>;
    saveCallerUserProfile(profile: UserProfile): Promise<void>;
    saveWellnessReport(report: CompleteWellnessReport): Promise<bigint>;
    validateMedicalHistory(medicalHistory: MedicalHistory): Promise<MedicalHistory>;
}
