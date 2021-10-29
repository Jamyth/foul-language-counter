function formatTime(date: Date) {
    const hour = padZero(date.getHours(), 2);
    const minutes = padZero(date.getMinutes(), 2);
    const seconds = padZero(date.getSeconds(), 2);

    return `${hour}:${minutes}:${seconds}`;
}

function formatDate(date: Date): string {
    const year = date.getFullYear();
    const month = padZero(date.getMonth(), 2);
    const day = padZero(date.getDate(), 2);

    return `${year}-${month}-${day}`;
}

function padZero(value: number, padding: number) {
    return `${value}`.padStart(padding, '0');
}

export const DateUtil = Object.freeze({
    formatTime,
    formatDate,
    padZero,
});
