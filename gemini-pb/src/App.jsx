import { useState } from 'react'
import Imagen from './pages/imagen.jsx'
import './App.css'

function App() {
  const [prompt, setPrompt] = useState("");

  return (
    <div className= "main-container">
      <div className="header">
        <h3>Imagen Photo Booth</h3>
        </div>
        <div className="body">
          <input
            type="text"
            placeholder="Enter your prompt here"
            value ={prompt}
            onChange = {(e) => setPrompt(e.target.value)}
            />
          <Imagen prompt ={prompt} />
        </div>
        </div>


  ) 
}

export default App
