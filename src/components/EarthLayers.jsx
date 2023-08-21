import React, { useEffect, useRef } from 'react'
import Map from '@arcgis/core/Map'
import MapView from "@arcgis/core/views/MapView"
import WebTileLayer from "@arcgis/core/layers/WebTileLayer"
import Basemap from "@arcgis/core/Basemap"
import LocalBasemapsSource from "@arcgis/core/widgets/BasemapGallery/support/LocalBasemapsSource"
import BasemapGallery from "@arcgis/core/widgets/BasemapGallery"

const EarthLayers = () => {

    const currentMap = useRef(null)


    useEffect(() => {

        var map = new Map({
            basemap: "topo-vector", // or any other basemap
        });


           
        const view = new MapView({
            container: currentMap.current,
            map: map,
            center: [-86.049, 38.485],
            zoom: 3
          });
          
          const terrainLayer = new WebTileLayer({ 
            urlTemplate: 'http://stamen-tiles-{subDomain}.a.ssl.fastly.net/terrain/{level}/{col}/{row}.png',
            subDomains: ["a","b","c","d"],
            copyright: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          });
      
          const terrain = new Basemap({
            baseLayers: [terrainLayer],
            title: "Stamen Terrain",
            id: "terrain",
            thumbnailUrl: "http://www.arcgis.com/sharing/rest/content/items/d9118dcf7f3c4789aa66834b6114ec70/info/thumbnail/terrain.png"
          });     
      
          const positronLayer = new WebTileLayer({
            urlTemplate: 'http://{subDomain}.basemaps.cartocdn.com/light_all/{level}/{col}/{row}.png',
            subDomains: ["a","b","c"],
            copyright: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="http://cartodb.com/attributions">CartoDB</a>'
          });
      
          const positron = new Basemap({
            baseLayers: [positronLayer],
            title: "Carto Positron",
            id: "positron",
            thumbnailUrl: "https://www.arcgis.com/sharing/rest/content/items/f8a0c739823e4f5d88bb78a2d5cd467f/info/thumbnail/ago_downloaded.png"
          });   
          
          const localSource = new LocalBasemapsSource({
            basemaps : [positron, terrain]
          });
      
          const basemapGallery = new BasemapGallery({
            view: view,
            container: document.createElement("div"),
            source: localSource,
            activeBasemap: positron
          });
      
          view.ui.add(basemapGallery, "top-right");
    
    }, [])




  return (
    <div ref={currentMap} className='viewDiv'>

    </div>
  )
}

export default EarthLayers