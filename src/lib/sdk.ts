import init, { defaultConfig, connect } from 'breez-sdk-liquid-wasm'
import { generateMnemonic } from 'bip39'

let cachedMnemonic=''
let cachedNwcUri=''
let sdk: any = null

async function initializeBreezSDK() {
  try{
    console.log('Starting Breez SDK initialization...')
    if (typeof init !== 'function') {
      throw new Error('WASM init function not available')
    }
    
    await init()
    console.log('WASM initialized successfully')
    
    const mnemonic = generateMnemonic()
    console.log('Mnemonic generated')
    
    const apiKey = import.meta.env.VITE_BREEZ_API_KEY
    
    if (typeof defaultConfig !== 'function') {
      throw new Error('defaultConfig function not available')
    }
    
    const config = defaultConfig('testnet', apiKey)
    console.log('Config created with testnet')
    
    config.enableNwc = true
    
    if (typeof connect !== 'function') {
      throw new Error('connect function not available')
    }
    
    console.log('Attempting to connect SDK...')
    sdk = await connect({ mnemonic, config })
    console.log('SDK connected successfully!')
    
    cachedMnemonic = mnemonic
    return { mnemonic: cachedMnemonic, success: true }
  } catch (error) {
    console.error('Error initializing Breez SDK:', error)
    throw error
  }
}

async function getNwcConnectionUri() {
  try {
    if (!sdk) {
      throw new Error('SDK not initialized')
    }
    
    const nwcUri = await sdk.getNwcConnectionUri()
    console.log('NWC URI generated')
    cachedNwcUri = nwcUri
    return cachedNwcUri
  } catch (error) {
    console.error('NWC URI Generation Failed:', error)
    throw error
  }
}

async function getWalletInfo() {
  return {
    balance: null,
    info: null,
    isConnected: !!cachedNwcUri
  }
}

async function disconnectBreez() {
  cachedMnemonic = ''
  cachedNwcUri = ''
  sdk = null
  console.log('Breez SDK disconnected')
}

export {
  initializeBreezSDK,
  getNwcConnectionUri,
  getWalletInfo,
  disconnectBreez
}