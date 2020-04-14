class Renderer {
    render(cityData, templateName, classToAppend) {
        $(`${classToAppend}`).empty();
        const source = $(`${templateName}`).html();
        const template = Handlebars.compile(source);
        const newHTML = template(cityData);
        $(`${classToAppend}`).append(newHTML);
    }
};