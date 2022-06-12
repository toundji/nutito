import * as bcrypt from 'bcrypt';
const slugify = require('slugify');

export const formatTime = (unix_timestamp: number): string => {
    var date = new Date(unix_timestamp);
    var hours = date.getHours();
    var minutes = "0" + date.getMinutes();
    var seconds = "0" + date.getSeconds();
    var formattedTime = hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2);
    return formattedTime;
}

export const dateDiffInHours = (date1: Date, date2: Date): number => {
  const MS_PER_HOUR = (1000 * 60 * 60);
  let dateDiff = (date2.getTime() - date1.getTime()) / MS_PER_HOUR;
  return dateDiff;
}

export const formatTimeDifference = (date1: Date, date2: Date): string => {
    let difference = date2.getTime() - date1.getTime();
    let delta = difference / 1000;
    let seconds = "0" + delta % 60;
    let minutes = "0" + Math.floor(delta / 60) % 60
    let hours = Math.floor(delta / 3600);
    var formattedTime = hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2);
    return formattedTime;
}

export const hashPassword = async (plainPassword: string): Promise<string> => {
  const salt = await bcrypt.genSalt(15);
  const hashedPassword = await bcrypt.hash(plainPassword, salt);
  return hashedPassword;
}

export const addMonths = (date, months) => {
  var d = date.getDate();
  date.setMonth(date.getMonth() + +months);
  if (date.getDate() != d) {
    date.setDate(0);
  }
  return date;
}


export const sluggify = async (sluggifiable: string) => {
  return slugify(sluggifiable, {
      replacement: process.env.SLUG_STRINGS_REPLACEMENT,
      remove: /[*+~.,()\/\\'"!:@]/g,
      lower: true, 
      trim: true 
  });
}

export const uuid = () => {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}











