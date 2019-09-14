class TempManager {
    constructor() {
        this.cityData = []
    }

    async getDataFromDB() {
        let data = await $.get('/cities')
        this.cityData = data
    }

    async getCityData(cityName) {
        this.cityData = this.cityData.filter(c => c.name !== cityName)
        let data = await $.get(`city/:${cityName}`)
        this.cityData.push(data)
    }

    saveCity(cityName) {
        let ourCityData = this.cityData.find(c => c.name === cityName)
        $.post(`/city`, ourCityData, function (res) {
            console.log("POST complete")
        })
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


