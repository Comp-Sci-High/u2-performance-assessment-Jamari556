const prompt = require('prompt-sync')();
const fetch = require('node-fetch');

const weatherApiKey = '76b5525f559423fc8b53237cb9da675d';
const openAiApiKey = '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';

async function getWeather(city) {
try {
let weatherUrl = 'https://api.openweathermap.org/data/2.5/weather?q=' + city + '&appid=' + weatherApiKey + '&units=metric';
let response = await fetch(weatherUrl);
let data = await response.json();
if (response.ok) {
console.log('It is ' + data.main.temp + '°C in ' + city);
} else {
console.log('Weather not found for ' + city);
}
} catch (error) {
console.log('There was a problem getting the weather.');
}
}

async function getFunFact(topic) {
try {
let url = 'https://api.openai.com/v1/completions';
let requestBody = {
model: 'text-davinci-003',
prompt: 'Tell me a fun fact about ' + topic,
max_tokens: 50
};

let options = {
method: 'POST',
headers: {
'Content-Type': 'application/json',
'Authorization': 'Bearer ' + openAiApiKey
},
body: JSON.stringify(requestBody)
};

let response = await fetch(url, options);
let data = await response.json();

if (response.ok) {
console.log('Fun fact: ' + data.choices[0].text.text());
} else {
console.log('Couldnt find a fun fact for ' + topic);
}
} catch (error) {
console.log('There was a problem getting the fun fact.');
}
}

async function chatbot() {
let keepGoing = true;
while (keepGoing) {
let action = prompt('Type "weather", "fun fact" or "exit": ').toLowerCase();
if (action == 'weather') {
let city = prompt('Enter a city: ');
await getWeather(city);
} else if (action == 'fun fact') {
let topic = prompt('Enter a topic: ');
await getFunFact(topic);
} else if (action == 'exit') {
keepGoing = false;
} else {
console.log('Please enter a valid option.');
}
}
}

chatbot();
