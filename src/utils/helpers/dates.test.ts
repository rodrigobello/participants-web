import { describe, it, expect } from "vitest";
import { getMinAndMaxDate, getIncrementalDatesArray } from "@helpers/dates";

describe("getMinAndMaxDate", () => {
  it("with single date", () => {
    const dates = ["2021-11-30T13:40:24.442Z"];
    const [minDateStr, maxDateStr] = getMinAndMaxDate(dates);
    expect(minDateStr).toBe(dates[0]);
    expect(maxDateStr).toBe(dates[0]);
  });

  it("with multiple dates", () => {
    const dates = [
      "2021-11-30T13:40:24.442Z",
      "2022-08-05T13:40:24.442Z",
      "2021-02-24T13:40:24.442Z",
    ];
    const [minDateStr, maxDateStr] = getMinAndMaxDate(dates);
    expect(minDateStr).toBe("2021-02-24T13:40:24.442Z");
    expect(maxDateStr).toBe("2022-08-05T13:40:24.442Z");
  });

  it("without any date", () => {
    const [minDateStr, maxDateStr] = getMinAndMaxDate([]);
    expect(minDateStr).toBe("");
    expect(maxDateStr).toBe("");
  });
});

describe("getIncrementalDatesArray", () => {
  it("works sucessfully for return dates with eight intervals", () => {
    const minDateStr = "2021-02-24T09:40:24.442Z";
    const maxDateStr = "2022-08-05T23:40:24.442Z";
    expect(getIncrementalDatesArray(minDateStr, maxDateStr, 8)).toStrictEqual([
      "2021-05-01T03:00:00.000Z",
      "2021-07-06T03:00:00.000Z",
      "2021-09-10T03:00:00.000Z",
      "2021-11-15T03:00:00.000Z",
      "2022-01-19T03:00:00.000Z",
      "2022-03-26T03:00:00.000Z",
      "2022-05-31T03:00:00.000Z",
      "2022-08-06T02:59:59.999Z",
    ]);
  });
});
