import moment from "moment";

// Get max and min date from an array of ISOString dates
export const getMinAndMaxDate = (dates: string[]): [string, string] => {
  let minDateString: string = "";
  let maxDateString: string = "";
  dates.forEach((date: string): void => {
    if (minDateString === "" || date < minDateString) {
      minDateString = date;
    }

    if (maxDateString === "" || date > maxDateString) {
      maxDateString = date;
    }
  });

  return [minDateString, maxDateString];
};

// Get set of equidistant days between two dates (minDate and maxDate)
export const getIncrementalDatesArray = (
  minDateString: string,
  maxDateString: string,
  incrementalCount: number
): string[] => {
  const minDate = moment(minDateString);
  const days = moment(maxDateString)
    .startOf("day")
    .diff(minDate.startOf("day"), "days");
  return [...Array(incrementalCount).keys()].map((i) => {
    const d = moment(minDate).add((days / incrementalCount) * (i + 1), "days");

    return i == incrementalCount - 1
      ? d.endOf("day").toISOString()
      : d.toISOString();
  });
};
