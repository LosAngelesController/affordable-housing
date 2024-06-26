import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment, createRef } from "react";
import MapboxGeocoder from "@mapbox/mapbox-gl-geocoder";
import MapboxLanguage from "@mapbox/mapbox-gl-language";

import { uploadMapboxTrack } from "../components/mapboxtrack";

import { CloseButton } from "../components/CloseButton";
import Nav from "../components/nav";

import React, { useEffect, useState, useRef } from "react";
import CouncilDist from "./CouncilDistricts.json";
const councildistricts = require("./CouncilDistricts.json");
const citybounds = require("./citybounds.json");
import * as turf from "@turf/turf";

// added the following 6 lines.....
import mapboxgl from "mapbox-gl";

import { assertDeclareExportAllDeclaration } from "@babel/types";

import { DisclaimerPopup } from "../components/Disclaimer";
import { Checkbox } from "@mantine/core";
import { feature } from "turf";

function isTouchScreen() {
  return window.matchMedia("(hover: none)").matches;
}

const Home: NextPage = () => {
  let [disclaimerOpen, setDisclaimerOpen] = useState(false);
  let [instructionsOpen, setInstructionsOpen] = useState(false);
  const touchref = useRef<any>(null);
  let [houseClickedData, setHouseClickedData]: any = useState(null);
  let [housingaddyopen, sethousingaddyopen] = useState(false);
  var mapref: any = useRef(null);
  const okaydeletepoints: any = useRef(null);
  const [options, setOptions] = useState<any[]>([]);
  const [optionsCd, setOptionsCd] = useState<any[]>([]);
  const [selectAll, setSelectAll] = useState(false);
  const [filterRange, setFilterRange] = useState<string[]>([]);
  const [selectedfilteropened, setselectedfilteropened] = useState("CD#");
  const [filteredcouncildistricts, setfilteredcouncildistricts] = useState<
    string[]
  >([]);
  const [ah, setAh] = useState<string[]>(["yellow", "green"]);
  const [mapboxConfig, setMapboxConfig] = useState<{
    mapboxToken: string;
    mapboxStyle: string;
  } | null>(null);

  useEffect(() => {
    const fetchMapboxConfig = async () => {
      try {
        const response = await fetch("/api/mapboxConfig");
        const data = await response.json();
        setMapboxConfig(data);
      } catch (error) {
        console.error("Error fetching Mapbox config:", error);
      }
    };

    fetchMapboxConfig();
  }, []);
  // console.log(houseClickedData);

  const handleToggleFilter = (event: any) => {
    const value = event;
    setAh(value);
    setFilterRange(value);
    const optionsC = CouncilDist.features.filter((feature) =>
      filteredcouncildistricts.includes(feature.properties.dist_name)
    );
    const coordinates = optionsC.map((option) => option.geometry);
    const filters = coordinates.map((coordinate) => ["within", coordinate]);
    if (value[0] === "yellow" && value[1] === "green") {
      mapref.current.setFilter("housinglayer", [
        "all",
        ["any", ...filters], // Include your custom filters here
        ["!=", ["get", "Affordable Units"], ""],
      ]);
      mapref.current.setPaintProperty("housinglayer", "circle-color", [
        "case",
        [">=", ["/", ["get", "Affordable Units"], ["get", "Total Units"]], 0.8],
        "#41ffca", // Set the color to green for points with percentage above 80%
        "#ffc021", // Set the default color for other points
      ]);
    } else if (value[0] === "green" && value[1] === "yellow") {
      mapref.current.setFilter("housinglayer", [
        "all",
        ["any", ...filters], // Include your custom filters here
        ["!=", ["get", "Affordable Units"], ""],
      ]);
      mapref.current.setPaintProperty("housinglayer", "circle-color", [
        "case",
        [">=", ["/", ["get", "Affordable Units"], ["get", "Total Units"]], 0.8],
        "#41ffca", // Set the color to green for points with percentage above 80%
        "#ffc021", // Set the default color for other points
      ]);
    } else if (value[0] === "green") {
      mapref.current.setFilter("housinglayer", [
        "all",
        ["any", ...filters],
        [">=", ["/", ["get", "Affordable Units"], ["get", "Total Units"]], 0.8],
        ["<=", ["/", ["get", "Affordable Units"], ["get", "Total Units"]], 1],
      ]);
      mapref.current.setPaintProperty("housinglayer", "circle-color", [
        "case",
        [">=", ["/", ["get", "Affordable Units"], ["get", "Total Units"]], 0.8],
        "#41ffca", // Set the color to green for points with percentage above 80%
        "#ffc021", // Set the default color for other points
      ]);
    } else if (value[0] === "yellow") {
      mapref.current.setFilter("housinglayer", [
        "all",
        ["any", ...filters],
        [">=", ["/", ["get", "Affordable Units"], ["get", "Total Units"]], 0],
        ["<", ["/", ["get", "Affordable Units"], ["get", "Total Units"]], 0.8],
      ]);
      // map.setFilter('housinglayer', ['has', 'Affordable Units', 'Total Units']);
    } else {
      mapref.current.setFilter("housinglayer", [
        "all",
        ["any", ...filters], // Include your custom filters here
        ["!=", ["get", "Affordable Units"], ""],
      ]);
    }
  };

  const setfilteredcouncildistrictspre = (event: any) => {
    // console.log(event)
    // debugger
    if (event == "Select All") {
      // setfilteredcouncildistricts(event);
      setSelectAll(!selectAll);
    } else if (event == "sndk") {
      mapref.current.setLayoutProperty(
        "AffordableHousingCovenants-8zpehi",
        "visibility",
        "none"
      );
      mapref.current.setLayoutProperty("housing-layer", "visibility", "none");
    } else {
      const value = event;
      setfilteredcouncildistricts(value);
      const optionsC = CouncilDist.features.filter((feature) =>
        value.includes(feature.properties.dist_name)
      );
      const coordinates = optionsC.map((option) => option.geometry);
      const filters = coordinates.map((coordinate) => ["within", coordinate]);

      mapref.current.setFilter("housinglayer", ["any", ...filters]);

      // Hides the black dots.
      // mapref.current.setFilter('housinglayer', [
      //   'all',
      //   'case',
      //   ['any', ...filters], // Include your custom filters here

      // ]);
    }
  };

  const closeHouseClickedPopup = () => {
    if (mapref && mapref.current) {
      const affordablepoint = mapref.current.getSource("selected-home-point");
      if (affordablepoint) {
        affordablepoint.setData(null);
      } else {
        console.log("selected-home-point source not found");
      }
      mapref.current.setLayoutProperty(
        "points-affordable-housing",
        "visibility",
        "none"
      );
    } else {
      console.log("no mapref or mapref.current");
    }

    sethousingaddyopen(false);

    if (okaydeletepoints && okaydeletepoints.current) {
      okaydeletepoints.current();
    }
  };

  const closeHousingPopup = () => {
    setInstructionsOpen(false);
  };

  var [hasStartedControls, setHasStartedControls] = useState(false);

  function getRadius(): any {
    if (window.innerWidth < 640) {
      return [
        "interpolate",
        ["linear"],
        ["zoom"],
        0.66,
        [
          "interpolate",
          ["linear"],
          ["to-number", ["get", "Affordable Units"]],
          0,
          2,
          1000,
          10,
        ],
        6.924,
        [
          "interpolate",
          ["linear"],
          ["to-number", ["get", "Affordable Units"]],
          0,
          2.5,
          1000,
          60,
        ],
        9.882,
        [
          "interpolate",
          ["linear"],
          ["to-number", ["get", "Affordable Units"]],
          0,
          2.2,
          1000,
          75,
        ],
        11.312,
        [
          "interpolate",
          ["linear"],
          ["to-number", ["get", "Affordable Units"]],
          0,
          4,
          1000,
          80,
        ],
        14,
        [
          "*",
          [
            "interpolate",
            ["linear"],
            ["to-number", ["get", "Affordable Units"]],
            0,
            4,
            1000,
            80,
          ],
          1.2,
        ],
        18,
        [
          "*",
          [
            "interpolate",
            ["linear"],
            ["to-number", ["get", "Affordable Units"]],
            0,
            6,
            2000,
            80,
          ],
          4,
        ],
      ];
    } else {
      return [
        "interpolate",
        ["linear"],
        ["zoom"],
        0.66,
        [
          "interpolate",
          ["linear"],
          ["to-number", ["get", "Affordable Units"]],
          0,
          3,
          1000,
          30,
        ],
        6.924,
        [
          "interpolate",
          ["linear"],
          ["to-number", ["get", "Affordable Units"]],
          0,
          2.5,
          1000,
          50,
        ],
        9.882,
        [
          "interpolate",
          ["linear"],
          ["to-number", ["get", "Affordable Units"]],
          0,
          2.5,
          1000,
          60,
        ],
        11.312,
        [
          "interpolate",
          ["linear"],
          ["to-number", ["get", "Affordable Units"]],
          0,
          4,
          1000,
          80,
        ],
        14,
        [
          "*",
          [
            "interpolate",
            ["linear"],
            ["to-number", ["get", "Affordable Units"]],
            0,
            4,
            1000,
            80,
          ],
          1.2,
        ],
        18,
        [
          "*",
          [
            "interpolate",
            ["linear"],
            ["to-number", ["get", "Affordable Units"]],
            0,
            6,
            2000,
            80,
          ],
          4,
        ],
        25,
        [
          "*",
          [
            "interpolate",
            ["linear"],
            ["to-number", ["get", "Affordable Units"]],
            0,
            6,
            2000,
            80,
          ],
          4,
        ],
      ];
    }
  }

  function checkHideOrShowTopRightGeocoder() {
    var toprightbox = document.querySelector(".mapboxgl-ctrl-top-right");
    if (toprightbox) {
      var toprightgeocoderbox: any = toprightbox.querySelector(
        ".mapboxgl-ctrl-geocoder"
      );
      if (toprightgeocoderbox) {
        if (window.innerWidth >= 768) {
          console.log("changing to block");
          toprightgeocoderbox.style.display = "block";
        } else {
          toprightgeocoderbox.style.display = "none";
          console.log("hiding");
        }
      }
    }
  }

  const handleResize = () => {
    checkHideOrShowTopRightGeocoder();
  };

  const divRef: any = React.useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (mapboxConfig && divRef.current) {
      mapboxgl.accessToken = mapboxConfig.mapboxToken;

    const formulaForZoom = () => {
      if (window.innerWidth > 700) {
        return 10;
      } else {
        return 9.1;
      }
    };

    const urlParams = new URLSearchParams(window.location.search);
    const latParam = urlParams.get("lat");
    const lngParam = urlParams.get("lng");
    const zoomParam = urlParams.get("zoom");
    const debugParam = urlParams.get("debug");

    var mapparams: any = {
      container: divRef.current, // container ID
      style: mapboxConfig.mapboxStyle,
      center: [-118.41, 34], // starting position [lng, lat]
      zoom: formulaForZoom(), // starting zoom
    };
    const map = new mapboxgl.Map(mapparams);
    mapref.current = map;
    var rtldone = false;
    try {
      if (rtldone === false && hasStartedControls === false) {
        setHasStartedControls(true);
        mapboxgl.setRTLTextPlugin(
          "https://api.mapbox.com/mapbox-gl-js/plugins/mapbox-gl-rtl-text/v0.10.1/mapbox-gl-rtl-text.js",
          (callbackinfo: any) => {
            console.log(callbackinfo);
            rtldone = true;
          }
        );
      }
      const language = new MapboxLanguage();
      map.addControl(language);
    } catch (error) {
      console.error(error);
    }
    window.addEventListener("resize", handleResize);
    map.on("load", () => {
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

      const housingLayer = map.getLayer("housinglayer");

      if (housingLayer) {
        console.log(filterRange);
        if (filterRange[0] === "yellow" && filterRange[1] === "green") {
          map.setFilter("housinglayer", [
            "all",
            ["!=", ["get", "Affordable Units"], ""],
            ["!=", ["get", "Total Units"], ""],
            "default-color",
          ]);

          map.setPaintProperty("housinglayer", "circle-color", [
            "case",
            [
              ">=",
              ["/", ["get", "Affordable Units"], ["get", "Total Units"]],
              0.8,
            ],
            "#41ffca", // Set the color to green for points with percentage above 80%
            "#ffc021", // Set the default color for other points
          ]);
        } else if (filterRange[0] === "green" && filterRange[1] === "yellow") {
          map.setFilter("housinglayer", [
            "all",
            ["!=", ["get", "Affordable Units"], ""],
            ["!=", ["get", "Total Units"], ""],
          ]);
          map.setPaintProperty("housinglayer", "circle-color", [
            "case",
            [
              ">=",
              ["/", ["get", "Affordable Units"], ["get", "Total Units"]],
              0.8,
            ],
            "#41ffca", // Set the color to green for points with percentage above 80%
            "#ffc021", // Set the default color for other points
          ]);
        } else if (filterRange[0] === "green") {
          map.setFilter("housinglayer", [
            "all",
            [
              ">=",
              ["/", ["get", "Affordable Units"], ["get", "Total Units"]],
              0.8,
            ],
            [
              "<=",
              ["/", ["get", "Affordable Units"], ["get", "Total Units"]],
              1,
            ],
          ]);
          map.setPaintProperty("housinglayer", "circle-color", [
            "case",
            [
              ">=",
              ["/", ["get", "Affordable Units"], ["get", "Total Units"]],
              0.8,
            ],
            "#41ffca", // Set the color to green for points with percentage above 80%
            "#ffc021", // Set the default color for other points
          ]);
        } else if (filterRange[0] === "yellow") {
          map.setFilter("housinglayer", [
            "all",
            [
              ">=",
              ["/", ["get", "Affordable Units"], ["get", "Total Units"]],
              0,
            ],
            [
              "<",
              ["/", ["get", "Affordable Units"], ["get", "Total Units"]],
              0.8,
            ],
          ]);
          // map.setFilter('housinglayer', ['has', 'Affordable Units', 'Total Units']);
        } else {
          map.setFilter("housinglayer", [
            "case",
            ["!=", ["get", "Affordable Units"], ""],
            ["!=", ["get", "Total Units"], ""],
          ]);
          map.setPaintProperty("housinglayer", "circle-color", [
            "case",
            [
              ">=",
              ["/", ["get", "Affordable Units"], ["get", "Total Units"]],
              0.8,
            ],

            "#41ffca", // Set the color to green for points with percentage above 80%
            "#ffc021", // Set the default color for other points
          ]);

          //     // map.setFilter('housinglayer', ['has', 'Affordable Units', 'Total Units']);
        }
      } else {
        console.log('Layer with id "housinglayer" not found on the map.');
      }

      okaydeletepoints.current = () => {
        try {
          var affordablepoint: any = map.getSource("selected-home-point");
          affordablepoint.setData(null);
        } catch (err) {
          console.error(err);
        }
      };

      const processgeocodereventresult = (eventmapbox: any) => {
        var singlePointSet: any = map.getSource("single-point");

        singlePointSet.setData({
          type: "FeatureCollection",
          features: [
            {
              type: "Feature",
              geometry: eventmapbox.result.geometry,
            },
          ],
        });

        console.log("event.result.geometry", eventmapbox.result.geometry);
        console.log("geocoderesult", eventmapbox);
      };

      const processgeocodereventselect = (object: any) => {
        var coord = object.feature.geometry.coordinates;
        var singlePointSet: any = map.getSource("single-point");

        singlePointSet.setData({
          type: "FeatureCollection",
          features: [
            {
              type: "Feature",
              geometry: object.feature.geometry,
            },
          ],
        });
      };

      const geocoderoptions: any = {
        accessToken: mapboxgl.accessToken,
        mapboxgl: map,
        proximity: {
          longitude: -118.41,
          latitude: 34,
        },
        marker: true,
      };

      const geocoder: any = new MapboxGeocoder(geocoderoptions);

      var colormarker = new mapboxgl.Marker({
        color: "#41ffca",
      });

      const geocoderopt: any = {
        accessToken: mapboxgl.accessToken,
        mapboxgl: mapboxgl,
        marker: {
          color: "#41ffca",
        },
      };

      const geocoder2 = new MapboxGeocoder(geocoderopt);
      const geocoder3 = new MapboxGeocoder(geocoderopt);

      geocoder.on("result", (event: any) => {
        processgeocodereventresult(event);
      });

      geocoder.on("select", function (object: any) {
        processgeocodereventselect(object);
      });

      var geocoderId = document.getElementById("geocoder");

      if (geocoderId) {
        console.log("geocoder div found");

        if (!document.querySelector(".geocoder input")) {
          geocoderId.appendChild(geocoder3.onAdd(map));

          var inputMobile = document.querySelector(".geocoder input");

          try {
            var loadboi = document.querySelector(
              ".mapboxgl-ctrl-geocoder--icon-loading"
            );
            if (loadboi) {
              var brightspin: any = loadboi.firstChild;
              if (brightspin) {
                brightspin.setAttribute("style", "fill: #e2e8f0");
              }
              var darkspin: any = loadboi.lastChild;
              if (darkspin) {
                darkspin.setAttribute("style", "fill: #94a3b8");
              }
            }
          } catch (err) {
            console.error(err);
          }

          if (inputMobile) {
            inputMobile.addEventListener("focus", () => {
              //make the box below go away
            });
          }
        }

        geocoder2.on("result", (event: any) => {
          processgeocodereventresult(event);
        });

        geocoder2.on("select", function (object: any) {
          processgeocodereventselect(object);
        });

        geocoder3.on("result", (event: any) => {
          processgeocodereventresult(event);
        });

        geocoder3.on("select", function (object: any) {
          processgeocodereventselect(object);
        });
      }

      map.addSource("single-point", {
        type: "geojson",
        data: {
          type: "FeatureCollection",
          features: [],
        },
      });

      map.addLayer({
        id: "point",
        source: "single-point",
        type: "circle",
        paint: {
          "circle-radius": 10,
          "circle-color": "#41ffca",
        },
      });

      if (debugParam) {
        map.showTileBoundaries = true;
        map.showCollisionBoxes = true;
        map.showPadding = true;
      }

      if (urlParams.get("terraindebug")) {
        map.showTerrainWireframe = true;
      }

      map.addSource("housingvector", {
        type: "vector",
        url: "mapbox://kennethmejia/clhqigqkf00bv01rf27jdg7jm",
      });

      map.addLayer({
        id: "housinglayer",
        type: "circle",
        source: "housingvector",
        "source-layer": "kennethmejia.af29p9xh",
        paint: {
          "circle-radius": getRadius(),
          "circle-pitch-scale": "viewport",
          "circle-pitch-alignment": "viewport",
          "circle-stroke-width": [
            "interpolate",
            ["linear"],
            ["zoom"],
            5,
            1.2,
            8,
            1.7,
            17,
            1.8,
          ],
          "circle-stroke-color": "#111111",
          "circle-color": [
            "case",
            [
              "all",
              ["!=", ["get", "Affordable Units"], null],
              ["!=", ["get", "Total Units"], null],
              [
                ">=",
                ["/", ["get", "Affordable Units"], ["get", "Total Units"]],
                0.8,
              ],
            ],
            "green",
            "default-color", //default-color
          ],
        },
      });

      // map.setLayoutProperty('housinglayer','circle-sort-key',["*", 1,    ['>=', ['/', ['get', 'Affordable Units'], ['get', 'Total Units']], 0.8]])
      // // map.addLayer({
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
        closeOnClick: false,
      });

      map.loadImage("/map-marker.png", (error, image: any) => {
        if (error) throw error;

        // Add the image to the map style.
        map.addImage("map-marker", image);

        map.addLayer({
          id: "points-affordable-housing",
          type: "symbol",
          source: "selected-home-point",
          paint: {
            "icon-color": "#f0abfc",
            "icon-translate": [0, -13],
          },
          layout: {
            "icon-image": "map-marker",
            // get the title name from the source's "title" property
            "text-allow-overlap": true,
            "icon-allow-overlap": true,
            "icon-ignore-placement": true,
            "text-ignore-placement": true,

            "icon-size": 0.4,
            "icon-text-fit": "both",
          },
        });
      });

      map.on("mousedown", "housinglayer", (e: any) => {
        setHouseClickedData(e.features[0]);
        sethousingaddyopen(true);
        var affordablepoint: any = map.getSource("selected-home-point");
        affordablepoint.setData(e.features[0].geometry);

        map.setLayoutProperty(
          "points-affordable-housing",
          "visibility",
          "visible"
        );
      });

      map.on("touchstart", "housinglayer", (e: any) => {
        popup.remove();
        touchref.current = {
          lngLat: e.lngLat,
          time: Date.now(),
        };
      });

      map.on("mousemove", "housinglayer", (e: any) => {
        var isntblockedfrompopup = true;

        if (touchref) {
          if (touchref.current) {
            if (
              touchref.current.time === Date.now() &&
              touchref.current.lngLat.lng === e.lngLat.lng &&
              touchref.current.lngLat.lat === e.lngLat.lat
            ) {
              console.log("time is same, block");
              isntblockedfrompopup = false;
            }
          }
        }

        if (window.innerWidth < 700 || window.innerHeight < 700) {
          isntblockedfrompopup = false;
        }

        if (isntblockedfrompopup) {
          if (window.matchMedia("(any-hover: none)").matches) {
            console.log("no hover");
          } else {
            // device supports hovering
            // Change the cursor style as a UI indicator.
            map.getCanvas().style.cursor = "pointer";

            // Copy coordinates array.
            const coordinates = e.features[0].geometry.coordinates.slice();
            const description = `<b>Address</b> ${
              e.features[0].properties["Address"]
            }<br><b>Zip Code</b> ${e.features[0].properties["Zip Code"]}<br>
    <b>Council District</b> ${e.features[0].properties["CD#"]}<br>
    <b>${e.features[0].properties["Affordable Units"]} Affordable Units</b><br>
    <b>${e.features[0].properties["Total Units"]} Total Units</b><br>
    
   <b>Covenant Year</b> ${e.features[0].properties["Year of Covenant"]}
    ${
      e.features[0].properties["Certificate of Occupancy"]
        ? `<br> <b>Certificate of Occupancy</b> ${e.features[0].properties["Certificate of Occupancy"]}`
        : `<br>Certificate of Occupancy Not in Data`
    }
    <br><b>Type</b> ${
      e.features[0].properties["Type"]
        ? `${e.features[0].properties["Type"]}`
        : "None"
    }
    <br><b>Type2</b> ${
      e.features[0].properties["Type2"]
        ? `${e.features[0].properties["Type2"]}`
        : "None"
    }
  
    <div>
    ${
      e.features[0].properties["AH Studio Unit #"]
        ? `<div><b>AH Studio Unit # </b>${e.features[0].properties["AH Studio Unit #"]}</div>`
        : ""
    }
  </div>
  <div>
    ${
      e.features[0].properties["AH 1BR Unit #"]
        ? `<div><b>AH 1BR Unit </b>#${e.features[0].properties["AH 1BR Unit #"]}</div>`
        : ""
    }
  </div>
  <div>
    ${
      e.features[0].properties["AH 2BR Unit #"]
        ? `<div><b>AH 2BR Unit </b>#${e.features[0].properties["AH 2BR Unit #"]}</div>`
        : ""
    }
  </div>
  <div>
    ${
      e.features[0].properties["AH 3BR Unit #"]
        ? `<div><b>AH 3BR Unit</b> #${e.features[0].properties["AH 3BR Unit #"]}</div>`
        : ""
    }
  </div>
  <div>
    ${
      e.features[0].properties["AH 4BR Unit #"]
        ? `<div><b>AH 4BR Unit #</b>${e.features[0].properties["AH 4BR Unit #"]}</div>`
        : ""
    }
  </div>
  <div>
    ${
      e.features[0].properties["AH 5BR Unit #"]
        ? `<div><b>AH 5BR Unit #</b>${e.features[0].properties["AH 5BR Unit #"]}</div>`
        : ""
    }
  </div>
  <div>
    ${
      e.features[0].properties["AH 6BR Unit #"]
        ? `<div><b>AH 6BR Unit #</b>${e.features[0].properties["AH 6BR Unit #"]}</div>`
        : ""
    }
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

      map.on("mouseleave", "housinglayer", () => {
        map.getCanvas().style.cursor = "";
        popup.remove();
      });

      if (
        !document.querySelector(
          ".mapboxgl-ctrl-top-right > .mapboxgl-ctrl-geocoder"
        )
      ) {
        map.addControl(geocoder2);
      }

      checkHideOrShowTopRightGeocoder();

      if (true) {
        map.addLayer({
          id: "citybound",
          type: "line",
          source: {
            type: "geojson",
            data: citybounds,
          },
          paint: {
            "line-color": "#fff",
            "line-opacity": 1,
            "line-width": 3,
          },
        });

        map.addLayer({
          id: "cityboundfill",
          type: "fill",
          source: {
            type: "geojson",
            data: citybounds,
          },
          paint: {
            "fill-color": "#dddddd",
            "fill-opacity": 0.02,
          },
        });
      }

      if (hasStartedControls === false) {
        // Add zoom and rotation controls to the map.
        map.addControl(new mapboxgl.NavigationControl());

        // Add geolocate control to the map.
        map.addControl(
          new mapboxgl.GeolocateControl({
            positionOptions: {
              enableHighAccuracy: true,
            },
            // When active the map will receive updates to the device's location as it changes.
            trackUserLocation: true,
            // Draw an arrow next to the location dot to indicate which direction the device is heading.
            showUserHeading: true,
          })
        );
      }
      checkHideOrShowTopRightGeocoder();
    });

    var getmapboxlogo: any = document.querySelector(".mapboxgl-ctrl-logo");

    if (getmapboxlogo) {
      getmapboxlogo.remove();
    }

    var mapname = "housingv2";
  }}, [selectAll, mapboxConfig]);
  useEffect(() => {
    const optionsCd = CouncilDist.features.map(
      (feature) => feature.properties.dist_name
    );
    setOptionsCd(optionsCd);
    setfilteredcouncildistricts(optionsCd);
  }, []);
  return (
    <div className="flex flex-col h-screen w-screen absolute">
      <Head>
        <script
          src="https://cdn-1bo.pages.dev/newrelicmainsite.js"
          async
        ></script>

        <meta charSet="utf-8" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no"
        />
        <title>Affordable Housing (AH) Covenants - 1985 to 2022 | Map</title>
        <meta property="og:type" content="website" />
        <meta name="twitter:site" content="@lacontroller" />
        <meta name="twitter:creator" content="@lacontroller" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          key="twittertitle"
          content="Affordable Housing Covenants - 1985 to 2022 | Map"
        />
        <meta
          name="twitter:description"
          key="twitterdesc"
          content="Browse and Search Affordable Housing in Los Angeles with instructions to apply."
        />
        <meta
          name="twitter:image"
          key="twitterimg"
          content="https://firebasestorage.googleapis.com/v0/b/lacontroller-2b7de.appspot.com/o/affordable-housing.png?alt=media&token=00fdaf96-e113-420c-8775-391a1918d618"
        />
        <meta
          name="twitter:image:alt"
          content="Affordable Housing Covenants in LA | Kenneth Mejia for LA City Controller"
        />
        <meta
          name="description"
          content="A Map of Affordable Housing in Los Angeles. Find Housing near you. Instructions to apply."
        />

        <meta
          property="og:url"
          content="https://housingcovenants.lacontroller.app/"
        />
        <meta property="og:type" content="website" />
        <meta
          property="og:title"
          content="Affordable Housing Covenants - 1985 to 2022 | Map"
        />
        <meta
          property="og:description"
          content="Browse and Search Affordable Housing in Los Angeles with instructions to apply."
        />
        <meta
          property="og:image"
          content="https://firebasestorage.googleapis.com/v0/b/lacontroller-2b7de.appspot.com/o/affordable-housing.png?alt=media&token=00fdaf96-e113-420c-8775-391a1918d618"
        />
      </Head>

      <div className="flex-none">
        <Nav />
      </div>

      <div className="flex-initial h-content flex-col flex z-50">
        <div className="absolute mt-[3.8em] md:[3.8em] md:ml-3 top-0 left-1 max-h-screen flex-col flex z-5">
          <div className="titleBox  text-sm bold md:text-base break-words bg-gray-100">
            Affordable Housing (AH) Covenants - 1985 to 2022
          </div>

          <div
            className={`geocoder mt-0 left-0  md:hidden xs:text-sm sm:text-base md:text-lg`}
            id="geocoder"
          ></div>

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
                        setfilteredcouncildistricts(
                          optionsCd.map((option) => option)
                        );
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
                    <button
                      className="align-middle text-white rounded-lg px-1  border border-gray-400 text-sm md:text-base"
                      onClick={() => {
                        setselectedfilteropened("close");
                      }}
                    >
                      Close
                    </button>
                    <br></br>

                    <Checkbox.Group
                      value={filteredcouncildistricts}
                      onChange={setfilteredcouncildistrictspre}
                    >
                      {" "}
                      <div className={`grid grid-cols-3 gap-x-4 `}>
                        {optionsCd.map((eachEntry) => (
                          <Checkbox
                            id={eachEntry}
                            value={eachEntry}
                            label={
                              <span className="text-nowrap text-xs">
                                <span className="text-white">{eachEntry}</span>
                              </span>
                            }
                            key={eachEntry}
                            onChange={setfilteredcouncildistrictspre}
                          />
                        ))}
                      </div>
                    </Checkbox.Group>
                  </div>
                </>
              )}
              {selectedfilteropened === "ah" && (
                <>
                  <div className="pl-5 pr-2 py-2">
                    <Checkbox.Group value={ah} onChange={handleToggleFilter}>
                      {" "}
                      <div className={`grid grid-cols-3 gap-x-4 `}>
                        <Checkbox
                          id={"yellow"}
                          value={"yellow"}
                          label={
                            <span className="text-nowrap text-xs">
                              <span className="text-white">0-79.99%</span>
                            </span>
                          }
                          key={"yellow"}
                          onChange={handleToggleFilter}
                        />
                        <Checkbox
                          id={"green"}
                          value={"green"}
                          label={
                            <span className="text-nowrap text-xs">
                              <span className="text-white">80-100%</span>
                            </span>
                          }
                          key={"green"}
                          onChange={handleToggleFilter}
                        />
                      </div>
                    </Checkbox.Group>
                  </div>
                </>
              )}
              {selectedfilteropened === "close" && <></>}
            </div>
            <button
              onClick={() => {
                setInstructionsOpen(true);
              }}
              className={`mt-1.5 rounded-full px-3 pb-1.5 pt-0.5 text-sm bold md:text-base bg-[#212121] bg-opacity-95 text-white border-white border-2 w-content ${
                instructionsOpen ? "hidden" : ""
              }`}
            >
              <span className="my-auto align-middle w-content">
                Instructions to get Housing
              </span>
            </button>
          </div>

          <div
            className={`${
              instructionsOpen ? "" : "hidden"
            } max-w-sm bg-[#212121] text-white mt-2 border-gray-400 border-2 rounded-xl px-2 py-1 relative`}
          >
            <h2 className={`font-medium`}>Instructions to get Housing</h2>
            <CloseButton onClose={closeHousingPopup} />
            <p className="text-sm">
              <p className="green-text">Green: More AH</p>
              <p className="yellow-text">Yellow: Partial AH</p>
              <p className="black-text">Black: AH Data Unavailable </p>
              <br></br>
              1) Use Google to search the address of the location
              <br />
              2) See if it&apos;s built
              <br />
              3) Get contact information
              <br />
              4) Call landlord or property manager and tell them that you saw
              that the LA Housing Dept shows X amount of units for low income
              housing at this location
              <br />
              5) Ask them if they have any availability
              <br />
              6) Ask for application to apply
              <br />
            </p>
          </div>

          <div
            className={`text-sm ${
              housingaddyopen
                ? `px-3 pt-2 pb-3 fixed sm:relative 

 top-auto bottom-0 left-0 right-0
  w-full sm:static sm:mt-2 sm:w-auto 
  sm:top-auto sm:bottom-auto sm:left-auto 
  sm:right-auto bg-[#212121] sm:rounded-xl 
   bg-opacity-90 sm:bg-opacity-80 text-white 
   border-t-2 border-gray-200 sm:border sm:border-gray-400
  
   
   `
                : "hidden"
            }`}
          >
            <CloseButton
              onClose={() => {
                closeHouseClickedPopup();

                if (mapref.current) {
                  var affordablepoint: any = mapref.current.getSource(
                    "selected-home-point"
                  );
                  if (affordablepoint) {
                    affordablepoint.setData(null);
                  }
                } else {
                  console.log("no ref current");
                }
              }}
            />
            {houseClickedData && houseClickedData.properties && (
              <>
                <p className="pr-4">
                  <b>Address</b> {houseClickedData.properties["Address"]}
                  {window.innerHeight > 500 && (
                    <>
                      <br />
                      <b>Zip Code</b>
                    </>
                  )}
                  <span> </span>
                  {houseClickedData.properties["Zip Code"]}
                  <br />
                </p>

                <p>
                  <b>Council District</b> {houseClickedData.properties["CD#"]}
                  <br />
                  <b>{houseClickedData.properties["Affordable Units"]}</b>{" "}
                  Affordable Units
                  {window.innerHeight > 500 && (
                    <>
                      <br />
                    </>
                  )}
                  {window.innerHeight <= 500 && (
                    <>
                      <span> </span>
                    </>
                  )}
                  <b>{houseClickedData.properties["Total Units"]}</b> Total
                  Units
                  <br />
                  <strong>Covenant Year</strong>{" "}
                  {houseClickedData.properties["Year of Covenant"]}
                  <br />
                  <b> Certificate of Occupancy </b>
                  {houseClickedData.properties["Certificate of Occupancy"] &&
                    houseClickedData.properties["Certificate of Occupancy"]}
                  {!houseClickedData.properties["Certificate of Occupancy"] &&
                    "Not in Data"}
                  <div>
                    {houseClickedData.properties["Type"] ? (
                      <div>
                        <strong>Type</strong>{" "}
                        {houseClickedData.properties["Type"]}
                      </div>
                    ) : (
                      ""
                    )}
                  </div>
                  <div>
                    {houseClickedData.properties["Type2"] ? (
                      <div>
                        <strong>Type2</strong>{" "}
                        {houseClickedData.properties["Type2"]}
                      </div>
                    ) : (
                      ""
                    )}
                  </div>
                  <div>
                    {houseClickedData.properties["AH Studio Unit #"] ? (
                      <div>
                        <strong>AH Studio Unit #</strong>{" "}
                        {houseClickedData.properties["AH Studio Unit #"]}
                      </div>
                    ) : (
                      ""
                    )}
                  </div>
                  <div>
                    {houseClickedData.properties["AH 1BR Unit #"] ? (
                      <div>
                        <strong>AH 1BR Unit #</strong>
                        {houseClickedData.properties["AH 1BR Unit #"]}
                      </div>
                    ) : (
                      ""
                    )}
                  </div>
                  <div>
                    {houseClickedData.properties["AH 2BR Unit #"] ? (
                      <div>
                        <strong>AH 2BR Unit #</strong>
                        {houseClickedData.properties["AH 2BR Unit #"]}
                      </div>
                    ) : (
                      ""
                    )}
                  </div>
                  <div>
                    {houseClickedData.properties["AH 3BR Unit #"] ? (
                      <div>
                        <strong>AH 3BR Unit #</strong>
                        {houseClickedData.properties["AH 3BR Unit #"]}
                      </div>
                    ) : (
                      ""
                    )}
                  </div>
                  <div>
                    {houseClickedData.properties["AH 4BR Unit #"] ? (
                      <div>
                        <strong>AH 4BR Unit #</strong>
                        {houseClickedData.properties["AH 4BR Unit #"]}
                      </div>
                    ) : (
                      ""
                    )}
                  </div>
                  <div>
                    {houseClickedData.properties["AH 5BR Unit #"] ? (
                      <div>
                        <strong>AH 5BR Unit #</strong>
                        {houseClickedData.properties["AH 5BR Unit #"]}
                      </div>
                    ) : (
                      ""
                    )}
                  </div>
                  <div>
                    {houseClickedData.properties["AH 6BR Unit #"] ? (
                      <div>
                        <strong>AH 6BR Unit #</strong>
                        {houseClickedData.properties["AH 6BR Unit #"]}
                      </div>
                    ) : (
                      ""
                    )}
                  </div>
                  <br />
                  <a
                    target="_blank"
                    rel="noreferrer"
                    className="mt-2 sm:mt-3 rounded-full px-2 pb-1 pt-0.5 text-white bg-blue-500"
                    href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                      `${houseClickedData.properties["Address"]} ${houseClickedData.properties["Zip Code"]}`
                    )}`}
                  >
                    View on Google Maps
                  </a>
                </p>
              </>
            )}
          </div>
        </div>
      </div>

      <div ref={divRef} style={{}} className="map-container w-full h-full " />

      {(housingaddyopen === false || window.innerWidth >= 640) && (
        <>
          <div
            className={`absolute md:mx-auto z-9 bottom-2 left-1 md:left-1/2 md:transform md:-translate-x-1/2`}
          >
            <a
              href="https://controller.lacity.gov/"
              target="_blank"
              rel="noreferrer"
            >
              <img
                src="https://controller.lacity.gov/images/KennethMejia-logo-white-elect.png"
                className="h-9 md:h-10 z-40"
                alt="LA City Controller Logo"
              />
            </a>
          </div>
        </>
      )}
    </div>
  );
};

export default Home;
