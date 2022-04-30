import * as bcrypt from 'bcrypt';

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
  const saltOrRounds = 10;
  const hashedPassword = await bcrypt.hash(plainPassword, saltOrRounds);
  return hashedPassword;
}












