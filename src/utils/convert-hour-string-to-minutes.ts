// "19:00" => ["19","00"] => [19,00]

export function convertHourStringToMinutesNumber(hourString: string) {
  const [hours, minutes] = hourString.split(":").map(stringNumber => Number(stringNumber));

  const minutesAmount = (hours * 60) + minutes;

  return minutesAmount
}