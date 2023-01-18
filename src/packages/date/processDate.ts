const DIFFERENT_DAYS = 1;

const processData = (data: Date, todayData: Date): string => {
  if (
    data.getDate() === todayData.getDate() &&
    data.getMonth() === todayData.getMonth() &&
    data.getFullYear() === todayData.getFullYear()
  ) {
    return "Today";
  }

  if (
    data.getDate() - todayData.getDate() === DIFFERENT_DAYS &&
    data.getMonth() === todayData.getMonth() &&
    data.getFullYear() === todayData.getFullYear()
  ) {
    return "Tomorrow";
  }

  return `${data.getDate()}/${(data.getMonth() + 1)
    .toString()
    .padStart(2, "0")}`;
};

export default processData;
