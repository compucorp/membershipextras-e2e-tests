import dayjs from 'dayjs';

export class DateHelper {

    /**
     * Parses the date string and return it in the specified format.
     * 
     * @param dateString 
     *   Date string in one of the following formats:
     *     - '2022-02-11'
     *     - 'today': returns today date
     *     - 'today + X Z": examples 'today + 1 months' to add one month to today date, 'today + 2 years', 'today - 3 days' ..etc
     *     - 'Jan 03', 'Oct 04', 'Jun 22', will return the get the matching month and day in current year, so if current year is '2022', first one will be '2022-01-03'
     * @param format 
     *   The output date format
     * @returns String
     *   A formatted date string
     */
    static parse(dateString, format = 'DD/MM/YYYY') {
        const advancedFormat = require("dayjs/plugin/advancedFormat");
        dayjs.extend(advancedFormat);
        
        let detectedDateType = DateHelper._detectedDateType(dateString);

        let unformattedDate = dayjs();
        switch(detectedDateType) {
            case 'standard_date':
                unformattedDate = dayjs(dateString);
                break;
            case  'today':
                unformattedDate = dayjs();
                break;
            case 'today_modified':
                unformattedDate = DateHelper._convertTodayModifiedFormat(dateString);
                break;
            case 'month_day':
                unformattedDate = DateHelper._convertMonthDayFormat(dateString);
                break;
        }

        return unformattedDate.format(format);
    }

    static _detectedDateType(dateString) {
        let dashSplit = dateString.split('-');
        if (dashSplit.length > 1) {
            return 'standard_date';
        }

        let spaceSplit = dateString.split(' '); 
        if (spaceSplit.length == 1 && spaceSplit[0] == 'Today') {
            return 'today';
        }
        else if (spaceSplit.length > 1  && spaceSplit[0] == 'Today') {
            return 'today_modified';
        }
        else if (spaceSplit.length > 1) {
            return 'month_day';
        }
    }

    static _convertTodayModifiedFormat(dateString) {
        let resultDate = dayjs();
        let dateParts = dateString.split(' ');

        if (dateParts[1] == '+') {
            resultDate = resultDate.add(dateParts[2], dateParts[3])
        }
        else if (dateParts[1] == '-') {
            resultDate = resultDate.subtract(dateParts[2], dateParts[3])
        }

        return resultDate;
    }

    static _convertMonthDayFormat(dateString) {
        let monthToNumberMapping = {
            'Jan' : '01',
            'Feb' : '02',
            'Mar' : '03',
            'Apr' : '04',
            'May' : '05',
            'Jun' : '06',
            'Jul' : '07',
            'Aug' : '08',
            'Sep' : '09',
            'Oct' : '10',
            'Nov' : '11',
            'Dec' : '12',
        };

        let dateParts = dateString.split(' ');

        let dayPart = dateParts[1];
        let monthPart = monthToNumberMapping[dateParts[0]];
        let yearPart = dayjs().format('YYYY');

        let fullDate = yearPart + '-' + monthPart + '-' + dayPart;

        return dayjs(fullDate)
    }

}
