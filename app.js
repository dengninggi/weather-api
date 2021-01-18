/*
Code below is used for hosting the webpage
*/
const express = require('express');
const request = require("request");
const app = express()
const port = 3000
const path = require('path');

app.engine('pug', require('pug').__express);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(express.static(path.join(__dirname, 'public')));

app.get('/sendWeatherAPI', (req, res) => {
    var options = {
        'method' : 'GET',
        'url' : 'http://dataservice.accuweather.com/currentconditions/v1/locationKey?locationKey=346936&apikey=qG5TAKJCAWfy6ZAQ49w8Vz0wBmLvTPi7'
        // locationKey is from https://developer.accuweather.com/accuweather-locations-api/apis/get/locations/v1/cities/search 
        // apikey is from https://developer.accuweather.com/user/me/apps 
    };
    
    request(options, function (error, response){
        if (error) throw new Error(error);
        var weatherResponse = JSON.parse(response.body);
        var weather = weatherResponse[0].WeatherText;
        var temperature = weatherResponse[0].Temperature.Metric.Value;
        var time = weatherResponse[0].LocalObservationDateTime;
        console.log(weatherResponse);
        res.render('weather', {
            title: 'Weather App', 
            city: 'Tucson, Arizona', 
            weather: weather, 
            temperature: temperature, 
            time: time});
    });
});
app.get('/', (req, res) => {
    res.render('index', {title: 'Weather App', city: 'Tucson, Arizona'});
});

app.listen(port, () => {
    console.log(`Weather app listening at http://localhost:${port}`) 
    // Attention: the quote is ` instead of '
});