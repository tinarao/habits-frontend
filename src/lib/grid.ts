export type Day = {
  date: Date
  checkinsCount: number
}

export const Grid = {
  init: (fromDay: Date) => {
    const days = Array.from({ length: 364 }, (_, i) => {
      const date = new Date(fromDay);
      date.setDate(date.getDate() + i);

      return {
        date,
        checkinsCount: 0,
      };
    });

    return days;
  }
}
