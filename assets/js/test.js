$(document).ready(function(){
  console.log("hello");

  //var output = document.getElementById("out");
  
  // writing lat long from input field to Firebase
  var coordId;
  var myDataRef = new Firebase('https://dodge-ball.firebaseio.com/');
  var myChildRef = myDataRef.child('coord');
  var latRef = myDataRef.child('latitude');
  var longRef = myDataRef.child('longitude');
  var latActVal ;
  var longActVal;
  $('#longInput').keypress(function (e) {
    if (e.keyCode == 13) {
      var lat = $('#latInput').val();
      var lng = $('#longInput').val();
      myChildRef.push(
        {latitude: lat, longitude: lng}
        );

      $('#longInput').val('');
      $('#latInput').val('');
    }
  });

 latRef.on('value',function(snapshot){
  var lat = snapshot.val();
  latActVal = lat;
  console.log("from latref:"+lat);

 });
 longRef.on('value',function(snapshot){
  
  var lng = snapshot.val();
  longActVal = snapshot.val();
  console.log("from lngref:"+lng);
 });

 console.log("outside from latref:"+latActVal);
 console.log("outside from lngref:"+longActVal);

 latActVal = "37.761874";
 longActVal = "-122.415012";

 var area = new google.maps.LatLng(latActVal, longActVal);
    
    var marker;
    var map;
    initialize();

    function initialize() {
      var mapOptions = {
        zoom: 13,
        center: area
      };

      map = new google.maps.Map(document.getElementById('map-canvas'),
              mapOptions);

      marker = new google.maps.Marker({
        map:map,
        draggable:true,
        animation: google.maps.Animation.DROP,
        position: area
      });
      google.maps.event.addListener(marker, 'click', toggleBounce);
    }

    function toggleBounce() {

      if (marker.getAnimation() != null) {
        marker.setAnimation(null);
      } else {
        marker.setAnimation(google.maps.Animation.BOUNCE);
      }
    }

    google.maps.event.addDomListener(window, 'load', initialize);

  myChildRef.on('child_added', function(snapshot) {
    console.log('h ')
    var lat = snapshot.val().latitude;
    var lng = snapshot.val().longitude;
    console.log("from childaded:"+lat);
    console.log("from childaded:"+lng);

    //var area = new google.maps.LatLng(lat, lng);
    var area = new google.maps.LatLng(latActVal, longActVal);
    
    var marker;
    var map;
    initialize();

    function initialize() {
      var mapOptions = {
        zoom: 13,
        center: area
      };

      map = new google.maps.Map(document.getElementById('map-canvas'),
              mapOptions);

      marker = new google.maps.Marker({
        map:map,
        draggable:true,
        animation: google.maps.Animation.DROP,
        position: area
      });
      google.maps.event.addListener(marker, 'click', toggleBounce);
    }

    function toggleBounce() {

      if (marker.getAnimation() != null) {
        marker.setAnimation(null);
      } else {
        marker.setAnimation(google.maps.Animation.BOUNCE);
      }
    }

    google.maps.event.addDomListener(window, 'load', initialize);




    // make Google API request here:
    /*output.innerHTML = '<p>Latitude is ' + lat + '° <br>Longitude is ' + lng + '°</p>';

    var img = new Image();
    img.src = "https://maps.googleapis.com/maps/api/staticmap?center=" + lat + "," + lng + "&zoom=13&size=300x300&sensor=false";

    output.appendChild(img);*/

  });


  // retrieve lat long from Firebase and send to Google Map API

    // Attach an asynchronous callback to read the data at our posts reference
    



  // function displayChatMessage(name, text) {
  //   $('<div/>').text(text).prepend($('<em/>').text(name+': ')).appendTo($('#messagesDiv'));
  //   $('#messagesDiv')[0].scrollTop = $('#messagesDiv')[0].scrollHeight;
  // };
});