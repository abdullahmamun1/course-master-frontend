// Format a date for an <input type="datetime-local"> in the user's local time ("YYYY-MM-DDTHH:mm").
// toISOString() would give UTC, which shifts the shown time by the timezone offset.
export const toDateTimeLocalValue = (value) => {
    if (!value) return "";
    const date = new Date(value);
    if (Number.isNaN(date.getTime())) return "";
    const local = new Date(date.getTime() - date.getTimezoneOffset() * 60000);
    return local.toISOString().slice(0, 16);
};
