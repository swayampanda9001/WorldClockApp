import moment from 'moment-timezone';// gives the current time of a specific city

export const getCurrentTime = (timezone) => {  
  return moment().tz(timezone).format('h:mm:ss A');
};

export const getCurrentDate = (timezone) => {
  return moment().tz(timezone).format('dddd, MMMM D, YYYY');
};

export const getTimeOffset = (timezone) => {
  const offset = moment().tz(timezone).format('Z');
  return `GMT${offset}`;
};