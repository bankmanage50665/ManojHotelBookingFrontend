import React from 'react';
import { motion } from 'framer-motion';
import { AlertTriangle } from 'lucide-react';

const ErrorMessage = ({ message }) => {
  if (!message) return null;

 
  

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      className="flex items-center gap-2 p-4 bg-red-50 border border-red-200 rounded-lg shadow-sm"
    >
      <AlertTriangle className="w-5 h-5 text-red-500" />
      <p className="text-sm font-medium text-red-700">{message}</p>
    </motion.div>
  );
};

export default ErrorMessage;