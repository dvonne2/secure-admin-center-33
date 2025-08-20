
import { useState, useCallback, useEffect } from 'react';
import { FormRendererState } from '@/modules/forms/types/formBuilder';

export const useFormNavigation = (totalQuestions: number) => {
  const [navigationState, setNavigationState] = useState<FormRendererState>({
    formId: '',
    currentStep: 0,
    responses: {},
    isComplete: false,
    direction: 'forward'
  });

  const goToNext = useCallback(() => {
    if (navigationState.currentStep < totalQuestions - 1) {
      setNavigationState(prev => ({
        ...prev,
        currentStep: prev.currentStep + 1,
        direction: 'forward'
      }));
    } else {
      setNavigationState(prev => ({ ...prev, isComplete: true }));
    }
  }, [navigationState.currentStep, totalQuestions]);

  const goToPrevious = useCallback(() => {
    if (navigationState.currentStep > 0) {
      setNavigationState(prev => ({
        ...prev,
        currentStep: prev.currentStep - 1,
        direction: 'backward'
      }));
    }
  }, [navigationState.currentStep]);

  const goToStep = useCallback((step: number) => {
    if (step >= 0 && step < totalQuestions) {
      setNavigationState(prev => ({
        ...prev,
        currentStep: step,
        direction: step > prev.currentStep ? 'forward' : 'backward'
      }));
    }
  }, [totalQuestions]);

  const setResponse = useCallback((questionId: string, value: any) => {
    setNavigationState(prev => ({
      ...prev,
      responses: {
        ...prev.responses,
        [questionId]: value
      }
    }));
  }, []);

  const resetForm = useCallback(() => {
    setNavigationState(prev => ({
      ...prev,
      currentStep: 0,
      responses: {},
      isComplete: false,
      direction: 'forward'
    }));
  }, []);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        goToNext();
      } else if (e.key === 'Backspace' && e.ctrlKey) {
        e.preventDefault();
        goToPrevious();
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [goToNext, goToPrevious]);

  return {
    navigationState,
    goToNext,
    goToPrevious,
    goToStep,
    setResponse,
    resetForm,
    progress: totalQuestions > 0 ? ((navigationState.currentStep + 1) / totalQuestions) * 100 : 0
  };
};
