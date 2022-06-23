
// // import { format, intervalToDuration, formatDuration } from 'date-fns'
// // import { enGB, eo, ru, fr } from 'date-fns/locale'

// export const serverConstants = {

// }

// const locales = {enGB, eo, ru, fr};

// const formatStr = "PPPPpp";

// export const formatDate = (date: any) => {
//   return format(new Date(date), formatStr, {
//     locale: locales.fr
//   });
// }


// export const getDateDiffInDays = (date1: string, date2: string) => {
//   const dateParam1 = new Date(date1).valueOf();
//   const dateParam2 = new Date(date2).valueOf();
//   const diffTime = Math.abs(dateParam1 - dateParam2);
//   const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
//   return diffDays
// }

// export const getDateDiff = (date1: string, date2: string) => {
//   return formatDuration(
//     intervalToDuration({
//       start: new Date(date1),
//      end: new Date(date2)
//     }), { locale: fr })
// }

// // export const inLanguageDateDiff = (date1: string, date2: string) => {
// //   let formatting = "";
// //   let diff = getDateDiff(date1, date2)
// //   formatting = `Il y a ${diff.years !== 0 ? diff.years + "ans" : ""} ${diff.months !== 0 ? diff.months + "mois" : ""} ${diff.weeks}`
// // }
