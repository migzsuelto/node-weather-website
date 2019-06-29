const request = require('request')

const forecast = (latitude, longitude, callback) => {
    const url = 'https://api.darksky.net/forecast/f40f45181b8b5bd1f0a81f71724f3edb/'+ latitude + ',' + longitude + '?units=si';
    debugger
    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback('Unable to connect to weather service!', undefined);
        } else if (body.error) {
            callback('Unable to find location', undefined);
        } else {
            const currently = body.currently;
            callback(undefined, body.daily.data[0].summary + " It is currently " + currently.temperature + " degrees out. The temperature high is " + body.daily.data[0].temperatureHigh + " and the temperature low is "+ body.daily.data[0].temperatureLow +". There is a " + currently.precipProbability + "% change of rain.");
        }
    });
}

module.exports = forecast