'use client'

import { motion } from 'framer-motion'
import Navbar from '@/components/Navbar'
import { useEffect, useState } from 'react'
import { initializeBreezSDK, getNwcConnectionUri, getWalletInfo, disconnectBreez } from '@/lib/sdk'

export default function DemoPage() {
  //persistent state
  const [demoState, setDemoState] = useState('greeting')
  const [mnemonic, setMnemonic] = useState('')
  const [nwcUri, setNwcUri] = useState('')
  const [isConnected, setIsConnected] = useState(false)

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedState = localStorage.getItem('demoState')
      const savedMnemonic = localStorage.getItem('mnemonic')
      const savedNwcUri = localStorage.getItem('nwcUri')

      if (savedState) {
        setDemoState(savedState)
        setMnemonic(savedMnemonic || '')
        setNwcUri(savedNwcUri || '')
      }
    }
  }, [])

  const startDemo = async () => {
    setDemoState('initializing')
    localStorage.setItem('demoState', 'initializing')
    try{
      const {mnemonic}=await initializeBreezSDK()
      setMnemonic(mnemonic)
      localStorage.setItem('mnemonic', mnemonic)
      setDemoState('mnemonic')
      localStorage.setItem('demoState', 'mnemonic')
    } catch (error) {
      console.error('Demo failed:', error)
      setDemoState('greeting')
      localStorage.clear()
    }
  }

  const proceedToNWC = async () => {
    setDemoState('initializing')
    
    try{
      const uri = await getNwcConnectionUri()
      setNwcUri(uri)
      localStorage.setItem('nwcUri', uri)
      setDemoState('nwc-ready')
      localStorage.setItem('demoState', 'nwc-ready')
    } catch (error) {
      console.error('NWC failed:', error)
    }
  }
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-200 via-sky-100 to-indigo-100">
      <Navbar />
      <div className="container mx-auto px-6 py-12">
        {demoState === 'greeting' && (
          <motion.div className="text-center">
            <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-6">
            Welcome to NWC Demo
            </h1>
            <p className="text-xl text-black max-w-2xl mx-auto mb-8">
              Let's set up your Nostr Wallet Connect
            </p>
            <motion.div
              className="text-center"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.6 }}
              >
              <motion.button
                className="px-8 py-3 rounded-lg font-semibold text-lg bg-gradient-to-r from-blue-700 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700 transition-colors duration-300"
                onClick={() => startDemo()}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Start Demo
              </motion.button>
          </motion.div>
          </motion.div>
        )}
        
        {demoState === 'initializing' && (
          <motion.div className="text-center">
            <h2 className="text-3xl mb-4 text-black">Initializing...</h2>
            <div className="animate-spin h-8 w-8 border-4 border-blue-500 border-t-transparent rounded-full mx-auto"></div>
          </motion.div>
        )}
        
        {demoState === 'mnemonic' && (
          <motion.div className="text-center">
            <h2 className="text-3xl mb-4">Your Seed Phrase</h2>
            <div className="bg-gray-100 p-4 rounded-lg mb-4 max-w-2xl mx-auto">
              <p className="font-mono text-sm">{mnemonic}</p>
            </div>
            <button 
              onClick={() => navigator.clipboard.writeText(mnemonic)}
              className="px-4 py-2 bg-green-500 text-white rounded mr-4"
            >
              Copy to Clipboard
            </button>
            <button 
              onClick={proceedToNWC}
              className="px-4 py-2 bg-blue-500 text-white rounded"
            >
              Next
            </button>
          </motion.div>
        )}
        
        {demoState === 'nwc-ready' && (
          <motion.div className="text-center">
            <h2 className="text-3xl mb-4">Your NWC Connection</h2>
            <div className="bg-gray-100 p-4 rounded-lg mb-4 max-w-2xl mx-auto">
              <p className="font-mono text-xs break-all">{nwcUri}</p>
            </div>
            <button 
              onClick={() => navigator.clipboard.writeText(nwcUri)}
              className="px-4 py-2 bg-green-500 text-white rounded"
            >
              Copy URI
            </button>
            <p className="mt-4 text-sm text-gray-600">
              Scan this with Mutiny Wallet or copy the URI
            </p>
          </motion.div>
        )}
      </div>
    </div>
  )
} 