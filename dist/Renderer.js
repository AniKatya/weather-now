class Renderer{
    render(cityData){
        $(".result").empty()
        const source = $('#cities-template').html();
        const template = Handlebars.compile(source);
        const newHTML = template(cityData);
        // append our new html to the page
        $('.result').append(newHTML)
        $("#city-input").val("")
    }
}

