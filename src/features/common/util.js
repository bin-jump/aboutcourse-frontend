export function getWeek(date) {
  return (date.getDay() + 6) % 7;
}

export function getWeekNames() {
  return ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
}
