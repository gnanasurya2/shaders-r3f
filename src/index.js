import ReactDOM from 'react-dom'
import { useState, useEffect } from 'react'
import './styles.css'
import App from './App'

function Count() {
  const [count, set] = useState(1)
  useEffect(() => {
    const interval = setInterval(() => set((count) => count + 1), 500)
    return () => clearInterval(interval)
  }, [])
  return <h1>— {count}</h1>
}

ReactDOM.render(
  <>
    <App />
    <Count />
  </>,
  document.getElementById('root')
)
