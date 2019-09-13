class TempManager {
    constructor() {
        this.cityData = []
    }

    async getDataFromDB() {
        let data = await $.get('/cities')
        this.cityData = data
    }

    async getCityData(cityName) {
        let data = await $.get(`city/:${cityName}`)
        this.cityData.push({
            'name': data.location.name,
            'temperature': data.current.temp_c,
            'condition': data.current.condition.text,
            'conditionPic': data.current.condition.icon,
            'updatedAt': data.current.last_updated
        })
    }
   
    saveCity(cityName) {
        let ourCityData = this.cityData.find(c => c.name === cityName)
        const cityObject = {
            name: ourCityData.name,
            updatedAt: ourCityData.updatedAt,
            temperature: ourCityData.temperature,
            condition: ourCityData.condition,
            conditionPic: ourCityData.conditionPic
        }
        $.post(`/city`, cityObject, function () {
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


