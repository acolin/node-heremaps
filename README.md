[![Build Status](https://travis-ci.org/acolin/node-heremaps.svg?branch=master)](https://travis-ci.org/acolin/node-heremaps)
# Here Maps API for Node.js

Inspired by the [Google Maps API wrapper for Node.js](https://github.com/moshen/node-googlemaps)

This library implements the following Here Maps APIs.

* [REST API](https://developer.here.com/documentation)

### Installation

```
npm install node-heremaps
```

### What does it cover
[Maps API REST SERVICES](https://developer.here.com/documentation):

* [Geocoder](https://developer.here.com/rest-apis/documentation/geocoder/topics/resource-geocode.html)
* [Matrix Routing](https://developer.here.com/rest-apis/documentation/routing/topics/resource-calculate-matrix.html)

### Usage

```javascript
var config = {
  app_id:   '<YOUR-APP-ID>', // to use Google Maps for Work
  app_code: '<YOUR-APP-CODE>', // to use Google Maps for Work
};
var hmAPI = new HereMapsAPI(config);

// geocode API
var geocodeParams = {
  "searchtext":    "121, Curtain Road, EC2A 3AD, London UK"
};

hmAPI.geocode(geocodeParams, function(err, result){
  console.log(result);
});

// matrix routing API
var matrixRoutingParams = {
  start0: "25.6586716,-100.3583278",
  destination0: "25.6522234,-100.2942806",
  mode: "fastest;car;traffic:enabled;" //this mode is set by default
};

hmAPI.matrixRouting(matrixRoutingParams, function(err, result){
  console.log(result);
});
``` 

### Future Features & Roadmap

I'm planning on covering most of the [Here Maps REST API](https://developer.here.com/documentation) any help is appreciated!
