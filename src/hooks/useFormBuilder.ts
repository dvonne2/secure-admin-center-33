
import { useState, useCallback } from 'react';
import { Question, FormBuilderState, QuestionType } from '@/modules/forms/types/formBuilder';
import { v4 as uuidv4 } from 'uuid';

export const useFormBuilder = () => {
  const [formState, setFormState] = useState<FormBuilderState>({
    id: uuidv4(),
    title: 'Untitled Form',
    questions: [],
    isPreview: false,
    theme: {
      primaryColor: '#3B82F6',
      backgroundColor: '#FFFFFF',
      textColor: '#1F2937',
      gradientFrom: '#3B82F6',
      gradientTo: '#8B5CF6'
    }
  });

  const addQuestion = useCallback((type: QuestionType) => {
    const newQuestion: Question = {
      id: uuidv4(),
      type,
      title: `New ${type.replace('_', ' ')} question`,
      required: false,
      ...(type === 'multiple_choice' || type === 'checkboxes' || type === 'dropdown' ? {
        options: [
          { id: uuidv4(), label: 'Option 1', value: 'option1' },
          { id: uuidv4(), label: 'Option 2', value: 'option2' }
        ]
      } : {}),
      ...(type === 'rating' ? {
        settings: { maxRating: 5 }
      } : {})
    };

    setFormState(prev => ({
      ...prev,
      questions: [...prev.questions, newQuestion],
      currentQuestionId: newQuestion.id
    }));
  }, []);

  const updateQuestion = useCallback((questionId: string, updates: Partial<Question>) => {
    setFormState(prev => ({
      ...prev,
      questions: prev.questions.map(q => 
        q.id === questionId ? { ...q, ...updates } : q
      )
    }));
  }, []);

  const deleteQuestion = useCallback((questionId: string) => {
    setFormState(prev => ({
      ...prev,
      questions: prev.questions.filter(q => q.id !== questionId),
      currentQuestionId: prev.currentQuestionId === questionId ? undefined : prev.currentQuestionId
    }));
  }, []);

  const reorderQuestions = useCallback((startIndex: number, endIndex: number) => {
    setFormState(prev => {
      const newQuestions = [...prev.questions];
      const [removed] = newQuestions.splice(startIndex, 1);
      newQuestions.splice(endIndex, 0, removed);
      return { ...prev, questions: newQuestions };
    });
  }, []);

  const setCurrentQuestion = useCallback((questionId: string) => {
    setFormState(prev => ({ ...prev, currentQuestionId: questionId }));
  }, []);

  const togglePreview = useCallback(() => {
    setFormState(prev => ({ ...prev, isPreview: !prev.isPreview }));
  }, []);

  const updateFormMeta = useCallback((updates: Partial<Pick<FormBuilderState, 'title' | 'description' | 'theme'>>) => {
    setFormState(prev => ({ ...prev, ...updates }));
  }, []);

  return {
    formState,
    addQuestion,
    updateQuestion,
    deleteQuestion,
    reorderQuestions,
    setCurrentQuestion,
    togglePreview,
    updateFormMeta
  };
};
