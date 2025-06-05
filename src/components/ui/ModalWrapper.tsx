"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import { Button } from "./button";

interface ModalWrapperProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  width?: string;
  showCloseButton?: boolean;
}

const ModalWrapper = ({
  isOpen,
  onClose,
  title,
  children,
  width = "w-full max-w-xl",
  showCloseButton = true,
}: ModalWrapperProps) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  if (!mounted) return null;

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-[100] bg-black/60 flex items-center justify-center"
          onClick={onClose}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className={`relative bg-p950 rounded-2xl shadow-xl ${width} max-h-[80vh] overflow-y-auto p-6`}
            onClick={(e) => e.stopPropagation()}
            initial={{ opacity: 0, y: 50, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.95 }}
            transition={{ type: "spring", damping: 22, stiffness: 200 }}
          >
            {showCloseButton && (
              <Button
                onClick={onClose}
                className="absolute top-3 right-4 text-p50 hover:text-red-500"
              >
                <X className="w-6 h-6" />
              </Button>
            )}

            {title && (
              <h2 className="text-xl font-semibold text-center mb-4 text-p50">
                {title}
              </h2>
            )}

            <div className="modal-body">{children}</div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  );
};

export default ModalWrapper;
