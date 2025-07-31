import { motion } from 'framer-motion'
import Navbar from '../components/Navbar'
import { useEffect, useState } from 'react'
import { initializeBreezSDK, getNwcConnectionUri, setEventListeners } from '../lib/sdk'
import EventPopup from '../components/EventPopup'

export default function Demo() {
  //persistent state
  const [demoState, setDemoState] = useState('greeting')
  const [mnemonic, setMnemonic] = useState('')
  const [nwcUri, setNwcUri] = useState('')
  const [showCopyPopup, setShowCopyPopup] = useState(false)
  const [eventPopup, setEventPopup] = useState<{
    isOpen: boolean
    eventType: string
    eventData: any
  }>({
    isOpen: false,
    eventType: '',
    eventData: null
  })
  const [recentEvents, setRecentEvents] = useState<Array<{
    id: string
    type: string
    timestamp: Date
    data: any
  }>>([])
  const [showEventNotification, setShowEventNotification] = useState(false)
  const [lastEventType, setLastEventType] = useState('')
  const [showMnemonic, setShowMnemonic] = useState(false)


  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedState = localStorage.getItem('demoState')
      const savedMnemonic = localStorage.getItem('mnemonic')
      const savedNwcUri = localStorage.getItem('nwcUri')
      const savedEvents = localStorage.getItem('recentEvents')

      if (savedState) {
        setDemoState(savedState)
        setMnemonic(savedMnemonic || '')
        setNwcUri(savedNwcUri || '')
      }
      
      if (savedEvents) {
        try {
          const parsedEvents = JSON.parse(savedEvents)
          const eventsWithDateObjects = parsedEvents.map((event: any) => ({
            ...event,
            timestamp: new Date(event.timestamp)
          }))
          setRecentEvents(eventsWithDateObjects)
        } catch (error) {
          console.error('Failed to parse saved events:', error)
        }
      }
    }

    setEventListeners({
      showPopup: (eventType: string, eventData: any) => {
        console.log('Event listener triggered! Showing popup for event:', eventType, eventData)
        
        const newEvent = {
          id: Date.now().toString(),
          type: eventType,
          timestamp: new Date(),
          data: eventData
        }
        setRecentEvents(prev => {
          const updatedEvents = [newEvent, ...prev] 
          localStorage.setItem('recentEvents', JSON.stringify(updatedEvents))
          return updatedEvents
        })
        
        setLastEventType(eventType)
        setShowEventNotification(true)
        setTimeout(() => setShowEventNotification(false), 3000)
        
        setEventPopup({
          isOpen: true,
          eventType,
          eventData
        })
      }
    })
  
    console.log('Event listeners set up successfully')
  }, [])

  const startDemo = async () => {
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
    setDemoState('initializing-nwc')
    
    try{
      const uri = await getNwcConnectionUri()
      setNwcUri(uri)
      localStorage.setItem('nwcUri', uri)
      setDemoState('nwc-ready')
      localStorage.setItem('demoState', 'nwc-ready')
    } catch (error) {
      console.error('NWC failed:', error)
      setDemoState('nwc-error')
    }
  }

  const resetDemo = () => {
    localStorage.clear()
    setDemoState('greeting')
    setMnemonic('')
    setNwcUri('')
    setRecentEvents([])
  }

  const handleCopyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text)
      setShowCopyPopup(true)
      setTimeout(() => setShowCopyPopup(false), 2000)
    } catch (error) {
      console.error('Failed to copy text:', error)
    }
  }

  const handleCloseEventPopup = () => {
    setEventPopup({
      isOpen: false,
      eventType: '',
      eventData: null
    })
  }
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-200 via-sky-100 to-indigo-100">
      <Navbar />
      
      {showCopyPopup && (
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -50 }}
          className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg"
        >
          <div className="flex items-center space-x-2">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
            <span className="font-medium">Copied to clipboard!</span>
          </div>
        </motion.div>
      )}

      <EventPopup
        isOpen={eventPopup.isOpen}
        onClose={handleCloseEventPopup}
        eventType={eventPopup.eventType}
        eventData={eventPopup.eventData}
      />

      {showEventNotification && (
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -50 }}
          className="fixed top-4 right-4 z-50 bg-blue-600 text-white px-6 py-3 rounded-lg shadow-lg max-w-sm"
        >
          <div className="flex items-center space-x-3">
            <div className="p-1 bg-white bg-opacity-20 rounded">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
              </svg>
            </div>
            <div>
              <p className="font-medium">
                NWC Event Received
              </p>
              <p className="text-sm opacity-90 capitalize">
                {lastEventType.replace(/([A-Z])/g, ' $1').trim()}
              </p>
            </div>
          </div>
        </motion.div>
      )}
      
      <div className="container mx-auto px-6 py-12">
        {demoState !== 'greeting' && (
          <div className="text-right mb-4">
            <button
              onClick={resetDemo}
              className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
            >
              Reset Demo
            </button>
          </div>
        )}

        {demoState === 'greeting' && (
          <motion.div className="flex justify-center items-center min-h-[60vh]">
            <div className="text-center max-w-4xl">
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
            </div>
          </motion.div>
        )}
        
        {demoState === 'initializing-nwc' && (
          <motion.div className="text-center">
            <h2 className="text-3xl mb-4 text-black">Initializing...</h2>
            <div className="animate-spin h-8 w-8 border-4 border-blue-500 border-t-transparent rounded-full mx-auto"></div>
          </motion.div>
        )}
        
        {demoState === 'mnemonic' && (
          <motion.div className="text-center">
            <h2 className="text-3xl mb-4 text-black">Your Seed Phrase</h2>
            <div className="bg-gray-100 p-4 rounded-lg mb-4 max-w-2xl mx-auto">
              <p className="font-mono text-sm select-text text-black">{mnemonic}</p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button 
                onClick={() => handleCopyToClipboard(mnemonic)}
                className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition-colors w-full sm:w-auto"
              >
                Copy to Clipboard
              </button>
              <button 
                onClick={proceedToNWC}
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors w-full sm:w-auto"
              >
                Next
              </button>
            </div>
          </motion.div>
        )}
        
        {demoState === 'nwc-ready' && (
          <motion.div className="text-center">
            <h2 className="text-3xl mb-4">Your NWC Connection</h2>
            <div className="bg-gray-100 p-4 rounded-lg mb-4 max-w-2xl mx-auto">
              <p className="font-mono text-xs break-all text-black">{nwcUri}</p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button 
                onClick={() => setShowMnemonic(!showMnemonic)}
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
              >
                {showMnemonic ? 'Hide Mnemonic' : 'Show Mnemonic'}
              </button>
              <button 
                onClick={() => handleCopyToClipboard(nwcUri)}
                className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition-colors"
              >
                Copy URI
              </button>
            </div>
            
            {showMnemonic && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-6"
              >
                <h3 className="text-xl mb-3 text-gray-700">Your Seed Phrase</h3>
                <div className="bg-yellow-50 border border-yellow-200 p-4 rounded-lg mb-4 max-w-2xl mx-auto">
                  <p className="font-mono text-sm select-text text-black">{mnemonic}</p>
                </div>
                <button 
                  onClick={() => handleCopyToClipboard(mnemonic)}
                  className="px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600 transition-colors"
                >
                  Copy Mnemonic
                </button>
              </motion.div>
            )}
          </motion.div>
        )}

        {demoState === 'nwc-error' && (
          <motion.div className="text-center">
            <h2 className="text-3xl mb-4 text-red-600">NWC Connection Failed</h2>
            <div className="bg-red-50 border border-red-200 p-6 rounded-lg mb-4 max-w-2xl mx-auto">
              <p className="text-red-700 mb-4">
                Failed to generate NWC connection URI. This might be due to:
              </p>
              <ul className="text-red-600 text-sm text-left space-y-2">
                <li>• SDK initialization issues</li>
                <li>• Network connectivity problems</li>
                <li>• API key configuration issues</li>
              </ul>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button 
                onClick={proceedToNWC}
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
              >
                Try Again
              </button>
              <button 
                onClick={resetDemo}
                className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 transition-colors"
              >
                Start Over
              </button>
            </div>
          </motion.div>
        )}

        {demoState === 'nwc-ready' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-12 flex justify-center"
          >
            <div className="w-full max-w-4xl">
              <h3 className="text-2xl text-gray-800 mb-6 text-center">Recent NWC Events</h3>
              {recentEvents.length > 0 ? (
                <div className="flex justify-center">
                  <div className="w-full max-w-2xl space-y-4">
                    {recentEvents.map((event) => (
                      <motion.div
                        key={event.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="bg-white rounded-lg shadow-md p-4 border-l-4 border-blue-500"
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-3">
                            <div className="p-2 bg-blue-100 rounded-lg">
                              <svg className="w-5 h-5 text-blue-600" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                              </svg>
                            </div>
                            <div>
                              <h4 className="font-medium text-gray-900 capitalize">
                                {event.type.replace(/([A-Z])/g, ' $1').trim()}
                              </h4>
                              <p className="text-sm text-gray-500">
                                {event.timestamp.toLocaleTimeString()}
                              </p>
                            </div>
                          </div>
                          <button
                            onClick={() => {
                              setEventPopup({
                                isOpen: true,
                                eventType: event.type,
                                eventData: event.data
                              })
                            }}
                            className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                          >
                            View Details
                          </button>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="text-center py-8">
                  <p className="text-gray-500 text-lg">This will show NWC Events when you make one.</p>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </div>
    </div>
  )
} 