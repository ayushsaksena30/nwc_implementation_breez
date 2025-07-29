import init, { defaultConfig, connect } from 'breez-sdk-liquid-wasm'
import { generateMnemonic } from 'bip39'

let cachedMnemonic=''
let cachedNwcUri=''
let sdk: any = null

async function initializeBreezSDK() {
  try{
    console.log('Starting Breez SDK initialization...')
    
    if (sdk) {
      console.log('SDK already initialized, returning cached mnemonic')
      return { mnemonic: cachedMnemonic, success: true }
    }
    
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
    
    const config = defaultConfig('mainnet', apiKey)
    console.log('Config created with mainnet')
    
    config.enableNwc = true
    
    if (typeof connect !== 'function') {
      throw new Error('connect function not available')
    }
    
    console.log('Attempting to connect SDK...')
    sdk = await connect({ mnemonic, config })
    console.log('SDK connected successfully!')
    
    cachedMnemonic = mnemonic
    console.log('SDK initialization completed successfully')
    return { mnemonic: cachedMnemonic, success: true }
  } catch (error) {
    console.error('Error initializing Breez SDK:', error)
    sdk = null
    throw error
  }
}

async function getNwcConnectionUri() {
  try {
    if (!sdk) {
      throw new Error('SDK not initialized')
    }
    
    const nwcUri = await sdk.getNwcUri()
    console.log('NWC URI generated')
    cachedNwcUri = nwcUri
    return cachedNwcUri
  } catch (error) {
    console.error('NWC URI Generation Failed:', error)
    throw error
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
  disconnectBreez
}