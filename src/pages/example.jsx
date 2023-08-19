import React, { useState, useEffect,useRef } from 'react';
import  SceneView from "@arcgis/core/views/SceneView"
import Map from '@arcgis/core/Map'
import Home from '@arcgis/core/widgets/Home'
import ScaleBar from '@arcgis/core/widgets/ScaleBar'
import ElevationLayer from "@arcgis/core/layers/ElevationLayer";
import GraphicsLayer from "@arcgis/core/layers/GraphicsLayer"
import Locate from "@arcgis/core/widgets/Locate.js";
import Graphic from '@arcgis/core/Graphic'


import Chart from './Chart';
import Chart1 from './Chart1';
import Chart2 from './Chart2';
import Barchart from './chart/Barchart';
import Linechart from './chart/LineChart';
import LineBar1 from './chart/LineBar1';
import Scatter from './chart/Scatter';
import Cookies from "js-cookie";
export const MyMap= ({val,mapV}) => {
  
    const map= useRef(null)
    const [cordinate,setCordinate]=useState([65.80549,38.45954])
    const [lon,setLon]=useState(0)
    const [lat,setLat]=useState(0)
    useEffect(()=>{
        if ("geolocation" in navigator) {
            console.log("Available");
            
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
    const glResult1 =new GraphicsLayer({
        id:'glResult1'
    }) 

    const glResult2 =new GraphicsLayer({
        id:'glResult2'
    }) 
    
   function changeLocation(cor, zoom){
    const elevationLayer=new ElevationLayer({
        url: "https://sampleserver6.arcgisonline.com/arcgis/rest/services/Elevation/MtBaldy_Elevation/ImageServer",

    })
    const map1 = new Map({
        basemap: "hybrid",
        ground: "world-elevation",
        layers:[glResult1,glResult2]
      });
     
    new SceneView({
        container:map.current,
        map:map1, 
    }).when((view)=>{ view.goTo({ center:cor,
        zoom:zoom}) ;
        let graph =  new Graphic({
            geometry:{
                type:'point',
                latitude:38.45954, //[65.80549,38.45954]
                longitude:65.80549,
            },
            symbol:sym,
            popupTemplate:{
                title :"Sho'rtan gaz koni",
              
                content:[{ type:'text',text: "<b>Nomi:</b><ul><li>Sho'rtan</li></ul><b>Joylashuv</b>:<ul> <li><i>38.45954</i></li><li><i>65.80549</i></li></ul><b>Ma'lumot:</b><ul><li>Qashqadaryo viloyatidagi kon. Qarshi shahridan 40 km jan.sharqda. 1974-yilda ochilgan. Chorjoʻy tektonik pogʻonasiga tegishli Beshkent egilmasida braxiantiklinal koʻrinishidagi Shoʻrtan strukturasida joylashgan. Yuqori yura davrining kelloveyoksford yotqiziqlari mahsuldor hisoblanadi. Gazkondensat 15NR, 15R va 15PR gorizontlarida ochilgan. Gorizontlar kulrang ohaktoshlardan hamda zichlashgan, darzli, dolomitlashgan ohaktoshlardan iborat, qalinligi 316–542 m. Gazli qismining foydali qalinligi 118 m. Gaz uyumidan yuqorida joylashgan qalinligi 341–546 m boʻlgan kimerijtiton tuz jinslari regional qopqoq vazifasini oʻtaydi. Mahsuldor qatlam 2735–3170 m chuqurlikda yotadi. Suv tarkibi xlorkaltsiyli, minerallashganligi 122,1 — 129,0 g/l. 1999-yilgacha olingan tabiiy gaz miqdori 245,2 mlrd. m³, gaz kondensati 12,4 mln. t. Kondagi gazda etan miqdori yuqori, gazni qayta ishlab, bu qimmatbaho elementni ajratib olish maqsadga muvofiq. Etan polimer, kauchuk, boʻyoq va doridarmonlar olishda asosiy xom ashyo hisoblanadi. Shoʻrtan gazidan ajratib olingan etanni qayta ishlab, polietilen olish maqsadida Shoʻrtan gazkimyo majmuasi bunyod etildi</li></ul><b>"},{
                type:'media',
                mediaInfos: [ {
                    title: "<b>Sho'rtan gaz</b>",
                    type: "image", // Autocasts as new ImageMediaInfo object
                    caption: "tree species",
                    // Autocasts as new ImageMediaInfoValue object
                    value: {
                      sourceURL: "https://storage.kun.uz/source/8/rZqfu16DvcBvzXXL48Y2zzJR5C0MCV6e.jpeg"
                    }
                  }]
                }],

            }
            
        }) 
        let polyline = {
            type: "polyline",  // autocasts as new Polyline()
              paths: [
                [65.268902, 39.170431],
             
                [56.96536, 43.21043]
              ],
              
          }; 
          const simpleLineSymbol = {
            type: "simple-line",
            color: [0, 0, 0], // Orange
            width: 2
         };
        let polylineGraphic = new Graphic({
            geometry: polyline,
            symbol: simpleLineSymbol
          });
        let graph1=new Graphic({
            geometry:{
                type:'point',
                latitude:39.170431,
                longitude:65.268902,//[65.268902,39.170431]
            },
            symbol:sym,
            popupTemplate:{
                title :"Muborak gaz koni",
              
                content:[{ type:'text',text: "<b>Nomi:</b><ul><li>Muborak</li></ul><b>Joylashuv</b>:<ul> <li><i>39.170431</i></li><li><i>65.268902</i></li></ul><b>Ma'lumot:</b><ul><li> Muborak shahri yaqinidagi Janubiy va Shimoliy Muborak konlari. Janubiy Muborak gaz-kondensat koni Muborak shahridan 15–20 km jan.-sharkda joylashgan. Kon strukturasi 1955-yilda L. G. Cherkashina va N. I. Kamoliddinovlarning seysmik tadqiqotlari natijasida aniqlangan. Konning gazliligi kuyi boʻrga mansub 12- va 13-gorizontlar bilan bogʻliq. 12mahsuldor gorizont 1160–1470 m chuqurlikda joylashgan va qumtosh va alevrolitlardan tashkil topgan. Umumiy qalinligi 62–67 m, samarali qalinligi 16–27 m, ochiq gʻovakliligi 18—22%, samarali gʻovakliligi 12—18%, oʻtkazuvchanligi 125— 578 millidarsini tashkil etadi. Uyumning uz. 12,6 km, eni 4,3 km va qalinligi 130 m. Gaz zichligi 0,640 (xavoga nisbatan), tarkibidagi metan 85— 93%, SO2 gazi 0,1 — 1,5%, azot va nodirgazlar 1,8—5%. Kondensatning zichligi 0,74; qovushokligi 1,03 santipuz, tarkibidagi oltingugurt 0,03%. Gaz tarkibida erigan kondensat miqdori 95 sm³/m3. 13-gorizont 1230–1450 m chuqurlikda joylashgan boʻlib, asosan, qumtosh, gravelit, gil va qisman mergeldan tuzilgan. Umumiy kalinligi 80 m gacha, samarali qalinligi 30 m, ochiq gʻovakliligi 16—24%, samarali gʻovakliligi 12—18%, oʻtkazuvchanligi 298 millidarsi. Uyumning uz. 10 km, eni 3,75 km, qalinligi 82 m. Boshlangʻich qatlam bosimi 133 atm, temperaturasi 65°. Gazning zichligi 0,63 (havoga nisbatan) va tarkibidagi metan 84,8—92,7%, ogʻir uglevodorodlar 7—8%, azot va nodir gazlar 2—5,8%, kondensat miqdori 80,6 sm³/m3. 12—13-gorizontlardagi kondensat fizikkimyoviy xossalari boʻyicha bir xil.</li></ul><b>"},{
                type:'media',
                mediaInfos: [ {
                    title: "<b>Muborak gaz</b>",
                    type: "image", // Autocasts as new ImageMediaInfo object
                    caption: "tree species",
                    // Autocasts as new ImageMediaInfoValue object
                    value: {
                      sourceURL: "https://static.zarnews.uz/crop/3/c/720__80_3c2cd2e139519c9e69c3ed8ed902566b.jpg?img=self&v=1588986023"
                    }
                  }]
                }],

            }
            
        })
      
        let graph2=new Graphic({
            geometry:{
                type:'point',
                latitude:43.271111,
                longitude:58.286170,//[56.96536,43.21043]
            },
            symbol:sym,
            popupTemplate:{
                title :"Ustyurt gaz",
              
                content:[{ type:'text',text: "<b>Nomi:</b><ul><li>Ustyurt</li></ul><b>Joylashuv</b>:<ul> <li><i>43.21043</i></li><li><i>56.96536</i></li></ul><b>Ma'lumot:</b><ul><li> Ustyurt (qozoqcha: Үстірт, qoraqalpoqcha: Ústirt) — Oʻzbekistonning shimoli-gʻarbi (Qoraqalpogʻiston) va Qozogʻiston hududlaridagi plato. Sharqda Orol dengizi va Amudaryo deltasi, gʻarbda Mangʻishloq yarim orol va Qoraboʻgʻozgoʻl qoʻltigʻi, shimolida Kaspiyboʻyi pasttekisligi oraligʻida joylashgan. Maydoni 200 ming km². Oʻrtacha balandligi 150–250 m, eng baland joyi (370 m) janubi-gʻarbida. Ustyurtning atrofi 60–150 m li tik jarlik (chink)lardan iborat. Chinklar har xil chuqurlikdagi jar va soylar bilan kesilgan. Ustyurtning shimoliy chinklari shimoliy gʻarbda Oʻlikqoʻltiq shoʻrligidan boshlanib, shimolida Katta Boʻrsiq qumligiga borib taqaladi. Platoning baland sharqiy chegarasi Orol dengizining avvalgi qirgʻogʻi va Amudaryo deltasidan, janubiy chinklari Qoraqum choʻli va Oʻzboy oʻzani, gʻarbiy chinklari esa Koraboʻgʻozgoʻl qoʻltigʻining gʻarbiy sohili, Qorniyoriq botigʻi, Qaydak shoʻrligi orqali oʻtadi.</li></ul><b>"},{
                type:'media',
                mediaInfos: [ {
                    title: "<b>Ustyurt gaz</b>",
                    type: "image", // Autocasts as new ImageMediaInfo object
                    caption: "tree species",
                    // Autocasts as new ImageMediaInfoValue object
                    value: {
                      sourceURL: "https://www.gazeta.uz/media/img/2022/05/Bh3XwK16526799246699_b.jpg"
                    }
                  }]
                }],

            }
            
        }) 
        let graph3=new Graphic({
            geometry:{
                type:'point',
                latitude:43.017959,
                longitude:58.19976,//[57.29536,43.51043]
            },
            symbol:sym1,
            popupTemplate:{
                title :"Ustyurt neft",
              
                content:[{ type:'text',text: "<b>Nomi:</b><ul><li>Ustyurt</li></ul><b>Joylashuv</b>:<ul> <li><i>43.21043</i></li><li><i>56.96536</i></li></ul><b>Ma'lumot:</b><ul><li> Ustyurt (qozoqcha: Үстірт, qoraqalpoqcha: Ústirt) — Oʻzbekistonning shimoli-gʻarbi (Qoraqalpogʻiston) va Qozogʻiston hududlaridagi plato. Sharqda Orol dengizi va Amudaryo deltasi, gʻarbda Mangʻishloq yarim orol va Qoraboʻgʻozgoʻl qoʻltigʻi, shimolida Kaspiyboʻyi pasttekisligi oraligʻida joylashgan. Maydoni 200 ming km². Oʻrtacha balandligi 150–250 m, eng baland joyi (370 m) janubi-gʻarbida. Ustyurtning atrofi 60–150 m li tik jarlik (chink)lardan iborat. Chinklar har xil chuqurlikdagi jar va soylar bilan kesilgan. Ustyurtning shimoliy chinklari shimoliy gʻarbda Oʻlikqoʻltiq shoʻrligidan boshlanib, shimolida Katta Boʻrsiq qumligiga borib taqaladi. Platoning baland sharqiy chegarasi Orol dengizining avvalgi qirgʻogʻi va Amudaryo deltasidan, janubiy chinklari Qoraqum choʻli va Oʻzboy oʻzani, gʻarbiy chinklari esa Koraboʻgʻozgoʻl qoʻltigʻining gʻarbiy sohili, Qorniyoriq botigʻi, Qaydak shoʻrligi orqali oʻtadi.</li></ul><b>"},{
                type:'media',
                mediaInfos: [ {
                    title: "<b>Ustyurt neft</b>",
                    type: "image", // Autocasts as new ImageMediaInfo object
                    caption: "tree species",
                    // Autocasts as new ImageMediaInfoValue object
                    value: {
                      sourceURL: "https://www.gazeta.uz/media/img/2022/05/Bh3XwK16526799246699_b.jpg"
                    }
                  }]
                }],

            }
            
        }) 
        let graph4=new Graphic({
            geometry:{
                type:'point',
                latitude:39.27670,
                longitude:65.80970,//[57.29536,43.51043]
            },
            symbol:sym1,
            popupTemplate:{
                title :"Muborak neft",
              
                content:[{ type:'text',text: "<b>Nomi:</b><ul><li>Muborak</li></ul><b>Joylashuv</b>:<ul> <li><i>43.21043</i></li><li><i>56.96536</i></li></ul><b>Ma'lumot:</b><ul><li> Ustyurt (qozoqcha: Үстірт, qoraqalpoqcha: Ústirt) — Oʻzbekistonning shimoli-gʻarbi (Qoraqalpogʻiston) va Qozogʻiston hududlaridagi plato. Sharqda Orol dengizi va Amudaryo deltasi, gʻarbda Mangʻishloq yarim orol va Qoraboʻgʻozgoʻl qoʻltigʻi, shimolida Kaspiyboʻyi pasttekisligi oraligʻida joylashgan. Maydoni 200 ming km². Oʻrtacha balandligi 150–250 m, eng baland joyi (370 m) janubi-gʻarbida. Ustyurtning atrofi 60–150 m li tik jarlik (chink)lardan iborat. Chinklar har xil chuqurlikdagi jar va soylar bilan kesilgan. Ustyurtning shimoliy chinklari shimoliy gʻarbda Oʻlikqoʻltiq shoʻrligidan boshlanib, shimolida Katta Boʻrsiq qumligiga borib taqaladi. Platoning baland sharqiy chegarasi Orol dengizining avvalgi qirgʻogʻi va Amudaryo deltasidan, janubiy chinklari Qoraqum choʻli va Oʻzboy oʻzani, gʻarbiy chinklari esa Koraboʻgʻozgoʻl qoʻltigʻining gʻarbiy sohili, Qorniyoriq botigʻi, Qaydak shoʻrligi orqali oʻtadi.</li></ul><b>"},{
                type:'media',
                mediaInfos: [ {
                    title: "<b>Muborak neft</b>",
                    type: "image", // Autocasts as new ImageMediaInfo object
                    caption: "tree species",
                    // Autocasts as new ImageMediaInfoValue object
                    value: {
                      sourceURL: "https://www.gazeta.uz/media/img/2022/05/Bh3XwK16526799246699_b.jpg"
                    }
                  }]
                }],

            }
            
        }) 
        let locateWidget = new Locate({
            view: view,   // Attaches the Locate button to the view
            graphic: new Graphic({
              symbol: { type: "simple-marker" }  // overwrites the default symbol used for the
              // graphic placed at the location of the user when found
            })
          });
        // let graph3=new Graphic({
        //     geometry:{
        //         type:'point',
        //         latitude:cor[1],
        //         longitude:cor[0],
        //     },
        //     symbol:{
        //         type:"simple-marker",
        //         color:"red",
        //         size:12
        //     },
        //     popupTemplate:{
        //         title :"Siz kiritgan joylashuv",
              
        //         content:[{ type:'text',text: `<b>Joylashuv</b>:<ul> <li><i>${cor[1]}</i></li><li><i>${cor[0]}</i></li></ul>`}     
        //         ],

        //     }
            
        // }) 
        view.ui.add(
            new Home({
                view:view,

            }),
            'top-left'
        )
        view.ui.add(locateWidget, "top-right");
        view.ui.add(
            new ScaleBar({
                view:view,

            }),
            'top-right'
        )
      
    //    const layer=view.map.findLayerById("glResult1")
    //    const loc={
    //     name:"Muborak",

    //    }
        map1.ground.surfaceColor = '#004C73';
        
 

        map1.ground.layers.add(elevationLayer);
        view.graphics.add(graph);  view.graphics.add(graph1); view.graphics.add(graph2); view.graphics.add(graph3); view.graphics.add(graph4); })
   }

    useEffect(()=>{
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
     
  },[val])

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
     <div class="col-md-2">
      {mapV=="2"?<></>:<> <div data-target="#editModal2" data-toggle="modal"> <div > <div style={{"width":'400px',"height":'300px'}}><Linechart/>
                            </div>   </div></div> 
     <div data-target="#editModal" data-toggle="modal"> <div >   <LineBar1 width={400} height={300}/></div></div> 
    </>}
     </div>

     <div class="modal fade"  id="editModal" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
                <div class="modal-dialog modal-lg" style={{"margin":'10 auto', 'width':'90%','height':'90%','display':'flex','justifyContent':'center'}} >
                    <div class="modal-content" style={{'alignContent':'center'}}>

                        <div class="modal-header">
                            <button type="button" class="close" data-dismiss="modal"
                                aria-hidden="true">&times;</button>
                            <h4 class="modal-title" id="myModalLabel">Chart</h4>
                        </div>
                        
                         <LineBar1 width={900} height={500}/>
                    </div>
                </div>
            </div>
            <div class="modal fade"  id="editModal2" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
                <div class="modal-dialog modal-lg" style={{"margin":'10 auto', 'width':'90%','height':'90%','display':'flex','justifyContent':'center'}} >
                    <div class="modal-content" style={{'alignContent':'center'}}>

                        <div class="modal-header">
                            <button type="button" class="close" data-dismiss="modal"
                                aria-hidden="true">&times;</button>
                            <h4 class="modal-title" id="myModalLabel">Chart</h4>
                        </div>
                        <div style={{"width":'900px',"height":'500px'}}><Linechart/>
                            </div>                        
                    </div>
                </div>
            </div>

</div>
        
    )

};



