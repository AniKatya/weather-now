 class TempManager {
        constructor(cityData) {
            this.cityData = []
        }
        //request to the DB
        async getDataFromDB(){
            let data = await $.get('/cities')
            this.cityData = data
           }

        //request to the server
        async getCityData(cityName){
            let data = await $.get(`city/:${cityName}`)
            this.cityData.push({
                'name': data.location.name,
                'temperature': data.current.temp_c,
                'condition': data.current.condition.text,
                'conditionPic': data.current.condition.icon,
                'updatedAt':data.current.last_updated
            })
        }
        //sends a city's data as POST request to the /city post route on your server
        saveCity(cityName){
            let ourCityData = this.cityData.find(c=>c.name===cityName)
            const cityObject = {
                name: ourCityData.name,
                updatedAt: ourCityData.updatedAt,
                temperature: ourCityData.temperature,
                condition: ourCityData.condition,
                conditionPic: ourCityData.conditionPic
            }
            $.post(`/city`,cityObject,function (res) {
                console.log("POST complete")
        })
    }
        removeCity(cityName){
            $.ajax({
                url: `/city/${cityName}`,
                type: 'DELETE',
                success: function() {
                }
            })
        }
}
  
 
