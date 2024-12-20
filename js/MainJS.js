let searchInput = document.getElementById("locationInput");
let currentDay;

async function getWeatherData(term) {
  try {
    let response = await fetch(
      `https://api.weatherapi.com/v1/forecast.json?key=80964ea05eb24f78831145608242012&q=${term}&days=7`
    );

    currentDay = await response.json();

    displayCurrentWeather(term);
    displayNextTwoDays(term);
  } catch (error) {
    document.getElementById("rowData").innerHTML = `
    <div class='text-center text-white fs-1'>
      <h1>Failed to load data. Please check your connection or try a different location.</h1>
    </div>`;
  }
  // finally{
  //   getWeatherData("cairo")
  // }
}

searchInput.addEventListener("input", function () {
  term = searchInput.value;
  getWeatherData(term);
});

function displayCurrentWeather() {
  let currentMonth = new Date(currentDay.location.localtime);
  let dayFormat = new Intl.DateTimeFormat("en-us", { dateStyle: "full" });
  // -------
  let dayNumFormat = new Intl.DateTimeFormat("en-us", { day: "numeric" });
  let getnum = dayNumFormat.format(currentMonth);
  console.log(getnum);

  // -------------
  let getDay = dayFormat.format(currentMonth).split(",", 1).join();
  console.log(getDay);

  let monthFormat = new Intl.DateTimeFormat("en-us", { month: "long" });
  let getMonth = monthFormat.format(currentMonth);

  document.getElementById("rowData").innerHTML = ` 
     <div class="col-md-4">
    <div class="card">
      <div
        class="card-head cardHead-color p-2 d-flex justify-content-between align-items-center"
      >
        <span>${getDay}</span>
        <span>${getnum + " " + getMonth}</span>
      </div>
      <div class="card-body cardBody-color">
        <h4 class="card-title text-capitalize">${currentDay.location.name}</h4>
        <p class="temperature">${currentDay.current.temp_c + "°C"}</p>
                  <img src="https:${
                    currentDay.current.condition.icon
                  }" width='90px'/>
        <span class="weather-clear">${currentDay.current.condition.text}</span>
        <div class="static-info d-flex gap-5">
          <div class="weather-info">
            <span class="icon"
              ><i
                class="fa-solid fa-umbrella fa-rotate-by"
                style="--fa-rotate-angle: 40deg"
              ></i
            ></span>
            <span class="info">20%</span>
          </div>

          <div class="weather-info">
            <span class="icon"><i class="fa-solid fa-wind"></i></span>
            <span class="info">18km/h</span>
          </div>
          <div class="weather-info">
            <span class="icon"
              ><i
                class="fa-solid fa-compass fa-rotate-by"
                style="--fa-rotate-angle: 50deg"
              ></i
            ></span>
            <span class="info">East</span>
          </div>
        </div>
      </div>
    </div>
  </div>
`;
}
function displayNextTwoDays() {
  let cartona = "";

  for (i = 1; i < currentDay.forecast.forecastday.length - 4; i++) {
    let currentdate = new Date(currentDay.forecast.forecastday[i].date);
    let dayFormat = new Intl.DateTimeFormat("en-us", { dateStyle: "full" });
    let getDay = dayFormat.format(currentdate).split(",", 1).join();
    cartona += `



      <div class="col-md-4">
    <div class="card">
      <div
        class="card-head text-center cardHead-color p-2 d-flex justify-content-center align-items-center"
      >
        <span>${getDay}</span>
      </div>
      <div
        class="card-body cardTWpBody-color d-flex flex-wrap flex-column align-items-center gap-2"
      >
        <img src="https:${currentDay.forecast.forecastday[i].day.condition.icon}" alt="" />
        <p class="temperature-sections mb-0">${currentDay.forecast.forecastday[i].day.maxtemp_c}°C</p>
        <p class="smallest-temp">${currentDay.forecast.forecastday[i].day.mintemp_c}°</p>
          <span class="weather-clear py-0">${currentDay.forecast.forecastday[i].day.condition.text}</span>
  
      </div>
    </div>
  </div>
      
      `;
  }
  document.getElementById("rowData").innerHTML += cartona;
}

getWeatherData("cairo");
