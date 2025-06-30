'use client'

import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const menuVariants = {
    closed: { 
      opacity: 0, 
      height: 0,
      transition: { duration: 0.3 }
    },
    open: { 
      opacity: 1, 
      height: "auto",
      transition: { duration: 0.3 }
    }
  }

  return (
    <nav className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-800 sticky top-0 z-50"
    >
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-8">
            <Link href="/" className="flex items-center group">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Image
                  src="/logo-breez-blue.svg"
                  alt="Breez Logo"
                  width={80}
                  height={29}
                  className="h-7 w-auto"
                />
              </motion.div>
            </Link>

            <div className="hidden md:flex items-center gap-6">
              <Link href="/" className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors font-medium">
                Home
              </Link>
              <Link href="/demo" className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors font-medium">
                Demo
              </Link>
              <Link href="/about" className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors font-medium">
                About
              </Link>
            </div>
          </div>

            <motion.button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <div className="w-5 h-5 flex flex-col justify-center gap-1">
                <motion.div 
                  className="w-full h-0.5 bg-gray-600 dark:bg-gray-300"
                  animate={isMenuOpen ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }}
                />
                <motion.div 
                  className="w-full h-0.5 bg-gray-600 dark:bg-gray-300"
                  animate={isMenuOpen ? { opacity: 0 } : { opacity: 1 }}
                />
                <motion.div 
                  className="w-full h-0.5 bg-gray-600 dark:bg-gray-300"
                  animate={isMenuOpen ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }}
                />
              </div>
            </motion.button>
          </div>

        <motion.div
          className="md:hidden overflow-hidden"
          variants={menuVariants}
          animate={isMenuOpen ? "open" : "closed"}
        >
          <div className="py-4 space-y-3 border-t border-gray-200 dark:border-gray-800">
            <Link 
              href="/" 
              className="block px-4 py-2 text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-lg transition-colors font-medium"
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>

            <Link 
              href="/demo" 
              className="block px-4 py-2 text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-lg transition-colors font-medium"
              onClick={() => setIsMenuOpen(false)}
            >
              Demo
            </Link>
            
            <Link 
              href="/features" 
              className="block px-4 py-2 text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-lg transition-colors font-medium"
              onClick={() => setIsMenuOpen(false)}
            >
              Features
            </Link>

            <Link 
              href="/about" 
              className="block px-4 py-2 text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-lg transition-colors font-medium"
              onClick={() => setIsMenuOpen(false)}
            >
              About
            </Link>
          </div>
        </motion.div>
      </div>
    </nav>
  )
} 