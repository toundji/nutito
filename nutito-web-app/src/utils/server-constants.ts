
import { format, intervalToDuration, formatDuration } from 'date-fns'
import { enGB, eo, ru, fr } from 'date-fns/locale'

export const serverConstants = {

}

const locales = {enGB, eo, ru, fr};

const formatStr = "PpPPP";
const dateStr = "P";

export const formatDate = (date: any) => {
  return format(new Date(date), dateStr, {
    locale: locales.fr
  });
}


export const getDateDiffInDays = (date1: string, date2: string) => {
  const dateParam1 = new Date(date1).valueOf();
  const dateParam2 = new Date(date2).valueOf();
  const diffTime = Math.abs(dateParam1 - dateParam2);
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays
}

export const getDateDiff = (date1: string, date2: string) => {
  return formatDuration(
    intervalToDuration({
      start: new Date(date1),
     end: new Date(date2)
    }), { locale: fr })
}


