import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'

import { Buffer } from 'buffer'
window.Buffer = Buffer

;(window as any).process = { env: {} }

import init from 'breez-sdk-liquid-wasm'

async function initializeApp() {
  try {
    console.log('Starting WASM initialization...')
    await new Promise(resolve => setTimeout(resolve, 100))
    await init()
    console.log('Breez SDK WebAssembly initialized successfully')
  } catch (error) {
    console.error('Failed to initialize Breez SDK WebAssembly:', error)
    console.error('Error details:', {
      name: (error as Error).name,
      message: (error as Error).message,
      stack: (error as Error).stack
    })
  }
  
  ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
      <App />
    </React.StrictMode>,
  )
}

initializeApp() 