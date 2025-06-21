import React from "react";
import Image from "next/image";
import { AlertTriangle } from "lucide-react";

interface LoginFailedPopupProps {
  open: boolean;
  onClose: () => void;
  platform?: string;
}

const LoginFailedPopup: React.FC<LoginFailedPopupProps> = ({ open, onClose, platform }) => {
  if (!open) return null;
  
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60 transition-opacity duration-300 animate-fadeIn">
      <div className="bg-[#1a1f2e] rounded-xl shadow-lg p-8 w-80 relative flex flex-col items-center transform transition-all duration-300 scale-95 opacity-0 animate-popupIn border border-red-500/20">
        {/* Close Button */}
        <button
          className="absolute top-2 right-4 text-gray-400 hover:text-white text-xl"
          onClick={onClose}
          aria-label="Close"
        >
          ×
        </button>
        
        {/* Warning Icon */}
        <div className="w-16 h-16 bg-red-500/20 rounded-full flex items-center justify-center mb-4">
          <AlertTriangle className="w-8 h-8 text-red-500" />
        </div>
        
        <h2 className="text-red-400 text-lg font-bold mb-2">Login Failed!</h2>
        
        {/* Main Message */}
        <div className="text-center mb-6">
          <p className="text-red-600 text-base font-semibold mb-2">
            *Location Permission Denied!
          </p>
        </div>
        
        {/* OK Button */}
        <button
          className="w-full bg-red-500 hover:bg-red-600 text-white font-semibold py-3 rounded-lg shadow transition-colors duration-200"
          onClick={onClose}
        >
          OK
        </button>
        
        <div className="text-xs text-gray-500 mt-4 text-center">
          Kindly grant location access to use this feature.
        </div>
      </div>
      
      <style jsx global>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease;
        }
        @keyframes popupIn {
          from { opacity: 0; transform: scale(0.95); }
          to { opacity: 1; transform: scale(1); }
        }
        .animate-popupIn {
          animation: popupIn 0.3s cubic-bezier(0.4,0,0.2,1);
          opacity: 1 !important;
          transform: scale(1) !important;
        }
      `}</style>
    </div>
  );
};

export default LoginFailedPopup;