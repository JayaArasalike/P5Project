
//Initialize Firebase
var config = {
    apiKey: "AIzaSyDVpeY4ojgz_t1BSCisoiRc3NenKD_iB5Q",
    authDomain: "fir-p5js-project.firebaseapp.com",
    databaseURL: "https://fir-p5js-project.firebaseio.com",
    projectId: "fir-p5js-project",
    storageBucket: "fir-p5js-project.appspot.com",
    messagingSenderId: "988315280595"
};

firebase.initializeApp(config);

//set the database and then set a refernece to the databse
var database = firebase.database();
var ref = database.ref('/scores');

//run this funciton, only after the document loads
$(document).ready(function() {
  var score;

  //initialize the score and set the initail score on the webpage
  function init(){
  score = 0;
  $("#i2").html(score);
  }

  init();

//on clicking this button score increases
  $("#bt1").on("click", function(){
      console.log("Score before increment: ", score);
      $("#i2").html(++score);
      console.log("Score after increment: ", score);
  });

//on submit button click, the data gathered from the user is pushed to the database
  $("#submit").on("click", function(){
      console.log("Submit button clicked: ");
      var data = {
      name: $("#name").val(),
      score: score
      }
      console.log("Data ", data);
      ref.push(data);
  });

  

});

//on start button click, display page2
  function page2Handler(){
    console.log("Inside page2Handeler");
    $("#page1").css({ visibility: "hidden"}); 
    $("#page2").css({ visibility: "visible"});
  }

//on start button click, display page2
  function page3Handler(){
    console.log("Inside page2Handeler");
    $("#page2").css({ visibility: "hidden"}); 
    $("#page3").css({ visibility: "visible"});
  }

//linkedIn functions, attaching auth eventhandler
function OnLinkedInFrameworkLoad() {
  IN.Event.on(IN, "auth", OnLinkedInAuth);
}

//retrieving user profile
function OnLinkedInAuth() {
    IN.API.Profile("me").result(ShowProfileData);
}

function ShowProfileData(profiles) {
    var member = profiles.values[0];
    var id=member.id;
    var firstName=member.firstName; 
    var lastName=member.lastName; 
    var photo=member.pictureUrl; 
    var headline=member.headline; 

    //use information captured above
    console.log("First name:", firstName);
    console.log("Last Name:", lastName);
}