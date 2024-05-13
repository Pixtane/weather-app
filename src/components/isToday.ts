// Unused, could be used in the future
function isToday(givenDate: Date) {
  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const givenDay = new Date(
    givenDate.getFullYear(),
    givenDate.getMonth(),
    givenDate.getDate()
  );
  return givenDay.getTime() === today.getTime();
}

export default isToday;
