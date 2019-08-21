//var weather = require('moment-js');
// Get references to page elements.
var $exampleText = $("#example-text");
var $exampleDescription = $("#example-description");
var $submitBtn = $("#submit");
var $exampleList = $("#example-list");
// The API object contains methods for each kind of request we'll make
var API = {
  saveExample: function (example) {
    return $.ajax({
      headers: {
        "Content-Type": "application/json"
      },
      type: "POST",
      url: "api/examples",
      data: JSON.stringify(example)
    });
  },
  createUser: function (user) {
    return $.ajax({
      headers: {
        "Content-Type": "application/json"
      },
      type: "POST",
      url: "api/users",
      data: JSON.stringify(user),
      success: function (data) {
        if (data === '404') {
          $("#email").addClass("error")
          // remove the class after the animation completes
          setTimeout(function () {
          $("#email").removeClass("error");
          }, 300);
        }
        else {
          $("body").html(data);
        };
      }
    });
  },

  floodingAlert: function () {
    var userid = 1    // this is temp, the userid needs to be in the cookies
    return $.ajax({
      url: "api/event/water/" + userid,
      type: "GET",
      success: function (data) {
       
          $("body").html(data);
        
      }
    });
  },

  loginUser: function (user) {
    console.log(user)
    // return $.ajax({
    return $.ajax({
      url: "api/users/" + user.email,
      type: "GET",
      success: function (data, textStatus, jqXHR) {
        
        console.log("DATA SHOULD BE HERE",data)
        if (data === '404') {
          $("#emaillogin").addClass("error")
          // remove the class after the animation completes
          setTimeout(function () {
          $("#emaillogin").removeClass("error");
          }, 300);
        }
        else {
          $("body").html(data);
          $("#zipcode").text("60202");
                $.ajax({
                    url: "api/weather/" + "60202",
                    type: "GET"
                }).then(function(results) {
                    console.log(results)
                    console.log(results[0].current.temperature)
                    $("#currentTemp").text(results[0].current.temperature)
                    $("#currentConditions").text(results[0].current.skytext)
                    $("#humidity").text(results[0].current.humidity)
                    $("#wind").text(results[0].current.windspeed)
                  
                    var forecast = results[0].forecast;
                    var container = $("#panel8");
                    for (i = 2; i < forecast.length; i++) {
                        console.log(forecast[i]);
                         var dayweather = `<p><strong>${forecast[i].day}:</strong></p><p>HIGH: ${forecast[i].high}F, LOW: ${forecast[i].low}F</p> <p>CHANCE OF RAIN: ${forecast[i].precip}%</p>`
                        // $("#day").text(forecast[i].day)
                        var day = $("<p>").addClass("text-center").text("DAY: ").append(forecast[i].day + ", " + forecast[i].date);
                        //container.append(day);
                        var temp = $("<p>").addClass("text-center").text("HIGH: ").append(forecast[i].high + " LOW: ").append(forecast[i].low);
                        //container.append(temp);
                        var precip = $("<p>").addClass("text-center").text(`CHANCE OF RAIN: ${forecast[i].precip}%`);
                        container.append(dayweather);
                    }
                })
                $("#modalLRForm").modal("show")
        };
        
      }
    })
  },
  testSensor: function () {
    return $.ajax({
      url: "/api/sensor",
      type: "GET",
      success: function (data) {
        if (data[0].sensorStatus === true) {
          $(".fire").removeClass("img-circle")
          $(".fire").addClass("status")
          console.log(data)
        }
        else {
          console.log("no fire")
          $(".fire").addClass("img-circle")
        }
      }
    })
  },
  getSendMessage: function (phoneNum) {
    console.log("hello getSendMessage ");
    return $.ajax({
      url: "/send/" + phoneNum, 
      type: "GET",
    });
  },
  deleteExample: function (id) {
    return $.ajax({
      url: "api/examples/" + id,
      type: "DELETE"
    });
  }
};
// refreshExamples gets new examples from the db and repopulates the list
var refreshExamples = function() {
    API.getExamples().then(function(data) {
        var $examples = data.map(function(example) {
            var $a = $("<a>")
                .text(example.text)
                .attr("href", "/example/" + example.id);
            var $li = $("<li>")
                .attr({
                    class: "list-group-item",
                    "data-id": example.id
                })
                .append($a);
            var $button = $("<button>")
                .addClass("btn btn-danger float-right delete")
                .text("ｘ");
            $li.append($button);
            return $li;
        });
        $exampleList.empty();
        $exampleList.append($examples);
    });
};
// handleFormSubmit is called whenever we submit a new example
// Save the new example to the db and refresh the list
var handleFormSubmit = function(event) {
    event.preventDefault();
    var example = {
        text: $exampleText.val().trim(),
        description: $exampleDescription.val().trim()
    };
    if (!(example.text && example.description)) {
        alert("You must enter an example text and description!");
        return;
    }
    API.saveExample(example).then(function() {
        refreshExamples();
    });
    $exampleText.val("");
    $exampleDescription.val("");
};
// handleDeleteBtnClick is called when an example's delete button is clicked
// Remove the example from the db and refresh the list
var handleDeleteBtnClick = function() {
    var idToDelete = $(this)
        .parent()
        .attr("data-id");
    API.deleteExample(idToDelete).then(function() {
        refreshExamples();
    });
};
var handleSignUp = function() {
    event.preventDefault();
    console.log("sign up clicked");
    if ($("#password").val() !== $("#rep-password").val()) {
        alert("password is not the same")
    } else {
        var user = {
            firstName: $("#firstName").val(),
            lastName: $("#lastName").val(),
            password: $("#password").val(),
            email: $("#email").val(),
            phoneNum: $("#phoneNum").val(),
            location: $("#location").val(),
            consent: $('#check1').is(':checked'),
        }
        console.log(user);
        API.createUser(user).then(function() {
            console.log("we are back from registering a new user")
        });
    };
}
var handleLogin = function () {
  event.preventDefault();
  console.log("log in clicked from here");
  var user = {
    email: $("#emaillogin").val(),
    password: $("#passlogin").val(),
  }
  console.log(user);
  API.loginUser(user)
};
var handleTest = function () {
  var phoneNumToCall = $(this)
    // .parent()
    .attr("data-id");
  console.log(phoneNumToCall);
  API.getSendMessage(phoneNumToCall).then(function (data) {
    console.log("hello", data);
  });
}
var handleToggleSignUp = function () {
  $("#registerTab").click();
};
var handleToggleLogIn = function () {
  $("#loginTab").click();
};
var handleUpdateProfile = function () {
  console.log("going to update user profile");
};

var handleFloodingAlert = function () {
  API.floodingAlert().then(function (data) {
    console.log("handle flooding alert");
  })

};
var handleSensor = function () {
  API.testSensor().then(function (data) {
    console.log("hello", data)
  })
};


//
// Add event listeners to the submit and delete buttons
$submitBtn.on("click", handleFormSubmit);
$exampleList.on("click", ".delete", handleDeleteBtnClick);
$("#signup").on("click", handleSignUp);
$("#login").on("click", handleLogin);
$("#register").on("click", handleToggleSignUp);
$("#loginAccount").on("click", handleToggleLogIn);
$("#test-send-message").on("click", handleTest);
$("#update-user-profile").on("click", handleUpdateProfile);
//$("#flooding-alert").on("click", handleFloodingAlert);
$("#test-sensors").on("click", handleSensor)
//
$("#icon4").on("click", handleFloodingAlert)