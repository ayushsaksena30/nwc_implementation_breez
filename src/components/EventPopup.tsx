import { motion, AnimatePresence } from 'framer-motion'
import listTransactionsIcon from '/list-transactions.png'
import getBalanceIcon from '/get-balance.png'
import payInvoiceIcon from '/pay-invoice.png'

interface EventPopupProps {
  isOpen: boolean
  onClose: () => void
  eventType: string
  eventData: any
}

export default function EventPopup({ isOpen, onClose, eventType, eventData }: EventPopupProps) {
  const getEventIcon = (type: string) => {
    switch (type) {
      case 'listTransactions':
        return <img src={listTransactionsIcon} alt="List Transactions" className="w-6 h-6" />
      case 'getBalance':
        return <img src={getBalanceIcon} alt="Get Balance" className="w-6 h-6" />
      case 'payInvoice':
        return <img src={payInvoiceIcon} alt="Pay Invoice" className="w-6 h-6" />
      default:
        return <img src={getBalanceIcon} alt="Event" className="w-6 h-6" />
    }
  }

  const getEventTitle = (type: string) => {
    switch (type) {
      case 'listTransactions':
        return 'Transactions Listed'
      case 'getBalance':
        return 'Balance Retrieved'
      case 'payInvoice':
        return 'Invoice Payment'
      default:
        return 'Event Received'
    }
  }

  const formatEventData = (data: any) => {
    if (!data) return 'No data available'
    
    try {
      return JSON.stringify(data, null, 2)
    } catch {
      return String(data)
    }
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="bg-white rounded-lg shadow-xl max-w-lg w-full max-h-[60vh] overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between p-4 border-b border-gray-200">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-blue-100 rounded-lg text-blue-600">
                  {getEventIcon(eventType)}
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">
                    {getEventTitle(eventType)}
                  </h3>
                  <p className="text-sm text-gray-500">
                    NWC Event: {eventType}
                  </p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="p-4">
              <div className="mb-3">
                <h4 className="text-sm font-medium text-gray-700 mb-2">Event Details:</h4>
                <div className="bg-gray-50 rounded-lg p-3">
                  <pre className="text-xs text-gray-800 whitespace-pre-wrap overflow-auto max-h-32">
                    {formatEventData(eventData)}
                  </pre>
                </div>
              </div>

              <div className="flex justify-end space-x-3">
                <button
                  onClick={onClose}
                  className="px-3 py-1.5 text-gray-600 hover:text-gray-800 transition-colors text-sm"
                >
                  Close
                </button>
                <button
                  onClick={() => {
                    navigator.clipboard.writeText(formatEventData(eventData))
                  }}
                  className="px-3 py-1.5 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors text-sm"
                >
                  Copy Data
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
} 