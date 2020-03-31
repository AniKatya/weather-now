class TempManager {
    constructor() {
        this.searchOutput,
            this.favCities = [],
            this.localCity = {}
    }

    async getDataFromDB() {
        let citiesData = await $.get('/cities');
        this.favCities = citiesData;
    }

    async getCityData(cityName) {
        let cityData = await $.get(`city/${cityName}`)
        cityData.star = "star_border";
        this.searchOutput = cityData;
    }

    async getLocalCityData(lat, lon) {
        let localCityData = await $.get(`city/${lat}/${lon}`)
        this.localCity = localCityData;
    }

    saveCity(cityName) {
        let savedBefore = this.favCities.some(c => c.name.toLowerCase() == cityName.toLowerCase());
        if (savedBefore == false) {
            const savedCity = this.searchOutput;
            console.log("inside saved city")
            savedCity.star = "star";
            this.favCities.push(savedCity)
            $.post(`/city`, savedCity, function (res) {
                console.log("POST complete")}
            )
        } else {
            M.toast({html: 'The city already exists in the list of favourite locations', classes: 'rounded'})
        }
    }

    removeCity(cityName) {
        $.ajax({
            url: `/city/${cityName}`,
            type: 'DELETE',
            success: function () {
            }
        })
    }
}


