export const timeConvert = (time) => {
  let hours = time / 60;
  let roundedHours = Math.floor(hours);
  let minutes = (hours - roundedHours) * 60;
  let roundedMinutes = Math.round(minutes);
  return roundedHours + "h " + roundedMinutes + "m";
};

export const dateConvert = (date) => {
  let d = new Date(date);
  let ye = new Intl.DateTimeFormat("en", { year: "numeric" }).format(d);
  let mo = new Intl.DateTimeFormat("en", { month: "short" }).format(d);
  let da = new Intl.DateTimeFormat("en", { day: "2-digit" }).format(d);
  return `${da} ${mo} ${ye}`;
};
