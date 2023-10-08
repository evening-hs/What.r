"use client"
import { Inter } from 'next/font/google'
import { Loader } from "@googlemaps/js-api-loader"
import { useEffect } from 'react'

const inter = Inter({ subsets: ['latin'] });

export default function Map({ref = null, width = "100%", height = "100%", setPosition, ...props}) {
  
  useEffect(() => {
    const loader = new Loader({
      apiKey: "AIzaSyDLFcrcDKYa5Ofylt5oN5BpoLWocC1XHlw", // Reemplaza con tu clave de API de Google Maps
      version: "weekly"
    });
    
    loader.load().then(async () => {
      const { google } = window; // Accede al objeto google en el ámbito global
    
      const map = new google.maps.Map(document.getElementById("map"), {
        center: { lat: 20.6986, lng: -105.2965},
        zoom: 5,
      });

      let coords = map.getCenter();

      const marker = new google.maps.Marker({
          position: coords,
          map: map
      });

      map.addListener('click', function (event) {
          coords = event.latLng;
          marker.setPosition(coords);
          setPosition({lat: coords.lat(), lng: coords.lng()});
          //console.log("Coordinates at center:",coords.lat()," ",coords.lng());
      });
      setPosition({lat: coords.lat(), lng: coords.lng()});

    });
  }, []);  

  return (
    <>
      <main>
        <div class="center" id="map" style={{ width: height, height: height }}></div>
      </main>
    </>
  )
}
