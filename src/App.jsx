import React, { useState } from 'react'
// import MyMap from './pages/MyMap'
import RouteMap from './pages/RouteMap'

const App = () => {
  const [val, setValue] =useState(0)
  return (
    <div>
      <RouteMap />
    </div>
  )
}

export default App