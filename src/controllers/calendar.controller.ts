import { fetchHoyoCalendar } from "../services/system.service";

export const getAllCalendarEvents = async () => {
  try {
    const calendarResponse = await fetchHoyoCalendar();

    const calendarParsed = JSON.parse(calendarResponse);

    return calendarParsed;
  } catch (error: unknown) {
    console.log("Error fetching events", error);
    return [];
  }
};
