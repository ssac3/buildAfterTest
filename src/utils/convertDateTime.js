const formatter = (str) => {
  return str.length > 1 ? str : '0'.concat(str);
};

export const cnvrtDateTime = (date) => {
  return date.getFullYear().toString()
    .concat('-')
    .concat(formatter((date.getMonth() + 1).toString()))
    .concat('-')
    .concat(formatter(date.getDate().toString()))
    .concat(' ')
    .concat(formatter(date.getHours().toString()))
    .concat(':')
    .concat(formatter(date.getMinutes().toString()))
    .concat(':')
    .concat(formatter(date.getSeconds().toString()));
};