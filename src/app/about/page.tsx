'use client'

import { motion } from 'framer-motion'
import Navbar from '@/components/Navbar'

export default function AboutPage() {

  const containerVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        staggerChildren: 0.2
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-200 via-sky-100 to-indigo-100">
      <Navbar />
      <motion.div
        className="container mx-auto px-6 py-12"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div className="text-center mb-16" variants={itemVariants}>
        <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-6">
        About Breez
          </h1>
        </motion.div>

        <motion.div variants={itemVariants} className="mb-16">
          <div className="max-w-4xl mx-auto">
            <div className="bg-blue-200 backdrop-blur-sm rounded-2xl p-8 shadow-xl">
              <p className='text-lg text-gray-800 leading-relaxed mb-6'>
              Breez is a self-custodial Lightning-as-a-Service company bringing permissionless, peer-to-peer bitcoin payments to apps and services globally with the free and open-source Breez SDK.              </p>
              <p className="text-lg text-gray-800 leading-relaxed mb-6">
              The Breez SDK provides developers with a end-to-end solution for integrating self-custodial Lightning payments into their apps and services. It eliminates the need for third parties, simplifies the complexities of Bitcoin and Lightning, and enables seamless onboarding for billions of users to the future of peer-to-peer payments.
              </p>
              <motion.div
              className="text-center"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.6 }}
              >
              <motion.button
                className="px-8 py-3 rounded-lg font-semibold text-lg bg-gradient-to-r from-blue-700 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700 transition-colors duration-300"
                onClick={() => window.open('https://breez.technology', '_blank')}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Learn More
              </motion.button>
          </motion.div>
            </div>
          </div>
        </motion.div>

        <motion.div className='flex flex-col items-center justify-center'>
          <h2 className="text-3xl font-bold text-gray-500 mb-6">
            Contact Us
          </h2>
            <div className="text-center">
              <div className="flex justify-center space-x-4">
                <a 
                  href="https://twitter.com/breez_tech" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="p-4 rounded-xl bg-white/40 dark:bg-gray-700/40 border border-gray-200 dark:border-gray-600 hover:bg-blue-500 hover:border-blue-500 text-gray-600 dark:text-gray-300 hover:text-white transition-all duration-300 hover:scale-105 transform shadow-lg hover:shadow-xl"
                  title="Follow us on Twitter"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                  </svg>
                </a>

                <a 
                  href="https://t.me/breeztechnology" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="p-4 rounded-xl bg-white/40 dark:bg-gray-700/40 border border-gray-200 dark:border-gray-600 hover:bg-blue-500 hover:border-blue-500 text-gray-600 dark:text-gray-300 hover:text-white transition-all duration-300 hover:scale-105 transform shadow-lg hover:shadow-xl"
                  title="Join our Telegram"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0C5.374 0 0 5.373 0 12s5.374 12 12 12 12-5.373 12-12S18.626 0 12 0zm5.568 8.16c-.18 1.896-.962 6.502-1.359 8.627-.168.9-.5 1.201-.82 1.23-.697.064-1.226-.461-1.901-.903-1.056-.692-1.653-1.123-2.678-1.799-1.185-.781-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.244-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
                  </svg>
                </a>

                <a 
                  href="https://medium.com/@breeztechnology" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="p-4 rounded-xl bg-white/40 dark:bg-gray-700/40 border border-gray-200 dark:border-gray-600 hover:bg-blue-500 hover:border-blue-500 text-gray-600 dark:text-gray-300 hover:text-white transition-all duration-300 hover:scale-105 transform shadow-lg hover:shadow-xl"
                  title="Read our Medium articles"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M13.54 12a6.8 6.8 0 01-6.77 6.82A6.8 6.8 0 010 12a6.8 6.8 0 016.77-6.82A6.8 6.8 0 0113.54 12zM20.96 12c0 3.54-1.51 6.42-3.38 6.42-1.87 0-3.39-2.88-3.39-6.42s1.52-6.42 3.39-6.42 3.38 2.88 3.38 6.42M24 12c0 3.17-.53 5.75-1.19 5.75-.66 0-1.19-2.58-1.19-5.75s.53-5.75 1.19-5.75C23.47 6.25 24 8.83 24 12z"/>
                  </svg>
                </a>

                <a 
                  href="https://github.com/breez" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="p-4 rounded-xl bg-white/40 dark:bg-gray-700/40 border border-gray-200 dark:border-gray-600 hover:bg-blue-500 hover:border-blue-500 text-gray-600 dark:text-gray-300 hover:text-white transition-all duration-300 hover:scale-105 transform shadow-lg hover:shadow-xl"
                  title="View our GitHub"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                  </svg>
                </a>

                <a 
                  href="mailto:contact@breez.technology" 
                  className="p-4 rounded-xl bg-white/40 dark:bg-gray-700/40 border border-gray-200 dark:border-gray-600 hover:bg-blue-500 hover:border-blue-500 text-gray-600 dark:text-gray-300 hover:text-white transition-all duration-300 hover:scale-105 transform shadow-lg hover:shadow-xl"
                  title="Send us an email"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
                  </svg>
                </a>
              </div>
            </div>
        </motion.div>
      </motion.div>
    </div>
  )
} 