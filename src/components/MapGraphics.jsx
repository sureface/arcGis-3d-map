import  { useEffect } from 'react'
import Graphic from  "@arcgis/core/Graphic"


const MapGraphics = ({ view }) => {
    useEffect(() => {

        const layer = view.map.findLayerById("glResults1")

        if(layer) {
            const graph = new Graphic({
                geometry: {
                    type: "point",
                    x: 35,
                    y: 36,
                },
                symbol: {
                    type: "simple-marker",
                    color: "red",
                    size: 14,
                }
            })

            layer.add(graph)
        }
    }, [])
    

  return null
}

export default MapGraphics