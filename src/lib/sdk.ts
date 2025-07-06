import init, { defaultConfig, connect } from 'breez-sdk-liquid-wasm'
import { generateMnemonic } from 'bip39'

let sdk: any = null

async function initializeBreezSDK() {
  try{
    await init()
    console.log('✅ WebAssembly initialized')
    
    const mnemonic = generateMnemonic()
    //TODO: store the mnemonic and allow user to copy it to clipboard.
    const apiKey = process.env.NEXT_PUBLIC_BREEZ_API_KEY
    console.log('🔑 API Key exists:', !!apiKey)
    
    const config = defaultConfig('testnet', apiKey)
    console.log('✅ Config created')
    
    config.enableNwc = true
    console.log('✅ NWC enabled')
    
    console.log('🔄 Connecting to SDK...')
    sdk = await connect({ mnemonic, config })
    console.log('✅ SDK connected successfully!')


    return {mnemonic, success: true}
  } catch (error) {
    console.error('Error initializing Breez SDK:', error)
    throw error
  }
}

async function getNwcConnectionUri() {
  if (!sdk) {
    throw new Error('SDK not initialized')
  }
  const nwcUri = await sdk.getNwcConnectionUri()
  return nwcUri
}

async function getWalletInfo() {
  if (!sdk) {
    throw new Error('SDK not initialized')
  }
  
  try {
    const balance = await sdk.getBalance()
    const info = await sdk.getInfo()
    return {
      balance,
      info,
      isConnected: true
    }
  } catch (error) {
    console.error('Error getting wallet info:', error)
    return {
      balance: null,
      info: null,
      isConnected: false
    }
  }
}

async function disconnectBreez() {
  if (sdk) {
    await sdk.disconnect()
    sdk = null
    console.log('SDK disconnected')
  }
}

export {
  initializeBreezSDK,
  getNwcConnectionUri,
  getWalletInfo,
  disconnectBreez
}