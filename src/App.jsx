import { useState } from 'react';
import BuilderPanel from './components/Builder/BuilderPanel';
import LivePreview from './components/Preview/LivePreview';

function App() {
  return (
    <div className="flex h-screen overflow-hidden bg-gray-50 text-gray-900 font-sans">
      {/* Builder Panel (Left) */}
      <div className="w-[600px] h-full border-r border-gray-200 bg-white flex flex-col shadow-sm z-10 shrink-0">
        <BuilderPanel />
      </div>

      {/* Live Preview (Right) */}
      <div className="flex-1 h-full bg-slate-100 flex items-center justify-center p-8 relative overflow-y-auto">
        <LivePreview />
      </div>
    </div>
  );
}

export default App;
