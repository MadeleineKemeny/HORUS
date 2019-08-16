var weather = require('weather-js');
// Options:
// search:     location name or zipcode
// degreeType: F or C
function getCookie(name) {
    var value = "; " + document.cookie;
    var parts = value.split("; " + name + "=");
    if (parts.length == 2) return parts.pop().split(";").shift();
}
var zipCode = getCookie("zipCode")

$.get("/api/weather/" + zipCode).then(function(results) {

    console.log(results)

    console.log(results[0].current.skytext)

    $("#forecast").text(JSON.stringify(results))
})


weather.find({ search: zipCode, degreeType: 'F' }, function(err, result) {
    if (err) console.log(err);

    console.log(JSON.stringify(result, null, 2));
});