import React, { useState, useEffect,useRef } from 'react';
import  SceneView from "@arcgis/core/views/SceneView"
import Map from '@arcgis/core/Map'
import Home from '@arcgis/core/widgets/Home'
import ScaleBar from '@arcgis/core/widgets/ScaleBar'
import ElevationLayer from "@arcgis/core/layers/ElevationLayer";
import GraphicsLayer from "@arcgis/core/layers/GraphicsLayer"
import Locate from "@arcgis/core/widgets/Locate.js";
import Graphic from '@arcgis/core/Graphic'

const MyMap = ({ val }) => {

    const map = useRef(null)
    
    useEffect(()=>{
        if ("geolocation" in navigator) {
            console.log("Available");
            
          } else {
            console.log("Not Available");
          }
    },[])

    // const sym={
    //     type: "picture-marker",  // autocasts as new PictureMarkerSymbol()
    //     url: "img/gas.png",
    //     width: "26px",
    //     height: "43px"
    
    //     }
    // const sym1={
    //     type: "picture-marker",  // autocasts as new PictureMarkerSymbol()
    //     url: "img/neft.png",
    //     width: "65px",
    //     height: "43px"
    // }
    // const glResult1 =new GraphicsLayer({
    //     id:'glResult1'
    // }) 

    // const glResult2 =new GraphicsLayer({
    //     id:'glResult2'
    // }) 

    function changeLocation (con, zoom) {
        const map1 = new Map({
            basemap: "hybrid",
            ground: "world-elevation",
        });

        new SceneView({
            container: map.current,
            map: map1, 
        }).when((view) => { 
            view.goTo({
                center: con,
                zoom: zoom
            });
        })
    }

    useEffect(() => {
      
        switch(val){
            case 0:
                changeLocation([65.08086,41.86843],6)
            break;
            case 1:
                changeLocation([58.286170,43.271111],12)
            break;
            case 2:
                changeLocation([58.19976,43.017959],12)
            break;
            case 3:
                changeLocation([65.268902,39.170431],12)
                
            break;
            case 4:
                changeLocation([65.80970,39.27670],12)
            break;
            case 5:
                changeLocation([65.80549,38.45954],12)
            break;
        }
    
    }, [val])
    


  return (
    <div ref={map} className='viewDiv'>
        hey
    </div>
  )
}

export default MyMap