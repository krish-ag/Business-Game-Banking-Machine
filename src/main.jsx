import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

const Cover = () => {
  React.useEffect(() => {

    const reset = confirm('Do you want to reset the game?')
    if (!reset) {
      return
    }
    localStorage.setItem('money', JSON.stringify({
        1: 15000,
        2: 15000,
        3: 15000,
        4: 15000,
        5: 15000,
        6: 15000,
      }
    ))

    localStorage.setItem('history', JSON.stringify([]))

  }, [])
  return <App/>
}


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Cover/>
  </React.StrictMode>,
)
