export const secondsToHours = (seconds: number) => {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);

  return `${hours}h ${minutes}m`;
};

export const minutesToHours = (minutes: number) => {
  const hours = Math.floor(minutes / 60);
  const minutesLeft = minutes % 60;

  return `${hours}h ${minutesLeft}m`;
};

export const formatDate = (date: Date) => {
  /**
   * Convert a date to YYYY-MM-DD format
   * @param {Date} date
   * @returns {string} YYYY-MM-DD
   */

  const year = date.getFullYear();
  const month = `0${date.getMonth() + 1}`.slice(-2);
  const day = `0${date.getDate()}`.slice(-2);

  return `${year}-${month}-${day}`;
};

export const convertTime = (timeString: string): string | undefined => {
  /**
   * Converts a time string in the format "yyyy-MM-ddTHH:mm:ss.sssZ" to "yyyy-MM-ddTHH:mm",
   * @param {string} timeString - The time string to convert."yyyy-MM-ddTHH:mm:ss.sssZ"
   * @returns {string} The converted time string in the format "yyyy-MM-ddTHH:mm".
   */
  if (!timeString) {
    return undefined;
  }

  const date = new Date(timeString);
  date.setHours(date.getHours() + 11);
  return date.toISOString().slice(0, 16);
};

export const formatTicketDate = (dateString: string): string => {
  const date = new Date(dateString);
  const options = { weekday: "short", day: "numeric", month: "short" };
  const formattedDate = date.toLocaleDateString("en-US", options as any);
  return formattedDate;
};
