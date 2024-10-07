export default function DateUtil(date: string, timezone = 'EST', overrides = {}) {
    const dateObj = new Date(date);

    const options = {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "numeric",
        timeZone: timezone,
        ...overrides
    };
    const formattedDate = dateObj.toLocaleDateString("en-US", options);
    return formattedDate;
}