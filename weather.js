$(document).ready (function() {

// Date Today //
var dateNow = moment().format('dddd, MMMM D YYYY');
var today = $("<h1>").text(dateNow)
$("#title").append(today);

//Putting the Last City on Page//
function pageStart () {
  $("#future").css("display", "block");
  var currentCity=localStorage.getItem("city")
  var split=currentCity.split(", ");
  // console.log(split);
  for (i=0; i<split.length; i++) {
    var addCity=$("<button>").addClass("btn-block btn btn large btn-light")
    addCity.text(split[i]);
    $("#buttons").append(addCity)
  }
  var lastCity= split[split.length-1];
  searchCity(lastCity);
  dailyForecast(lastCity);
}

//Current Weather based on Location//
function weather (lat, long) {
  var queryURL="https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + long + "&appid=b90410cbb9f6bbe669e3f5a1db596f13";
  $.ajax ({
    url: queryURL,
    method: "GET"
  }).then(function(response){
    console.log(response);
    $("#future").css("display", "none");
    var cityName=$("<h2>").text("Chicago");
    $("#city").empty();
    $("#city").append(cityName);
    var temperature=$("<p>").text(Math.round(((response.current.temp - 273.15) *1.8) + 32) + "°F");
    $("#temperature").empty();
    $("#temperature").append(temperature);
    var humidity=$("<p>").text("Humidity: " + response.current.humidity + "%")
    $("#humidity").empty();
    $("#humidity").append(humidity);
    var wind=$("<p>").text("Wind Speed: " + response.current.wind_speed + " mph")
    $("#wind").empty();
    $("#wind").append(wind);
    if (response.hourly[0].weather[0].id === 500 || response.hourly[0].weather[0].id === 501) {
      var icon=$("<img>").attr("src", "images/storm.png");
      $("#uv").empty();
      $("#uv").append(icon);
    } else if (response.hourly[0].weather[0].id >= 502 && response.hourly[0].weather[0].id <= 504) {
      var icon=$("<img>").attr("src", "images/heavyrain.png");
      $("#uv").empty();
      $("#uv").append(icon);
    } else if (response.hourly[0].weather[0].id === 800) {
      var icon=$("<img>").attr("src", "images/sun.png");
      $("#uv").empty();
      $("#uv").append(icon);
    } else if (response.hourly[0].weather[0].id === 801 || response.hourly[0].weather[0].id === 802 || response.hourly[0].weather[0].id === 803 || response.hourly[0].weather[0].id === 804) {
      var icon=$("<img>").attr("src", "images/cloud.png");
      $("#uv").empty();
      $("#uv").append(icon);
    } else if (response.hourly[0].weather[0].id === 600) {
      var icon=$("<img>").attr("src", "images/snowflake.png");
      $("#uv").empty();
      $("#uv").append(icon);
    } else if (response.hourly[0].weather[0].id === 200 || response.hourly[0].weather[0].id === 201 || response.hourly[0].weather[0].id === 202 || response.hourly[0].weather[0].id === 210 || response.hourly[0].weather[0].id === 211 || response.hourly[0].weather[0].id === 212 || response.hourly[0].weather[0].id === 221 || response.hourly[0].weather[0].id === 230 || response.hourly[0].weather[0].id === 231 || response.hourly[0].weather[0].id === 232) {
      var icon=$("<img>").attr("src", "images/storm.png");
      $("#uv").empty();
      $("#uv").append(icon);
    }
  })
}
weather(41.85, -87.65)

//Finding Current City's Info//
function searchCity(city) {
    var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=b90410cbb9f6bbe669e3f5a1db596f13";
    $.ajax({
        url: queryURL,
        method: "GET"
      }).then(function(response) {
        console.log(response);
        // console.log(response.weather[0].id);
        var cityName=$("<h2>").text(response.name);
        $("#city").empty();
        $("#city").append(cityName);
        var temperature=$("<p>").text(Math.round(((response.main.temp - 273.15) *1.8) + 32) + "°F");
        $("#temperature").empty();
        $("#temperature").append(temperature);
        var humidity=$("<p>").text("Humidity: " + response.main.humidity + "%")
        $("#humidity").empty();
        $("#humidity").append(humidity);
        var wind=$("<p>").text("Wind Speed: " + response.wind.speed + " mph")
        $("#wind").empty();
        $("#wind").append(wind);
        if (response.weather[0].id === 500 || response.weather[0].id === 501) {
          var icon=$("<img>").attr("src", "images/storm.png");
          $("#uv").empty();
          $("#uv").append(icon);
        } else if (response.weather[0].id >= 502 && response.weather[0].id <= 504) {
          var icon=$("<img>").attr("src", "images/heavyrain.png");
          $("#uv").empty();
          $("#uv").append(icon);
        } else if (response.weather[0].id === 800) {
          var icon=$("<img>").attr("src", "images/sun.png");
          $("#uv").empty();
          $("#uv").append(icon);
        } else if (response.weather[0].id === 801 || response.weather[0].id === 802 || response.weather[0].id === 803 || response.weather[0].id === 804) {
          var icon=$("<img>").attr("src", "images/cloud.png");
          $("#uv").empty();
          $("#uv").append(icon);
        } else if (response.weather[0].id === 600) {
          var icon=$("<img>").attr("src", "images/snowflake.png");
          $("#uv").empty();
          $("#uv").append(icon);
        } else if (response.weather[0].id === 200 || response.weather[0].id === 201 || response.weather[0].id === 202 || response.weather[0].id === 210 || response.weather[0].id === 211 || response.weather[0].id === 212 || response.weather[0].id === 221 || response.weather[0].id === 230 || response.weather[0].id === 231 || response.weather[0].id === 232) {
          var icon=$("<img>").attr("src", "images/storm.png");
          $("#uv").empty();
          $("#uv").append(icon);
        }
      });
}

$("#select-city").on("click", function(event) {
  $("#future").css("display", "block");
    event.preventDefault();
    var city = $("#city-input").val().trim();
    var preSave=localStorage.getItem("city");
    var toSave=preSave + ", " + city
    localStorage.setItem("city", toSave);
    var saveCity = localStorage.getItem("city");
    saveCity=$("<button>").addClass("btn-block btn btn large btn-light")
    saveCity.text(city);
    $("#buttons").append(saveCity)
    searchCity(city);
    dailyForecast(city)
  });

  //Daily Forecast//
  function dailyForecast(forecast) {
    var queryURL="https://api.openweathermap.org/data/2.5/forecast?q=" + forecast + "&appid=b90410cbb9f6bbe669e3f5a1db596f13";
    $.ajax({
      url: queryURL,
      method: "GET"
    }).then(function(response) {
      // console.log(response);

     // Icons// console.log(response.list[0].weather[0].id)
      var iconOne=(response.list[1].weather[0].id);
      // $("#icon-1").append(iconOne);
      var iconTwo=(response.list[2].weather[0].id);
      // $("#icon-2").append(iconTwo);
      var iconThree=(response.list[3].weather[0].id);
      // $("#icon-3").append(iconThree);
      var iconFour=(response.list[4].weather[0].id);
      // $("#icon-4").append(iconFour);
      var iconFive=(response.list[5].weather[0].id);
      // $("#icon-5").append(iconFive);

      console.log(response.list[2].weather[0].id);

      var icons = [iconOne, iconTwo, iconThree, iconFour, iconFive];

      for (i=0; i<icons.length; i++) {
        console.log(icons[i])
        if (icons[i] === 800) { //clear sunny day
          var icon=$("<i>").addClass("fas fa-sun");
          console.log(icon)
          var iconNum= "#icon-" + (i + 1)
          $(iconNum).empty();
          $(iconNum).append(icon);
        } else if (icons[i] === 801 || icons[i] === 802 || icons[i] === 803 || icons[i] === 804) { //cloudy
          var icon=$("<i>").addClass("fas fa-cloud-sun");
          console.log(icon)
          var iconNum= "#icon-" + (i + 1)
          $(iconNum).empty();
          $(iconNum).append(icon);
        } else if (icons[i] === 500 || icons[i] === 501 ) { //rainy
          var icon=$("<i>").addClass("fas fa-cloud-rain");
          var iconNum= "#icon-" + (i + 1)
          $(iconNum).empty();
          $(iconNum).append(icon);
        } else if (icons[i] >= 502 && icons[i] <= 504) { //heavy rain
          var icon=$("<i>").addClass("fas fa-cloud-showers-heavy");
          var iconNum= "#icon-" + (i + 1)
          $(iconNum).empty();
          $(iconNum).append(icon);
        } else if (icons[i] === 200 || icons[i] === 201 || icons[i] === 202 || icons[i] === 210 || icons[i] === 211 || icons[i] === 212 || icons[i] === 221 || icons[i] === 230 || icons[i] === 231 || icons[i] === 232) { //storm
          var icon=$("<i>").addClass("fas fa-bolt");
          var iconNum= "#icon-" + (i + 1)
          $(iconNum).empty();
          $(iconNum).append(icon);
        } else if (icons[i] === 600) {
          var icon=$("<i>").addClass("fas fa-snowflake");
          var iconNum= "#icon-" + (i + 1)
          $(iconNum).empty();
          $(iconNum).append(icon);
        }
      }

      //Temperature// console.log(response.list[1].main.temp)
      var tempOne=(Math.round(((response.list[1].main.temp - 273.15) *1.8) + 32) + "°F");
      $("#temp-1").empty();
      $("#temp-1").append(tempOne);
      var tempTwo=(Math.round(((response.list[2].main.temp - 273.15) *1.8) + 32) + "°F");
      $("#temp-2").empty();
      $("#temp-2").append(tempTwo);
      var tempThree=(Math.round(((response.list[3].main.temp - 273.15) *1.8) + 32) + "°F");
      $("#temp-3").empty();
      $("#temp-3").append(tempThree);
      var tempFour=(Math.round(((response.list[4].main.temp - 273.15) *1.8) + 32) + "°F");
      $("#temp-4").empty();
      $("#temp-4").append(tempFour);
      var tempFive=(Math.round(((response.list[5].main.temp - 273.15) *1.8) + 32) + "°F");
      $("#temp-5").empty();
      $("#temp-5").append(tempFive);

      //Humidity// console.log(response.main.humidity);
      var humidOne=(response.list[1].main.humidity + "%")
      $("#humid-1").empty();
      $("#humid-1").append(humidOne);
      var humidTwo=(response.list[2].main.humidity + "%")
      $("#humid-2").empty();
      $("#humid-2").append(humidTwo);
      var humidThree=(response.list[3].main.humidity + "%")
      $("#humid-3").empty();
      $("#humid-3").append(humidThree);
      var humidFour=(response.list[4].main.humidity + "%")
      $("#humid-4").empty();
      $("#humid-4").append(humidFour);
      var humidFive=(response.list[5].main.humidity + "%")
      $("#humid-5").empty();
      $("#humid-5").append(humidFive);

   
      //Date// console.log(response.list[1].dt)
      var dteLooking = moment.unix(response.list[0].dt);
      var length = 6
      var counter = 1
      for (i=0; i<length; i++) {
        console.log(dteLooking, response.list[i].dt);
        if(moment.unix(response.list[i].dt).format('M/D')=== moment.unix(dteLooking).format('M/D')){
          length+=1;
        }else{
          dteLooking = response.list[i].dt;
          console.log("New, day", moment.unix(response.list[i].dt).format('MMMM Do'))
          //print value to page
          var date=("#date-" + counter)
          var futureWeather=moment.unix(response.list[i].dt).format('M/D')
          console.log(date)
          console.log(futureWeather)
          $(date).empty();
          $(date).append(futureWeather)
          counter+=1;
        }
      }
    });
  }

  $(document).on("click", ".btn", function(a){
    a.preventDefault()
    console.log(a.target.textContent);
    searchCity(a.target.textContent);
    dailyForecast(a.target.textContent)
  })
  pageStart();
})


// ------------------ Show ONLY Chicago ------------------------ //
// var city = "chicago";
// var queryURL = "http://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=b90410cbb9f6bbe669e3f5a1db596f13";

//     $.ajax({
//       url: queryURL,
//       method: "GET"
//     }).then(function(response) {
//         var cityName=$("<h2>").text(response.name);
//         $("#city").append(cityName)
//         var temperature=$("<p>").text(Math.round(((response.main.temp - 273.15) *1.8) + 32) + "°F");
//         $("#temperature").append(temperature);
//         var humidity=$("<p>").text("Humidity: " + response.main.humidity + "%")
//         $("#humidity").append(humidity);
//         var wind=$("<p>").text("Wind Speed: " + response.wind.speed + " mph")
//         $("#wind").append(wind);
//         // var uv=$("<p>").text("UV Index: " + response.)
//         // $("#uv").append(uv);
//     });