var https = require("https");

var url = 'https://maps.googleapis.com/maps/api/distancematrix/json?key=AIzaSyAykFlST8qAZY7EzGLEN4lTTNpPirenuVE';

var opt = {
    host: url.split(".com/")[0] + ".com",
    path: "/" + url.split(".com/")[1]
};

function callback(response) {
    var str = "";

    response.on("data", function (chunk) {
        str += chunk;
    });

    response.on("end", function () {
        console.log(str);
    });
}

var request = https.request(opt, callback);

request.on("error", function (error) {
    console.error(error);
});

request.end();