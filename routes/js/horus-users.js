// $(document).ready(function() {
//     // Getting references to the name input and author container, as well as the table body
//     var username = $("#username");
//     var password = $("#password");
//     var phoneNum = $("#phoneNum");
//     var email = $("#email");
//     var location = $("#location");
//     var consent = $("#consent");

//     var API = {
//       login: function (example) {
//         return $.ajax({
//           headers: {
//             "Content-Type": "application/json"
//           },
//           type: "POST",
//           url: "api/login",
//           data: JSON.stringify(example)
//         });
//       },
//       createUser: function (user) {
//         return $.ajax({
//           headers: {
//             "Content-Type": "application/json"
//           },
//           type: "POST",
//           url: "api/users",
//           data: JSON.stringify(user)
//         });
//       },
//       getExamples: function () {
//         return $.ajax({
//           url: "api/examples",
//           type: "GET"
//         });
//       },
//       loginUser: function (user) {
//         console.log('horus hit')
//         console.log(user)
//         return $.ajax({
//           url: "/api/users",
//           type: "POST"
//         });
//       },
//       deleteExample: function (id) {
//         return $.ajax({
//           url: "api/examples/" + id,
//           type: "DELETE"
//         });
//       }
//     };

//     //$(document).on("submit", "#author-form", handleAuthorFormSubmit);
//     //$(document).on("click", ".delete-author", handleDeleteButtonPress);
  
//     // handleSignUp will register a new user
//     var handleSignUp = function(){
//       event.preventDefault();
//       console.log("Sign up clicked!");
//       if (password.val() !== $("#rep-password").val()) {
//         alert("Password is not the same")
//       } else {
//         var user = {
//           Username: username.val(),
//           Password: password.val(),
//           Email: email.val(),
//           PhoneNumber: phoneNum.val(),
//           Location: location.val(),
//           Consent: consent.val(),
//         }
//         console.log(user);
//         API.createUser(user).then(function(){
//           console.log("New user registered!")
//         });
//       };
//     };

//     // handleLogin will log in the new user
//     var handleLogin = function(event){
//       event.preventDefault();
//       console.log("Log in clicked");

//       var user = {
//         Username: username.val(),
//         Password: password.val(),
//       }
//       API.loginUser(user)
//       console.log(user)
//     }

//     // Event listeners to the submit buttons
//     $("#signup").on("click", handleSignUp);
//     $("#login").on("click", handleLogin);
//   });