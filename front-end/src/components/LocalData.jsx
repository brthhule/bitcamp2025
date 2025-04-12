import axios from 'axios'
import Log from './Log'

// The model of events happening-- replace this with API requests

const serverAddress = "http://localhost:3000"
let eventsModel = new Map();

// The object holding local data on the front end (to manage state across components)
const localData = {
    phoneDate: new Date(),
    currentDate: new Date(),
    goToScreen: 'Home',
    dayEventsNumber: 0,
    prevDate: new Date(),
    
    getMonth: function() {
        const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
        return months[localData.currentDate.getMonth()];
    },
    setMonth: function(newMonth) {
        localData.currentDate.setMonth(newMonth);
    },
    resetDate: function() {
        localData.currentDate = new Date();
    },
    /**
     * Takes a map object and returns it as a nested array
     * @param {YearsMap} map 
     * @returns The above in array format (index 0 = key/string, index 1 = Array<...>, etc.)
     */
    mapToArray: function(map){
        return Array.from(map, ([key, value]) =>
            [key, value instanceof Map ? localData.mapToArray(value) : value]
        )
    },
    arrayToMap: function(arg ) {
        Log("--------------------ArrayToMap----------------------------")
        Log(arg);

        let yearsMap = new Map();
        
        arg.forEach((subArr) => {
            let year = subArr[0];
        
            let months = subArr[1];
            const monthsMap = new Map();

            months.forEach((monthPair) => {
                const month = monthPair[0];
                const days = monthPair[1];

                const daysMap = new Map();

                days.forEach((dayPair) => {
                    const day = dayPair[0];
                    const events = dayPair[1];
                    daysMap.set(day, events);
                })
                monthsMap.set(month, daysMap);
            })
            
            yearsMap.set(year, monthsMap);
    
        })
        return yearsMap;

        /**
         * return new Map(array.map(([key, value]) => 
                [key, Array.isArray(value) ? arrayToMap(value) : value]
            ));
         */
    },
    /**
     * Gets the total amount of events this month
     * @returns {number} total # of events
     */
    getMonthEventsTotal: function() {
        const currentDate = localData.currentDate;
        if (!eventsModel.has(currentDate.getFullYear() + "") || !eventsModel.get(currentDate.getFullYear() + "").has(currentDate.getMonth() + 1 + "")) {
            return 0;
        }
        let total = 0;
        let daysMap = eventsModel.get(currentDate.getFullYear() + "").get(currentDate.getMonth() + 1 + "");
    
        daysMap.forEach((eventsArray) => {
            total += eventsArray.length;
        })
        return total;
    },
    getEventsNumber: function(year, month, day, inMonth) {
        year = Number(year)
        month = Number(month)
        day = Number(day)
        month += 1;
    
        Log("Param date: " + year + " " + month + " " + day)
    
        if (inMonth == false) {
            if (day < 15) {
                month += 1;
                if (month == 13) {
                    month = 1;
                }
            } else {
                month -= 1;
                if (month == 0) {
                    month = 12;
                }
            }
        }
        Log("New month: " + month);
        Log("Model: ");
        Log(eventsModel);
    
    
        function dayExists() {
            while(true) {
                if (!eventsModel.has(year)) {break;}
                if (!eventsModel.get(year).has(month)) {break;}
                if (!eventsModel.get(year).get(month).has(day)) {break;}
                return true;
            }
            return false;
        }
    
        Log(dayExists());
    
        if (dayExists()) {
            const monthsMap = eventsModel.get(year);
            const daysMap = monthsMap.get(month);
            const dayEvents = daysMap.get(day);
            return dayEvents.length;
        }
        return 0;
    },
    getDayEvents: function() {
        const currentDate = localData.currentDate;
        return eventsModel.get(currentDate.getFullYear() + "").get(currentDate.getMonth() + 1 + "").get(currentDate.getDate() + "");
    },
    initializeModel: function() {
        console.log("serverAddress: " + serverAddress);
        console.log("Initializing model");
    
        axios.get(`${serverAddress}/events/model-information`, {})
            .then(res => {
                console.log("Got a response")
                //console.log("res:" + res.data.sendModel)
                let map = JSON.parse(res.data.sendModel);
                
                eventsModel = localData.arrayToMap(map);
                console.log(eventsModel);
            })
            .catch(error => {
                console.log("Got an error.")
                console.log("Response: ");
                console.error("initializeModel Error:", error);
        });
    }
};

export default localData;