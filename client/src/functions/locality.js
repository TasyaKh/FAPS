export function formatTimeDifference(seconds) {
    const days = Math.floor(seconds / (3600 * 24));
    const hours = Math.floor((seconds % (3600 * 24)) / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);

    const formattedTime = [];

    if (days > 0) {
        formattedTime.push(`${days} д.`);
    }
    if (hours > 0) {
        formattedTime.push(`${hours} ч.`);
    }
    if (minutes > 0 || (days === 0 && hours === 0)) {
        formattedTime.push(`${minutes} мин.`);
    }

    return formattedTime.join(' ');
}