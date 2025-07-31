import init, { defaultConfig, connect } from 'breez-sdk-liquid-wasm'
import { generateMnemonic } from 'bip39'

let cachedMnemonic=''
let cachedNwcUri=''
let sdk: any = null

type PayInvoiceCallback = (result: any) => void
type ListTransactionsCallback = (transactions: any[]) => void
type GetBalanceCallback = (balance: any) => void
type EventPopupCallback = (eventType: string, eventData: any) => void

let eventListeners: {
  payInvoice?: PayInvoiceCallback
  listTransactions?: ListTransactionsCallback
  getBalance?: GetBalanceCallback
  showPopup?: EventPopupCallback
} = {}

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

    const listener = {
      onEvent: (event: any) => {   
        console.log('Event received:', event)
        
        if (event.type === "nWC" && event.details) {
          console.log('NWC Event received:', event)
          
          const eventType = event.details.type
          
          if (eventType === 'payInvoice') {
            console.log('PayInvoice event:', event)
            if (eventListeners.payInvoice) {
              eventListeners.payInvoice(event)
            }
            if (eventListeners.showPopup) {
              eventListeners.showPopup('payInvoice', event)
            }
          }
          
          if (eventType === 'listTransactions') {
            console.log('ListTransactions event:', event)
            if (eventListeners.listTransactions) {
              eventListeners.listTransactions(event)
            }
            if (eventListeners.showPopup) {
              eventListeners.showPopup('listTransactions', event)
            }
          }
          
          if (eventType === 'getBalance') {
            console.log('GetBalance event:', event)
            if (eventListeners.getBalance) {
              eventListeners.getBalance(event)
            }
            if (eventListeners.showPopup) {
              eventListeners.showPopup('getBalance', event)
            }
          }
        }
      }
    }
    const listenerId = await sdk.addEventListener(listener)

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

function setEventListeners(listeners: {
  payInvoice?: PayInvoiceCallback
  listTransactions?: ListTransactionsCallback
  getBalance?: GetBalanceCallback
  showPopup?: EventPopupCallback
}) {
  eventListeners = { ...eventListeners, ...listeners }
}

export {
  initializeBreezSDK,
  getNwcConnectionUri,
  disconnectBreez,
  setEventListeners
}