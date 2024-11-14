import React, { forwardRef, useImperativeHandle, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { createPortal } from "react-dom";

const Modal = forwardRef(({ error, onClose }, ref) => {
  const dialog = useRef();

  useImperativeHandle(ref, () => {
    return {
      open() {
        dialog.current.showModal();
      },
    };
  });

  return createPortal(
    <dialog
      ref={dialog}
      className="fixed inset-0 bg-transparent m-0 p-0 backdrop:bg-black/50 overflow-hidden"
    >
      <AnimatePresence>
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.2 }}
          className="relative w-full max-w-md mx-auto mt-24 bg-white rounded-lg shadow-lg overflow-hidden"
        >
          <div className="p-6">
            <div className="flex items-start">
              <div className="flex-shrink-0"></div>
              <div className="ml-3 w-full">
                <p className="text-sm text-gray-700">{error}</p>
              </div>
            </div>
          </div>

          <form method="dialog" className="border-t border-gray-200">
            <motion.button
              whileHover={{ backgroundColor: "rgb(243 244 246)" }}
              whileTap={{ scale: 0.98 }}
              onClick={onClose}
              className="w-full px-4 py-3 text-sm font-medium text-gray-700 hover:text-gray-900 flex items-center justify-center gap-2"
            >
              Close
            </motion.button>
          </form>
        </motion.div>
      </AnimatePresence>
    </dialog>,
    document.getElementById("modal")
  );
});

Modal.displayName = "Modal";

export default Modal;
