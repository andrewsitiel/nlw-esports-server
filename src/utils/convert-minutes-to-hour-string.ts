//1100 => 18:20

export function convertMinutesNumberToHourString(minutesNumber: number) {
  const hour =  Math.floor(minutesNumber / 60);
  const minutes= minutesNumber % 60;

  return `${String(hour).padStart(2,"0")}:${String(minutes).padEnd(2,"0")}`
}