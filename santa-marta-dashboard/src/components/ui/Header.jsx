import React from 'react';

const Header = () => {
  return (
    <header className="bg-gradient-to-r from-blue-900 via-blue-800 to-blue-700 border-b border-blue-600/50">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between px-6 py-4">
          <div className="flex items-center space-x-6">
            <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-lg">
              <span className="text-2xl font-bold text-blue-700">SM</span>
            </div>
            <div>
              <h1 className="text-3xl font-bold text-white tracking-tight">
                Plan Indicativo
              </h1>
              <p className="text-blue-100 text-lg mt-1">2024-2027</p>
            </div>
          </div>
          <div className="flex items-center">
            <div className="bg-white/10 backdrop-blur-sm px-6 py-2 rounded-lg border border-white/20">
              <p className="text-white font-medium">RYP CLOUD</p>
              <p className="text-blue-100 text-sm">Agencia de IA</p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
