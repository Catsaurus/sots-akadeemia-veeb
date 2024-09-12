import { formatDate, getYear } from 'date-fns';
import { et } from 'date-fns/locale'

export const DATE_FORMAT_LONG = 'd. MMMM yyyy';
export const DATE_FORMAT = 'dd.MM.yyyy';
export const DAY_MONTH_FORMAT = 'dd.MM';

export const EVENT_REGISTRATION_DAYS = 4;

export const format = (date: string | Date, dateFormat: string) => {
    return formatDate(date, dateFormat, { locale: et });
};

export const formatRange = (startDate: string, endDate: string | undefined, dateFormat: string) => {
    const startDateFormat = endDate && getYear(startDate) === getYear(endDate) ? DAY_MONTH_FORMAT : DATE_FORMAT;

    let result = format(startDate, startDateFormat);

    if (endDate) {
        result += ' - ' + format(endDate, dateFormat);
    }

    return result;
}
