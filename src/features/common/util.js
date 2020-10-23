export function getWeek(date) {
  return (date.getDay() + 6) % 7;
}

export function getMinutes(date) {
  return `${date.getHours()}:${
    date.getMinutes() < 10 ? '0' : ''
  }${date.getMinutes()}`;
}

export function getWeekNames() {
  return ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
}

export function getMonthNames() {
  return [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];
}

export function toLocalTime(date) {
  return new Date(date.getTime() + date.getTimezoneOffset());
}

export function mergeDate(a, b) {
  let offset = a.getTimezoneOffset() * 60 * 1000;
  return new Date(a.getTime() + b.getTime() - offset);
}
