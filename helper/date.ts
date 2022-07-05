import dayjs from 'dayjs';

export class DateParser {
    static parse(inputDate) {
        if (inputDate == 'today') {
            let today = dayjs();
            return today.format('DD/MM/YYYY');
        }

        if (inputDate == '+1 Month From today') {
            return 'X';
        }
    }
}
  