import GoogleMapsAPI from "googlemaps";

const googleMapsApiKey = "AIzaSyBgKZZIlL3e4eQxPlmls23GaObu0yqCmUg";

const defaultConfig = {
  key: googleMapsApiKey,
  stagger_time: 1000, // for elevationPath
  encode_polylines: false,
  secure: true, // use https
  proxy: "http://127.0.0.1:3000", // optional, set a proxy for HTTP requests
};

const gmAPI = new GoogleMapsAPI(defaultConfig);
const home = { lat: -33.8620303, lng: 151.0697581 };

export const getLocations = (query) => {
  const geocodeParams = {
    address: query,
    language: "en",
    components: "country:AU|administrative_area:NSW",
  };

  return new Promise((resolve, reject) => {
    gmAPI.geocode(geocodeParams, (err, res) => {
      if (err) {
        return reject(err);
      }

      if (res.status === "OK" && res.results.length > 0) {
        const location = res.results[0].geometry.location;
        const p = getPositionToHome(home, location);
        const result = location;
        result.position = p;
        resolve(result);
      }
    });
  });
};

const getPositionToHome = (home, location) => {
  // const x = location.lng - centre.lng
  // const y = location.lat - centre.lat
  let position = "Unknown";
  const x = Math.cos(location.lat) * Math.sin(location.lng - home.lng);
  const y =
    Math.cos(home.lat) * Math.sin(location.lat) -
    Math.sin(home.lat) *
      Math.cos(location.lat) *
      Math.cos(location.lng - home.lng);

  const radians = Math.atan2(x, y);
  const degree = (radians * 180) / Math.PI;

  if (degree > -30 && degree < 30) {
    position = "North";
  } else if (degree <= -30 && degree >= -60) {
    position = "North East";
  } else if (degree < -60 && degree >= -120) {
    position = "East";
  } else if (degree < -120 && degree >= -150) {
    position = "South East";
  } else if (
    (degree < -150 && degree >= -180) ||
    (degree <= 180 && degree > 150)
  ) {
    position = "South";
  } else if (degree > 120 && degree <= 150) {
    position = "South West";
  } else if (degree > 60 && degree <= 120) {
    position = "West";
  } else if (degree >= 30 && degree <= 60) {
    position = "North West";
  }
  return position;
};

//const home = {lat: -33.8620303, lng: 151.0697581}
// const a = { lat: -33.9680116, lng: 151.1284326 }
