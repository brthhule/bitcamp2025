import localData from "./LocalData";


/**
 * Data used in MonthView.js to show what days are within the month and their dates
 * => Used in MonthView.js
 */
const MonthLayoutData  = {
    weeks: [],
    daysWithinMonth: [],
    initializeWeeks() {
        let date = localData.currentDate;
        const firstDayDateTime = new Date(date.getFullYear(), date.getMonth(), 1);
        
        const firstDate = firstDayDateTime.getDate();
        const firstDay = firstDayDateTime.getDay();
        const prevMonthLastDay = new Date(date.getFullYear(), date.getMonth(), 0);
        const lastDate = (new Date(date.getFullYear(), date.getMonth() + 1, 0)).getDate();

        this.weeks = [];
        this.daysWithinMonth = [];

        let startingDate = firstDate - firstDay - 1;
        let inCurrentMonth = true;
        if (startingDate < 0) {
            startingDate = prevMonthLastDay.getDate() + startingDate + 1;
            inCurrentMonth = false;
        } else {
            startingDate = 1;
        }
    
        let dateIterator = startingDate;
    
        for (let week = 0; week < 6; week++) {
            let thisWeek = [];
            let daysInMonth = [];
            for (let x = 0; x < 7; x++) {
                thisWeek.push(dateIterator);
                dateIterator++;
                if (inCurrentMonth == false) {
                    if (dateIterator > prevMonthLastDay.getDate()) {
                        dateIterator = 1;
                        inCurrentMonth = true;
                    }
                    daysInMonth.push(false)
                } else {
                    if (dateIterator > lastDate) {
                        dateIterator = 1;
                        inCurrentMonth = false;
                    }
                    daysInMonth.push(true);
                    
                }
            }
            this.weeks.push(thisWeek);
            this.daysWithinMonth.push(daysInMonth);
        }
    
        //console.log("Weeks: ");
        //console.log(this.weeks);
        //console.log("Months: ");
        //console.log(this.daysWithinMonth);
    }
};

export default MonthLayoutData;