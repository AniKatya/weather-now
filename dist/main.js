const renderer = new Renderer()
const tempManager = new TempManager()

const loadPage = async function(){
        await tempManager.getDataFromDB()
        renderer.render(tempManager.cityData)
    }

const handleSearch = async function(){
    let cityInput = $("#city-input").val()
    await tempManager.getCityData(cityInput)
    renderer.render(tempManager.cityData)
}

$(document).on("click", "#add-button", function(){
    let cityName = $(this).closest(".box").find(".name").text()
    tempManager.saveCity(cityName)
});

$(document).on("click", "#delete-button", function(){
    let cityName = $(this).closest(".box").find(".name").text()
    tempManager.removeCity(cityName)
});

loadPage()