import { formatDate, getMonth, getYear } from 'date-fns';
import { et } from 'date-fns/locale'

export const DATE_FORMAT_LONG = 'd. MMMM yyyy';
export const DATE_FORMAT = 'd. MMM yyyy';
export const EVENT_URL_DATE_FORMAT = 'dd.MM.yyyy'
export const DAY_MONTH_FORMAT = 'd. MMM';
const DAY_FORMAT = 'd.';

export const format = (date: string | Date, dateFormat: string) => {
    return formatDate(date, dateFormat, { locale: et });
};

export const formatRange = (startDate: string, endDate: string | undefined, dateFormat: string) => {
    let startDateFormat = DATE_FORMAT;
    if (endDate && getYear(startDate) === getYear(endDate)) {
        if (getMonth(startDate) === getMonth(endDate)) {
            startDateFormat = DAY_FORMAT;
        } else {
            startDateFormat = DAY_MONTH_FORMAT;
        }
    }

    let result = format(startDate, startDateFormat);

    if (endDate) {
        result += ' - ' + format(endDate, dateFormat);
    }

    return result;
}
