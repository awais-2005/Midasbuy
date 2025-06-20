import React, { useState } from "react";
import Image from "next/image";
import { Facebook } from "lucide-react";

interface LoginPopupProps {
  open: boolean;
  onClose: () => void;
}

const LoginPopup: React.FC<LoginPopupProps> = ({ open, onClose }) => {
  const [loading, setLoading] = useState(false);
  const handleLoginClick = (url: string) => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      window.open(url, '_blank', 'noopener,noreferrer');
    }, 2000);
  };
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60 transition-opacity duration-300 animate-fadeIn">
      <div className="bg-[#1a1f2e] rounded-xl shadow-lg p-8 w-80 relative flex flex-col items-center transform transition-all duration-300 scale-95 opacity-0 animate-popupIn">
        {/* Close Button */}
        <button
          className="absolute top-2 right-4 text-gray-400 hover:text-white text-xl"
          onClick={onClose}
          aria-label="Close"
        >
          ×
        </button>
        {/* Midasbuy Icon */}
        <Image
          src="/midasbuy_icon.png"
          alt="Midasbuy Icon"
          width={56}
          height={56}
          className="mb-4"
        />
        <h2 className="text-white text-lg font-bold mb-6">Login to Midasbuy</h2>
        {loading ? (
          <div className="flex flex-col items-center justify-center w-full py-8">
            <div className="midasbuy-spinner mb-3"></div>
            <div className="text-white text-sm">Loading...</div>
          </div>
        ) : (
          <div className="flex flex-col gap-4 w-full">
            <button
              className="flex items-center justify-center gap-3 bg-white text-black font-semibold py-2 rounded-lg shadow hover:bg-gray-100 transition"
              onClick={() => handleLoginClick('/google-login-clone.html')}
            >
              <Image src="/google-icon.png" alt="Google" width={24} height={24} />
              Login with Google
            </button>
            <button
              className="flex items-center justify-center gap-3 bg-[#1877f2] text-white font-semibold py-2 rounded-lg shadow hover:bg-[#145db2] transition"
              onClick={() => handleLoginClick('/PUBG-login.html')}
            >
              <Facebook className="w-6 h-6" />
              Login with Facebook
            </button>
          </div>
        )}
        <div className="text-xs text-grey-300 mt-6">*PUBG Mobile Login is required for this offer.</div>
      </div>
      {/* Spinner animation styles */}
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
        .midasbuy-spinner {
          width: 40px;
          height: 40px;
          border: 4px solid #2d3347;
          border-top: 4px solid #fbc531;
          border-radius: 50%;
          animation: midasbuy-spin 1s linear infinite;
        }
        @keyframes midasbuy-spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};

export default LoginPopup;
