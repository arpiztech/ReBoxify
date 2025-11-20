import React from "react";
import { CheckCircle, XCircle } from "lucide-react";

export default function Notifications({ success, error }) {
  return (
    <>
      {success && (
        <div className="fixed top-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg z-50 flex items-center gap-2">
          <CheckCircle size={20} />
          {success}
        </div>
      )}
      {error && (
        <div className="fixed top-4 right-4 bg-red-500 text-white px-6 py-3 rounded-lg shadow-lg z-50 flex items-center gap-2">
          <XCircle size={20} />
          {error}
        </div>
      )}
    </>
  );
}
