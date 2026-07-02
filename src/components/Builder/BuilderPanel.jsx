import React, { useState } from 'react';
import ContentTab from './ContentTab';
import StylingTab from './StylingTab';
import { Layout, Palette } from 'lucide-react';

const BuilderPanel = () => {
  const [activeTab, setActiveTab] = useState('content');

  return (
    <div className="flex flex-col h-full">
      {/* Premium Header */}
      <div className="pt-6 px-6 pb-2 bg-white z-20">
        <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mb-6">
          Campaign Builder
        </h1>
        <div className="flex gap-2 p-1 bg-slate-100 rounded-xl relative">
          <button
            onClick={() => setActiveTab('content')}
            className={`flex-1 py-2.5 text-sm font-semibold rounded-lg flex items-center justify-center gap-2 transition-all duration-300 ${
              activeTab === 'content'
                ? 'bg-white text-blue-700 shadow-sm ring-1 ring-slate-200'
                : 'text-slate-500 hover:text-slate-700 hover:bg-slate-200/50'
            }`}
          >
            <Layout size={16} />
            Content
          </button>
          <button
            onClick={() => setActiveTab('styling')}
            className={`flex-1 py-2.5 text-sm font-semibold rounded-lg flex items-center justify-center gap-2 transition-all duration-300 ${
              activeTab === 'styling'
                ? 'bg-white text-indigo-700 shadow-sm ring-1 ring-slate-200'
                : 'text-slate-500 hover:text-slate-700 hover:bg-slate-200/50'
            }`}
          >
            <Palette size={16} />
            Styling
          </button>
        </div>
      </div>

      {/* Tab Content */}
      <div className="flex-1 overflow-y-auto px-6 pt-4 pb-12">
        {activeTab === 'content' ? <ContentTab /> : <StylingTab />}
      </div>
    </div>
  );
};

export default BuilderPanel;
