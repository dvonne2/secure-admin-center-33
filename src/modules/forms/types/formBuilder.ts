
export type QuestionType = 
  | 'text' 
  | 'textarea' 
  | 'email' 
  | 'phone' 
  | 'multiple_choice' 
  | 'checkboxes' 
  | 'dropdown' 
  | 'rating' 
  | 'file_upload' 
  | 'yes_no';

export interface ValidationRule {
  type: 'required' | 'minLength' | 'maxLength' | 'email' | 'phone';
  value?: number | string;
  message?: string;
}

export interface QuestionOption {
  id: string;
  label: string;
  value: string;
}

export interface Question {
  id: string;
  type: QuestionType;
  title: string;
  description?: string;
  placeholder?: string;
  required: boolean;
  options?: QuestionOption[];
  validation?: ValidationRule[];
  settings?: {
    allowMultiple?: boolean;
    maxRating?: number;
    allowOther?: boolean;
  };
}

export interface FormBuilderState {
  id: string;
  title: string;
  description?: string;
  questions: Question[];
  currentQuestionId?: string;
  isPreview: boolean;
  theme: {
    primaryColor: string;
    backgroundColor: string;
    textColor: string;
    gradientFrom: string;
    gradientTo: string;
  };
}

export interface FormResponse {
  questionId: string;
  value: any;
  timestamp: Date;
}

export interface FormRendererState {
  formId: string;
  currentStep: number;
  responses: Record<string, any>;
  isComplete: boolean;
  direction: 'forward' | 'backward';
}
