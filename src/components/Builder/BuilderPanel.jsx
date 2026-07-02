import React, { useState } from 'react';
import ContentTab from './ContentTab';
import StylingTab from './StylingTab';
import { Layout, Palette } from 'lucide-react';

const BuilderPanel = () => {
  const [activeTab, setActiveTab] = useState('content');

  return (
    <div className="flex flex-col h-full">
      {/* Header Tabs */}
      <div className="flex border-b border-gray-200">
        <button
          onClick={() => setActiveTab('content')}
          className={`flex-1 py-4 text-sm font-medium flex items-center justify-center gap-2 ${
            activeTab === 'content'
              ? 'border-b-2 border-blue-600 text-blue-600'
              : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
          }`}
        >
          <Layout size={18} />
          Content
        </button>
        <button
          onClick={() => setActiveTab('styling')}
          className={`flex-1 py-4 text-sm font-medium flex items-center justify-center gap-2 ${
            activeTab === 'styling'
              ? 'border-b-2 border-blue-600 text-blue-600'
              : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
          }`}
        >
          <Palette size={18} />
          Styling
        </button>
      </div>

      {/* Tab Content */}
      <div className="flex-1 overflow-y-auto p-6">
        {activeTab === 'content' ? <ContentTab /> : <StylingTab />}
      </div>
    </div>
  );
};

export default BuilderPanel;
