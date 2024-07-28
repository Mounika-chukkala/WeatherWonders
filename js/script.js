let url ="https://weather-by-api-ninjas.p.rapidapi.com/v1/weather?city=ongole";

const options = {
	method: 'GET',
	headers: {
		'x-rapidapi-key': '1dff88b014msh86b40ee4768ce3ep1816a9jsn4ba88fd45220',
		'x-rapidapi-host': 'weather-api138.p.rapidapi.com'
	}
};

getWeather("ongole")

async function getWeather(city) {
try{
    let url =
    "https://weather-by-api-ninjas.p.rapidapi.com/v1/weather?city=" + city;
  
  let response = await fetch(url, options);
  response = await response.json();
  // Check if any value in response is undefined
  //   for (let key in response) {
      //     if (response.hasOwnProperty(key) && response[key] === undefined) {
          //       alert("Invalid location. Please enter a valid location.");
          //       return; // Exit the function if any value is undefined
          //     }
          //   }
          
          // Update HTML elements if all values are defined
    if(response.temp!==undefined){
        cityName.innerHTML = city;
  cloud_pct.innerHTML = response.cloud_pct;
  temp.innerHTML = response.temp;
  tempbig.innerHTML = response.temp;
  feels_like.innerHTML = response.feels_like;
  humidity.innerHTML = response.humidity;
  humiditybig.innerHTML = response.humidity;
  min_temp.innerHTML = response.min_temp;
  max_temp.innerHTML = response.max_temp;
  wind_speed.innerHTML = response.wind_speed;
  wind_speedbig.innerHTML = response.wind_speed;
  wind_degrees.innerHTML = response.wind_degrees;
    }
    else{
        alert("Invalid Location..Enter a valid one")
        return 0;
    }
  if (response.temp > 26) {
    mainimg.src="images/sun.svg"
  }
  else if(response.humidity>70){
    mainimg.src="images/rain.svg"
  }
  else{
    mainimg.src="images/normal.svg"
  }

}
   catch (error) {
    console.error(error);
  }
}
function allValuesDefined(json) {
    
    if (typeof json !== "object" || json === null) {
      return false;
    }

    return Object.values(json).every(value => value !== undefined);
  }

async function updateCityWeather(cityName,rowNumber) {
    try {
      let url =
        "https://weather-by-api-ninjas.p.rapidapi.com/v1/weather?city=" +
        cityName;
      let response = await fetch(url, options);
      response = await response.json();
  
      let tableRow =document.getElementById(`row${rowNumber}`);
      tableRow.cells[1].textContent = response.cloud_pct;
    tableRow.cells[2].textContent = response.temp;
    tableRow.cells[3].textContent = response.feels_like;
    tableRow.cells[4].textContent = response.humidity;
    tableRow.cells[5].textContent = response.min_temp;
    tableRow.cells[6].textContent = response.max_temp;
    tableRow.cells[7].textContent = response.wind_speed;
    tableRow.cells[8].textContent = response.wind_degrees
    console.log(response)
    } catch (error) {
      console.error(error);
    }
  }
  
  async function updateAllCitiesWeather() {
    const cities = [
      { name: "Visakhapatnam", row: 1 },
      { name: "Hyderabad", row: 2 },
      { name: "Bengaluru", row: 3 },
      { name: "Mumbai", row: 4 },
      { name: "Delhi", row: 5 },
    ];
  
    for (const city of cities) {
      await updateCityWeather(city.name, city.row);
    }
  }
updateAllCitiesWeather();

submits.addEventListener("click",e=>{
    e.preventDefault()
    getWeather(city.value)
})

let values=document.querySelectorAll(".dropdown-item")
values.forEach((city)=>{
  city.addEventListener("click",()=>{
    getWeather(city.textContent)
    // console.log(city.value)
  })
})
