const renderer = new Renderer();
const tempManager = new TempManager();


const loadPage = async function() {
    await tempManager.getDataFromDB();
    getLocation();
    setTimeout(function() {
        // render(cityData, templateName, classToAppend)
        renderer.render(tempManager.favCities, "#cities-template", ".fav-result");
        tempManager.favCities.length > 0 ? $(".arrow").show() : null;
    }, 500);
};


const handleSearch = async function() {
    let cityInput = $("#city-input").val();
    await tempManager.getCityData(cityInput);
    // render(cityData, templateName, classToAppend)
    renderer.render(tempManager.searchOutput, "#search-output-template", ".search-result");
    $("#city-input").val("");
};


$(document).on("click touchstart", "#add-button", function() {
    let starCondition = $(this).closest(".box").find("#add-button").text();

    if (starCondition == "star_border") {
        $(this).closest(".box").find("#add-button").text("star");
        let cityName = $(this).closest(".box").find(".name").text();
        tempManager.saveCity(cityName);
        loadPage();

    } else {
        $(this).closest(".box").find("#add-button").text("star_border");
        let cityName = $(this).closest(".box").find(".name").text();
        tempManager.removeCity(cityName);
        loadPage();
    }
})


async function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
    } else {
        console.log("Geolocation is not supported by this browser.");
    }
}


async function showPosition(position) {
    await tempManager.getLocalCityData(position.coords.latitude, position.coords.longitude);
    // render(cityData, templateName, classToAppend)
    renderer.render(tempManager.localCity, "#local-city-template", ".local-result");

    if (tempManager.localCity.localTime > tempManager.localCity.sunset || tempManager.localCity.localTime < tempManager.localCity.sunrise) {
        document.body.style.backgroundImage = "url('night2.jpeg')";
        document.getElementById("search-button").style.backgroundColor = "#054346";
        document.body.style.color = "white";
    } else {
        document.body.style.backgroundImage = "url('day.jpeg')";
        document.getElementById("search-button").style.backgroundColor = "#71a88e";
    }
}


function scrollToBottom() {
    $(".favourites-container").animate({ scrollTop: $(document).height() });
}

function scrollToTop() {
    $(".favourites-container").animate({ scrollTop: 0 });
}

loadPage();