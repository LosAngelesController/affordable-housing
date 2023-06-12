// import type { NextPage } from 'next'
// import Head from 'next/head'
// import Image from 'next/image'
// import { Dialog, Transition } from '@headlessui/react'
// import { Fragment,createRef} from 'react'
// import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
// import MapboxLanguage from '@mapbox/mapbox-gl-language';

// import { uploadMapboxTrack } from '../components/mapboxtrack';

// import {CloseButton} from '../components/CloseButton'
// import Nav from '../components/nav'

// import React, {useEffect, useState, useRef} from 'react';
// import CouncilDist from "./CouncilDistricts.json";
// const councildistricts = require('./CouncilDistricts.json')
// const citybounds = require('./citybounds.json')
// import * as turf from '@turf/turf'

//     // added the following 6 lines.
//     import mapboxgl from 'mapbox-gl';

//        import { assertDeclareExportAllDeclaration } from '@babel/types';

// import {DisclaimerPopup} from '../components/Disclaimer'
// import { Checkbox } from '@mantine/core'

// function isTouchScreen() {
//   return window.matchMedia('(hover: none)').matches;
// }


// const Home: NextPage = () => {

//   let [disclaimerOpen, setDisclaimerOpen] = useState(false)
//   let [instructionsOpen, setInstructionsOpen] = useState(false)
//   const touchref = useRef<any>(null);
//   let [boxPrimed, setBoxPrimed] = useState(false)
//   let [houseClickedData, setHouseClickedData]:any = useState(null)
//   let [housingaddyopen,sethousingaddyopen] = useState(false);
//   var mapref:any = useRef(null);
//   const okaydeletepoints:any = useRef(null);
//   const [options, setOptions] = useState<any[]>([]);
//   const [selectedOption, setSelectedOption] = useState("");
//   const [optionsCd, setOptionsCd] = useState<any[]>([]);
//   const [selectAll, setSelectAll] = useState(false);
  

//   const councilDistricts = [
//    '1 - Gilbert Cedillo' ,
//    '2 - Paul Krekorian' ,
//    '3 - Bob Blumenfield' ,
//    '4 - Nithya Raman ' ,
//    '5 - Paul Koretz' ,
//    '6 - Nury Martinez ' ,
//    '7 - Monica Rodriguez ' ,
//    '8 - Marqueece Harris-Dawson ' ,
//    '9 - Curren D. Price Jr. ' ,
//     '10 - Office of District 10' ,
//     '11 - Mike Bonin ' ,
//      '12 - John Lee' ,
//      '13 - Mitch O Farrell' ,
//      '14 - Kevin de Leon' ,
//      '15 - Joe Buscaino' ,
//   ];

//    const [selectedfilteropened, setselectedfilteropened] = useState("CD#");
//    const [filteredcouncildistricts, setfilteredcouncildistricts] =
//    useState<string[]>([]);
//   //  console.log(filteredcouncildistricts)
//   //  console.log(optionsCd)
//   function closeModal() {
//     setDisclaimerOpen(false)
//   }

  

//   const setfilteredcouncildistrictspre = (event: any) => {
//     console.log(event)
//     // debugger
//    if(event == "Select All"){
//     // setfilteredcouncildistricts(event);
//     setSelectAll(!selectAll)
//    }else if(event == "sndk"){
   
    
//   mapref.current.setLayoutProperty("AffordableHousingCovenants-8zpehi", 'visibility', 'none');
//   mapref.current.setLayoutProperty("housing-layer", 'visibility', 'none');
//    }else{
//     const value = event;
//     setfilteredcouncildistricts(value);
//     const optionsC = CouncilDist.features.filter(
//       (feature) => value.includes(feature.properties.dist_name)
//     );
//     const coordinates = optionsC.map((option)=> option.geometry);
//     const filters = coordinates.map((coordinate) => ["within", coordinate]);

//     mapref.current.setFilter("housinglayer", ["any", ...filters]);
    
//    }
//   };


//   function sendAnalyticsData(props:any) {
    
//   }

//   function openModal() {
//     setDisclaimerOpen(true)
//   }

//   const closeHouseClickedPopup = () => {

//     console.log('mapref.current', mapref.current);
//     console.log('mapref.current.getSource selected-home-point', mapref.current.getSource('selected-home-point'));



//     var affordablepoint: any = mapref.current.getSource('selected-home-point')
//         affordablepoint.setData(null);

        
//     mapref.current.setLayoutProperty("points-affordable-housing", 'visibility', 'none');
//     sethousingaddyopen(false);
//     if (mapref) {
//       if (mapref.current) {
//         var affordablepoint: any = mapref.current.getSource('selected-home-point')
//         affordablepoint.setData(null);
//       } else {
//         console.log('no current ref')
//       }
//     }else {
//       console.log('no ref')
//     }

//    if ( okaydeletepoints.current) {
//     okaydeletepoints.current()
//    }
   
//   }

//   const closeHousingPopup = () => {
//     setInstructionsOpen(false)
//   }

//   var [hasStartedControls, setHasStartedControls] = useState(false)

//   function getRadius():any {
//     if (window.innerWidth < 640) {
//       return [
//         "interpolate",
//         ["linear"],
//         ["zoom"],
//         0.66,
//         [
//           "interpolate",
//           ["linear"],
//           [
//             "to-number",
//             [
//               "get",
//               "Affordable Units"
//             ]
//           ],
//           0,
//           2,
//           1000,
//           10
//         ],
//         6.924,
//         [
//           "interpolate",
//           ["linear"],
//           [
//             "to-number",
//             [
//               "get",
//               "Affordable Units"
//             ]
//           ],
//           0,
//           2.5,
//           1000,
//           60
//         ],
//         9.882,
//         [
//           "interpolate",
//           ["linear"],
//           [
//             "to-number",
//             [
//               "get",
//               "Affordable Units"
//             ]
//           ],
//           0,
//           2.2,
//           1000,
//           75
//         ],
//         11.312,
//         [
//           "interpolate",
//           ["linear"],
//           [
//             "to-number",
//             [
//               "get",
//               "Affordable Units"
//             ]
//           ],
//           0,
//           4,
//           1000,
//           80
//         ],
//         14,
//         [
//           "*",
//           [
//             "interpolate",
//             ["linear"],
//             [
//               "to-number",
//               [
//                 "get",
//                 "Affordable Units"
//               ]
//             ],
//             0,
//             4,
//             1000,
//             80
//           ],
//           1.2
//         ],
//         18,
//         [
//           "*",
//           [
//             "interpolate",
//             ["linear"],
//             [
//               "to-number",
//               [
//                 "get",
//                 "Affordable Units"
//               ]
//             ],
//             0,
//             6,
//             2000,
//             80
//           ],
//           4
//         ]
//       ]
//     } else {
//       return [
//         "interpolate",
//         ["linear"],
//         ["zoom"],
//         0.66,
//         [
//           "interpolate",
//           ["linear"],
//           [
//             "to-number",
//             [
//               "get",
//               "Affordable Units"
//             ]
//           ],
//           0,
//           3,
//           1000,
//           30
//         ],
//         6.924,
//         [
//           "interpolate",
//           ["linear"],
//           [
//             "to-number",
//             [
//               "get",
//               "Affordable Units"
//             ]
//           ],
//           0,
//           2.5,
//           1000,
//           50
//         ],
//         9.882,
//         [
//           "interpolate",
//           ["linear"],
//           [
//             "to-number",
//             [
//               "get",
//               "Affordable Units"
//             ]
//           ],
//           0,
//           2.5,
//           1000,
//           60
//         ],
//         11.312,
//         [
//           "interpolate",
//           ["linear"],
//           [
//             "to-number",
//             [
//               "get",
//               "Affordable Units"
//             ]
//           ],
//           0,
//           4,
//           1000,
//           80
//         ],
//         14,
//         [
//           "*",
//           [
//             "interpolate",
//             ["linear"],
//             [
//               "to-number",
//               [
//                 "get",
//                 "Affordable Units"
//               ]
//             ],
//             0,
//             4,
//             1000,
//             80
//           ],
//           1.2
//         ],
//         18,
//         [
//           "*",
//           [
//             "interpolate",
//             ["linear"],
//             [
//               "to-number",
//               [
//                 "get",
//                 "Affordable Units"
//               ]
//             ],
//             0,
//             6,
//             2000,
//             80
//           ],
//           4
//         ],
//         25,
//         [
//           "*",
//           [
//             "interpolate",
//             ["linear"],
//             [
//               "to-number",
//               [
//                 "get",
//                 "Affordable Units"
//               ]
//             ],
//             0,
//             6,
//             2000,
//             80
//           ],
//           4
//         ]
//       ]
//     }
//   }

//   function checkHideOrShowTopRightGeocoder() {
//     var toprightbox = document.querySelector(".mapboxgl-ctrl-top-right")
//    if (toprightbox) {
//     var toprightgeocoderbox:any = toprightbox.querySelector(".mapboxgl-ctrl-geocoder");
//     if (toprightgeocoderbox) {
//       if (window.innerWidth >= 768) {
//         console.log('changing to block')
//         toprightgeocoderbox.style.display = 'block'
//       } else {
//         toprightgeocoderbox.style.display = 'none'
//         console.log('hiding')
//       }
//     }
//    }
//   }

//   const handleResize = () => {
//     checkHideOrShowTopRightGeocoder()

  
//   }

//   const divRef:any = React.useRef<HTMLDivElement>(null);

//   useEffect(() => {
//         console.log('map div', divRef)

//         if (divRef.current) {
//           console.log('app render')
//         }

//        // mapboxgl.workerClass = require('worker-loader!mapbox-gl/dist/mapbox-gl-csp-worker').default;
// //import locations from './features.geojson'

// mapboxgl.accessToken = 'pk.eyJ1Ijoia2VubmV0aG1lamlhIiwiYSI6ImNsZG1oYnpxNDA2aTQzb2tkYXU2ZWc1b3UifQ.PxO_XgMo13klJ3mQw1QxlQ';
 
// const formulaForZoom = () => {
//   if (window.innerWidth > 700) {
//     return 10
//   } else { 
//     return 9.1
//   }
// }

// const urlParams = new URLSearchParams(window.location.search);
// const latParam = urlParams.get('lat');
// const lngParam = urlParams.get('lng');
// const zoomParam = urlParams.get('zoom');
// const debugParam = urlParams.get('debug');

// var mapparams:any = {
//   container: divRef.current, // container ID
 
//   style: 'mapbox://styles/kennethmejia/clhqigqkf00bv01rf27jdg7jm', // style URL
//   //mapbox://styles/comradekyler/cl5c3eukn00al15qxpq4iugtn
 
//   center: [-118.41,34], // starting position [lng, lat]
//   zoom: formulaForZoom() // starting zoom
// }



// const map = new mapboxgl.Map(mapparams);
// mapref.current = map;

// var rtldone=false;



// try {
// if (rtldone  === false && hasStartedControls === false) {
//   setHasStartedControls(true)
//   //multilingual support
// //right to left allows arabic rendering
// mapboxgl.setRTLTextPlugin('https://api.mapbox.com/mapbox-gl-js/plugins/mapbox-gl-rtl-text/v0.10.1/mapbox-gl-rtl-text.js', (callbackinfo:any) => {
//   console.log(callbackinfo);
//   rtldone = true;
// });
// }

// const language = new MapboxLanguage();
// map.addControl(language);

// }



// catch (error) {
//   console.error(error)
// }



// window.addEventListener('resize',  handleResize);  

// map.on('load', () => {

//   okaydeletepoints.current = () => {
//     try {
//       var affordablepoint: any = map.getSource('selected-home-point')
//       affordablepoint.setData(null)
//     } catch(err) {
//       console.error(err)
//     }
//   }

//   const processgeocodereventresult = (eventmapbox:any) => {
//     var singlePointSet:any = map.getSource('single-point');
  
  
//     singlePointSet.setData({
//       "type": "FeatureCollection",
//       "features": [{
//       "type": "Feature",
//       "geometry": eventmapbox.result.geometry
//       }]
//       });
    
//     console.log('event.result.geometry',eventmapbox.result.geometry)
//     console.log('geocoderesult', eventmapbox)
//   }
  
//   const processgeocodereventselect = (object:any) => {
  
      
//     var coord = object.feature.geometry.coordinates;
//     var singlePointSet:any = map.getSource('single-point');
   
//     singlePointSet.setData({
//       "type": "FeatureCollection",
//       "features": [{
//       "type": "Feature",
//       "geometry": object.feature.geometry
//       }]
//       });
   
//   }
  
//   const geocoderoptions: any = {
//     accessToken: mapboxgl.accessToken,
//     mapboxgl: map,
//     proximity: {
//       longitude: -118.41,
//       latitude: 34
//     },
//     marker: true
//     }

//   const geocoder:any = new MapboxGeocoder(geocoderoptions);
  
//     var colormarker = new mapboxgl.Marker({
//       color: '#41ffca'
//     });
  
//     const geocoderopt:any = 
//       {
//         accessToken: mapboxgl.accessToken,
//         mapboxgl: mapboxgl,
//         marker: {
//           color: '#41ffca'
//         }
//         }
    
  
//     const geocoder2 = new MapboxGeocoder(geocoderopt);
//     const geocoder3 = new MapboxGeocoder(geocoderopt);
  
  
   
       
//   geocoder.on('result', (event:any) => {
//     processgeocodereventresult(event)
//   });
  
//   geocoder.on('select', function(object:any){
//     processgeocodereventselect(object)
//   });
  
//   var geocoderId = document.getElementById('geocoder')
  
  
  
//   if (geocoderId) {
//     console.log(
//     'geocoder div found'
//     )
  
//     if (!document.querySelector(".geocoder input")) {
//       geocoderId.appendChild(geocoder3.onAdd(map));
  
//       var inputMobile = document.querySelector(".geocoder input");
  
//       try {
//         var loadboi =  document.querySelector('.mapboxgl-ctrl-geocoder--icon-loading')
//         if (loadboi) {
//           var brightspin:any = loadboi.firstChild;
//        if (brightspin) {
//         brightspin.setAttribute('style', 'fill: #e2e8f0');
//        }
//        var darkspin:any = loadboi.lastChild;
//        if (darkspin) {
//         darkspin.setAttribute('style', 'fill: #94a3b8');
//        }
//         }
       
//       } catch (err) {
//         console.error(err)
//       }
    
//       if (inputMobile) {
//         inputMobile.addEventListener("focus", () => {
//           //make the box below go away
         
//           });
//       }
//     }
  
  
  
   
//   geocoder2.on('result', (event:any) => {
//     processgeocodereventresult(event)
//   });
  
//   geocoder2.on('select', function(object:any){
//     processgeocodereventselect(object)
//   });
  
//   geocoder3.on('result', (event:any) => {
//     processgeocodereventresult(event)
//   });
  
//   geocoder3.on('select', function(object:any){
//     processgeocodereventselect(object)
//   });
//   }
  

//   map.addSource('single-point', {
//     type: 'geojson',
//     data: {
//       type: 'FeatureCollection',
//       features: []
//     }
//   });
  
//   map.addLayer({
//     id: 'point',
//     source: 'single-point',
//     type: 'circle',
//     paint: {
//       'circle-radius': 10,
//       'circle-color': '#41ffca'
//     }
//   });
  

//   if (debugParam) {
//     map.showTileBoundaries = true;
//     map.showCollisionBoxes = true;
//     map.showPadding = true;
//   }

//   if (urlParams.get('terraindebug')) {

//     map.showTerrainWireframe = true;
//   }
 
//   map.addSource('housingvector', {
//     'type': 'vector',
//     'url': 'mapbox://kennethmejia/clhqigqkf00bv01rf27jdg7jm'
//     });

// map.addLayer({
//   'id': 'housinglayer',
//   'type': 'circle',
//   'source': 'housingvector',
//   'source-layer': 'kennethmejia.af29p9xh',
//   'paint': {
//     'circle-color': [
//       "case",
//       [">", ["to-number", ["get", "% of Affordable"]], 0.9],
//       "#41ffca",
//       "#ffc021"
//     ],
//     'circle-radius': getRadius(),
//     'circle-pitch-scale': "viewport",
//     'circle-pitch-alignment': "viewport",
//     'circle-stroke-width': [
//       "interpolate",
//       ["linear"],
//       ["zoom"],
//       5,
//       1.2,
//       8,
//       1.7,
//       17,
//       1.8
//     ],
//     'circle-stroke-color': "#111111"
//   }
// });


//       // Create a popup, but don't add it to the map yet.
// const popup = new mapboxgl.Popup({
//   closeButton: false,
//   closeOnClick: false
//   });

//   map.addSource('selected-home-point', {
//     type: 'geojson',
//     data: {
//       type: 'FeatureCollection',
//       features: []
//     }
//   });

//   map.addLayer({
//     id: 'selected-affordable-housing-point',
//     source: 'selected-home-point',
//     type: 'circle',
//     paint: {
//       'circle-radius': 5,
//       'circle-color': '#f0abfc',
//       'circle-opacity': 0.1
//     }
//   });

//   map.loadImage(
//     '/map-marker.png',
//     (error, image:any) => {
//     if (error) throw error;
     
//     // Add the image to the map style.
//     map.addImage('map-marker', image);

//   map.addLayer({
//     'id': 'points-affordable-housing',
//     'type': 'symbol',
//     'source': 'selected-home-point',
//     'paint': {
//    'icon-color': "#f0abfc",
//    "icon-translate": [0, -13]
//     },
//     'layout': {
//    'icon-image': 'map-marker',
//     // get the title name from the source's "title" property
//     'text-allow-overlap': true,
//     "icon-allow-overlap": true,
//     'icon-ignore-placement': true,
//     'text-ignore-placement': true,
    
//    'icon-size': 0.4,
//    "icon-text-fit": 'both',
//     },
//     });
//   });

//   map.on('mousedown', 'housinglayer', (e:any) => {
//     setHouseClickedData(e.features[0]);
//     sethousingaddyopen(true);
//     var affordablepoint: any = map.getSource('selected-home-point')
//     affordablepoint.setData(e.features[0].geometry);
    
//     map.setLayoutProperty("points-affordable-housing", 'visibility', 'visible');
//   })

//   map.on('touchstart', 'housinglayer', (e:any) => {
//     popup.remove();
//     touchref.current = {
//       lngLat: e.lngLat,
//       time: Date.now()
//     }
//   })
   
//   map.on('mousemove', 'housinglayer', (e:any) => {

//     var isntblockedfrompopup = true;

//     if (touchref) {
//       if (touchref.current) {
//         if (touchref.current.time === Date.now() &&
//          touchref.current.lngLat.lng === e.lngLat.lng
//           && touchref.current.lngLat.lat === e.lngLat.lat) {
//           console.log('time is same, block');
//           isntblockedfrompopup = false;
//         }
//       }
//     }

//     if (window.innerWidth < 700 || window.innerHeight < 700) {
//         isntblockedfrompopup = false;
//     }

//     if (isntblockedfrompopup) {
//       if (window.matchMedia("(any-hover: none)").matches) {
//         console.log(
//           'no hover'
//         )
//       } else {
//         // device supports hovering
//           // Change the cursor style as a UI indicator.
//     map.getCanvas().style.cursor = 'pointer';
     
//     // Copy coordinates array.
//     const coordinates = e.features[0].geometry.coordinates.slice();
//     const description = `<b>Address</b> ${e.features[0].properties["Address"]}<br><b>Zip Code</b> ${e.features[0].properties["Zip Code"]}<br>
//     <b>Council District</b> ${e.features[0].properties["CD#"]}<br>
//     <b>${e.features[0].properties["Affordable Units"]}</b> Affordable Units<br>
//     <b>${e.features[0].properties["Total Units"]}</b> Total Units<br>
//     <b>Covenant Year</strong> ${e.features[0].properties["Year of Covenant"]}
//     ${e.features[0].properties["Certificate of Occupancy"] ? `<br><b> Certificate of Occupancy</b> ${e.features[0].properties["Certificate of Occupancy"]}` : `<br><b> Certificate of Occupancy</b> Not in Data`}
//     <br><strong>Type</strong> ${e.features[0].properties["Type"] ? `${e.features[0].properties["Type"]}` : "None"}
//     <br><strong>Type2</strong> ${e.features[0].properties["Type2"] ? `${e.features[0].properties["Type2"]}` : "None"}<br><b>Click for more info.</b>;
  
//     <div>
//     ${e.features[0].properties["AH Studio Unit #"] ? 
//       `<div><strong>AH Studio Unit #</strong> ${e.features[0].properties["AH Studio Unit #"]}</div>` : ""}
//   </div>
//   <div>
//     ${e.features[0].properties["AH 1BR Unit #"] ? 
//       `<div><strong>AH 1BR Unit #</strong>${e.features[0].properties["AH 1BR Unit #"]}</div>` : ""}
//   </div>
//   <div>
//     ${e.features[0].properties["AH 2BR Unit #"] ? 
//       `<div><strong>AH 2BR Unit #</strong>${e.features[0].properties["AH 2BR Unit #"]}</div>` : ""}
//   </div>
//   <div>
//     ${e.features[0].properties["AH 3BR Unit #"] ? 
//       `<div><strong>AH 3BR Unit #</strong>${e.features[0].properties["AH 3BR Unit #"]}</div>` : ""}
//   </div>
//   <div>
//     ${e.features[0].properties["AH 4BR Unit #"] ? 
//       `<div><strong>AH 4BR Unit #</strong>${e.features[0].properties["AH 4BR Unit #"]}</div>` : ""}
//   </div>
//   <div>
//     ${e.features[0].properties["AH 5BR Unit #"] ? 
//       `<div><strong>AH 5BR Unit #</strong>${e.features[0].properties["AH 5BR Unit #"]}</div>` : ""}
//   </div>
//   <div>
//     ${e.features[0].properties["AH 6BR Unit #"] ? 
//       `<div><strong>AH 6BR Unit #</strong>${e.features[0].properties["AH 6BR Unit #"]}</div>` : ""}
//   </div>
//   `;

//   //console.log(e.features)
  
//     // Ensure that if the map is zoomed out such that multiple
//     // copies of the feature are visible, the popup appears
//     // over the copy being pointed to.
//     while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
//     coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
//     }
     
//     // Populate the popup and set its coordinates
//     // based on the feature found.
//     popup.setLngLat(coordinates).setHTML(description).addTo(map);
//       }
//     }
  

//   });
   
//   map.on('mouseleave', 'housinglayer', () => {
//   map.getCanvas().style.cursor = '';
//   popup.remove();
//   });

// if (! document.querySelector(".mapboxgl-ctrl-top-right > .mapboxgl-ctrl-geocoder")) {
//   map.addControl(
//     geocoder2
//     ); 
// }

//  checkHideOrShowTopRightGeocoder()

//  if (true) {
//   map.addLayer({
//     id: 'citybound',
//     type: 'line',
//     source: {
//       type: 'geojson',
//       data:  citybounds
//     },
//     paint: {
//       "line-color": '#fff',
//       'line-opacity': 1,
//       'line-width': 3
//     }
//   })

//   map.addLayer({
//     id: 'cityboundfill',
//     type: 'fill',
//     source: {
//       type: 'geojson',
//       data:  citybounds
//     },
//     paint: {
//       'fill-color': '#dddddd',
//       'fill-opacity': 0.02
//     }
//   })
// }

// if ( hasStartedControls === false ) {
//   // Add zoom and rotation controls to the map.
// map.addControl(new mapboxgl.NavigationControl());
     
// // Add geolocate control to the map.
// map.addControl(
//   new mapboxgl.GeolocateControl({
//   positionOptions: {
//   enableHighAccuracy: true
//   },
//   // When active the map will receive updates to the device's location as it changes.
//   trackUserLocation: true,
//   // Draw an arrow next to the location dot to indicate which direction the device is heading.
//   showUserHeading: true
//   }) 
// );
// }


//   checkHideOrShowTopRightGeocoder()
// });

// var getmapboxlogo:any = document.querySelector('.mapboxgl-ctrl-logo')

// if (getmapboxlogo) {
//   getmapboxlogo.remove()
// }



// var mapname = 'housingv2'



         

//   }, [selectAll])
// useEffect(()=>{
//     const optionsCd = CouncilDist.features.map(
//         (feature) => feature.properties.dist_name
//       );
//       setOptionsCd(optionsCd);
//       setfilteredcouncildistricts(optionsCd)
// }, [])
//   return (
  
//   <div className='flex flex-col h-screen w-screen absolute'>
//       <Head>
//       <script src="https://cdn-1bo.pages.dev/newrelicmainsite.js" async></script>
//       <link rel="icon" href="https://mejiaforcontroller.com/wp-content/uploads/2020/12/cropped-favicon-1-32x32.png" sizes="32x32"/>
// <link rel="icon" href="https://mejiaforcontroller.com/wp-content/uploads/2020/12/cropped-favicon-1-192x192.png" sizes="192x192"/>
// <link rel="apple-touch-icon" href="https://mejiaforcontroller.com/wp-content/uploads/2020/12/cropped-favicon-1-180x180.png"/> 
// <meta name="msapplication-TileImage" content="https://mejiaforcontroller.com/wp-content/uploads/2020/12/cropped-favicon-1-270x270.png"/>


//      <meta charSet="utf-8" />
// <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no"/>
// <title>Affordable Housing Covenants - 1985 to 2022 | Map</title>
//       <meta property="og:type" content="website"/>
//       <meta name="twitter:site" content="@lacontroller" />
//         <meta name="twitter:creator" content="@lacontroller" />
// <meta name="twitter:card" content="summary_large_image"/>
//     <meta name="twitter:title" key='twittertitle' content="Affordable Housing Covenants - 1985 to 2022 | Map"></meta>
// <meta name="twitter:description"  key='twitterdesc' content="Browse and Search Affordable Housing in Los Angeles  with instructions to apply."></meta>
//       <meta name="twitter:image" key='twitterimg' content="https://data.mejiaforcontroller.com/affordablehousingpic.png"></meta>
//       <meta name="twitter:image:alt" content="Where is LA's Affordable Housing? | Kenneth Mejia for LA City Controller" />
//       <meta name="description" content="A Map of Affordable Housing in Los Angeles. Find Housing near you. Instructions to apply." />

//       <meta property="og:url"                content="https://affordablehousing.mejiaforcontroller.com/" />
// <meta property="og:type"               content="website" />
// <meta property="og:title"              content="Affordable Housing Covenants - 1985 to 2022 | Map" />
// <meta property="og:description"        content="Browse and Search Affordable Housing in Los Angeles with instructions to apply." />
// <meta property="og:image"              content="https://data.mejiaforcontroller.com/affordablehousingpic.png" />


//       </Head>
   

//   <div className='flex-none'>
//     <Nav/>
//   </div>

//   <div
//       className='flex-initial h-content flex-col flex z-50'
//     >

// <div
//       className='absolute mt-[3.8em] md:[3.8em] md:ml-3 top-0 left-1 max-h-screen flex-col flex z-5'
//     >
//   <div className='titleBox  text-sm bold md:text-base break-words bg-gray-100'>Affordable Housing Covenants - 1985 to 2022</div>

//   <div
//     className={`geocoder mt-0 left-0  md:hidden xs:text-sm sm:text-base md:text-lg`} id='geocoder'></div>

// <div>
// <div className="bg-zinc-900 w-content bg-opacity-90 px-2 py-1 mt-1 sm:rounded-lg">
//        <button
//                     onClick={() => {
//                       setselectedfilteropened("cd");
//                     }}
//                     className={`px-2 border-b-2 py-1 font-semibold ${
//                       selectedfilteropened === "cd"
//                         ? "border-[#41ffca] text-[#41ffca]"
//                         : "hover:border-white border-transparent text-gray-50"
//                     }`}
//                   >
//                     CD #
//                   </button>
 
//   {selectedfilteropened === "cd" && (
//                     <>
//                       <div className="pl-5 pr-2 py-2">
//                       <button
//                             className="align-middle text-white rounded-lg px-1  border border-gray-400 text-sm md:text-base"
//                             onClick={() => {
                             
//                               setfilteredcouncildistricts(optionsCd.map((option)=> option));
//                               setfilteredcouncildistrictspre("Select All");
//                             }}
//                           >
//                             Select All
//                           </button><br></br>
                        
                         
//                       <Checkbox.Group
//                             value={filteredcouncildistricts}
//                             onChange={setfilteredcouncildistrictspre}
                            
//                           >
//                             {" "}
//                             <div
//                               className={`grid grid-cols-3 gap-x-4 `}
//                             >
//                               {optionsCd.map(
//                                 (eachEntry) => (
//                                   <Checkbox
//                                     id={eachEntry}
//                                     value={eachEntry}
//                                     label={<span className="text-nowrap text-xs">
//                                     <span className="text-white">
//                                     {eachEntry}
//                                     </span>
//                                   </span>}
//                                     key={eachEntry}
                                   
//                                     onChange={setfilteredcouncildistrictspre}
                                   
//                                   />
//                                 )
//                               )}
//                             </div>
//                           </Checkbox.Group>
//                       </div>
//                     </>
//                   )}
//                     </div>
// <button
          
//           onClick={() => {
//            setInstructionsOpen(true)
//           }}
//         className={`mt-1.5 rounded-full px-3 pb-1.5 pt-0.5 text-sm bold md:text-base bg-[#212121] bg-opacity-95 text-white border-white border-2 w-content ${instructionsOpen ? 'hidden': ''}`}><span className='my-auto align-middle w-content'>
       

//           Instructions to get Housing</span></button>
// </div>


// <div className={`${instructionsOpen ? '' : 'hidden'} max-w-sm bg-[#212121] text-white mt-2 border-gray-400 border-2 rounded-xl px-2 py-1 relative`}>



// <h2 className={`font-medium`}>Instructions to get Housing</h2>
// <CloseButton
//         onClose={closeHousingPopup}
//         />
// <p className='text-sm'>
// 1) Use Google to search the address of the location<br/>
// 2) See if it&apos;s built<br/>
// 3) Get contact information<br/>
// 4) Call landlord or property manager and tell them that you saw that the LA Housing Dept shows X amount of units for low income housing at this location<br/>
// 5) Ask them if they have any availability<br/>
// 6) Ask for application to apply<br/>
// </p>
// </div>

// <div className={`text-sm ${housingaddyopen ? `px-3 pt-2 pb-3 fixed sm:relative 

//  top-auto bottom-0 left-0 right-0
//   w-full sm:static sm:mt-2 sm:w-auto 
//   sm:top-auto sm:bottom-auto sm:left-auto 
//   sm:right-auto bg-[#212121] sm:rounded-xl 
//    bg-opacity-90 sm:bg-opacity-80 text-white 
//    border-t-2 border-gray-200 sm:border sm:border-gray-400
  
   
//    ` : 'hidden'}`}>
// <CloseButton
//         onClose={() => {closeHouseClickedPopup();
        
//          if (mapref.current) {
//           var affordablepoint: any = mapref.current.getSource('selected-home-point')
//           if (affordablepoint) {
//            affordablepoint.setData(null);
//           } 
//          }else {
//           console.log('no ref current')   
//         }
//         }}
//         />
// {
//   houseClickedData && (
//     houseClickedData.properties && (
//     <>
//       <p className='pr-4'>
//  <b>Address</b> {houseClickedData.properties["Address"]}
 
//  {

//   window.innerHeight > 500 && (
//    <>
//     <br/><b>Zip Code</b> 
//     </>
//   )
//  }
 
//  <span>  </span>{houseClickedData.properties["Zip Code"]}<br/>

//       </p>

//     <p>
         
   
// <b>Council District</b> {houseClickedData.properties["CD#"]}<br/>
// <b>{houseClickedData.properties["Affordable Units"]}</b> Affordable Units
// {

// window.innerHeight > 500 && (
//  <>
//   <br/>
//   </>
// )
// }
// {

// window.innerHeight <= 500 && (
//  <>
//   <span> </span>
//   </>
// )
// }
// <b>{houseClickedData.properties["Total Units"]}</b> Total Units<br/>
// <strong>Covenant Year</strong> {houseClickedData.properties["Year of Covenant"]}
// <br/><b> Certificate of Occupancy </b>
// {
//   houseClickedData.properties["Certificate of Occupancy"] && (
//     houseClickedData.properties["Certificate of Occupancy"]
//   )
// }
// {
//   !(houseClickedData.properties["Certificate of Occupancy"]) && (
//     "Not in Data"
//   )
// }
// <div>{houseClickedData.properties["Type"] ? <div><strong>Type</strong> {houseClickedData.properties["Type"]}</div>: ""}</div>
// <div>{houseClickedData.properties["Type2"] ? <div><strong>Type2</strong> {houseClickedData.properties["Type2"]}</div>: ""}</div>
// <div>{houseClickedData.properties["AH Studio Unit #"] ? <div><strong>AH Studio Unit #</strong> {houseClickedData.properties["AH Studio Unit #"]}</div>: ""}</div>
// <div>{houseClickedData.properties["AH 1BR Unit #"] ? <div><strong>AH 1BR Unit #</strong>{houseClickedData.properties["AH 1BR Unit #"]}</div> : ""}</div>
// <div>{houseClickedData.properties["AH 2BR Unit #"] ? <div><strong>AH 2BR Unit #</strong>{houseClickedData.properties["AH 2BR Unit #"]}</div> : ""}</div>
// <div>{houseClickedData.properties["AH 3BR Unit #"] ? <div><strong>AH 3BR Unit #</strong>{houseClickedData.properties["AH 3BR Unit #"]}</div> : ""}</div>
// <div>{houseClickedData.properties["AH 4BR Unit #"] ? <div><strong>AH 4BR Unit #</strong>{houseClickedData.properties["AH 4BR Unit #"]}</div> : ""}</div>
// <div>{houseClickedData.properties["AH 5BR Unit #"] ? <div><strong>AH 5BR Unit #</strong>{houseClickedData.properties["AH 5BR Unit #"]}</div> : ""}</div>
// <div>{houseClickedData.properties["AH 6BR Unit #"] ? <div><strong>AH 6BR Unit #</strong>{houseClickedData.properties["AH 6BR Unit #"]}</div> : ""}</div>
// <div>{houseClickedData.properties["AH 2BR Unit #"] ? <div><strong>AH 2BR Unit #</strong>{houseClickedData.properties["AH 2BR Unit #"]}</div> : ""}</div>
// <div>{houseClickedData.properties["AH 2BR Unit #"] ? <div><strong>AH 2BR Unit #</strong>{houseClickedData.properties["AH 2BR Unit #"]}</div> : ""}</div>


// <br/> 

// <a  target="_blank"   rel="noreferrer" className='mt-2 sm:mt-3 rounded-full px-2 pb-1 pt-0.5 text-white bg-blue-500' href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${houseClickedData.properties["Address"]} ${houseClickedData.properties["Zip Code"]}`)}`}>View on Google Maps</a>
// </p>
//     </>
//     )

//   )
// }
  



// </div>

// </div>



// </div>

// <div ref={divRef} style={{

// }} className="map-container w-full h-full " />
        
     
      
//  {(housingaddyopen === false || window.innerWidth >= 640) && (
//    <>

//    <div className={`absolute md:mx-auto z-9 bottom-2 left-1 md:left-1/2 md:transform md:-translate-x-1/2`}>
// <a href='https://controller.lacity.gov/' target="_blank" rel="noreferrer">
  
//     <img src='https://controller.lacity.gov/images/KennethMejia-logo-white-elect.png' className='h-9 md:h-10 z-40' alt="LA City Controller Logo"/>

                  

               
                  
//     </a> 
//                 </div>
//    </>
  
//   )}
             

               

//     </div>
//   )
// }

// export default Home;
import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import { Dialog, Transition } from '@headlessui/react'
import { Fragment,createRef} from 'react'
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
import MapboxLanguage from '@mapbox/mapbox-gl-language';

import { uploadMapboxTrack } from '../components/mapboxtrack';

import {CloseButton} from '../components/CloseButton'
import Nav from '../components/nav'

import React, {useEffect, useState, useRef} from 'react';
import CouncilDist from "./CouncilDistricts.json";
const councildistricts = require('./CouncilDistricts.json')
const citybounds = require('./citybounds.json')
import * as turf from '@turf/turf'

    // added the following 6 lines.
    import mapboxgl from 'mapbox-gl';

       import { assertDeclareExportAllDeclaration } from '@babel/types';

import {DisclaimerPopup} from '../components/Disclaimer'
import { Checkbox } from '@mantine/core'

function isTouchScreen() {
  return window.matchMedia('(hover: none)').matches;
}

const Home: NextPage = () => {

  let [disclaimerOpen, setDisclaimerOpen] = useState(false)
  let [instructionsOpen, setInstructionsOpen] = useState(false)
  const touchref = useRef<any>(null);
  let [houseClickedData, setHouseClickedData]:any = useState(null)
  let [housingaddyopen,sethousingaddyopen] = useState(false);
  var mapref:any = useRef(null);
  const okaydeletepoints:any = useRef(null);
  const [options, setOptions] = useState<any[]>([]);
  const [optionsCd, setOptionsCd] = useState<any[]>([]);
  const [selectAll, setSelectAll] = useState(false);
  const [filterRange, setFilterRange] = useState(null);
  const [selectedfilteropened, setselectedfilteropened] = useState("CD#");
  const [filteredcouncildistricts, setfilteredcouncildistricts] =
   useState<string[]>([]);
// console.log(houseClickedData);

const handleToggleFilter = (range: any)=> {
  if (range === filterRange) {
    setFilterRange(null); // Reset the filter if the same range is clicked again
  } else {
    setFilterRange(range);
  }
};

  // const handleToggleFilter = range => {
  //   if (range === filterRange) {
  //     setFilterRange(null); // Reset the filter if the same range is clicked again
  //   } else {
  //     setFilterRange(range);
  //   }
  // };

  const setfilteredcouncildistrictspre = (event: any) => {
    // console.log(event)
    // debugger
   if(event == "Select All"){
    // setfilteredcouncildistricts(event);
    setSelectAll(!selectAll)
   }else if(event == "sndk"){
   
    
  mapref.current.setLayoutProperty("AffordableHousingCovenants-8zpehi", 'visibility', 'none');
  mapref.current.setLayoutProperty("housing-layer", 'visibility', 'none');
   }else{
    const value = event;
    setfilteredcouncildistricts(value);
    const optionsC = CouncilDist.features.filter(
      (feature) => value.includes(feature.properties.dist_name)
    );
    const coordinates = optionsC.map((option)=> option.geometry);
    const filters = coordinates.map((coordinate) => ["within", coordinate]);

    mapref.current.setFilter("housinglayer", ["any", ...filters]);
    
   }
  };

  const closeHouseClickedPopup = () => {
    var affordablepoint: any = mapref.current.getSource('selected-home-point')
        affordablepoint.setData(null);   
    mapref.current.setLayoutProperty("points-affordable-housing", 'visibility', 'none');
    sethousingaddyopen(false);
    if (mapref) {
      if (mapref.current) {
        var affordablepoint: any = mapref.current.getSource('selected-home-point')
        affordablepoint.setData(null);
      } else {
        console.log('no current ref')
      }
    }else {
      console.log('no ref')
    }

   if ( okaydeletepoints.current) {
    okaydeletepoints.current()
   }
   
  }

  const closeHousingPopup = () => {
    setInstructionsOpen(false)
  }

  var [hasStartedControls, setHasStartedControls] = useState(false)

  function getRadius():any {
    if (window.innerWidth < 640) {
      return [
        "interpolate",
        ["linear"],
        ["zoom"],
        0.66,
        [
          "interpolate",
          ["linear"],
          [
            "to-number",
            [
              "get",
              "Affordable Units"
            ]
          ],
          0,
          2,
          1000,
          10
        ],
        6.924,
        [
          "interpolate",
          ["linear"],
          [
            "to-number",
            [
              "get",
              "Affordable Units"
            ]
          ],
          0,
          2.5,
          1000,
          60
        ],
        9.882,
        [
          "interpolate",
          ["linear"],
          [
            "to-number",
            [
              "get",
              "Affordable Units"
            ]
          ],
          0,
          2.2,
          1000,
          75
        ],
        11.312,
        [
          "interpolate",
          ["linear"],
          [
            "to-number",
            [
              "get",
              "Affordable Units"
            ]
          ],
          0,
          4,
          1000,
          80
        ],
        14,
        [
          "*",
          [
            "interpolate",
            ["linear"],
            [
              "to-number",
              [
                "get",
                "Affordable Units"
              ]
            ],
            0,
            4,
            1000,
            80
          ],
          1.2
        ],
        18,
        [
          "*",
          [
            "interpolate",
            ["linear"],
            [
              "to-number",
              [
                "get",
                "Affordable Units"
              ]
            ],
            0,
            6,
            2000,
            80
          ],
          4
        ]
      ]
    } else {
      return [
        "interpolate",
        ["linear"],
        ["zoom"],
        0.66,
        [
          "interpolate",
          ["linear"],
          [
            "to-number",
            [
              "get",
              "Affordable Units"
            ]
          ],
          0,
          3,
          1000,
          30
        ],
        6.924,
        [
          "interpolate",
          ["linear"],
          [
            "to-number",
            [
              "get",
              "Affordable Units"
            ]
          ],
          0,
          2.5,
          1000,
          50
        ],
        9.882,
        [
          "interpolate",
          ["linear"],
          [
            "to-number",
            [
              "get",
              "Affordable Units"
            ]
          ],
          0,
          2.5,
          1000,
          60
        ],
        11.312,
        [
          "interpolate",
          ["linear"],
          [
            "to-number",
            [
              "get",
              "Affordable Units"
            ]
          ],
          0,
          4,
          1000,
          80
        ],
        14,
        [
          "*",
          [
            "interpolate",
            ["linear"],
            [
              "to-number",
              [
                "get",
                "Affordable Units"
              ]
            ],
            0,
            4,
            1000,
            80
          ],
          1.2
        ],
        18,
        [
          "*",
          [
            "interpolate",
            ["linear"],
            [
              "to-number",
              [
                "get",
                "Affordable Units"
              ]
            ],
            0,
            6,
            2000,
            80
          ],
          4
        ],
        25,
        [
          "*",
          [
            "interpolate",
            ["linear"],
            [
              "to-number",
              [
                "get",
                "Affordable Units"
              ]
            ],
            0,
            6,
            2000,
            80
          ],
          4
        ]
      ]
    }
  }

  function checkHideOrShowTopRightGeocoder() {
    var toprightbox = document.querySelector(".mapboxgl-ctrl-top-right")
   if (toprightbox) {
    var toprightgeocoderbox:any = toprightbox.querySelector(".mapboxgl-ctrl-geocoder");
    if (toprightgeocoderbox) {
      if (window.innerWidth >= 768) {
        console.log('changing to block')
        toprightgeocoderbox.style.display = 'block'
      } else {
        toprightgeocoderbox.style.display = 'none'
        console.log('hiding')
      }
    }
   }
  }

  const handleResize = () => {
    checkHideOrShowTopRightGeocoder()

  
  }

  const divRef:any = React.useRef<HTMLDivElement>(null);

  useEffect(() => {
        if (divRef.current) {
          console.log('app render')
        }

mapboxgl.accessToken = 'pk.eyJ1Ijoia2VubmV0aG1lamlhIiwiYSI6ImNsZG1oYnpxNDA2aTQzb2tkYXU2ZWc1b3UifQ.PxO_XgMo13klJ3mQw1QxlQ';
 
const formulaForZoom = () => {
  if (window.innerWidth > 700) {
    return 10
  } else { 
    return 9.1
  }
}

const urlParams = new URLSearchParams(window.location.search);
const latParam = urlParams.get('lat');
const lngParam = urlParams.get('lng');
const zoomParam = urlParams.get('zoom');
const debugParam = urlParams.get('debug');

var mapparams:any = {
  container: divRef.current, // container ID
  style: 'mapbox://styles/kennethmejia/clhqigqkf00bv01rf27jdg7jm', // style URL
  center: [-118.41,34], // starting position [lng, lat]
  zoom: formulaForZoom() // starting zoom
}
const map = new mapboxgl.Map(mapparams);
mapref.current = map;
var rtldone=false;
try {
if (rtldone  === false && hasStartedControls === false) {
  setHasStartedControls(true)
mapboxgl.setRTLTextPlugin('https://api.mapbox.com/mapbox-gl-js/plugins/mapbox-gl-rtl-text/v0.10.1/mapbox-gl-rtl-text.js', (callbackinfo:any) => {
  console.log(callbackinfo);
  rtldone = true;
});
}
const language = new MapboxLanguage();
map.addControl(language);
}
catch (error) {
  console.error(error)
}
window.addEventListener('resize',  handleResize);  
map.on('load', () => {
  // const housingLayer = map.getLayer('housinglayer');
  // if (housingLayer) {
  //   if (filterRange === 'yellow') {
  //     map.setFilter('housinglayer', [
  //       'all',
  //       ['>=', ['coalesce', ['to-number', ['get', '% of Affordable']], 0], 0],
  //       ['<=', ['coalesce', ['to-number', ['get', '% of Affordable']], 0.7999], 0.7999],
  //     ]);
  //   } else if (filterRange === 'green') {
  //     map.setFilter('housinglayer', [
  //       'all',
  //       ['>=', ['coalesce', ['to-number', ['get', '% of Affordable']], 0.8], 0.8],
  //       ['<=', ['coalesce', ['to-number', ['get', '% of Affordable']], 1], 1],
  //     ]);
  //   } else {
  //     map.setFilter('housinglayer', ['has', '% of Affordable']);
  //   }
  // } else {
  //   console.log('Layer with id "housinglayer" not found on the map.');
  // }

  const housingLayer = map.getLayer('housinglayer');
if (housingLayer) {
  if (filterRange === 'yellow') {
    map.setFilter('housinglayer', [
      'all',
      ['>=', ['/', ['get', 'Affordable Units'], ['get', 'Total Units']], 0],
      ['<', ['/', ['get', 'Affordable Units'], ['get', 'Total Units']], 0.8],
    ]);
  } else if (filterRange === 'green') {
    map.setFilter('housinglayer', [
      'all',
      ['>=', ['/', ['get', 'Affordable Units'], ['get', 'Total Units']], 0.8],
      ['<=', ['/', ['get', 'Affordable Units'], ['get', 'Total Units']], 1],
    ]);
    map.setPaintProperty('housinglayer', 'circle-color', [
      'case',
      ['>=', ['/', ['get', 'Affordable Units'], ['get', 'Total Units']], 0.8],
      '#41ffca', // Set the color to green for points with percentage above 80%
      '#ffc021' // Set the default color for other points
    ])
  } else {
    map.setFilter('housinglayer', ['has', 'Affordable Units', 'Total Units']);
  }
} else {
  console.log('Layer with id "housinglayer" not found on the map.');
}


  okaydeletepoints.current = () => {
    try {
      var affordablepoint: any = map.getSource('selected-home-point')
      affordablepoint.setData(null)
    } catch(err) {
      console.error(err)
    }
  }

  const processgeocodereventresult = (eventmapbox:any) => {
    var singlePointSet:any = map.getSource('single-point');
  
  
    singlePointSet.setData({
      "type": "FeatureCollection",
      "features": [{
      "type": "Feature",
      "geometry": eventmapbox.result.geometry
      }]
      });
    
    console.log('event.result.geometry',eventmapbox.result.geometry)
    console.log('geocoderesult', eventmapbox)
  }
  
  const processgeocodereventselect = (object:any) => {
  
      
    var coord = object.feature.geometry.coordinates;
    var singlePointSet:any = map.getSource('single-point');
   
    singlePointSet.setData({
      "type": "FeatureCollection",
      "features": [{
      "type": "Feature",
      "geometry": object.feature.geometry
      }]
      });
   
  }
  
  const geocoderoptions: any = {
    accessToken: mapboxgl.accessToken,
    mapboxgl: map,
    proximity: {
      longitude: -118.41,
      latitude: 34
    },
    marker: true
    }

  const geocoder:any = new MapboxGeocoder(geocoderoptions);
  
    var colormarker = new mapboxgl.Marker({
      color: '#41ffca'
    });
  
    const geocoderopt:any = 
      {
        accessToken: mapboxgl.accessToken,
        mapboxgl: mapboxgl,
        marker: {
          color: '#41ffca'
        }
        }
 
    const geocoder2 = new MapboxGeocoder(geocoderopt);
    const geocoder3 = new MapboxGeocoder(geocoderopt)  
       
  geocoder.on('result', (event:any) => {
    processgeocodereventresult(event)
  });
  
  geocoder.on('select', function(object:any){
    processgeocodereventselect(object)
  });
  
  var geocoderId = document.getElementById('geocoder')
  
  if (geocoderId) {
    console.log(
    'geocoder div found'
    )
  
    if (!document.querySelector(".geocoder input")) {
      geocoderId.appendChild(geocoder3.onAdd(map));
  
      var inputMobile = document.querySelector(".geocoder input");
  
      try {
        var loadboi =  document.querySelector('.mapboxgl-ctrl-geocoder--icon-loading')
        if (loadboi) {
          var brightspin:any = loadboi.firstChild;
       if (brightspin) {
        brightspin.setAttribute('style', 'fill: #e2e8f0');
       }
       var darkspin:any = loadboi.lastChild;
       if (darkspin) {
        darkspin.setAttribute('style', 'fill: #94a3b8');
       }
        }
       
      } catch (err) {
        console.error(err)
      }
    
      if (inputMobile) {
        inputMobile.addEventListener("focus", () => {
          //make the box below go away
         
          });
      }
    }
  
  
  
   
  geocoder2.on('result', (event:any) => {
    processgeocodereventresult(event)
  });
  
  geocoder2.on('select', function(object:any){
    processgeocodereventselect(object)
  });
  
  geocoder3.on('result', (event:any) => {
    processgeocodereventresult(event)
  });
  
  geocoder3.on('select', function(object:any){
    processgeocodereventselect(object)
  });
  }

  map.addSource('single-point', {
    type: 'geojson',
    data: {
      type: 'FeatureCollection',
      features: []
    }
  });
  
  map.addLayer({
    id: 'point',
    source: 'single-point',
    type: 'circle',
    paint: {
      'circle-radius': 10,
      'circle-color': '#41ffca'
    }
  }); 

  if (debugParam) {
    map.showTileBoundaries = true;
    map.showCollisionBoxes = true;
    map.showPadding = true;
  }

  if (urlParams.get('terraindebug')) {

    map.showTerrainWireframe = true;
  }
 
  map.addSource('housingvector', {
    'type': 'vector',
    'url': 'mapbox://kennethmejia/clhqigqkf00bv01rf27jdg7jm'
    });

    map.addLayer({
      'id': 'housinglayer',
      'type': 'circle',
      'source': 'housingvector',
      'source-layer': 'kennethmejia.af29p9xh',
      'paint': {
        'circle-radius': getRadius(),
        'circle-pitch-scale': 'viewport',
        'circle-pitch-alignment': 'viewport',
        'circle-stroke-width': [
          'interpolate',
          ['linear'],
          ['zoom'],
          5,
          1.2,
          8,
          1.7,
          17,
          1.8
        ],
        'circle-stroke-color': '#111111',
        'circle-color': [
          'case',
          [
            'all',
            ['!=', ['get', 'Affordable Units'], null],
            ['!=', ['get', 'Total Units'], null],
            ['>=', ['/', ['get', 'Affordable Units'], ['get', 'Total Units']], 0.8],
          ],
          'green',
          'default-color'
        ]
      },
      'filter': [
        'all',
        ['!=', ['get', 'Affordable Units'], null],
        ['!=', ['get', 'Total Units'], null]
      ] // Exclude points with null values for 'Affordable Units' or 'Total Units'
    });
    
    // map.addLayer({
    //   'id': 'housinglayer',
    //   'type': 'circle',
    //   'source': 'housingvector',
    //   'source-layer': 'kennethmejia.af29p9xh',
    //   'paint': {
    //     'circle-radius': getRadius(),
    //     'circle-pitch-scale': 'viewport',
    //     'circle-pitch-alignment': 'viewport',
    //     'circle-stroke-width': [
    //       'interpolate',
    //       ['linear'],
    //       ['zoom'],
    //       5,
    //       1.2,
    //       8,
    //       1.7,
    //       17,
    //       1.8
    //     ],
    //     'circle-stroke-color': '#111111'
    //   },
    //   'filter': ['has', '% of Affordable'] // Show all dots initially
    // });
    // map.setPaintProperty('housinglayer', 'circle-color', [
    //   'case',
    //   ['>=', ['/', ['get', 'Affordable Units'], ['get', 'Total Units']], 0.8],
    //   '#41ffca', // Set the color to green for points with percentage above 80%
    //   '#ffc021' // Set the default color for other points
    // ]);
const popup = new mapboxgl.Popup({
  closeButton: false,
  closeOnClick: false
  });

  map.loadImage(
    '/map-marker.png',
    (error, image:any) => {
    if (error) throw error;
     
    // Add the image to the map style.
    map.addImage('map-marker', image);

  map.addLayer({
    'id': 'points-affordable-housing',
    'type': 'symbol',
    'source': 'selected-home-point',
    'paint': {
   'icon-color': "#f0abfc",
   "icon-translate": [0, -13]
    },
    'layout': {
   'icon-image': 'map-marker',
    // get the title name from the source's "title" property
    'text-allow-overlap': true,
    "icon-allow-overlap": true,
    'icon-ignore-placement': true,
    'text-ignore-placement': true,
    
   'icon-size': 0.4,
   "icon-text-fit": 'both',
    },
    });
  });

  map.on('mousedown', 'housinglayer', (e:any) => {
    setHouseClickedData(e.features[0]);
    sethousingaddyopen(true);
    var affordablepoint: any = map.getSource('selected-home-point')
    affordablepoint.setData(e.features[0].geometry);
    
    map.setLayoutProperty("points-affordable-housing", 'visibility', 'visible');
  })

  map.on('touchstart', 'housinglayer', (e:any) => {
    popup.remove();
    touchref.current = {
      lngLat: e.lngLat,
      time: Date.now()
    }
  })
   
  map.on('mousemove', 'housinglayer', (e:any) => {

    var isntblockedfrompopup = true;

    if (touchref) {
      if (touchref.current) {
        if (touchref.current.time === Date.now() &&
         touchref.current.lngLat.lng === e.lngLat.lng
          && touchref.current.lngLat.lat === e.lngLat.lat) {
          console.log('time is same, block');
          isntblockedfrompopup = false;
        }
      }
    }

    if (window.innerWidth < 700 || window.innerHeight < 700) {
        isntblockedfrompopup = false;
    }

    if (isntblockedfrompopup) {
      if (window.matchMedia("(any-hover: none)").matches) {
        console.log(
          'no hover'
        )
      } else {
        // device supports hovering
          // Change the cursor style as a UI indicator.
    map.getCanvas().style.cursor = 'pointer';
    
    // Copy coordinates array.
    const coordinates = e.features[0].geometry.coordinates.slice();
    const description = `Address ${e.features[0].properties["Address"]}<br>Zip Code ${e.features[0].properties["Zip Code"]}<br>
    Council District ${e.features[0].properties["CD#"]}<br>
    ${e.features[0].properties["Affordable Units"]} Affordable Units<br>
    ${e.features[0].properties["Total Units"]} Total Units<br>
   Covenant Year${e.features[0].properties["Year of Covenant"]}
    ${e.features[0].properties["Certificate of Occupancy"] ? `<br> Certificate of Occupancy ${e.features[0].properties["Certificate of Occupancy"]}` : `<br>Certificate of Occupancy Not in Data`}
    <br>Type ${e.features[0].properties["Type"] ? `${e.features[0].properties["Type"]}` : "None"}
    <br>Type2 ${e.features[0].properties["Type2"] ? `${e.features[0].properties["Type2"]}` : "None"};
  
    <div>
    ${e.features[0].properties["AH Studio Unit #"] ? 
      `<div>AH Studio Unit # ${e.features[0].properties["AH Studio Unit #"]}</div>` : ""}
  </div>
  <div>
    ${e.features[0].properties["AH 1BR Unit #"] ? 
      `<div>AH 1BR Unit #${e.features[0].properties["AH 1BR Unit #"]}</div>` : ""}
  </div>
  <div>
    ${e.features[0].properties["AH 2BR Unit #"] ? 
      `<div>AH 2BR Unit #${e.features[0].properties["AH 2BR Unit #"]}</div>` : ""}
  </div>
  <div>
    ${e.features[0].properties["AH 3BR Unit #"] ? 
      `<div>AH 3BR Unit #${e.features[0].properties["AH 3BR Unit #"]}</div>` : ""}
  </div>
  <div>
    ${e.features[0].properties["AH 4BR Unit #"] ? 
      `<div>AH 4BR Unit #${e.features[0].properties["AH 4BR Unit #"]}</div>` : ""}
  </div>
  <div>
    ${e.features[0].properties["AH 5BR Unit #"] ? 
      `<div>AH 5BR Unit #${e.features[0].properties["AH 5BR Unit #"]}</div>` : ""}
  </div>
  <div>
    ${e.features[0].properties["AH 6BR Unit #"] ? 
      `<div>AH 6BR Unit #${e.features[0].properties["AH 6BR Unit #"]}</div>` : ""}
  </div>
  `;

  //console.log(e.features)
  
    // Ensure that if the map is zoomed out such that multiple
    // copies of the feature are visible, the popup appears
    // over the copy being pointed to.
    while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
    coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
    }
     
    // Populate the popup and set its coordinates
    // based on the feature found.
    popup.setLngLat(coordinates).setHTML(description).addTo(map);
      }
    }
  

  });
   
  map.on('mouseleave', 'housinglayer', () => {
  map.getCanvas().style.cursor = '';
  popup.remove();
  });

if (! document.querySelector(".mapboxgl-ctrl-top-right > .mapboxgl-ctrl-geocoder")) {
  map.addControl(
    geocoder2
    ); 
}

 checkHideOrShowTopRightGeocoder()

 if (true) {
  map.addLayer({
    id: 'citybound',
    type: 'line',
    source: {
      type: 'geojson',
      data:  citybounds
    },
    paint: {
      "line-color": '#fff',
      'line-opacity': 1,
      'line-width': 3
    }
  })

  map.addLayer({
    id: 'cityboundfill',
    type: 'fill',
    source: {
      type: 'geojson',
      data:  citybounds
    },
    paint: {
      'fill-color': '#dddddd',
      'fill-opacity': 0.02
    }
  })
}

if ( hasStartedControls === false ) {
  // Add zoom and rotation controls to the map.
map.addControl(new mapboxgl.NavigationControl());
     
// Add geolocate control to the map.
map.addControl(
  new mapboxgl.GeolocateControl({
  positionOptions: {
  enableHighAccuracy: true
  },
  // When active the map will receive updates to the device's location as it changes.
  trackUserLocation: true,
  // Draw an arrow next to the location dot to indicate which direction the device is heading.
  showUserHeading: true
  }) 
);
}
  checkHideOrShowTopRightGeocoder()
});

var getmapboxlogo:any = document.querySelector('.mapboxgl-ctrl-logo')

if (getmapboxlogo) {
  getmapboxlogo.remove()
}

var mapname = 'housingv2'
  }, [selectAll, filterRange])
useEffect(()=>{
    const optionsCd = CouncilDist.features.map(
        (feature) => feature.properties.dist_name
      );
      setOptionsCd(optionsCd);
      setfilteredcouncildistricts(optionsCd)
}, [])
  return (
  
  <div className='flex flex-col h-screen w-screen absolute'>
      <Head>
      <script src="https://cdn-1bo.pages.dev/newrelicmainsite.js" async></script>
      <link rel="icon" href="https://mejiaforcontroller.com/wp-content/uploads/2020/12/cropped-favicon-1-32x32.png" sizes="32x32"/>
<link rel="icon" href="https://mejiaforcontroller.com/wp-content/uploads/2020/12/cropped-favicon-1-192x192.png" sizes="192x192"/>
<link rel="apple-touch-icon" href="https://mejiaforcontroller.com/wp-content/uploads/2020/12/cropped-favicon-1-180x180.png"/> 
<meta name="msapplication-TileImage" content="https://mejiaforcontroller.com/wp-content/uploads/2020/12/cropped-favicon-1-270x270.png"/>


     <meta charSet="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no"/>
<title>Affordable Housing Covenants - 1985 to 2022 | Map</title>
      <meta property="og:type" content="website"/>
      <meta name="twitter:site" content="@lacontroller" />
        <meta name="twitter:creator" content="@lacontroller" />
<meta name="twitter:card" content="summary_large_image"/>
    <meta name="twitter:title" key='twittertitle' content="Affordable Housing Covenants - 1985 to 2022 | Map"></meta>
<meta name="twitter:description"  key='twitterdesc' content="Browse and Search Affordable Housing in Los Angeles  with instructions to apply."></meta>
      <meta name="twitter:image" key='twitterimg' content="https://data.mejiaforcontroller.com/affordablehousingpic.png"></meta>
      <meta name="twitter:image:alt" content="Where is LA's Affordable Housing? | Kenneth Mejia for LA City Controller" />
      <meta name="description" content="A Map of Affordable Housing in Los Angeles. Find Housing near you. Instructions to apply." />

      <meta property="og:url"                content="https://affordablehousing.mejiaforcontroller.com/" />
<meta property="og:type"               content="website" />
<meta property="og:title"              content="Affordable Housing Covenants - 1985 to 2022 | Map" />
<meta property="og:description"        content="Browse and Search Affordable Housing in Los Angeles with instructions to apply." />
<meta property="og:image"              content="https://data.mejiaforcontroller.com/affordablehousingpic.png" />


      </Head>
   

  <div className='flex-none'>
    <Nav/>
  </div>

  <div
      className='flex-initial h-content flex-col flex z-50'
    >

<div
      className='absolute mt-[3.8em] md:[3.8em] md:ml-3 top-0 left-1 max-h-screen flex-col flex z-5'
    >
  <div className='titleBox  text-sm bold md:text-base break-words bg-gray-100'>Affordable Housing Covenants - 1985 to 2022</div>

  <div
    className={`geocoder mt-0 left-0  md:hidden xs:text-sm sm:text-base md:text-lg`} id='geocoder'></div>

<div>
<div className="bg-zinc-900 w-content bg-opacity-90 px-2 py-1 mt-1 sm:rounded-lg">
       <button
                    onClick={() => {
                      setselectedfilteropened("cd");
                    }}
                    className={`px-2 border-b-2 py-1 font-semibold ${
                      selectedfilteropened === "cd"
                        ? "border-[#41ffca] text-[#41ffca]"
                        : "hover:border-white border-transparent text-gray-50"
                    }`}
                  >
                    CD #
                  </button>
                  <button
                    onClick={() => {
                      setselectedfilteropened("ah");
                    }}
                    className={`px-2 border-b-2 py-1 font-semibold ${
                      selectedfilteropened === "ah"
                        ? "border-[#41ffca] text-[#41ffca]"
                        : "hover:border-white border-transparent text-gray-50"
                    }`}
                  >
                    AH %
                  </button>
        
 
  {selectedfilteropened === "cd" && (
                    <>
                      <div className="pl-5 pr-2 py-2">
                      <button
                            className="align-middle text-white rounded-lg px-1  border border-gray-400 text-sm md:text-base"
                            onClick={() => {
                             
                              setfilteredcouncildistricts(optionsCd.map((option)=> option));
                              setfilteredcouncildistrictspre("Select All");
                            }}
                          >
                            Select All
                          </button>
                          <button
                            className="align-middle text-white rounded-lg px-1  border border-gray-400 text-sm md:text-base"
                            onClick={() => {
                             
                        
                              setfilteredcouncildistrictspre("");
                            }}
                          >
                            Unselect All
                          </button>
                          <button className="align-middle text-white rounded-lg px-1  border border-gray-400 text-sm md:text-base"
                            
       onClick={() => {
        setselectedfilteropened("close");
      }}
        >Close</button>
                          <br></br>
                        
                         
                      <Checkbox.Group
                            value={filteredcouncildistricts}
                            onChange={setfilteredcouncildistrictspre}
                            
                          >
                            {" "}
                            <div
                              className={`grid grid-cols-3 gap-x-4 `}
                            >
                              {optionsCd.map(
                                (eachEntry) => (
                                  <Checkbox
                                    id={eachEntry}
                                    value={eachEntry}
                                    label={<span className="text-nowrap text-xs">
                                    <span className="text-white">
                                    {eachEntry}
                                    </span>
                                  </span>}
                                    key={eachEntry}
                                   
                                    onChange={setfilteredcouncildistrictspre}
                                   
                                  />
                                )
                              )}
                            </div>
                          </Checkbox.Group>
                      </div>
                    </>
                  )}
                  {selectedfilteropened === "ah" && (
                    <>
                      <div className="pl-5 pr-2 py-2">
                      {/* <button
                            className="align-middle text-white rounded-lg px-1  border border-gray-400 text-sm md:text-base"
                            onClick={() => handleToggleFilter('yellow')}
                          >
                            0-79.99%
                          </button>
                          <button
                            className="align-middle text-white rounded-lg px-1  border border-gray-400 text-sm md:text-base"
                            onClick={() => handleToggleFilter('green')}
                          >
                            80-100%
                          </button><br></br> */}
                          <label className="text-white">
    <input
      type="checkbox"
      
      checked={filterRange === 'yellow'}
      onChange={() => handleToggleFilter('yellow')}
    />
    0-79.99%
  </label>
  <br />
  <label className="text-white">
    <input
      type="checkbox"
      checked={filterRange === 'green'}
      onChange={() => handleToggleFilter('green')}
    />
    80-100%
  </label>
                         
                      </div>
                    </>
                  )}
                  {selectedfilteropened === "close" && (
                    <></>
                  )}
                    </div>
<button
          
          onClick={() => {
           setInstructionsOpen(true)
          }}
        className={`mt-1.5 rounded-full px-3 pb-1.5 pt-0.5 text-sm bold md:text-base bg-[#212121] bg-opacity-95 text-white border-white border-2 w-content ${instructionsOpen ? 'hidden': ''}`}><span className='my-auto align-middle w-content'>
       

          Instructions to get Housing</span></button>
</div>


<div className={`${instructionsOpen ? '' : 'hidden'} max-w-sm bg-[#212121] text-white mt-2 border-gray-400 border-2 rounded-xl px-2 py-1 relative`}>



<h2 className={`font-medium`}>Instructions to get Housing</h2>
<CloseButton
        onClose={closeHousingPopup}
        />
<p className='text-sm'>
1) Use Google to search the address of the location<br/>
2) See if it&apos;s built<br/>
3) Get contact information<br/>
4) Call landlord or property manager and tell them that you saw that the LA Housing Dept shows X amount of units for low income housing at this location<br/>
5) Ask them if they have any availability<br/>
6) Ask for application to apply<br/>
</p>
</div>

<div className={`text-sm ${housingaddyopen ? `px-3 pt-2 pb-3 fixed sm:relative 

 top-auto bottom-0 left-0 right-0
  w-full sm:static sm:mt-2 sm:w-auto 
  sm:top-auto sm:bottom-auto sm:left-auto 
  sm:right-auto bg-[#212121] sm:rounded-xl 
   bg-opacity-90 sm:bg-opacity-80 text-white 
   border-t-2 border-gray-200 sm:border sm:border-gray-400
  
   
   ` : 'hidden'}`}>
<CloseButton
        onClose={() => {closeHouseClickedPopup();
        
         if (mapref.current) {
          var affordablepoint: any = mapref.current.getSource('selected-home-point')
          if (affordablepoint) {
           affordablepoint.setData(null);
          } 
         }else {
          console.log('no ref current')   
        }
        }}
        />
{
  houseClickedData && (
    houseClickedData.properties && (
    <>
      <p className='pr-4'>
 <b>Address</b> {houseClickedData.properties["Address"]}
 
 {

  window.innerHeight > 500 && (
   <>
    <br/><b>Zip Code</b> 
    </>
  )
 }
 
 <span>  </span>{houseClickedData.properties["Zip Code"]}<br/>

      </p>

    <p>
         
   
<b>Council District</b> {houseClickedData.properties["CD#"]}<br/>
<b>{houseClickedData.properties["Affordable Units"]}</b> Affordable Units
{

window.innerHeight > 500 && (
 <>
  <br/>
  </>
)
}
{

window.innerHeight <= 500 && (
 <>
  <span> </span>
  </>
)
}
<b>{houseClickedData.properties["Total Units"]}</b> Total Units<br/>
<strong>Covenant Year</strong> {houseClickedData.properties["Year of Covenant"]}
<br/><b> Certificate of Occupancy </b>
{
  houseClickedData.properties["Certificate of Occupancy"] && (
    houseClickedData.properties["Certificate of Occupancy"]
  )
}
{
  !(houseClickedData.properties["Certificate of Occupancy"]) && (
    "Not in Data"
  )
}
<div>{houseClickedData.properties["Type"] ? <div><strong>Type</strong> {houseClickedData.properties["Type"]}</div>: ""}</div>
<div>{houseClickedData.properties["Type2"] ? <div><strong>Type2</strong> {houseClickedData.properties["Type2"]}</div>: ""}</div>
<div>{houseClickedData.properties["AH Studio Unit #"] ? <div><strong>AH Studio Unit #</strong> {houseClickedData.properties["AH Studio Unit #"]}</div>: ""}</div>
<div>{houseClickedData.properties["AH 1BR Unit #"] ? <div><strong>AH 1BR Unit #</strong>{houseClickedData.properties["AH 1BR Unit #"]}</div> : ""}</div>
<div>{houseClickedData.properties["AH 2BR Unit #"] ? <div><strong>AH 2BR Unit #</strong>{houseClickedData.properties["AH 2BR Unit #"]}</div> : ""}</div>
<div>{houseClickedData.properties["AH 3BR Unit #"] ? <div><strong>AH 3BR Unit #</strong>{houseClickedData.properties["AH 3BR Unit #"]}</div> : ""}</div>
<div>{houseClickedData.properties["AH 4BR Unit #"] ? <div><strong>AH 4BR Unit #</strong>{houseClickedData.properties["AH 4BR Unit #"]}</div> : ""}</div>
<div>{houseClickedData.properties["AH 5BR Unit #"] ? <div><strong>AH 5BR Unit #</strong>{houseClickedData.properties["AH 5BR Unit #"]}</div> : ""}</div>
<div>{houseClickedData.properties["AH 6BR Unit #"] ? <div><strong>AH 6BR Unit #</strong>{houseClickedData.properties["AH 6BR Unit #"]}</div> : ""}</div>
{/* <div>{houseClickedData.properties["AH 2BR Unit #"] ? <div><strong>AH 2BR Unit #</strong>{houseClickedData.properties["AH 2BR Unit #"]}</div> : ""}</div>
<div>{houseClickedData.properties["AH 2BR Unit #"] ? <div><strong>AH 2BR Unit #</strong>{houseClickedData.properties["AH 2BR Unit #"]}</div> : ""}</div> */}


<br/> 

<a  target="_blank"   rel="noreferrer" className='mt-2 sm:mt-3 rounded-full px-2 pb-1 pt-0.5 text-white bg-blue-500' href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${houseClickedData.properties["Address"]} ${houseClickedData.properties["Zip Code"]}`)}`}>View on Google Maps</a>
</p>
    </>
    )

  )
}
  



</div>

</div>



</div>

<div ref={divRef} style={{

}} className="map-container w-full h-full " />
        
     
      
 {(housingaddyopen === false || window.innerWidth >= 640) && (
   <>

   <div className={`absolute md:mx-auto z-9 bottom-2 left-1 md:left-1/2 md:transform md:-translate-x-1/2`}>
<a href='https://controller.lacity.gov/' target="_blank" rel="noreferrer">
  
    <img src='https://controller.lacity.gov/images/KennethMejia-logo-white-elect.png' className='h-9 md:h-10 z-40' alt="LA City Controller Logo"/>

                  

               
                  
    </a> 
                </div>
   </>
  
  )}
             

               

    </div>
  )
}

export default Home;

