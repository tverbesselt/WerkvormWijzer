export type PropertyID =
    | 'self-reliance'
    | 'planning'
    | 'motivation'
    | 'focus'
    | 'digital'
    | 'home'
    | 'mobility';

export interface Property {
    id: PropertyID;
    name: string;
    description?: string;
}

export interface Question {
    id: string;
    property: PropertyID;
    text: string;
}

export interface WorkingForm {
    id: string;
    name: string;
    description: string;
    thresholds: Record<PropertyID, number>;
}

export interface Answer {
    questionId: string;
    value: number; // 0-10
}

export interface PropertyScore {
    property: PropertyID;
    score: number; // 0-30
    max: number; // 30
}

export interface FormResult {
    form: WorkingForm;
    status: 'Groen' | 'Oranje' | 'Rood';
    missedThresholds: PropertyID[]; // Which properties were below threshold
    criticalFailures: PropertyID[]; // Which properties were dangerously low (>=4 pts gap)
}

export interface ScoringResult {
    propertyScores: PropertyScore[];
    formResults: FormResult[];
}
