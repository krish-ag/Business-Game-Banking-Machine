import React from 'react'
import SideCards from "./SideCards.jsx";
import {CardsContext} from "./helpers.js";
import Calculator from "./Calculator.jsx";

function App() {
  const [minusCard, setMinusCard] = React.useState(0)
  const [plusCard, setPlusCard] = React.useState(0)
  const input = React.useRef(null)
  const [history, setHistory] = React.useState([])
  return (
    <CardsContext.Provider value={{minusCard, setMinusCard, plusCard, setPlusCard, input, history, setHistory}}>
      <div className="flex justify-between h-dvh bg-gray-400">
        <SideCards val="minus" />
        <Calculator />
        <SideCards val="plus"/>
      </div>
    </CardsContext.Provider>
  )
}

export default App
