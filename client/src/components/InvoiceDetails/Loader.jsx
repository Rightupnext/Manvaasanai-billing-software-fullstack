import React, { useState, useEffect } from "react";
import { FaSpinner } from "react-icons/fa";

const LoadingMessages = [
  "Preparing your billing details...",
  "Calculating invoices...",
  "Securing financial data...",
  "Organizing billing information...",
  "Optimizing data display..."
];

const Loader = () => {
  const [currentMessage, setCurrentMessage] = useState(0);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState(false);

  useEffect(() => {
    const messageInterval = setInterval(() => {
      setCurrentMessage((prev) => (prev + 1) % LoadingMessages.length);
    }, 3000);

    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        return prev + 1;
      });
    }, 150);

    const timeoutId = setTimeout(() => {
      setError(true);
    }, 30000);

    return () => {
      clearInterval(messageInterval);
      clearInterval(progressInterval);
      clearTimeout(timeoutId);
    };
  }, []);

  const handleRetry = () => {
    setError(false);
    setProgress(0);
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-blue-50 to-blue-100 p-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8 relative overflow-hidden">
        {!error ? (
          <>
            <div className="flex flex-col items-center space-y-6">
              <div className="relative">
                <FaSpinner className="w-16 h-16 text-blue-600 animate-spin" aria-label="Loading spinner" />
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-blue-200 to-transparent animate-pulse opacity-30"></div>
              </div>

              <div className="text-center space-y-2">
                <p className="text-lg font-semibold text-gray-800 animate-fade-in">
                  {LoadingMessages[currentMessage]}
                </p>
                <p className="text-sm text-gray-600">{progress}% Complete</p>
              </div>

              <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                <div
                  className="h-full bg-blue-600 rounded-full transition-all duration-300 ease-out"
                  style={{ width: `${progress}%` }}
                  role="progressbar"
                  aria-valuenow={progress}
                  aria-valuemin="0"
                  aria-valuemax="100"
                ></div>
              </div>
            </div>

            <div className="mt-6 text-center">
              <p className="text-sm text-gray-500">
                Please wait while we process your request
              </p>
            </div>
          </>
        ) : (
          <div className="text-center space-y-4">
            <p className="text-lg font-semibold text-red-600">
              Loading is taking longer than expected
            </p>
            <button
              onClick={handleRetry}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
            >
              Retry
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Loader;