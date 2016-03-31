// See the JQuery documentation at ... 
// http://api.jquery.com/
// http://learn.jquery.com/
// See my JQuery and Ajax notes
var xmlHttp = null;
var comment = "";
var html = "";
var user1 = "aa"; //change this
var lat = null;
var lon = null;

//create a new XML Object
function GetXmlHttpObject() {
    var xmlHttp = null;
    try {
        // Firefox, Opera 8.0+, Safari
        xmlHttp = new XMLHttpRequest();
    } catch (e) {
        //Internet Explorer
        try {
            xmlHttp = new ActiveXObject("Msxml2.XMLHTTP");
        } catch (e) {
            try{
                xmlHttp = new ActiveXObject("Microsoft.XMLHTTP");
            }catch(e){
                xmlHttp = false;
            }
        }
    }
    return xmlHttp;
}

//check if user=null
//if yes, show login/register page page 1
//if no, show them feed/input UI page 2
function isLoggedIn(value) {
    if (value === false) {
        $("#page2").hide();
        $("#page1").show();
        $("#hiddenUser").hide();
        $("#topDiv").hide();
        $("#page3").hide();
    } else {
        $("#page1").hide();
        $("#page2").show();
        $("#hiddenUser").html("Welcome, " + user1);
        console.log("user isLoggedin: "+user1);
        $("#hiddenUser").show();
        $("#topDiv").show();
    }
}

//switch between main and map page
function switchView(param){
    if (param==='main'){
        $("#page2").show();
        $("#page3").hide();
    }else{
        $("#page2").hide();
        $("#page3").show();
        googleMap();
        //initialize();
    }
}

//create AJAX request for registration
//if successfully registered, automatically log in and display page2

function login() {
    console.log("login called");
    var user = document.getElementById("usernameJs").value; var pass = document.getElementById("logPassJs").value;
    console.log(user); console.log(pass);
    xmlHttp = GetXmlHttpObject();
    if (xmlHttp === null) {
        alert("Browser does not support HTTP Request");
        return;
    }

    var url = "login.php"; var params = "username="+user+"&password="+pass;
    console.log("params:"+params);
    xmlHttp.open("POST", url, true);

    //Send the proper header information along with the request
    xmlHttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xmlHttp.setRequestHeader("Content-length", params.length);
    xmlHttp.setRequestHeader("Connection", "close");

    xmlHttp.onreadystatechange = function() {//Call a function when the state changes.
        if (xmlHttp.readyState === 4 && xmlHttp.status === 200) {
            var result = jQuery.parseJSON( xmlHttp.responseText );
            console.log(result.username); console.log(result.status);
            if (result.status==='ok'){
                user1=result.username;
                console.log("user: "+user1);
                $("#status").html("");
                isLoggedIn(true);
            }else{
                //make this better to match bad password/bad username
                $("#status").html(result.status);
            }
        }
    };
   
    console.log("params sent");
    xmlHttp.send(params);
}

function register(user, pass, pass2, email) {
    console.log("register called");
    var user = document.getElementById("u").value; var pass = document.getElementById("p").value;
    var pass2 = document.getElementById("p2").value; var email = document.getElementById("e").value;
    console.log(user); console.log(pass); console.log(pass2); console.log(email);
    xmlHttp = GetXmlHttpObject();
    
    if (pass!==pass2){
        $("#passwordError").html("error: passwords don't match");
        return;
    }else{
        $("#passwordError").html("");
    }
    
    if (xmlHttp === null) {
        alert("Browser does not support HTTP Request");
        return;
    }
    
    var url = "register.php";
    var params = "username="+user+"&password="+pass+"&email="+email;
    console.log("params:"+params);
    xmlHttp.open("POST", url, true);

    //Send the proper header information along with the request
    xmlHttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xmlHttp.setRequestHeader("Content-length", params.length);
    xmlHttp.setRequestHeader("Connection", "close");

    xmlHttp.onreadystatechange = function() {//Call a function when the state changes.
        if (xmlHttp.readyState === 4 && xmlHttp.status === 200) {
            var result = jQuery.parseJSON( xmlHttp.responseText );
            console.log(result.user);
            console.log(result.status);
            if (result.status==='ok'){
                user1=result.user;
                console.log("registered user: "+user1);
                $("#status").html("");
                isLoggedIn(true);
            }else{
                //make this better to match bad password/bad username
                $("#status").html(result.status);
            }
        }
    };
   
    console.log("params sent");
    xmlHttp.send(params);
}

function addMessage(param) {
    console.log(param);
    if (param===""){
        return;
    }
    var xmlHttp = GetXmlHttpObject(); // local
    if (xmlHttp === null) {
        alert("Browser does not support HTTP Request");
        return;
    }
    
    var url = "add_message.php";
    url = url + "?message=" + param;
    xmlHttp.onreadystatechange = function() {
        if (xmlHttp.readyState === 4) {
            document.getElementById("2top").innerHTML = xmlHttp.responseText;
            document.messageForm.inputBox.value = "";
            //document.getElementById("inputBox").value = "";
            getMessage();
        }
    }; // anonymous function
    xmlHttp.open("GET", url, true); // arg1=GET/POST, arg2=url, arg3=isAsynchronous
    xmlHttp.send(null); // null is replaced with the body of POST
    window.scrollBy(0, 50);
}

function getMessage() {
    var xmlHttp = GetXmlHttpObject();
    if (xmlHttp === null) {
        alert("Browser does not support HTTP Request");
        return;
    }
    var url = "get_message.php";
    xmlHttp.onreadystatechange = function() {
        if (xmlHttp.readyState === 4) {
            document.getElementById("2top").innerHTML = xmlHttp.responseText;
        }
    };
    xmlHttp.open("GET", url, true); // arg1=GET/POST, arg2=url, arg3=isAsynchronous
    xmlHttp.send(null); // null is replaced with the body of POST
}

//get Geo Location
function getLocation() {
    if ("geolocation" in navigator) {
        /* geolocation is available */
        navigator.geolocation.getCurrentPosition(function(position) {
            lat = position.coords.latitude;
            lon = position.coords.longitude;
            console.log(lat);
            console.log(lon);
        });
    } else {
        /* geolocation IS NOT available */
        console.log("Geographical Location is Unavailable");
        console.log("For more local results, please turn on local");
    }
}

function initialize() {
    var mapCan = document.getElementById('mapCanvas');
    var mapOptions = {
        center: new google.maps.LatLng(44.5403, -78.5463),
        zoom: 8,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    var map = new google.maps.Map(mapCan, mapOptions);

}

function googleMap() {
    var myLocation = document.getElementById("mapCanvas");
    if (!navigator.geolocation) {
        location.innerHTML = "<p>Something went wrong, Geolocation Unsupported</p>";
        return;
    }

    function getMap(position) {
        var lat = position.coords.latitude;
        var lon = position.coords.longitude;

        myLocation.innerHTML = '<p>Latitude is ' + lat + '° <br>Longitude is ' + lon + '°</p>';

        var map = new Image();
        map.src = "https://maps.googleapis.com/maps/api/staticmap?center=" + lat + "," + lon + "&zoom=13&size=300x300&sensor=false";

        myLocation.appendChild(map);
    };
  
   
    
    function fail() {
        myLocation.innerHTML = "Sorry, I wasn't able to find you";
    };
    
    myLocation.innerHTML = "<p>Locating...</p>";
    navigator.geolocation.getCurrentPosition(getMap, fail);
 }


//wait for document to finish loading, then begin scripting
$(function() {
    $(document).ready(function() {
        if (user1===null){
            isLoggedIn(false);
        } else {
            isLoggedIn(true);
        }
        getLocation();
    });
});