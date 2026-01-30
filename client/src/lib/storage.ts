import { Answer } from './types';

const STORAGE_KEY = 'werkvormwijzer_answers';
const SESSION_KEY = 'werkvormwijzer_session_id';

export function saveAnswers(answers: Answer[]) {
    if (typeof window !== 'undefined') {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(answers));
    }
}

export function getAnswers(): Answer[] {
    if (typeof window !== 'undefined') {
        const kept = localStorage.getItem(STORAGE_KEY);
        return kept ? JSON.parse(kept) : [];
    }
    return [];
}

export function clearAnswers() {
    if (typeof window !== 'undefined') {
        localStorage.removeItem(STORAGE_KEY);
    }
}

export function getSessionId(): string {
    if (typeof window !== 'undefined') {
        let id = localStorage.getItem(SESSION_KEY);
        if (!id) {
            id = crypto.randomUUID();
            localStorage.setItem(SESSION_KEY, id);
        }
        return id;
    }
    return '';
}

export function clearSession() {
    if (typeof window !== 'undefined') {
        localStorage.removeItem(STORAGE_KEY);
        localStorage.removeItem(SESSION_KEY);
    }
}
