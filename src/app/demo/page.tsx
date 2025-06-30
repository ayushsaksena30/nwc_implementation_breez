'use client'

import { motion } from 'framer-motion'
import Navbar from '@/components/Navbar'

export default function DemoPage() {

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-purple-50 to-pink-100 dark:from-gray-900 dark:via-blue-900 dark:to-purple-900">
      <Navbar />
      <div className="container mx-auto px-6 py-12">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-5xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent mb-4">
            NWC Demo
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Interactive demonstration of Nostr Wallet Connect with Breez
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {[
            { 
              title: 'Connect Wallet', 
              description: 'Establish connection with Breez wallet',
              status: 'Ready'
            },
            { 
              title: 'Send Payment', 
              description: 'Create and send lightning payments',
              status: 'Available'
            },
            { 
              title: 'Receive Payment', 
              description: 'Generate invoices and receive payments',
              status: 'Available'
            },
            { 
              title: 'Transaction History', 
              description: 'View payment history and details',
              status: 'Available'
            }
          ].map((item, index) => (
            <motion.div
              key={item.title}
              className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.02 }}
            >
              <div className="flex justify-between items-start mb-3">
                <h3 className="text-xl font-semibold text-gray-800 dark:text-white">
                  {item.title}
                </h3>
                <span className="px-2 py-1 text-xs bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200 rounded">
                  {item.status}
                </span>
              </div>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                {item.description}
              </p>
              <button className="w-full py-2 px-4 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-lg hover:from-orange-600 hover:to-red-600 transition-colors">
                Try Now
              </button>
            </motion.div>
          ))}
        </div>

        <motion.div 
          className="text-center mt-16"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          <div className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-2xl p-8 shadow-xl max-w-2xl mx-auto">
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">
              🚀 Demo Instructions
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              This is a demonstration of Nostr Wallet Connect integration with Breez. 
              Use the buttons above to test different wallet operations.
            </p>
            <div className="text-sm text-gray-500 dark:text-gray-400">
              Status: Demo Mode Active
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
} 