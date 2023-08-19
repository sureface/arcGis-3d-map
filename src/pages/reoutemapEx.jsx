import React, { useState, useEffect,useRef } from 'react';
import  SceneView from "@arcgis/core/views/SceneView"
import Map from '@arcgis/core/Map'
import Home from '@arcgis/core/widgets/Home'
import ScaleBar from '@arcgis/core/widgets/ScaleBar'
import ElevationLayer from "@arcgis/core/layers/ElevationLayer";
import GraphicsLayer from "@arcgis/core/layers/GraphicsLayer"
import Locate from "@arcgis/core/widgets/Locate.js";
import Graphic from '@arcgis/core/Graphic'
import RouteParameters from "@arcgis/core/rest/support/RouteParameters"
import FeatureSet from "@arcgis/core/rest/support/FeatureSet"
import * as route from "@arcgis/core/rest/route"
let leng=0
export const RouteMap= () => {
  
    const map= useRef(null)
    const [cordinate,setCordinate]=useState({
        lat:0,
        lon:0
    })


    useEffect(()=>{
        
        if ("geolocation" in navigator) {
           
            navigator.geolocation.getCurrentPosition(function(position) {
                setCordinate(
                    {
                        lat:position.coords.latitude,
                        lon:position.coords.longitude
                    }
                )
            
                // you can use pos to get location
              }, function() {
                // handle errors here if any
              });
            
          } else {
            console.log("Not Available");
          }
    },[])
    
    const sym={
        type: "picture-marker",  // autocasts as new PictureMarkerSymbol()
          url: "img/gas.png",
          width: "26px",
          height: "43px"
  }
  const sym1={
    type: "picture-marker",  // autocasts as new PictureMarkerSymbol()
      url: "img/neft.png",
      width: "65px",
      height: "43px"
}

   function changeLocation(cor, zoom){
    
    // const elevationLayer=new ElevationLayer({
    //     url: "https://sampleserver6.arcgisonline.com/arcgis/rest/services/Elevation/MtBaldy_Elevation/ImageServer",

    // })
    // const markerSymbol = {
    //     type: "point-3d", // autocasts as new PointSymbol3D()
    //     symbolLayers: [
    //       {
    //         type: "object", // autocasts as new ObjectSymbol3DLayer()
    //         width: 500,
    //         resource: {
    //           primitive: "sphere"
    //         },
    //         material: {
    //           color: [255, 0, 0]
    //         }
    //       }
    //     ]
    //   };
    // const routeLayer = new GraphicsLayer();
    // const map1 = new Map({
    //     basemap: "topo-vector",
    //     ground: "world-elevation",
    //     layers:[routeLayer]
    //   });

    // new SceneView({
    //     container:map.current,
    //     map:map1, 
    // }).when((view)=>{ view.goTo({ center:cor,
    //     zoom:zoom}) ;

    //     const routeUrl =
    //     "https://route-api.arcgis.com/arcgis/rest/services/World/Route/NAServer/Route_World";
  
  
    //    const routeParams = new RouteParameters({
    //       // An authorization string used to access the routing service
    //       apiKey: "AAPK5c2ff4e92c7e432aaab41b6403c8d32e2QaT4PuRnyaxnyiZ0aTU10fG7TMaU4VDpCXcD1GtryHEZMIVhhkNdyE2KKz-O0uC",
    //       stops: new FeatureSet(),
    //       outSpatialReference: {
    //         // autocasts as new SpatialReference()
    //         wkid: 3857
    //       }
    //     });
  
    //     // the symbol used to mark stops on the route
    //     const pathSymbol = {
    //       type: "line-3d", // autocasts as new LineSymbol3D()
    //       symbolLayers: [
    //         {
    //           type: "line", // autocasts as new PathSymbol3DLayer()
    //           size:3, // If only the width is given, the height is set to the same value.
    //           material: {
    //             color: [255, 128, 0]
    //           }
    //         }
    //       ]
    //     };
    //     const stop = new Graphic({
    //       geometry: {
    //         type:'point',
    //         latitude:38.45954, //[65.80549,38.45954]
    //         longitude:65.80549,
    //     },
    //       symbol: markerSymbol
    //     });
    //     const stop1 = new Graphic({
    //       geometry: {
    //         type:'point',
    //         latitude:39.170431,
    //         longitude:65.268902,//[65.268902,39.170431]
    //     },
    //       symbol: markerSymbol
    //     });
    //     routeLayer.add(stop);
    //     routeLayer.add(stop1);
    //     // Update the route and execute it if 2 or more stops are input
    //     routeParams.stops.features.push(stop);
    //     routeParams.stops.features.push(stop1);
    //     if (routeParams.stops.features.length >= 2) {
    //       route
    //         .solve(routeUrl, routeParams)
    //         .then(onRouteUpdated)
    //         .catch((error) => {
    //           // if it fails, print the error to the console and remove the recently added point
    //           routeLayer.remove(stop);
    //           routeParams.stops.features.pop();
    //           console.error(error);
    //         });
    //     }
    //     function onRouteUpdated(data) {
    //       const route = data.routeResults[0].route;
    //       const geometry = route.geometry;
      
    //       // do the actual elevation query
    //       const elevationPromise = map.ground.queryElevation(geometry);
      
    //       elevationPromise.then(
    //         (result) => {
    //           // compute the total ascent and descent
    //           let ascent = 0;
    //           let descent = 0;
    //           for (let j = 0; j < result.geometry.paths.length; j++) {
    //             const path = result.geometry.paths[j];
    //             for (let i = 0; i < path.length - 1; i++) {
    //               const d = path[i + 1][2] - path[i][2];
    //               if (d > 0) {
    //                 ascent += d;
    //               } else {
    //                 descent -= d;
    //               }
    //             }
    //           }
      
             
      
    //           // add a path symbol following the calculated route to the scene
    //           view.add(
    //             new Graphic({
    //               geometry: result.geometry,
    //               symbol: pathSymbol
    //             })
    //           );
    //         },
    //         (error) => {
    //           console.error(error);
    //         }
    //       );
    //     }
    //     let graph=new Graphic({
    //         geometry:{
    //             type:'point',
    //             latitude:38.45954, //[65.80549,38.45954]
    //             longitude:65.80549,
    //         },
    //         symbol:sym,
    //         popupTemplate:{
    //             title :"Sho'rtan gaz koni",
              
    //             content:[{ type:'text',text: "<b>Nomi:</b><ul><li>Sho'rtan</li></ul><b>Joylashuv</b>:<ul> <li><i>38.45954</i></li><li><i>65.80549</i></li></ul><b>Ma'lumot:</b><ul><li>Qashqadaryo viloyatidagi kon. Qarshi shahridan 40 km jan.sharqda. 1974-yilda ochilgan. Chorjoʻy tektonik pogʻonasiga tegishli Beshkent egilmasida braxiantiklinal koʻrinishidagi Shoʻrtan strukturasida joylashgan. Yuqori yura davrining kelloveyoksford yotqiziqlari mahsuldor hisoblanadi. Gazkondensat 15NR, 15R va 15PR gorizontlarida ochilgan. Gorizontlar kulrang ohaktoshlardan hamda zichlashgan, darzli, dolomitlashgan ohaktoshlardan iborat, qalinligi 316–542 m. Gazli qismining foydali qalinligi 118 m. Gaz uyumidan yuqorida joylashgan qalinligi 341–546 m boʻlgan kimerijtiton tuz jinslari regional qopqoq vazifasini oʻtaydi. Mahsuldor qatlam 2735–3170 m chuqurlikda yotadi. Suv tarkibi xlorkaltsiyli, minerallashganligi 122,1 — 129,0 g/l. 1999-yilgacha olingan tabiiy gaz miqdori 245,2 mlrd. m³, gaz kondensati 12,4 mln. t. Kondagi gazda etan miqdori yuqori, gazni qayta ishlab, bu qimmatbaho elementni ajratib olish maqsadga muvofiq. Etan polimer, kauchuk, boʻyoq va doridarmonlar olishda asosiy xom ashyo hisoblanadi. Shoʻrtan gazidan ajratib olingan etanni qayta ishlab, polietilen olish maqsadida Shoʻrtan gazkimyo majmuasi bunyod etildi</li></ul><b>"},{
    //             type:'media',
    //             mediaInfos: [ {
    //                 title: "<b>Sho'rtan gaz</b>",
    //                 type: "image", // Autocasts as new ImageMediaInfo object
    //                 caption: "tree species",
    //                 // Autocasts as new ImageMediaInfoValue object
    //                 value: {
    //                   sourceURL: "https://storage.kun.uz/source/8/rZqfu16DvcBvzXXL48Y2zzJR5C0MCV6e.jpeg"
    //                 }
    //               }]
    //             }],

    //         }
            
    //     }) 
       
        
       
    //     let graph1=new Graphic({
    //         geometry:{
    //             type:'point',
    //             latitude:39.170431,
    //             longitude:65.268902,//[65.268902,39.170431]
    //         },
    //         symbol:sym,
    //         popupTemplate:{
    //             title :"Muborak gaz koni",
              
    //             content:[{ type:'text',text: "<b>Nomi:</b><ul><li>Muborak</li></ul><b>Joylashuv</b>:<ul> <li><i>39.170431</i></li><li><i>65.268902</i></li></ul><b>Ma'lumot:</b><ul><li> Muborak shahri yaqinidagi Janubiy va Shimoliy Muborak konlari. Janubiy Muborak gaz-kondensat koni Muborak shahridan 15–20 km jan.-sharkda joylashgan. Kon strukturasi 1955-yilda L. G. Cherkashina va N. I. Kamoliddinovlarning seysmik tadqiqotlari natijasida aniqlangan. Konning gazliligi kuyi boʻrga mansub 12- va 13-gorizontlar bilan bogʻliq. 12mahsuldor gorizont 1160–1470 m chuqurlikda joylashgan va qumtosh va alevrolitlardan tashkil topgan. Umumiy qalinligi 62–67 m, samarali qalinligi 16–27 m, ochiq gʻovakliligi 18—22%, samarali gʻovakliligi 12—18%, oʻtkazuvchanligi 125— 578 millidarsini tashkil etadi. Uyumning uz. 12,6 km, eni 4,3 km va qalinligi 130 m. Gaz zichligi 0,640 (xavoga nisbatan), tarkibidagi metan 85— 93%, SO2 gazi 0,1 — 1,5%, azot va nodirgazlar 1,8—5%. Kondensatning zichligi 0,74; qovushokligi 1,03 santipuz, tarkibidagi oltingugurt 0,03%. Gaz tarkibida erigan kondensat miqdori 95 sm³/m3. 13-gorizont 1230–1450 m chuqurlikda joylashgan boʻlib, asosan, qumtosh, gravelit, gil va qisman mergeldan tuzilgan. Umumiy kalinligi 80 m gacha, samarali qalinligi 30 m, ochiq gʻovakliligi 16—24%, samarali gʻovakliligi 12—18%, oʻtkazuvchanligi 298 millidarsi. Uyumning uz. 10 km, eni 3,75 km, qalinligi 82 m. Boshlangʻich qatlam bosimi 133 atm, temperaturasi 65°. Gazning zichligi 0,63 (havoga nisbatan) va tarkibidagi metan 84,8—92,7%, ogʻir uglevodorodlar 7—8%, azot va nodir gazlar 2—5,8%, kondensat miqdori 80,6 sm³/m3. 12—13-gorizontlardagi kondensat fizikkimyoviy xossalari boʻyicha bir xil.</li></ul><b>"},{
    //             type:'media',
    //             mediaInfos: [ {
    //                 title: "<b>Muborak gaz</b>",
    //                 type: "image", // Autocasts as new ImageMediaInfo object
    //                 caption: "tree species",
    //                 // Autocasts as new ImageMediaInfoValue object
    //                 value: {
    //                   sourceURL: "https://static.zarnews.uz/crop/3/c/720__80_3c2cd2e139519c9e69c3ed8ed902566b.jpg?img=self&v=1588986023"
    //                 }
    //               }]
    //             }],

    //         }
            
    //     })
      
    //     let graph2=new Graphic({
    //         geometry:{
    //             type:'point',
    //             latitude:43.21043,
    //             longitude:56.96536,//[56.96536,43.21043]
    //         },
    //         symbol:sym,
    //         popupTemplate:{
    //             title :"Ustyurt gaz",
              
    //             content:[{ type:'text',text: "<b>Nomi:</b><ul><li>Ustyurt</li></ul><b>Joylashuv</b>:<ul> <li><i>43.21043</i></li><li><i>56.96536</i></li></ul><b>Ma'lumot:</b><ul><li> Ustyurt (qozoqcha: Үстірт, qoraqalpoqcha: Ústirt) — Oʻzbekistonning shimoli-gʻarbi (Qoraqalpogʻiston) va Qozogʻiston hududlaridagi plato. Sharqda Orol dengizi va Amudaryo deltasi, gʻarbda Mangʻishloq yarim orol va Qoraboʻgʻozgoʻl qoʻltigʻi, shimolida Kaspiyboʻyi pasttekisligi oraligʻida joylashgan. Maydoni 200 ming km². Oʻrtacha balandligi 150–250 m, eng baland joyi (370 m) janubi-gʻarbida. Ustyurtning atrofi 60–150 m li tik jarlik (chink)lardan iborat. Chinklar har xil chuqurlikdagi jar va soylar bilan kesilgan. Ustyurtning shimoliy chinklari shimoliy gʻarbda Oʻlikqoʻltiq shoʻrligidan boshlanib, shimolida Katta Boʻrsiq qumligiga borib taqaladi. Platoning baland sharqiy chegarasi Orol dengizining avvalgi qirgʻogʻi va Amudaryo deltasidan, janubiy chinklari Qoraqum choʻli va Oʻzboy oʻzani, gʻarbiy chinklari esa Koraboʻgʻozgoʻl qoʻltigʻining gʻarbiy sohili, Qorniyoriq botigʻi, Qaydak shoʻrligi orqali oʻtadi.</li></ul><b>"},{
    //             type:'media',
    //             mediaInfos: [ {
    //                 title: "<b>Ustyurt gaz</b>",
    //                 type: "image", // Autocasts as new ImageMediaInfo object
    //                 caption: "tree species",
    //                 // Autocasts as new ImageMediaInfoValue object
    //                 value: {
    //                   sourceURL: "https://www.gazeta.uz/media/img/2022/05/Bh3XwK16526799246699_b.jpg"
    //                 }
    //               }]
    //             }],

    //         }
            
    //     }) 
    //     let graph3=new Graphic({
    //         geometry:{
    //             type:'point',
    //             latitude:43.51043,
    //             longitude:57.29536,//[57.29536,43.51043]
    //         },
    //         symbol:sym1,
    //         popupTemplate:{
    //             title :"Ustyurt neft",
              
    //             content:[{ type:'text',text: "<b>Nomi:</b><ul><li>Ustyurt</li></ul><b>Joylashuv</b>:<ul> <li><i>43.21043</i></li><li><i>56.96536</i></li></ul><b>Ma'lumot:</b><ul><li> Ustyurt (qozoqcha: Үстірт, qoraqalpoqcha: Ústirt) — Oʻzbekistonning shimoli-gʻarbi (Qoraqalpogʻiston) va Qozogʻiston hududlaridagi plato. Sharqda Orol dengizi va Amudaryo deltasi, gʻarbda Mangʻishloq yarim orol va Qoraboʻgʻozgoʻl qoʻltigʻi, shimolida Kaspiyboʻyi pasttekisligi oraligʻida joylashgan. Maydoni 200 ming km². Oʻrtacha balandligi 150–250 m, eng baland joyi (370 m) janubi-gʻarbida. Ustyurtning atrofi 60–150 m li tik jarlik (chink)lardan iborat. Chinklar har xil chuqurlikdagi jar va soylar bilan kesilgan. Ustyurtning shimoliy chinklari shimoliy gʻarbda Oʻlikqoʻltiq shoʻrligidan boshlanib, shimolida Katta Boʻrsiq qumligiga borib taqaladi. Platoning baland sharqiy chegarasi Orol dengizining avvalgi qirgʻogʻi va Amudaryo deltasidan, janubiy chinklari Qoraqum choʻli va Oʻzboy oʻzani, gʻarbiy chinklari esa Koraboʻgʻozgoʻl qoʻltigʻining gʻarbiy sohili, Qorniyoriq botigʻi, Qaydak shoʻrligi orqali oʻtadi.</li></ul><b>"},{
    //             type:'media',
    //             mediaInfos: [ {
    //                 title: "<b>Ustyurt neft</b>",
    //                 type: "image", // Autocasts as new ImageMediaInfo object
    //                 caption: "tree species",
    //                 // Autocasts as new ImageMediaInfoValue object
    //                 value: {
    //                   sourceURL: "https://www.gazeta.uz/media/img/2022/05/Bh3XwK16526799246699_b.jpg"
    //                 }
    //               }]
    //             }],

    //         }
            
    //     }) 
    //     let graph4=new Graphic({
    //         geometry:{
    //             type:'point',
    //             latitude:39.27670,
    //             longitude:65.80970,//[57.29536,43.51043]
    //         },
    //         symbol:sym1,
    //         popupTemplate:{
    //             title :"Muborak neft",
              
    //             content:[{ type:'text',text: "<b>Nomi:</b><ul><li>Muborak</li></ul><b>Joylashuv</b>:<ul> <li><i>43.21043</i></li><li><i>56.96536</i></li></ul><b>Ma'lumot:</b><ul><li> Ustyurt (qozoqcha: Үстірт, qoraqalpoqcha: Ústirt) — Oʻzbekistonning shimoli-gʻarbi (Qoraqalpogʻiston) va Qozogʻiston hududlaridagi plato. Sharqda Orol dengizi va Amudaryo deltasi, gʻarbda Mangʻishloq yarim orol va Qoraboʻgʻozgoʻl qoʻltigʻi, shimolida Kaspiyboʻyi pasttekisligi oraligʻida joylashgan. Maydoni 200 ming km². Oʻrtacha balandligi 150–250 m, eng baland joyi (370 m) janubi-gʻarbida. Ustyurtning atrofi 60–150 m li tik jarlik (chink)lardan iborat. Chinklar har xil chuqurlikdagi jar va soylar bilan kesilgan. Ustyurtning shimoliy chinklari shimoliy gʻarbda Oʻlikqoʻltiq shoʻrligidan boshlanib, shimolida Katta Boʻrsiq qumligiga borib taqaladi. Platoning baland sharqiy chegarasi Orol dengizining avvalgi qirgʻogʻi va Amudaryo deltasidan, janubiy chinklari Qoraqum choʻli va Oʻzboy oʻzani, gʻarbiy chinklari esa Koraboʻgʻozgoʻl qoʻltigʻining gʻarbiy sohili, Qorniyoriq botigʻi, Qaydak shoʻrligi orqali oʻtadi.</li></ul><b>"},{
    //             type:'media',
    //             mediaInfos: [ {
    //                 title: "<b>Muborak neft</b>",
    //                 type: "image", // Autocasts as new ImageMediaInfo object
    //                 caption: "tree species",
    //                 // Autocasts as new ImageMediaInfoValue object
    //                 value: {
    //                   sourceURL: "https://www.gazeta.uz/media/img/2022/05/Bh3XwK16526799246699_b.jpg"
    //                 }
    //               }]
    //             }],

    //         }
            
    //     }) 
    //     let locateWidget = new Locate({
    //         view: view,   // Attaches the Locate button to the view
    //         graphic: new Graphic({
    //           symbol: { type: "simple-marker" }  // overwrites the default symbol used for the
    //           // graphic placed at the location of the user when found
    //         })
    //       });
    //     // let graph3=new Graphic({
    //     //     geometry:{
    //     //         type:'point',
    //     //         latitude:cor[1],
    //     //         longitude:cor[0],
    //     //     },
    //     //     symbol:{
    //     //         type:"simple-marker",
    //     //         color:"red",
    //     //         size:12
    //     //     },
    //     //     popupTemplate:{
    //     //         title :"Siz kiritgan joylashuv",
              
    //     //         content:[{ type:'text',text: `<b>Joylashuv</b>:<ul> <li><i>${cor[1]}</i></li><li><i>${cor[0]}</i></li></ul>`}     
    //     //         ],

    //     //     }
            
    //     // }) 
    //     view.ui.add(
    //         new Home({
    //             view:view,

    //         }),
    //         'top-left'
    //     )
    //     view.ui.add(locateWidget, "top-right");
    //     view.ui.add(
    //         new ScaleBar({
    //             view:view,

    //         }),
    //         'top-right'
    //     )
      
    // //    const layer=view.map.findLayerById("glResult1")
    // //    const loc={
    // //     name:"Muborak",

    // //    }
    //     map1.ground.surfaceColor = '#004C73';
        
 

    //     map1.ground.layers.add(elevationLayer);
    //     view.graphics.add(graph);  view.graphics.add(graph1); view.graphics.add(graph2); view.graphics.add(graph3); view.graphics.add(graph4); })
   
   
    }

    const routeUrl =
    "https://route-api.arcgis.com/arcgis/rest/services/World/Route/NAServer/Route_World";

  // The stops and route result will be stored in this layer
  const routeLayer = new GraphicsLayer();

  const map1 = new Map({
    basemap: "hybrid",
    ground: "world-elevation",
    layers: [routeLayer] // Add the route layer to the map
  });

  const view = new SceneView({
    container: map.current,
    map: map1,
    center: [65.08086,41.86843],
    zoom: 6
  });

  // prepare the route parameters
  

  // the symbol used to mark stops on the route
  const markerSymbol = {
    type: "point-3d", 
    // autocasts as new PointSymbol3D()
    symbolLayers: [
      {
        type: "object", // autocasts as new ObjectSymbol3DLayer()
        size:3,
        resource: {
          primitive: "sphere"
        },
        material: {
          color: [0, 255, 0]
        }
      }
    ]
  };
  const simpleLineSymbol = {
    type: "simple-line",
    color: [0, 0, 0], // Orange
    width: 2
 };

  // the symbol used to mark the paths between stops
  const pathSymbol = {
    type: "line-3d", // autocasts as new LineSymbol3D()
    symbolLayers: [
      {
        type: "line", // autocasts as new PathSymbol3DLayer()
        size:3, // If only the width is given, the height is set to the same value.
        material: {
          color: [0, 128, 255]
        }
      }
    ]
  };

  // Adds a graphic when the user clicks the map. If 2 or more points exist, route is solved.
 

  function addStop(lat,lon,gaz) {
  
    const routeParams = new RouteParameters({
        // An authorization string used to access the routing service
        apiKey: "AAPK5c2ff4e92c7e432aaab41b6403c8d32e2QaT4PuRnyaxnyiZ0aTU10fG7TMaU4VDpCXcD1GtryHEZMIVhhkNdyE2KKz-O0uC",
        stops: new FeatureSet(),
        outSpatialReference: {
          // autocasts as new SpatialReference()
          wkid: 3857
        }
      });
    // Add a marker at the location of the map click
    const stop = new Graphic({
      geometry: {
        type:'point',
        latitude:cordinate.lat, //[65.80549,38.45954]
        longitude:cordinate.lon,
    },
      symbol:markerSymbol
    });
    const stop1 = new Graphic({
      geometry: {
        type:'point',
        latitude:lat,
        longitude:lon,//[65.268902,39.170431]
    },
      symbol: gaz?sym:sym1
    });
    routeLayer.removeAll()
    routeLayer.add(stop);
    routeLayer.add(stop1);
    // Update the route and execute it if 2 or more stops are input
    
    routeParams.stops.features.push(stop);
    routeParams.stops.features.push(stop1);
    if (routeParams.stops.features.length >= 2) {
      route
        .solve(routeUrl, routeParams)
        .then(onRouteUpdated)
        .catch((error) => {
          // if it fails, print the error to the console and remove the recently added point
          routeLayer.remove(stop);
          routeParams.stops.features.pop();
          console.error(error);
        });
    }
  }

  function onRouteUpdated(data) {
    const route = data.routeResults[0].route;
    const geometry = route.geometry;

    // do the actual elevation query
    const elevationPromise = map1.ground.queryElevation(geometry);

    elevationPromise.then(
      (result) => {
        // compute the total ascent and descent
        let ascent = 0;
        let descent = 0;
        for (let j = 0; j < result.geometry.paths.length; j++) {
          const path = result.geometry.paths[j];
          for (let i = 0; i < path.length - 1; i++) {
            const d = path[i + 1][2] - path[i][2];
            if (d > 0) {
              ascent += d;
            } else {
              descent -= d;
            }
          }
        }
      
    
        document.getElementById("distanceDiv").innerHTML =
          "Masofa: " +
          Math.round(route.attributes.Total_Kilometers * 1000) / 1000 +
          " km";
     

        // add a path symbol following the calculated route to the scene
        routeLayer.add(
          new Graphic({
            geometry: result.geometry,
            symbol: pathSymbol
          })
        );
      },
      (error) => {
        console.error(error);
      }
    );
  }

  

  
    return (
        <div class="row" style={{'padding':'0px'}} >
  {/* <div class="col-md-3"> <div><input class="form-control " onChange={(e)=>setLat(e.target.value)} placeholder="Latitude"  name="number" style={{  "width": "100%","marginTop":"10px" }}
        type="number" />
        <input class="form-control " onChange={(e)=>setLon(e.target.value)} placeholder="Longitude"  name="number" style={{  "width": "100%","marginTop":"10px" }}
                                                            type="number" />
                                                            <button onClick={ ()=>changeLocation([parseFloat(lon),parseFloat(lat)])} class="btn btn-outline-primary" style={{"marginTop":"10px","width":"100%"}}>Chiqarish</button>
                                                            <button onClick={ ()=>changeLocation([65.80549,38.45954])} class="btn btn-outline-success" style={{"marginTop":"50px","width":"100%"}}>Sho'rtan gaz</button>
                                                            <button onClick={ ()=>changeLocation([65.268902,39.170431])} class="btn btn-outline-success" style={{"marginTop":"10px","width":"100%"}}>Muborak gaz</button>
                                                           
        </div></div> */}
  <div class="col-md-8"  style={{'padding':'0px'}}> 
  
   <div ref={map} style={{"height":"100vh", "width":"100%", "margin":"0px","padding":'0px'}}>


  {/* {view && ( 
  <>
   <MapWidget view={view}/>
   {/* <MapGraphics view={view} cordinate={cordinate}/> 
  </>
 )}   */}

     </div></div>
     <div class="col-md-4">
        <h2 id='distanceDiv'>Masofa: {leng} km</h2>
    <div style={{"marginTop":"60px"}}>
    <button style={{"width":"100%","marginTop":"10px"}} class="btn btn-default"   onClick={(e)=>addStop(39.170431,65.268902,true)}>Muborak gaz</button>
      <button style={{"width":"100%","marginTop":"10px"}} class="btn btn-default"   onClick={(e)=>addStop(39.27670,65.80970,false)}>Muborak neft</button>
      <button style={{"width":"100%","marginTop":"10px"}} class="btn btn-default"   onClick={(e)=>addStop(43.271111,58.286170,true)}>Ustyurt gaz</button>
      <button style={{"width":"100%","marginTop":"10px"}} class="btn btn-default"   onClick={(e)=>addStop(43.017959,58.19976,false)}>Ustyurt neft</button>
      <button style={{"width":"100%","marginTop":"10px"}} class="btn btn-default"   onClick={(e)=>addStop(38.45954,65.80549,true)}>Sho'rtan gaz</button>
    </div>
     </div>

            

</div>
        
    )

};



