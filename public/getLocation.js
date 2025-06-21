// getLocation.js
// Utility to get user's geolocation with better error handling (browser JS version)

function getUserLocation(callback, options) {
  if (!navigator.geolocation) {
    callback({
      success: false,
      error: 'Geolocation is not supported by this browser'
    });
    return;
  }

  var defaultOptions = {
    enableHighAccuracy: true,
    timeout: 10000,
    maximumAge: 3600000
  };
  var finalOptions = Object.assign({}, defaultOptions, options);

  navigator.geolocation.getCurrentPosition(
    function(position) {
      var lat = position.coords.latitude;
      var lng = position.coords.longitude;
      var locationUrl = 'https://maps.google.com/?q=' + lat + ',' + lng;
      callback({
        success: true,
        locationUrl: locationUrl
      });
    },
    function(error) {
      var errorMessage = 'Unknown error occurred';
      switch(error.code) {
        case error.PERMISSION_DENIED:
          errorMessage = 'User denied the request for Geolocation';
          break;
        case error.POSITION_UNAVAILABLE:
          errorMessage = 'Location information is unavailable';
          break;
        case error.TIMEOUT:
          errorMessage = 'The request to get user location timed out';
          break;
      }
      callback({
        success: false,
        error: errorMessage,
        errorCode: error.code
      });
    },
    finalOptions
  );
}
