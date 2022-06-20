export const convertTime = (time) => {
  console.log('0'.concat(time));
  return time.length > 1 ? time : '0'.concat(time);
};