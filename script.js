const monday = document.querySelector('.monday')
const tuesday = document.querySelector('.tuesday')
const wednesday = document.querySelector('.wednesday')
const thursday = document.querySelector('.thursday')
const friday = document.querySelector('.friday')
const saturday = document.querySelector('.saturday')
const week = document.querySelector('.week')

import {list} from "./data.js";
//take data from json
const data = JSON.parse(list)


// console.log(data)
//checked active day
const activeDay = (...days) => {
    days.forEach((day) => {
        day.addEventListener('click', selectDate)
    })

    function selectDate() {
        if (this.classList.contains('active')) {
            this.classList.remove('active')
            let res = needDay(data, this.id.toString())
            unLoad(...res)

        } else {
            this.classList.add('active');
            let res = needDay(data, this.id.toString())
            load(...res)
        }
    }
}
activeDay(monday, thursday, tuesday, wednesday, friday, saturday, week)


const needDay = (array, find) => {
    const capitalize = s => s && s[0].toUpperCase() + s.slice(1)
    return array.filter((day) => {
        return day.includes(capitalize(find))
    })
}


//chart
const chart = c3.generate({
    bindto: '#chart',
    data: {
        columns: []
    }
});

const load = (...data) => {
    chart.load({
        columns: [
            ...data
        ]
    })
}

const unLoad = (data) => {
    chart.unload({
        ids: [...data]
    });
}


const createTable = (arr, index) => {
    return `${arr[index].map(i => `<td>${i}</td>`).join("")}`;
}

//need to create a function for this
monday.innerHTML += createTable(data, 0)
tuesday.innerHTML += createTable(data, 1)
wednesday.innerHTML += createTable(data, 2)
thursday.innerHTML += createTable(data, 3)
friday.innerHTML += createTable(data, 4)
saturday.innerHTML += createTable(data, 5)
week.innerHTML += createTable(data, 6)