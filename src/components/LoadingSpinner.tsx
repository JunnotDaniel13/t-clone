import React from "react";

function LoadingSpinner() {
  return (
    <div className="flex items-center justify-center p-4">
      <div className="h-8 w-8 animate-spin rounded-full border-4 border-twitter/50 border-t-twitter"></div>
    </div>
  );
}

export default LoadingSpinner;
