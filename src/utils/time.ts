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
