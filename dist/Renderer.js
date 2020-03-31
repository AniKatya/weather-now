class Renderer{
    render(cityData){
        $(".result").empty();
        const source = $('#cities-template').html();
        const template = Handlebars.compile(source);
        const newHTML = template(cityData);
        $('.result').append(newHTML)
        $("#city-input").val("")
    }
    renderLocal(localCityData) {
        $('.main-result').empty();
        const source = $('#local-city-template').html();
        const template = Handlebars.compile(source);
        const newHTML = template(localCityData);
        $('.main-result').append(newHTML)
    }

    renderSearchOutput(searchOutputData){
        $('.search-result').empty();
        const source = $("#search-output-template").html();
        const template = Handlebars.compile(source);
        const newHTML = template(searchOutputData);
        $('.search-result').append(newHTML);
    }
}

