export interface FoulHistory {
    date: Date;
    penalty: number;
    text: string;
}

const STORAGE_KEY = '@@FOUL_LANGUAGE/history';

function get(): FoulHistory[] {
    const rawList = localStorage.getItem(STORAGE_KEY);
    if (!rawList) {
        return [];
    }
    const list: FoulHistory[] = JSON.parse(rawList);

    return list.map((_) => ({
        ..._,
        date: new Date(_.date),
    }));
}

function push(text: string, penalty: number) {
    const history: FoulHistory = {
        date: new Date(),
        text,
        penalty,
    };
    const list = get();
    list.push(history);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
}

export const FoulHistoryUtil = Object.freeze({
    get,
    push,
});
