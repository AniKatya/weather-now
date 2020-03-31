const renderer = new Renderer()
const tempManager = new TempManager()

const loadPage = async function () {
  await tempManager.getDataFromDB();
  getLocation();
  console.log(tempManager.favCities);
  renderer.render(tempManager.favCities);
  tempManager.favCities.length>0? $(".arrow").show():null
}

const handleSearch = async function () {
  let cityInput = $("#city-input").val();
  await tempManager.getCityData(cityInput);
  renderer.renderSearchOutput(tempManager.searchOutput);
}

$(document).on("click", "#add-button", function () {
  let starCondition = $(this).closest(".box").find("#add-button").text();

  if (starCondition == "star_border") {
    $(this).closest(".box").find("#add-button").text("star")
    let cityName = $(this).closest(".box").find(".name").text()
    tempManager.saveCity(cityName)
    loadPage()

  } else {
    $(this).closest(".box").find("#add-button").text("star_border");
    let cityName = $(this).closest(".box").find(".name").text()
    tempManager.removeCity(cityName)
    loadPage()
  }
});


function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition);
  } else {
    console.log("Geolocation is not supported by this browser.");
  }
}

async function showPosition(position) {
  await tempManager.getLocalCityData(position.coords.latitude, position.coords.longitude);
  renderer.renderLocal(tempManager.localCity);

  if(tempManager.localCity.localTime>tempManager.localCity.sunset||tempManager.localCity.localTime<tempManager.localCity.sunrise){
    document.body.style.backgroundImage = "url('night2.jpeg')";
    document.getElementById("search-button").style.backgroundColor = "#054346";
  } else {
    document.body.style.backgroundImage = "url('day.jpeg')";

 

  };
}

function scrollToBottom(){
  $(".box-container").animate({scrollTop:$(document).height()})
}

function scrollToTop(){
  $(".box-container").animate({scrollTop:0})
}

loadPage()