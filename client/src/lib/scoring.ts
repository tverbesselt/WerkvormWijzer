import { Answer, ScoringResult, PropertyID, PropertyScore, FormResult } from './types';
import { QUESTIONS, PROPERTIES, WORKING_FORMS } from './data';

const CORE_PROPERTIES: PropertyID[] = ['self-reliance', 'planning', 'motivation'];

export function calculateScores(answers: Answer[]): ScoringResult {
    // 1. Calculate Property Scores (0-30)
    const propScores: Record<PropertyID, number> = {
        'self-reliance': 0,
        'planning': 0,
        'motivation': 0,
        'focus': 0,
        'digital': 0,
        'home': 0,
        'mobility': 0,
    };

    answers.forEach(ans => {
        const question = QUESTIONS.find(q => q.id === ans.questionId);
        if (question) {
            propScores[question.property] += ans.value;
        }
    });

    const propertyScores: PropertyScore[] = PROPERTIES.map(p => ({
        property: p.id,
        score: propScores[p.id],
        max: 6 // New max score (2 questions * 3 points)
    }));

    // 2. Evaluate Working Forms
    const formResults: FormResult[] = WORKING_FORMS.map(form => {
        const missedThresholds: PropertyID[] = [];
        const criticalFailures: PropertyID[] = [];

        (Object.keys(form.thresholds) as PropertyID[]).forEach(propId => {
            const threshold = form.thresholds[propId];
            const score = propScores[propId];

            if (score < threshold) {
                missedThresholds.push(propId);

                // Critical Logic: >= 2 points below threshold for core properties
                if (CORE_PROPERTIES.includes(propId) && (threshold - score) >= 2) {
                    criticalFailures.push(propId);
                }
            }
        });

        let status: 'Groen' | 'Oranje' | 'Rood' = 'Groen';

        if (criticalFailures.length > 0) {
            status = 'Rood';
        } else if (missedThresholds.length > 2) {
            status = 'Rood';
        } else if (missedThresholds.length > 0) {
            // 1 or 2 small misses
            status = 'Oranje';
        }

        return {
            form,
            status,
            missedThresholds,
            criticalFailures
        };
    });

    return {
        propertyScores,
        formResults
    };
}
