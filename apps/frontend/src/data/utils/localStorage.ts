export function getLocalStorage<T>(key: string): T | null {
    try {
        const value = localStorage.getItem(key);
        if (value === null || value === undefined) return null;
        return JSON.parse(value) as T;
    } catch (e) {
        return null;
    }
}

export function setLocalStorage<T = any>(key: string, value: T): void {
    try {
        localStorage.setItem(key, JSON.stringify(value));
    } catch (e) {        
        console.error('Error saving to localStorage:', e);
    }
}

export function removeLocalStorage(key: string): void {
    try {
        localStorage.removeItem(key);
    } catch (e) {
        console.error('Error removing from localStorage:', e);
    }
}