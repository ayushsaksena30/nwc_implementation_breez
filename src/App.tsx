import { motion } from 'framer-motion'
import Navbar from './components/Navbar'
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom'
import Demo from './pages/Demo'
import About from './pages/About'

function Home() {
  const navigate = useNavigate()

  const containerVariants = {
    hidden: { opacity: 0, y: 50 },
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
    hidden: { opacity: 0, y: -20 },
    visible: { opacity: 1, y: 0 }
  }

  const cardVariants = {
    rest: { scale: 1, rotate: 0 },
    hover: { 
      scale: 1.05, 
      rotate: 1,
      transition: { duration: 0.3 }
    },
    tap: { scale: 0.95 }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-200 via-sky-100 to-indigo-100">
      
      <Navbar />

      <motion.div
        className="min-h-[calc(100vh-4rem)] flex flex-col justify-center items-center px-6"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div className="text-center max-w-4xl" variants={itemVariants}>
          <h1 className="text-6xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-6">
            Demo Implementation of <br />
            Nostr Wallet Connect in Breez
          </h1>
          <p className="text-xl text-black max-w-2xl mx-auto mb-8">
            Nostr Wallet Connect is an open secure protocol that enables seamless interaction between wallets and applications
          </p>
        </motion.div>
        
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.6 }}
        >
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <motion.button
              className="px-8 py-4 rounded-lg font-semibold text-lg bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700 transition-colors duration-300"
              onClick={() => navigate('/demo')}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Show Demo
            </motion.button>
            
            <motion.button
              className="px-8 py-4 rounded-lg font-semibold text-lg border-2 border-blue-900 text-blue-900 hover:bg-blue-900 hover:text-white dark:border-blue-400 dark:text-blue-400 dark:hover:bg-blue-400 dark:hover:text-gray-900 transition-all duration-300 flex items-center gap-2"
              onClick={() => window.open('https://sdk-doc-liquid.breez.technology', '_blank')}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Build 
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z"/>
              </svg>
            </motion.button>
          </div>
        </motion.div>
      </motion.div>

      <motion.div
        className="container mx-auto px-6 py-12"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={containerVariants}
      >

        <motion.div 
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16"
          variants={itemVariants}
        >
          {[
            { name: 'Pay Invoice', color: 'from-blue-400 to-blue-600', icon: '/pay-invoice.png' },
            { name: 'List Transactions', color: 'from-purple-400 to-purple-600', icon: '/list-transactions.png' },
            { name: 'Get Balance', color: 'from-cyan-400 to-blue-500', icon: '/get-balance.png' }
          ].map((tech) => (
            <motion.div
              key={tech.name}
              className={`p-6 rounded-2xl bg-gradient-to-br ${tech.color} text-white shadow-xl`}
              variants={cardVariants}
              initial="rest"
              whileHover="hover"
              whileTap="tap"
            >
              <div className="flex flex-col items-center text-center">
                <img
                  src={tech.icon}
                  alt={`${tech.name} icon`}
                  className="w-12 h-12 object-contain mb-3"
                />
                <h3 className="text-xl font-semibold">{tech.name}</h3>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </div>
  )
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/demo" element={<Demo />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </Router>
  )
}

export default App 