export const formatter = (str) => {
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

export const cnvrtDate = (date) => {
  return date.getFullYear().toString()
    .concat('.')
    .concat(formatter(date.getMonth() + 1).toString())
    .concat('.')
    .concat(formatter(date.getDate().toString()));
};

export const cnvrtTime = (date) => {
  return formatter(date.getHours().toString())
    .concat(':')
    .concat(formatter(date.getMinutes().toString()));
};

export const calcVacationTime = (s, e) => {
  return Math.abs(s.getHours() - e.getHours());
};

export const convertMintoHour = (target) => {
  return formatter(Math.floor(target / 60).toString())
    .concat('시간 ')
    .concat(formatter((target % 60).toString()))
    .concat('분');
};
