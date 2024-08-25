export function formatDate(date: Date): string {
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long",
    day: "numeric"
  };

  const formattedDate = date.toLocaleDateString("en-PH", options);
  return formattedDate;
}

export function formatDateSingle(date: Date): string {
  const optionsDate: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long",
    day: "numeric"
  };

  const optionsTime: Intl.DateTimeFormatOptions = {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true
  };

  const datePart = date.toLocaleDateString("en-US", optionsDate);

  const timePart = date.toLocaleTimeString("en-US", optionsTime);

  const weekdayPart = date.toLocaleDateString("en-US", { weekday: "long" });

  const formattedDate = `${datePart} ${timePart} | ${weekdayPart}`;

  return formattedDate;
}
