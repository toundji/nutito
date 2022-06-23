import { networkInterfaces } from "os"


export const getServerAddresses = () => {
    const nets = networkInterfaces();
    const results = Object.create(null);
    for (const name of Object.keys(nets)) {
        for (const net of nets[name]!) {
            if (net.family === 'IPv4' && !net.internal) {
                if (!results[name]) {
                    results[name] = [];
                }
                results[name].push(net.address);
            }
        }
    }
    return results;
}


export const addMonths = (date: any, months: number) => {
    var d = date.getDate();
    date.setMonth(date.getMonth() + +months);
    if (date.getDate() != d) {
      date.setDate(0);
    }
    return date;
}

export const addHours = (date: any, hours: number) => {
    date.setTime(date.getTime() + (hours * 60 * 60 * 1000));
    return date;
}

export const uuid = () => {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
}
