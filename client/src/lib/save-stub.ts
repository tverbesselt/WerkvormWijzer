import { Answer } from './types';

export interface SavePayload {
    sessionId: string;
    answers: Answer[];
    timestamp: string;
}

export async function saveResultsToCVS(payload: SavePayload): Promise<{ success: boolean; message?: string }> {
    // Mock delay
    await new Promise(resolve => setTimeout(resolve, 1500));

    // Simulating logic
    console.log("Mock Save to CVS:", payload);

    // 90% success rate mock
    const success = Math.random() > 0.1;

    if (success) {
        return { success: true };
    } else {
        return { success: false, message: "Kon niet verbinden met het cursistenvolgsysteem. Probeer het later opnieuw." };
    }
}
