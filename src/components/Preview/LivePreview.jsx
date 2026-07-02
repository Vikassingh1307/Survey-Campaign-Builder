import React, { useState, useEffect } from 'react';
import { useSurvey } from '../../context/SurveyContext';
import { X } from 'lucide-react';

const LivePreview = () => {
  const { content, styling } = useSurvey();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOptions, setSelectedOptions] = useState({});
  const [isThankYou, setIsThankYou] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  // Handle Display Delay
  useEffect(() => {
    setIsVisible(false);
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, styling.appearance.delay * 1000 || 0);
    return () => clearTimeout(timer);
  }, [styling.appearance.delay]);

  const currentQ = content.questions[currentIndex];

  const handleNext = () => {
    // 1. Evaluate custom logic rules
    const selectedOptId = selectedOptions[currentQ.id];
    // Compare as strings because select options store as string
    const rule = currentQ.logicRules.find(r => String(r.optionId) === String(selectedOptId));
    
    if (rule) {
      if (rule.targetId === 'thank-you') {
        if (content.thankYou.enabled) setIsThankYou(true);
      } else {
        const targetIndex = content.questions.findIndex(q => String(q.id) === String(rule.targetId));
        if (targetIndex !== -1) setCurrentIndex(targetIndex);
      }
      return;
    }

    // 2. Fallback to normal flow
    if (currentIndex < content.questions.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else if (content.thankYou.enabled) {
      setIsThankYou(true);
    }
  };

  const handleOptionClick = (qId, optId) => {
    setSelectedOptions(prev => ({ ...prev, [qId]: optId }));
  };

  const handleCrossClick = () => {
    setCurrentIndex(0);
    setIsThankYou(false);
    setSelectedOptions({});
  };

  const appStyle = {
    backgroundColor: styling.appearance.backgroundColor,
    borderTopLeftRadius: styling.appearance.radiusTopLeft,
    borderTopRightRadius: styling.appearance.radiusTopRight,
    borderBottomLeftRadius: styling.appearance.radiusBottomLeft,
    borderBottomRightRadius: styling.appearance.radiusBottomRight,
    opacity: isVisible ? 1 : 0,
    transition: 'opacity 0.3s ease-in-out'
  };

  return (
    <div className="relative mx-auto w-[375px] h-[812px] bg-white shadow-2xl border-[8px] border-gray-900 overflow-hidden flex flex-col font-sans" style={appStyle}>
      {/* Mobile Top Bar Mock */}
      <div className="h-7 w-full flex justify-between items-center px-6 pt-2 bg-transparent absolute top-0 z-50 text-black mix-blend-difference">
        <span className="text-[12px] font-semibold">9:41</span>
        <div className="flex gap-1">
          <div className="w-4 h-3 bg-white rounded-sm opacity-90" />
          <div className="w-3 h-3 bg-white rounded-full opacity-90" />
        </div>
      </div>
      
      {/* Cross Button */}
      {styling.crossButton.enabled && (
        <div 
          className="absolute z-40 cursor-pointer flex items-center justify-center transition-transform hover:scale-105"
          style={{
            top: 40 + styling.crossButton.marginTop,
            right: styling.crossButton.marginRight,
            left: styling.crossButton.marginLeft !== 0 ? styling.crossButton.marginLeft : 'auto',
            bottom: styling.crossButton.marginBottom !== 0 ? styling.crossButton.marginBottom : 'auto',
          }}
          onClick={handleCrossClick}
        >
          {styling.crossButton.style === 'custom' && styling.crossButton.customIconUrl ? (
             <img src={styling.crossButton.customIconUrl} alt="Close" style={{ width: styling.crossButton.size, height: styling.crossButton.size, objectFit: 'contain' }} />
          ) : (
            <X 
              size={styling.crossButton.size} 
              color={styling.crossButton.crossColor} 
              style={{ 
                backgroundColor: styling.crossButton.fillColor, 
                stroke: styling.crossButton.strokeColor,
                borderRadius: styling.crossButton.style === 'circle' ? '50%' : '4px',
                padding: '4px'
              }} 
            />
          )}
        </div>
      )}

      {/* Survey Content Container */}
      <div className="flex-1 overflow-y-auto pt-20 px-6 pb-6 relative z-10 flex flex-col">
        {!isThankYou ? (
          currentQ && (
            <div className="flex-1 flex flex-col animate-fadeIn">
              <h2 style={{
                color: styling.questionTitle.color,
                fontFamily: styling.questionTitle.fontFamily,
                fontSize: styling.questionTitle.fontSize,
                fontWeight: styling.questionTitle.fontWeight,
                fontStyle: styling.questionTitle.fontStyle,
                textAlign: styling.questionTitle.alignment,
                marginTop: styling.questionTitle.marginTop,
                marginBottom: styling.questionTitle.marginBottom,
                marginLeft: styling.questionTitle.marginLeft,
                marginRight: styling.questionTitle.marginRight,
              }}>
                {currentQ.title}
              </h2>
              
              <p style={{
                color: styling.subtitle.color,
                fontFamily: styling.subtitle.fontFamily,
                fontSize: styling.subtitle.fontSize,
                fontWeight: styling.subtitle.fontWeight,
                fontStyle: styling.subtitle.fontStyle,
                textAlign: styling.subtitle.alignment,
                marginTop: styling.subtitle.marginTop,
                marginBottom: styling.subtitle.marginBottom,
                marginLeft: styling.subtitle.marginLeft,
                marginRight: styling.subtitle.marginRight,
              }}>
                {currentQ.subtitle}
              </p>

              <div className="flex-1" style={{ gap: styling.optionList.optionSpacing, display: 'flex', flexDirection: 'column' }}>
                {currentQ.options.map(opt => {
                  const isSelected = selectedOptions[currentQ.id] === opt.id;
                  const optStyle = isSelected ? styling.selectedOption : styling.unselectedOption;
                  return (
                    <div 
                      key={opt.id}
                      onClick={() => handleOptionClick(currentQ.id, opt.id)}
                      className="cursor-pointer transition-colors duration-200 flex items-center px-4"
                      style={{
                        height: styling.optionList.optionHeight,
                        borderTopLeftRadius: styling.optionList.radiusTopLeft,
                        borderTopRightRadius: styling.optionList.radiusTopRight,
                        borderBottomLeftRadius: styling.optionList.radiusBottomLeft,
                        borderBottomRightRadius: styling.optionList.radiusBottomRight,
                        borderColor: optStyle.borderColor,
                        borderWidth: optStyle.borderWidth,
                        backgroundColor: styling.optionList.layout === 'filled' && !isSelected ? 'transparent' : optStyle.backgroundColor,
                        borderStyle: 'solid',
                        justifyContent: optStyle.alignment === 'center' ? 'center' : optStyle.alignment === 'right' ? 'flex-end' : 'flex-start',
                      }}
                    >
                      {styling.optionList.layout === 'radio' && (
                        <div className="rounded-full border mr-3 flex items-center justify-center transition-colors" style={{ width: 20, height: 20, borderColor: isSelected ? optStyle.textColor : '#d1d5db', marginRight: styling.optionList.bulletSpacing }}>
                          {isSelected && <div className="rounded-full" style={{ width: 10, height: 10, backgroundColor: optStyle.textColor }} />}
                        </div>
                      )}
                      {styling.optionList.layout === 'checkbox' && (
                        <div className="rounded-[4px] border mr-3 flex items-center justify-center transition-colors" style={{ width: 20, height: 20, borderColor: isSelected ? optStyle.textColor : '#d1d5db', marginRight: styling.optionList.bulletSpacing, backgroundColor: isSelected ? optStyle.textColor : 'transparent' }}>
                          {isSelected && <X size={14} color="#fff" strokeWidth={3}/>}
                        </div>
                      )}
                      <span style={{
                         color: optStyle.textColor,
                         fontFamily: optStyle.fontFamily,
                         fontSize: optStyle.fontSize,
                         fontWeight: optStyle.fontWeight,
                         fontStyle: optStyle.fontStyle,
                      }}>{opt.text}</span>
                    </div>
                  )
                })}
              </div>

              {currentQ.hasAdditionalComments && (
                 <textarea
                   placeholder="Additional comments..."
                   className="mt-6 w-full p-3 resize-none focus:outline-none"
                   rows={3}
                   style={{
                      borderColor: styling.additionalComment.borderColor,
                      borderWidth: styling.additionalComment.borderWidth,
                      backgroundColor: styling.additionalComment.backgroundColor,
                      color: styling.additionalComment.textColor,
                      fontFamily: styling.additionalComment.fontFamily,
                      fontSize: styling.additionalComment.fontSize,
                      fontWeight: styling.additionalComment.fontWeight,
                      fontStyle: styling.additionalComment.fontStyle,
                      textAlign: styling.additionalComment.alignment,
                      borderRadius: styling.optionList.radiusTopLeft, // inheriting from general options layout roughly
                   }}
                 />
              )}

              <button
                onClick={handleNext}
                className="mt-auto transition-opacity hover:opacity-90 active:scale-[0.98] flex items-center justify-center"
                style={{
                  width: styling.ctaButton.fullWidth ? '100%' : styling.ctaButton.width,
                  height: styling.ctaButton.height,
                  borderColor: styling.ctaButton.borderColor,
                  borderWidth: styling.ctaButton.borderWidth,
                  backgroundColor: styling.ctaButton.backgroundColor,
                  color: styling.ctaButton.textColor,
                  fontFamily: styling.ctaButton.fontFamily,
                  fontSize: styling.ctaButton.fontSize,
                  fontWeight: styling.ctaButton.fontWeight,
                  fontStyle: styling.ctaButton.fontStyle,
                  borderTopLeftRadius: styling.ctaButton.radiusTopLeft,
                  borderTopRightRadius: styling.ctaButton.radiusTopRight,
                  borderBottomLeftRadius: styling.ctaButton.radiusBottomLeft,
                  borderBottomRightRadius: styling.ctaButton.radiusBottomRight,
                  marginTop: styling.ctaButton.marginTop,
                  marginBottom: styling.ctaButton.marginBottom,
                  marginLeft: styling.ctaButton.marginLeft,
                  marginRight: styling.ctaButton.marginRight,
                  alignSelf: styling.ctaButton.alignment === 'center' ? 'center' : styling.ctaButton.alignment === 'right' ? 'flex-end' : 'flex-start',
                }}
              >
                {currentQ.buttonText}
              </button>
            </div>
          )
        ) : (
          <div className="flex-1 flex flex-col animate-fadeIn">
            {content.thankYou.mediaUrl && (
              <img 
                src={content.thankYou.mediaUrl} 
                alt="Thank you media" 
                style={{
                  width: styling.thankYouPage.imageWidth,
                  height: styling.thankYouPage.imageHeight,
                  marginTop: styling.thankYouPage.imageMarginTop,
                  marginBottom: styling.thankYouPage.imageMarginBottom,
                  marginLeft: styling.thankYouPage.imageMarginLeft,
                  marginRight: styling.thankYouPage.imageMarginRight,
                  alignSelf: 'center',
                  objectFit: 'contain'
                }} 
              />
            )}
            
            <h2 style={{
                color: styling.thankYouPage.titleColor,
                fontFamily: styling.thankYouPage.titleFontFamily,
                fontSize: styling.thankYouPage.titleFontSize,
                fontStyle: styling.thankYouPage.titleFontStyle,
                textAlign: styling.thankYouPage.titleAlignment,
                marginTop: styling.thankYouPage.titleMarginTop,
                marginBottom: styling.thankYouPage.titleMarginBottom,
                marginLeft: styling.thankYouPage.titleMarginLeft,
                marginRight: styling.thankYouPage.titleMarginRight,
            }}>
              {content.thankYou.title}
            </h2>

            <p style={{
                color: styling.thankYouPage.subtitleColor,
                fontFamily: styling.thankYouPage.subtitleFontFamily,
                fontSize: styling.thankYouPage.subtitleFontSize,
                fontStyle: styling.thankYouPage.subtitleFontStyle,
                textAlign: styling.thankYouPage.subtitleAlignment,
                marginTop: styling.thankYouPage.subtitleMarginTop,
                marginBottom: styling.thankYouPage.subtitleMarginBottom,
                marginLeft: styling.thankYouPage.subtitleMarginLeft,
                marginRight: styling.thankYouPage.subtitleMarginRight,
            }}>
              {content.thankYou.subtitle}
            </p>

            <button
                onClick={() => {
                  if(content.thankYou.redirectType === 'url' && content.thankYou.redirectUrl) {
                    window.open(content.thankYou.redirectUrl, '_blank');
                  }
                  handleCrossClick();
                }}
                className="mt-auto transition-opacity hover:opacity-90 active:scale-[0.98] flex items-center justify-center"
                style={{
                  width: styling.thankYouPage.buttonFullWidth ? '100%' : styling.thankYouPage.buttonWidth,
                  height: styling.thankYouPage.buttonHeight,
                  borderColor: styling.thankYouPage.buttonBorderColor,
                  borderWidth: styling.thankYouPage.buttonBorderWidth,
                  backgroundColor: styling.thankYouPage.buttonBackgroundColor,
                  color: styling.thankYouPage.buttonTextColor,
                  fontFamily: styling.thankYouPage.buttonFontFamily,
                  fontSize: styling.thankYouPage.buttonFontSize,
                  fontStyle: styling.thankYouPage.buttonFontStyle,
                  borderTopLeftRadius: styling.thankYouPage.buttonRadiusTopLeft,
                  borderTopRightRadius: styling.thankYouPage.buttonRadiusTopRight,
                  borderBottomLeftRadius: styling.thankYouPage.buttonRadiusBottomLeft,
                  borderBottomRightRadius: styling.thankYouPage.buttonRadiusBottomRight,
                  marginTop: styling.thankYouPage.buttonMarginTop,
                  marginBottom: styling.thankYouPage.buttonMarginBottom,
                  marginLeft: styling.thankYouPage.buttonMarginLeft,
                  marginRight: styling.thankYouPage.buttonMarginRight,
                  alignSelf: styling.thankYouPage.buttonAlignment === 'center' ? 'center' : styling.thankYouPage.buttonAlignment === 'right' ? 'flex-end' : 'flex-start',
                }}
              >
                {content.thankYou.buttonText}
              </button>
          </div>
        )}
      </div>

      {/* Backdrop simulation */}
      <div 
        className="absolute inset-0 z-[-1] pointer-events-none" 
        style={{
          backgroundColor: styling.appearance.backdropColor,
          opacity: styling.appearance.backdropOpacity / 100
        }}
      />
    </div>
  );
};

export default LivePreview;
