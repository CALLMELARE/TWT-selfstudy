export const eachClass = (hour: number, minute: number) => {
  const time = hour + minute / 60.0
  if (time > 8.5 && time < 9.25) {
    return 1
  } else if (time > 9.33 && time < 10.09) {
    return 2
  } else if (time > 10.41 && time < 11.16) {
    return 3
  } else if (time > 11.25 && time < 12.0) {
    return 4
  } else if (time > 13.5 && time < 14.25) {
    return 5
  } else if (time > 14.33 && time < 15.08) {
    return 6
  } else if (time > 15.41 && time < 16.17) {
    return 7
  } else if (time > 16.25 && time < 17.0) {
    return 8
  } else if (time > 18.5 && time < 19.25) {
    return 9
  } else if (time > 19.33 && time < 20.08) {
    return 10
  } else if (time > 20.16 && time < 20.92) {
    return 11
  } else if (time > 21.0 && time < 21.75) {
    return 12
  } else {
    return -1
  }
}
