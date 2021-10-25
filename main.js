/** @format */
const input = document.querySelector(".input");
const submiBtn = document.querySelector(".btn");
const displayData = document.querySelector(".display-data");

const API_key = "4eba58a0bbe8a98082614e6637229aeb";
const kelvin = 273;

submiBtn.addEventListener("click", () => {
  let cityInput = input.value;
  let api = `https://api.openweathermap.org/data/2.5/weather?q=${cityInput}&appid=${API_key}`;
  fetch(api)
    .then((res) => {
      if (!res.ok) {
        throw new Error();
      }
      return res.json();
    })
    .then((data) => {
      console.log(data);

      displayData.innerHTML = `
        <img 
        src="http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png"
        >
        <p class='desc'>${data.weather[0].description}</p>
        <h2 class='temp'>${Math.floor(data.main.temp) - kelvin}&deg;C</h2>
        <h2 class= 'city-name'>${data.name}, ${data.sys.country}</h2>
  
  `;

      input.value = "";
    })
    .catch((err) => {
      displayData.innerHTML = `<h3 style="color: red; font-size: 1.2rem;">Sorry, city not found on database</h3>`;
      input.value = "";
    });
});
