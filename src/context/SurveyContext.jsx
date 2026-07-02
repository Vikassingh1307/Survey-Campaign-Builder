import React, { createContext, useContext, useState, useCallback, useRef } from 'react';

const defaultContent = {
  intro: {
    numPages: 1,
  },
  questions: [
    {
      id: 1,
      title: 'Question 1 Title',
      subtitle: 'Question Description',
      options: [
        { id: 1, text: 'Option 1' },
        { id: 2, text: 'Option 2' },
      ],
      hasAdditionalComments: false,
      logicRules: [],
      buttonText: 'Next',
    }
  ],
  thankYou: {
    enabled: true,
    mediaUrl: '',
    mediaType: 'url',
    title: 'Thank You',
    subtitle: 'We appreciate your feedback.',
    buttonText: 'Finish',
    redirectType: 'url',
    redirectUrl: ''
  }
};

const defaultStyling = {
  appearance: {
    backgroundColor: '#ffffff',
    backdropColor: '#000000',
    backdropOpacity: 50,
    delay: 0,
    radiusTopLeft: 16,
    radiusTopRight: 16,
    radiusBottomLeft: 16,
    radiusBottomRight: 16,
  },
  questionTitle: {
    color: '#111827',
    fontFamily: 'Inter',
    fontSize: 24,
    fontWeight: 'bold',
    fontStyle: 'normal',
    alignment: 'left',
    marginTop: 0,
    marginBottom: 12,
    marginLeft: 0,
    marginRight: 0,
  },
  subtitle: {
    color: '#4B5563',
    fontFamily: 'Inter',
    fontSize: 16,
    fontWeight: 'normal',
    fontStyle: 'normal',
    alignment: 'left',
    marginTop: 0,
    marginBottom: 24,
    marginLeft: 0,
    marginRight: 0,
  },
  optionList: {
    layout: 'radio',
    optionHeight: 52,
    bulletSpacing: 12,
    optionSpacing: 12,
    radiusTopLeft: 8,
    radiusTopRight: 8,
    radiusBottomLeft: 8,
    radiusBottomRight: 8,
  },
  selectedOption: {
    borderColor: '#3b82f6',
    textColor: '#1d4ed8',
    backgroundColor: '#eff6ff',
    borderWidth: 2,
    fontFamily: 'Inter',
    fontSize: 16,
    fontWeight: 'medium',
    fontStyle: 'normal',
    alignment: 'left',
  },
  unselectedOption: {
    borderColor: '#e5e7eb',
    textColor: '#374151',
    backgroundColor: '#ffffff',
    borderWidth: 1,
    fontFamily: 'Inter',
    fontSize: 16,
    fontWeight: 'normal',
    fontStyle: 'normal',
    alignment: 'left',
  },
  additionalComment: {
    borderColor: '#e5e7eb',
    textColor: '#111827',
    backgroundColor: '#f9fafb',
    borderWidth: 1,
    fontFamily: 'Inter',
    fontSize: 14,
    fontWeight: 'normal',
    fontStyle: 'normal',
    alignment: 'left',
  },
  ctaButton: {
    fullWidth: true,
    borderColor: '#3b82f6',
    textColor: '#ffffff',
    backgroundColor: '#3b82f6',
    fontFamily: 'Inter',
    fontSize: 16,
    fontWeight: 'medium',
    fontStyle: 'normal',
    height: 48,
    width: 200,
    borderWidth: 0,
    radiusTopLeft: 8,
    radiusTopRight: 8,
    radiusBottomLeft: 8,
    radiusBottomRight: 8,
    alignment: 'center',
    marginTop: 24,
    marginBottom: 0,
    marginLeft: 0,
    marginRight: 0,
  },
  crossButton: {
    enabled: true,
    style: 'default',
    customIconUrl: '',
    crossColor: '#9ca3af',
    fillColor: 'transparent',
    strokeColor: 'transparent',
    size: 24,
    marginTop: 16,
    marginBottom: 0,
    marginLeft: 0,
    marginRight: 16,
  },
  thankYouPage: {
    titleColor: '#111827',
    titleFontFamily: 'Inter',
    titleFontSize: 24,
    titleFontStyle: 'normal',
    titleAlignment: 'center',
    titleMarginTop: 0,
    titleMarginBottom: 16,
    titleMarginLeft: 0,
    titleMarginRight: 0,
    subtitleColor: '#4b5563',
    subtitleFontFamily: 'Inter',
    subtitleFontSize: 16,
    subtitleFontStyle: 'normal',
    subtitleAlignment: 'center',
    subtitleMarginTop: 0,
    subtitleMarginBottom: 24,
    subtitleMarginLeft: 0,
    subtitleMarginRight: 0,
    imageWidth: 80,
    imageHeight: 80,
    imageMarginTop: 0,
    imageMarginBottom: 24,
    imageMarginLeft: 0,
    imageMarginRight: 0,
    buttonFullWidth: true,
    buttonBorderColor: '#3b82f6',
    buttonTextColor: '#ffffff',
    buttonBackgroundColor: '#3b82f6',
    buttonFontFamily: 'Inter',
    buttonFontSize: 16,
    buttonFontStyle: 'normal',
    buttonHeight: 48,
    buttonWidth: 200,
    buttonBorderWidth: 0,
    buttonRadiusTopLeft: 8,
    buttonRadiusTopRight: 8,
    buttonRadiusBottomLeft: 8,
    buttonRadiusBottomRight: 8,
    buttonAlignment: 'center',
    buttonMarginTop: 0,
    buttonMarginBottom: 24,
    buttonMarginLeft: 0,
    buttonMarginRight: 0,
  }
};

const SurveyContext = createContext();

export const useSurvey = () => useContext(SurveyContext);

// Helper to sync questions array to a target length without triggering re-renders
let _qIdCounter = 100;
function syncQuestions(questions, targetLength) {
  if (questions.length === targetLength) return questions;
  if (questions.length < targetLength) {
    const newQuestions = [...questions];
    for (let i = questions.length + 1; i <= targetLength; i++) {
      _qIdCounter++;
      newQuestions.push({
        id: `q_${_qIdCounter}_${Date.now()}`,
        title: `Question ${i} Title`,
        subtitle: 'Question Description',
        options: [
          { id: `opt_${_qIdCounter}_1`, text: 'Option 1' },
          { id: `opt_${_qIdCounter}_2`, text: 'Option 2' },
        ],
        hasAdditionalComments: false,
        logicRules: [],
        buttonText: 'Next',
      });
    }
    return newQuestions;
  }
  return questions.slice(0, targetLength);
}

export const SurveyProvider = ({ children }) => {
  const [content, setContent] = useState(defaultContent);
  const [styling, setStyling] = useState(defaultStyling);

  const updateContent = useCallback((section, data) => {
    setContent(prev => ({
      ...prev,
      [section]: typeof data === 'function' ? data(prev[section]) : data
    }));
  }, []);

  const updateStyling = useCallback((section, data) => {
    setStyling(prev => ({
      ...prev,
      [section]: typeof data === 'function' ? data(prev[section]) : { ...prev[section], ...data }
    }));
  }, []);

  // setNumPages: explicitly sync questions in the same setState call
  const setNumPages = useCallback((num) => {
    const val = Math.max(1, Math.min(20, num));
    setContent(prev => {
      const newQuestions = syncQuestions(prev.questions, val);
      return {
        ...prev,
        intro: { ...prev.intro, numPages: val },
        questions: newQuestions,
      };
    });
  }, []);

  return (
    <SurveyContext.Provider value={{ content, styling, updateContent, updateStyling, setContent, setStyling, setNumPages }}>
      {children}
    </SurveyContext.Provider>
  );
};
