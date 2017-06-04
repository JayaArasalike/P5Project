
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
var usersRef = database.ref('/users');
var id;

var startTime;
var endTime;
var duration;
var profilePic;
var photo;
var score;
var hScore = 0;


//initialize the score and set the initial score on the webpage
function init(){
      score = 0;
      $("#i2").html(score);
  }

//run this funciton, only after the document loads
$(document).ready(function() {
  
  //call the init() function to initialize score to zero
  init();
  

//on clicking this button score increases
  $("#bt1").on("click", function() {
      
      console.log("Score before increment: ", score);
      $("#i2").html(++score);
      console.log("Score after increment: ", score);
      
  });

//on submit button click, the data gathered from the user is pushed to the database
  $("#submit").on("click", function() {

      console.log("Submit button clicked: ");
      endTime = moment();
      console.log("End time is: ", endTime);

      var temp = endTime.diff(startTime);
      console.log("Temp time: ",temp);
      duration = moment(temp).format('mm:ss');

      console.log("Duration is: ", duration);

      //creating an object to hold the data, which will be sent to firebase 
      var data = {
        name: $("#name").val(),
        memberId: id,
        score: score,
        duration: duration,
        testDate: moment().format('dddd, MMMM Do YYYY, hh:mm:ss')
      }
    
      console.log("Data ", data);
      usersRef.push(data);

  });

}); //end of document.ready()

//function to calculate the highest score
function highScore(lScore) {
  console.log("Just came to highScore function");
  if(lScore > hScore)
    hScore = lScore;
  $("#hScore").html(hScore);
}

//on start button click, display page2
function page2Handler() {
    startTime = moment();
    console.log("Start time :",startTime);
    console.log("Inside page2Handeler");
    $("#page1").css({ visibility: "hidden"}); 
    $("#page2").css({ visibility: "visible"});
    
    //creating an image tag to hold and display user's profile pic
    profilePic = $('<img>');
    profilePic.attr("src", photo);
    $("#pic").append(profilePic);
}

//on start button click, display page2
function page3Handler() {
    console.log("Inside page2Handeler");
    $("#page2").css({ visibility: "hidden"}); 
    $("#page3").css({ visibility: "visible"});
}

//linkedIn functions, attaching auth eventhandler
function OnLinkedInFrameworkLoad() {
  IN.Event.on(IN, "auth", OnLinkedInAuth);
}

function initRefreshScoreData() {
    //usersRef.orderByChild("memberId").equalTo(id).on("child_added", function(snapshot) {
    usersRef.on("child_added", function(snapshot) {
        console.log(snapshot.val());

        //get the snapshot of user's score, duration and testDate based on member id
        var localScore = snapshot.val().score;
        var localDuration = snapshot.val().duration;
        var localTestDate = snapshot.val().testDate;

        //highest score
        highScore(localScore);
        console.log("Came back to orderByChild");

        // Add user's score data into the table
        $("#score-table > tbody").append("<tr><td>" + localScore + "</td><td>" + localDuration + "</td><td>" +
        localTestDate + "</td></tr>");
    });
}
//retrieving user profile
function OnLinkedInAuth() {
    IN.API.Profile("me").result(getProfileData);
}

function getProfileData(profiles) {

    var member = profiles.values[0];
    id = member.id;
    console.log('set id', id);

    var firstName = member.firstName; 
    var lastName = member.lastName; 
    photo = member.pictureUrl; 
    var headline = member.headline; 
    
    //use information captured above
    console.log("First name:", firstName);
    console.log("Last Name:", lastName);
    console.log("Picture", photo);
    console.log("Member Id:",member.id);

    initRefreshScoreData();
}

//On clicking logout button, execute this function
var liLogout = function() {
    IN.User.logout(callbackFunction);
}

function callbackFunction() {
    $("#page3").css({ visibility: "hidden"});
    alert("You have successfully logged out.");
    $("#page1").css({ visibility: "visible"});
}

//on restart, hide page3 and show page2 and call its handler to increase the count
$("#rst").on("click", function() {
  $("#page3").css({ visibility: "hidden"});
  $("#page2").css({ visibility: "visible"});
  init();
  //$("#score-table > tbody").empty();
  //page2Handler();
  startTime = moment();

});
