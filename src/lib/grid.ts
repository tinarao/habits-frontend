export type Day = {
  date: Date
  checkinsCount: number
}

let cachedDays: Day[] | null = null;

export const Grid = {
  init: (fromDay: Date) => {
    if (cachedDays) {
      return cachedDays;
    }

    cachedDays = Array.from({ length: 364 }, (_, i) => {
      const date = new Date(fromDay);
      date.setDate(date.getDate() + i);

      return {
        date,
        checkinsCount: 0,
      };
    });

    return cachedDays;
  }
}
