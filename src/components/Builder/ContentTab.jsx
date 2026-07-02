import React, { useRef } from 'react';
import { useSurvey } from '../../context/SurveyContext';
import { Settings2, Plus, Trash2, ChevronDown, ChevronUp, Image as ImageIcon } from 'lucide-react';

const ContentTab = () => {
  const { content, updateContent, setNumPages } = useSurvey();
  const [expandedQ, setExpandedQ] = React.useState(0);
  const fileInputRef = useRef(null);

  const handleNumPagesChange = (e) => {
    const val = parseInt(e.target.value) || 1;
    setNumPages(val);
  };

  const updateQuestion = (index, field, value) => {
    updateContent('questions', (prev) => {
      const newQs = [...prev];
      newQs[index] = { ...newQs[index], [field]: value };
      return newQs;
    });
  };

  const updateOption = (qIndex, oIndex, value) => {
    updateContent('questions', (prev) => {
      const newQs = [...prev];
      const newOptions = [...newQs[qIndex].options];
      newOptions[oIndex] = { ...newOptions[oIndex], text: value };
      newQs[qIndex] = { ...newQs[qIndex], options: newOptions };
      return newQs;
    });
  };

  const addOption = (qIndex) => {
    updateContent('questions', (prev) => {
      return prev.map((q, i) => {
        if (i !== qIndex) return q;
        const newId = `opt_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`;
        return { ...q, options: [...q.options, { id: newId, text: `Option ${q.options.length + 1}` }] };
      });
    });
  };

  const removeOption = (qIndex, oIndex) => {
    updateContent('questions', (prev) => {
      return prev.map((q, i) => {
        if (i !== qIndex) return q;
        if (q.options.length <= 2) return q;
        return { ...q, options: q.options.filter((_, idx) => idx !== oIndex) };
      });
    });
  };

  // Logic Rules functions
  const addLogicRule = (qIndex) => {
    updateContent('questions', (prev) => {
      return prev.map((q, i) => {
        if (i !== qIndex) return q;
        return { ...q, logicRules: [...q.logicRules, { id: `rule_${Date.now()}`, optionId: '', targetId: 'thank-you' }] };
      });
    });
  };

  const updateLogicRule = (qIndex, ruleIndex, field, value) => {
    updateContent('questions', (prev) => {
      const newQs = prev.map((q, i) => {
        if (i !== qIndex) return q;
        const newRules = q.logicRules.map((r, ri) => {
          if (ri !== ruleIndex) return r;
          return { ...r, [field]: value };
        });
        return { ...q, logicRules: newRules };
      });
      return newQs;
    });
  };

  const removeLogicRule = (qIndex, ruleIndex) => {
    updateContent('questions', (prev) => {
      return prev.map((q, i) => {
        if (i !== qIndex) return q;
        return { ...q, logicRules: q.logicRules.filter((_, ri) => ri !== ruleIndex) };
      });
    });
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        updateContent('thankYou', { ...content.thankYou, mediaUrl: reader.result, mediaType: 'upload' });
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="space-y-8 pb-12">
      {/* Introduction Section */}
      <section>
        <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
          <Settings2 size={20} className="text-gray-500"/> Introduction Page
        </h2>
        <div className="space-y-4 bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Number of Survey Pages
            </label>
            <input
              type="number"
              min="1"
              max="20"
              value={content.intro.numPages}
              onChange={handleNumPagesChange}
              className="w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 p-2 border"
            />
          </div>
        </div>
      </section>

      {/* Questions List */}
      <section>
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Questions</h2>
        <div className="space-y-4">
          {content.questions.map((q, index) => (
            <div key={q.id} className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm">
              <div 
                className="p-4 bg-gray-50 border-b border-gray-200 flex justify-between items-center cursor-pointer hover:bg-gray-100"
                onClick={() => setExpandedQ(expandedQ === index ? -1 : index)}
              >
                <h3 className="text-md font-medium text-gray-800">Question {index + 1}</h3>
                {expandedQ === index ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
              </div>
              
              {expandedQ === index && (
                <div className="p-4 space-y-5">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                    <input
                      type="text"
                      value={q.title}
                      onChange={(e) => updateQuestion(index, 'title', e.target.value)}
                      className="w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 p-2 border"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Subtitle</label>
                    <input
                      type="text"
                      value={q.subtitle}
                      onChange={(e) => updateQuestion(index, 'subtitle', e.target.value)}
                      className="w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 p-2 border"
                    />
                  </div>
                  
                  {/* Options */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Options (Min 2)</label>
                    <div className="space-y-2">
                      {q.options.map((opt, oIndex) => (
                        <div key={opt.id} className="flex gap-2">
                          <input
                            type="text"
                            value={opt.text}
                            onChange={(e) => updateOption(index, oIndex, e.target.value)}
                            className="flex-1 border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 p-2 border"
                          />
                          <button
                            onClick={() => removeOption(index, oIndex)}
                            disabled={q.options.length <= 2}
                            className="p-2 text-gray-400 hover:text-red-500 disabled:opacity-50"
                          >
                            <Trash2 size={20} />
                          </button>
                        </div>
                      ))}
                    </div>
                    <button
                      onClick={() => addOption(index)}
                      className="mt-3 flex items-center gap-1 text-sm text-blue-600 font-medium hover:text-blue-700"
                    >
                      <Plus size={16} /> Add Option
                    </button>
                  </div>

                  {/* Additional Comments Toggle */}
                  <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                    <span className="text-sm font-medium text-gray-700">Additional Comments</span>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" className="sr-only peer" checked={q.hasAdditionalComments} onChange={(e) => updateQuestion(index, 'hasAdditionalComments', e.target.checked)} />
                      <div className="w-9 h-5 bg-gray-200 rounded-full peer peer-focus:ring-4 peer-focus:ring-blue-300 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-blue-600"></div>
                    </label>
                  </div>

                  {/* Logic Configuration */}
                  <div className="pt-4 border-t border-gray-100">
                    <div className="flex justify-between items-center mb-2">
                      <label className="block text-sm font-medium text-gray-700">Conditional Logic</label>
                      <button onClick={() => addLogicRule(index)} className="text-xs flex items-center gap-1 text-blue-600 font-medium hover:text-blue-700">
                        <Plus size={14} /> Add Condition
                      </button>
                    </div>
                    
                    {q.logicRules.length === 0 && <p className="text-sm text-gray-400 italic">No conditions set.</p>}
                    
                    <div className="space-y-3">
                      {q.logicRules.map((rule, rIndex) => (
                        <div key={rule.id} className="flex flex-col gap-2 p-3 bg-gray-50 border border-gray-200 rounded-md relative">
                          <button onClick={() => removeLogicRule(index, rIndex)} className="absolute top-2 right-2 text-gray-400 hover:text-red-500"><Trash2 size={16}/></button>
                          
                          <div>
                            <span className="text-xs text-gray-500 mb-1 block">If selected option is:</span>
                            <select value={rule.optionId} onChange={(e) => updateLogicRule(index, rIndex, 'optionId', e.target.value)} className="w-full text-sm border-gray-300 rounded-md p-2 border bg-white">
                              <option value="">Select option...</option>
                              {q.options.map(o => <option key={o.id} value={o.id}>{o.text}</option>)}
                            </select>
                          </div>
                          
                          <div>
                            <span className="text-xs text-gray-500 mb-1 block">Redirect to:</span>
                            <select value={rule.targetId} onChange={(e) => updateLogicRule(index, rIndex, 'targetId', e.target.value)} className="w-full text-sm border-gray-300 rounded-md p-2 border bg-white">
                              <option value="thank-you">Thank You Page</option>
                              {content.questions.filter((_, idx) => idx > index).map((targetQ, idx) => (
                                <option key={targetQ.id} value={targetQ.id}>Question {index + 2 + idx} ({targetQ.title})</option>
                              ))}
                            </select>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Submit Button */}
                  <div className="pt-4 border-t border-gray-100">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Submit Button Text</label>
                    <input
                      type="text"
                      value={q.buttonText}
                      onChange={(e) => updateQuestion(index, 'buttonText', e.target.value)}
                      className="w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 p-2 border"
                    />
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Thank You Page */}
      <section>
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Thank You Page</h2>
        <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-gray-700">Enable Thank You Page</span>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" className="sr-only peer" checked={content.thankYou.enabled} onChange={(e) => updateContent('thankYou', { ...content.thankYou, enabled: e.target.checked })} />
              <div className="w-9 h-5 bg-gray-200 rounded-full peer peer-focus:ring-4 peer-focus:ring-blue-300 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-blue-600"></div>
            </label>
          </div>
          
          {content.thankYou.enabled && (
            <div className="space-y-4 pt-4 border-t border-gray-100">
               <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                  <input
                    type="text"
                    value={content.thankYou.title}
                    onChange={(e) => updateContent('thankYou', { ...content.thankYou, title: e.target.value })}
                    className="w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 p-2 border"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Subtitle</label>
                  <input
                    type="text"
                    value={content.thankYou.subtitle}
                    onChange={(e) => updateContent('thankYou', { ...content.thankYou, subtitle: e.target.value })}
                    className="w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 p-2 border"
                  />
                </div>
                
                {/* Media Upload */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Media Upload</label>
                  <div className="flex gap-4 mb-2">
                    <label className="flex items-center gap-2 text-sm">
                      <input type="radio" checked={content.thankYou.mediaType === 'url'} onChange={() => updateContent('thankYou', { ...content.thankYou, mediaType: 'url' })} /> URL
                    </label>
                    <label className="flex items-center gap-2 text-sm">
                      <input type="radio" checked={content.thankYou.mediaType === 'upload'} onChange={() => updateContent('thankYou', { ...content.thankYou, mediaType: 'upload' })} /> Upload
                    </label>
                  </div>
                  
                  {content.thankYou.mediaType === 'url' ? (
                    <input
                      type="text"
                      placeholder="https://..."
                      value={content.thankYou.mediaType === 'url' ? content.thankYou.mediaUrl : ''}
                      onChange={(e) => updateContent('thankYou', { ...content.thankYou, mediaUrl: e.target.value })}
                      className="w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 p-2 border"
                    />
                  ) : (
                    <div>
                      <input type="file" accept=".png,.jpg,.jpeg,.gif" ref={fileInputRef} onChange={handleFileUpload} className="hidden" />
                      <button onClick={() => fileInputRef.current.click()} className="flex items-center justify-center w-full gap-2 p-4 border-2 border-dashed border-gray-300 rounded-md hover:bg-gray-50 text-gray-500">
                        <ImageIcon size={20} /> Click to upload (PNG, JPG, GIF)
                      </button>
                      {content.thankYou.mediaUrl && content.thankYou.mediaUrl.startsWith('data:') && (
                        <img src={content.thankYou.mediaUrl} alt="Preview" className="mt-2 h-20 object-contain rounded" />
                      )}
                    </div>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">CTA Button Text</label>
                  <input
                    type="text"
                    value={content.thankYou.buttonText}
                    onChange={(e) => updateContent('thankYou', { ...content.thankYou, buttonText: e.target.value })}
                    className="w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 p-2 border"
                  />
                </div>
                
                {/* Redirect */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Redirect Action</label>
                  <select 
                    value={content.thankYou.redirectType} 
                    onChange={(e) => updateContent('thankYou', { ...content.thankYou, redirectType: e.target.value })}
                    className="w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 p-2 border bg-white mb-2"
                  >
                    <option value="none">No Action</option>
                    <option value="url">Redirect to URL</option>
                  </select>
                  
                  {content.thankYou.redirectType === 'url' && (
                    <input
                      type="text"
                      placeholder="https://..."
                      value={content.thankYou.redirectUrl}
                      onChange={(e) => updateContent('thankYou', { ...content.thankYou, redirectUrl: e.target.value })}
                      className="w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 p-2 border"
                    />
                  )}
                </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default ContentTab;
