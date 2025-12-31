import React from "react";

export const TunerLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="min-h-screen bg-gray-50 p-6 flex flex-col items-center justify-center font-sans text-gray-800">
      {children}
      <footer className="mt-8 text-gray-400 text-[10px] font-bold tracking-widest uppercase">
        &copy; 2025 VOCA-NICAL AI ENGINE
      </footer>
    </div>
  );
};
