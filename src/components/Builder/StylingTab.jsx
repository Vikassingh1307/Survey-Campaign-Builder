import React, { useState } from 'react';
import { useSurvey } from '../../context/SurveyContext';
import { ChevronDown, ChevronUp, Palette, Type, Square, Hand, XCircle, Layout } from 'lucide-react';

const StylingTab = () => {
  const { styling, updateStyling } = useSurvey();
  const [expandedSection, setExpandedSection] = useState('appearance');

  const SectionHeader = ({ title, id, icon }) => (
    <div 
      className="p-4 bg-gray-50 border-b border-gray-200 flex justify-between items-center cursor-pointer hover:bg-gray-100"
      onClick={() => setExpandedSection(expandedSection === id ? null : id)}
    >
      <div className="flex items-center gap-2">
        {icon}
        <h3 className="text-md font-medium text-gray-800">{title}</h3>
      </div>
      {expandedSection === id ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
    </div>
  );

  const ColorInput = ({ label, section, field }) => (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
      <input type="color" value={styling[section][field]} onChange={(e) => updateStyling(section, { [field]: e.target.value })} className="w-full h-10 border-0 rounded p-0 cursor-pointer" />
    </div>
  );

  const NumberInput = ({ label, section, field, min, max }) => (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
      <input type="number" min={min} max={max} value={styling[section][field]} onChange={(e) => updateStyling(section, { [field]: parseInt(e.target.value) || 0 })} className="w-full border-gray-300 rounded-md p-2 border" />
    </div>
  );

  const SelectInput = ({ label, section, field, options }) => (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
      <select value={styling[section][field]} onChange={(e) => updateStyling(section, { [field]: e.target.value })} className="w-full border-gray-300 rounded-md p-2 border bg-white">
        {options.map(opt => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
      </select>
    </div>
  );

  const MarginsInput = ({ section, prefix }) => (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">Margins (T / R / B / L)</label>
      <div className="flex gap-2">
        <input type="number" value={styling[section][`${prefix}Top`]} onChange={(e) => updateStyling(section, { [`${prefix}Top`]: parseInt(e.target.value)||0 })} className="w-full border-gray-300 rounded-md p-1 border text-center text-sm" placeholder="Top" />
        <input type="number" value={styling[section][`${prefix}Right`]} onChange={(e) => updateStyling(section, { [`${prefix}Right`]: parseInt(e.target.value)||0 })} className="w-full border-gray-300 rounded-md p-1 border text-center text-sm" placeholder="Right" />
        <input type="number" value={styling[section][`${prefix}Bottom`]} onChange={(e) => updateStyling(section, { [`${prefix}Bottom`]: parseInt(e.target.value)||0 })} className="w-full border-gray-300 rounded-md p-1 border text-center text-sm" placeholder="Bottom" />
        <input type="number" value={styling[section][`${prefix}Left`]} onChange={(e) => updateStyling(section, { [`${prefix}Left`]: parseInt(e.target.value)||0 })} className="w-full border-gray-300 rounded-md p-1 border text-center text-sm" placeholder="Left" />
      </div>
    </div>
  );

  const RadiiInput = ({ section, prefix }) => (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">Radius (TL / TR / BR / BL)</label>
      <div className="flex gap-2">
        <input type="number" value={styling[section][`${prefix}TopLeft`]} onChange={(e) => updateStyling(section, { [`${prefix}TopLeft`]: parseInt(e.target.value)||0 })} className="w-full border-gray-300 rounded-md p-1 border text-center text-sm" placeholder="TL" />
        <input type="number" value={styling[section][`${prefix}TopRight`]} onChange={(e) => updateStyling(section, { [`${prefix}TopRight`]: parseInt(e.target.value)||0 })} className="w-full border-gray-300 rounded-md p-1 border text-center text-sm" placeholder="TR" />
        <input type="number" value={styling[section][`${prefix}BottomRight`]} onChange={(e) => updateStyling(section, { [`${prefix}BottomRight`]: parseInt(e.target.value)||0 })} className="w-full border-gray-300 rounded-md p-1 border text-center text-sm" placeholder="BR" />
        <input type="number" value={styling[section][`${prefix}BottomLeft`]} onChange={(e) => updateStyling(section, { [`${prefix}BottomLeft`]: parseInt(e.target.value)||0 })} className="w-full border-gray-300 rounded-md p-1 border text-center text-sm" placeholder="BL" />
      </div>
    </div>
  );

  const fontOptions = [
    { label: 'Inter', value: 'Inter' },
    { label: 'Roboto', value: 'Roboto' },
    { label: 'Outfit', value: 'Outfit' },
    { label: 'System', value: 'sans-serif' }
  ];
  
  const fontWeightOptions = [
    { label: 'Normal', value: 'normal' },
    { label: 'Medium', value: '500' },
    { label: 'Bold', value: 'bold' }
  ];

  const fontStyleOptions = [
    { label: 'Normal', value: 'normal' },
    { label: 'Italic', value: 'italic' }
  ];

  const alignOptions = [
    { label: 'Left', value: 'left' },
    { label: 'Center', value: 'center' },
    { label: 'Right', value: 'right' }
  ];

  return (
    <div className="space-y-4 pb-12">
      <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
        <Palette size={20} className="text-gray-500"/> Styling Configurations
      </h2>

      {/* 1. Appearance Section */}
      <div className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm">
        <SectionHeader title="Appearance" id="appearance" icon={<Layout size={18} className="text-gray-500"/>} />
        {expandedSection === 'appearance' && (
          <div className="p-4 space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <ColorInput label="Background Color" section="appearance" field="backgroundColor" />
              <NumberInput label="Delay (seconds)" section="appearance" field="delay" />
            </div>
            <RadiiInput section="appearance" prefix="radius" />
            <div className="grid grid-cols-2 gap-4 pt-4 border-t">
              <ColorInput label="Backdrop Color" section="appearance" field="backdropColor" />
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Backdrop Opacity (%)</label>
                <input type="range" min="0" max="100" value={styling.appearance.backdropOpacity} onChange={(e) => updateStyling('appearance', { backdropOpacity: parseInt(e.target.value) })} className="w-full mt-2" />
              </div>
            </div>
          </div>
        )}
      </div>

      {/* 2. Question Title Styling */}
      <div className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm">
        <SectionHeader title="Question Title" id="qtitle" icon={<Type size={18} className="text-gray-500"/>} />
        {expandedSection === 'qtitle' && (
          <div className="p-4 space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <ColorInput label="Color" section="questionTitle" field="color" />
              <SelectInput label="Font Family" section="questionTitle" field="fontFamily" options={fontOptions} />
              <NumberInput label="Font Size (px)" section="questionTitle" field="fontSize" />
              <SelectInput label="Font Weight" section="questionTitle" field="fontWeight" options={fontWeightOptions} />
              <SelectInput label="Font Style" section="questionTitle" field="fontStyle" options={fontStyleOptions} />
              <SelectInput label="Alignment" section="questionTitle" field="alignment" options={alignOptions} />
            </div>
            <MarginsInput section="questionTitle" prefix="margin" />
          </div>
        )}
      </div>

      {/* 3. Subtitle Styling */}
      <div className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm">
        <SectionHeader title="Subtitle" id="subtitle" icon={<Type size={18} className="text-gray-500"/>} />
        {expandedSection === 'subtitle' && (
          <div className="p-4 space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <ColorInput label="Color" section="subtitle" field="color" />
              <SelectInput label="Font Family" section="subtitle" field="fontFamily" options={fontOptions} />
              <NumberInput label="Font Size (px)" section="subtitle" field="fontSize" />
              <SelectInput label="Font Weight" section="subtitle" field="fontWeight" options={fontWeightOptions} />
              <SelectInput label="Font Style" section="subtitle" field="fontStyle" options={fontStyleOptions} />
              <SelectInput label="Alignment" section="subtitle" field="alignment" options={alignOptions} />
            </div>
            <MarginsInput section="subtitle" prefix="margin" />
          </div>
        )}
      </div>

      {/* 4. Option List Style */}
      <div className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm">
        <SectionHeader title="Option List Layout" id="optlist" icon={<Square size={18} className="text-gray-500"/>} />
        {expandedSection === 'optlist' && (
          <div className="p-4 space-y-4">
            <SelectInput label="Layout Style" section="optionList" field="layout" options={[{label:'Radio', value:'radio'}, {label:'Checkbox', value:'checkbox'}, {label:'Filled', value:'filled'}, {label:'Alternative', value:'alternative'}]} />
            <div className="grid grid-cols-2 gap-4">
              <NumberInput label="Option Height (px)" section="optionList" field="optionHeight" />
              <NumberInput label="Option Spacing (px)" section="optionList" field="optionSpacing" />
              <NumberInput label="Bullet Spacing (px)" section="optionList" field="bulletSpacing" />
            </div>
            <RadiiInput section="optionList" prefix="radius" />
          </div>
        )}
      </div>

      {/* 5. Selected Option */}
      <div className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm">
        <SectionHeader title="Selected Option" id="selopt" icon={<Square size={18} className="text-blue-500"/>} />
        {expandedSection === 'selopt' && (
          <div className="p-4 space-y-4">
            <div className="grid grid-cols-3 gap-4">
              <ColorInput label="Background" section="selectedOption" field="backgroundColor" />
              <ColorInput label="Text" section="selectedOption" field="textColor" />
              <ColorInput label="Border" section="selectedOption" field="borderColor" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <NumberInput label="Border Width (px)" section="selectedOption" field="borderWidth" />
              <SelectInput label="Font Family" section="selectedOption" field="fontFamily" options={fontOptions} />
              <NumberInput label="Font Size (px)" section="selectedOption" field="fontSize" />
              <SelectInput label="Font Weight" section="selectedOption" field="fontWeight" options={fontWeightOptions} />
              <SelectInput label="Font Style" section="selectedOption" field="fontStyle" options={fontStyleOptions} />
              <SelectInput label="Alignment" section="selectedOption" field="alignment" options={alignOptions} />
            </div>
          </div>
        )}
      </div>

      {/* 6. Unselected Option */}
      <div className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm">
        <SectionHeader title="Unselected Option" id="unselopt" icon={<Square size={18} className="text-gray-400"/>} />
        {expandedSection === 'unselopt' && (
          <div className="p-4 space-y-4">
            <div className="grid grid-cols-3 gap-4">
              <ColorInput label="Background" section="unselectedOption" field="backgroundColor" />
              <ColorInput label="Text" section="unselectedOption" field="textColor" />
              <ColorInput label="Border" section="unselectedOption" field="borderColor" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <NumberInput label="Border Width (px)" section="unselectedOption" field="borderWidth" />
              <SelectInput label="Font Family" section="unselectedOption" field="fontFamily" options={fontOptions} />
              <NumberInput label="Font Size (px)" section="unselectedOption" field="fontSize" />
              <SelectInput label="Font Weight" section="unselectedOption" field="fontWeight" options={fontWeightOptions} />
              <SelectInput label="Font Style" section="unselectedOption" field="fontStyle" options={fontStyleOptions} />
              <SelectInput label="Alignment" section="unselectedOption" field="alignment" options={alignOptions} />
            </div>
          </div>
        )}
      </div>

      {/* 7. Additional Comment */}
      <div className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm">
        <SectionHeader title="Additional Comment" id="addcom" icon={<Type size={18} className="text-gray-500"/>} />
        {expandedSection === 'addcom' && (
          <div className="p-4 space-y-4">
            <div className="grid grid-cols-3 gap-4">
              <ColorInput label="Background" section="additionalComment" field="backgroundColor" />
              <ColorInput label="Text" section="additionalComment" field="textColor" />
              <ColorInput label="Border" section="additionalComment" field="borderColor" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <NumberInput label="Border Width (px)" section="additionalComment" field="borderWidth" />
              <SelectInput label="Font Family" section="additionalComment" field="fontFamily" options={fontOptions} />
              <NumberInput label="Font Size (px)" section="additionalComment" field="fontSize" />
              <SelectInput label="Font Weight" section="additionalComment" field="fontWeight" options={fontWeightOptions} />
              <SelectInput label="Font Style" section="additionalComment" field="fontStyle" options={fontStyleOptions} />
              <SelectInput label="Alignment" section="additionalComment" field="alignment" options={alignOptions} />
            </div>
          </div>
        )}
      </div>

      {/* 8. CTA Button */}
      <div className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm">
        <SectionHeader title="CTA Button" id="cta" icon={<Hand size={18} className="text-gray-500"/>} />
        {expandedSection === 'cta' && (
          <div className="p-4 space-y-4">
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm font-medium text-gray-700">Full Width Toggle</span>
              <input type="checkbox" checked={styling.ctaButton.fullWidth} onChange={(e) => updateStyling('ctaButton', { fullWidth: e.target.checked })} className="h-4 w-4 text-blue-600 rounded" />
            </div>
            <div className="grid grid-cols-3 gap-4 mb-4">
              <ColorInput label="Background" section="ctaButton" field="backgroundColor" />
              <ColorInput label="Text" section="ctaButton" field="textColor" />
              <ColorInput label="Border" section="ctaButton" field="borderColor" />
            </div>
            <div className="grid grid-cols-2 gap-4 mb-4">
              <NumberInput label="Height (px)" section="ctaButton" field="height" />
              {!styling.ctaButton.fullWidth && <NumberInput label="Width (px)" section="ctaButton" field="width" />}
              <NumberInput label="Border Width" section="ctaButton" field="borderWidth" />
              <SelectInput label="Alignment" section="ctaButton" field="alignment" options={alignOptions} />
              <SelectInput label="Font Family" section="ctaButton" field="fontFamily" options={fontOptions} />
              <NumberInput label="Font Size" section="ctaButton" field="fontSize" />
              <SelectInput label="Font Style" section="ctaButton" field="fontStyle" options={fontStyleOptions} />
            </div>
            <RadiiInput section="ctaButton" prefix="radius" />
            <MarginsInput section="ctaButton" prefix="margin" />
          </div>
        )}
      </div>

      {/* 9. Cross Button */}
      <div className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm">
        <SectionHeader title="Cross Button" id="crossbtn" icon={<XCircle size={18} className="text-gray-500"/>} />
        {expandedSection === 'crossbtn' && (
          <div className="p-4 space-y-4">
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm font-medium text-gray-700">Enable Cross Button</span>
              <input type="checkbox" checked={styling.crossButton.enabled} onChange={(e) => updateStyling('crossButton', { enabled: e.target.checked })} className="h-4 w-4 text-blue-600 rounded" />
            </div>
            {styling.crossButton.enabled && (
              <>
                <SelectInput label="Style" section="crossButton" field="style" options={[{label:'Default', value:'default'}, {label:'Circle', value:'circle'}, {label:'Custom Icon', value:'custom'}]} />
                {styling.crossButton.style === 'custom' && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Custom Icon URL</label>
                    <input type="text" value={styling.crossButton.customIconUrl} onChange={(e) => updateStyling('crossButton', { customIconUrl: e.target.value })} className="w-full border-gray-300 rounded-md p-2 border" />
                  </div>
                )}
                <div className="grid grid-cols-3 gap-4">
                  <ColorInput label="Cross Color" section="crossButton" field="crossColor" />
                  <ColorInput label="Fill Color" section="crossButton" field="fillColor" />
                  <ColorInput label="Stroke Color" section="crossButton" field="strokeColor" />
                </div>
                <div className="w-1/2">
                  <NumberInput label="Size (px)" section="crossButton" field="size" />
                </div>
                <MarginsInput section="crossButton" prefix="margin" />
              </>
            )}
          </div>
        )}
      </div>

      {/* 10. Thank You Page Styling */}
      <div className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm">
        <SectionHeader title="Thank You Page" id="thankyou" icon={<Layout size={18} className="text-gray-500"/>} />
        {expandedSection === 'thankyou' && (
          <div className="p-4 space-y-6">
            
            {/* TY Title */}
            <div>
              <h4 className="font-semibold text-gray-800 mb-2 border-b pb-1">Title</h4>
              <div className="grid grid-cols-2 gap-4 mb-4">
                <ColorInput label="Color" section="thankYouPage" field="titleColor" />
                <SelectInput label="Font" section="thankYouPage" field="titleFontFamily" options={fontOptions} />
                <NumberInput label="Size" section="thankYouPage" field="titleFontSize" />
                <SelectInput label="Style" section="thankYouPage" field="titleFontStyle" options={fontStyleOptions} />
                <SelectInput label="Alignment" section="thankYouPage" field="titleAlignment" options={alignOptions} />
              </div>
              <MarginsInput section="thankYouPage" prefix="titleMargin" />
            </div>

            {/* TY Subtitle */}
            <div>
              <h4 className="font-semibold text-gray-800 mb-2 border-b pb-1">Subtitle</h4>
              <div className="grid grid-cols-2 gap-4 mb-4">
                <ColorInput label="Color" section="thankYouPage" field="subtitleColor" />
                <SelectInput label="Font" section="thankYouPage" field="subtitleFontFamily" options={fontOptions} />
                <NumberInput label="Size" section="thankYouPage" field="subtitleFontSize" />
                <SelectInput label="Style" section="thankYouPage" field="subtitleFontStyle" options={fontStyleOptions} />
                <SelectInput label="Alignment" section="thankYouPage" field="subtitleAlignment" options={alignOptions} />
              </div>
              <MarginsInput section="thankYouPage" prefix="subtitleMargin" />
            </div>

            {/* TY Image */}
            <div>
              <h4 className="font-semibold text-gray-800 mb-2 border-b pb-1">Image</h4>
              <div className="grid grid-cols-2 gap-4 mb-4">
                <NumberInput label="Width (px)" section="thankYouPage" field="imageWidth" />
                <NumberInput label="Height (px)" section="thankYouPage" field="imageHeight" />
              </div>
              <MarginsInput section="thankYouPage" prefix="imageMargin" />
            </div>

            {/* TY Button */}
            <div>
              <h4 className="font-semibold text-gray-800 mb-2 border-b pb-1">Button</h4>
              <div className="flex items-center justify-between mb-4">
                <span className="text-sm font-medium text-gray-700">Full Width Toggle</span>
                <input type="checkbox" checked={styling.thankYouPage.buttonFullWidth} onChange={(e) => updateStyling('thankYouPage', { buttonFullWidth: e.target.checked })} className="h-4 w-4 text-blue-600 rounded" />
              </div>
              <div className="grid grid-cols-2 gap-4 mb-4">
                <ColorInput label="Background" section="thankYouPage" field="buttonBackgroundColor" />
                <ColorInput label="Text Color" section="thankYouPage" field="buttonTextColor" />
                <ColorInput label="Border Color" section="thankYouPage" field="buttonBorderColor" />
                <NumberInput label="Border Width" section="thankYouPage" field="buttonBorderWidth" />
                <NumberInput label="Height (px)" section="thankYouPage" field="buttonHeight" />
                {!styling.thankYouPage.buttonFullWidth && <NumberInput label="Width (px)" section="thankYouPage" field="buttonWidth" />}
                <SelectInput label="Font Family" section="thankYouPage" field="buttonFontFamily" options={fontOptions} />
                <NumberInput label="Font Size" section="thankYouPage" field="buttonFontSize" />
                <SelectInput label="Font Style" section="thankYouPage" field="buttonFontStyle" options={fontStyleOptions} />
                <SelectInput label="Alignment" section="thankYouPage" field="buttonAlignment" options={alignOptions} />
              </div>
              <RadiiInput section="thankYouPage" prefix="buttonRadius" />
              <div className="mt-4">
                <MarginsInput section="thankYouPage" prefix="buttonMargin" />
              </div>
            </div>

          </div>
        )}
      </div>

    </div>
  );
};

export default StylingTab;
