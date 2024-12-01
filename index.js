import axios from "axios";
import bodyParser from "body-parser";
import express from "express";
import dotenv from 'dotenv';
dotenv.config();

const app = express();
const port = 3000;
const API_URL = process.env.API_URL;
const key = process.env.API_KEY;

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));

let mainarray = [];
let array = [];

let rainy = [
    "rainy",
    "Patchy rain possible",
    "Patchy light rain",
    "Light rain",
    "Moderate rain at times",
    "Moderate rain",
    "Heavy rain at times",
    "Heavy rain",
    "Light rain shower",
    "Moderate or heavy rain shower",
    "Torrential rain shower",
    "Patchy light rain with thunder",
    "Moderate or heavy rain with thunder"
];
  
let sunny = [
    "sunny",
    "Sunny"
];

let cloudy = [
    "cloudy",
    "Partly Cloudy",
    "Cloudy",
    "Overcast"
];

let night = [
    "night",
    "Clear",
    "Partly cloudy",
    "Mist",
    "Patchy rain possible",
    "Patchy snow possible",
    "Patchy sleet possible",
    "Patchy freezing drizzle possible",
    "Thundery outbreaks possible",
    "Blowing snow",
    "Blizzard",
    "Fog",
    "Freezing fog",
    "Light drizzle",
    "Freezing drizzle",
    "Heavy freezing drizzle",
    "Light rain",
    "Moderate rain",
    "Heavy rain",
    "Light freezing rain",
    "Moderate or heavy freezing rain",
    "Light sleet",
    "Moderate or heavy sleet",
    "Patchy light snow",
    "Light snow",
    "Patchy moderate snow",
    "Moderate snow",
    "Patchy heavy snow",
    "Heavy snow",
    "Ice pellets",
    "Light sleet showers",
    "Light snow showers",
    "Moderate or heavy sleet showers",
    "Moderate or heavy snow showers"
];

let climatearr = [rainy,sunny,cloudy,night];
let background = '/images/sunny.jpg'
  
  

function avg1(data){
    let day1 = data.forecast.forecastday[0];
    let day2 = data.forecast.forecastday[1];
    let morning = find(day1,5)/6;
    let afternoon = find(day1,11)/6;
    let evening = find(day1,17)/6;

    let overnight = 0;
    for(let i=0;i<2;i++){
        overnight += day1.hour[i + 22].temp_c;
    }
    for(let i=0;i<5;i++){
        overnight += day2.hour[i].temp_c;
    }
    overnight = overnight/6;

    return {morning: morning.toFixed(1),afternoon: afternoon.toFixed(1),evening: evening.toFixed(1),overnight: overnight.toFixed(1)};
}

function find(day,k){
    let sum = 0;
    for(let i=0;i<6;i++){
        sum += day.hour[i + k].temp_c;
    }
    return sum;
}

function makearr(data) {
    const day1 = data.forecast.forecastday[0];
    const day2 = data.forecast.forecastday[1];
    let arr = [];
    for (let i = 0; i < 24; i++) {
        let c = day1.hour[i];
        let time = new Date(day1.hour[i].time);
        let t = time.getHours();
        let m = "";
        if (t >= 12) {
            m = "P.M";
            if (t > 12) {
                t -= 12;
            }
        } else {
            if(t == 0) t = 12;
            m = "A.M";
        }
        let obj = {
            id: i + 1,
            time: t,
            temp: c.temp_c,
            icon: c.condition.icon,
            m: m
        };
        arr.push(obj);
    }
    for (let i = 0; i < 5; i++) {
        let c = day2.hour[i];
        let time = new Date(day2.hour[i].time);
        let t = time.getHours();
        let m = "";
        if (t >= 12) {
            m = "P.M";
        } else {
            if(t == 0) t = 12;
            m = "A.M";
        }
        let obj = {
            id: i + 25,
            time: t,
            temp: c.temp_c,
            icon: c.condition.icon,
            m: m
        };
        arr.push(obj);
    }
    return arr;
}

function makearr1(data){
    let time = new Date(data.location.localtime);
    let t = time.getHours();
    let arr = [];
    for(let i=0;i<6;i++){
        arr.push(mainarray[t+i]);
    }
    return arr;
}

function findback(data){
    const climate = data.current.condition.text;
    let f = 1;
    let condition = "sunny";
    for (let i = 0; i < climatearr.length; i++) {
        if (climatearr[i].includes(climate)) {
            condition = climatearr[i][0];
            return condition;
        }
    }

    return condition;
}





app.get("/",async (req,res) => {
    try{
        const location = 'Coimbatore';
        const response = await axios.get(API_URL + "/forecast.json",{
            params: {
                key: key,
                q: location,
                days: 2
            }
        });

        res.locals.data = response.data;
        const avg = avg1(res.locals.data);
        mainarray = makearr(res.locals.data);
        array = makearr1(res.locals.data);
        background = findback(res.locals.data);
        res.render("index.ejs",{avg: avg,array: array,mainarray: mainarray, background: background});
    }
    catch(error){
        res.sendStatus(401);
        console.log(error.message);
    }
    
});

app.post("/search",async (req,res) => {
    try{
        const location = req.body.search;
        const response = await axios.get(API_URL + "/forecast.json",{
            params: {
                key: key,
                q: location,
                days: 2
            }
        });
        res.locals.data = response.data;
        const avg = avg1(res.locals.data);
        mainarray = makearr(res.locals.data);
        array = makearr1(res.locals.data);
        background = findback(res.locals.data);
        console.log(res.locals.data);
        console.log(avg);
        console.log(background);
        res.render("index.ejs",{avg: avg,array: array,mainarray: mainarray,background: background});
    }
    catch(error){
        res.sendStatus(400);
        console.log(error.message);
    }
});

app.listen(port,() => {});

