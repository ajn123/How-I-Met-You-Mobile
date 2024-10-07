export default function DateUtil(
  date: string,
  timezone = "EST",
  format = "human",
  overrides = {},
) {
  const dateObj = new Date(date);

  if (format === "numeric") {
    overrides = {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    };
  }
  // Readable format July, 29th, 2024
  const options = {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    timeZone: timezone,
    ...overrides,
  };

  return dateObj.toLocaleDateString("en-US", options);
}
