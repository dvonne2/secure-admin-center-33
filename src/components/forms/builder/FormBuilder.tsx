
import React from 'react';
import { QuestionSidebar } from './QuestionSidebar';
import { FormCanvas } from './FormCanvas';
import { QuestionEditor } from './QuestionEditor';
import { FormBuilderHeader } from './FormBuilderHeader';
import { useFormBuilder } from '@/hooks/useFormBuilder';

export const FormBuilder: React.FC = () => {
  const {
    formState,
    addQuestion,
    updateQuestion,
    deleteQuestion,
    setCurrentQuestion,
    togglePreview,
    updateFormMeta
  } = useFormBuilder();

  const currentQuestion = formState.questions.find(q => q.id === formState.currentQuestionId);

  return (
    <div className="h-screen flex flex-col">
      <FormBuilderHeader
        formTitle={formState.title}
        isPreview={formState.isPreview}
        onTitleChange={(title) => updateFormMeta({ title })}
        onTogglePreview={togglePreview}
        formId={formState.id}
      />
      
      <div className="flex-1 flex overflow-hidden">
        {/* Left Sidebar - Question Types */}
        <div className="w-80 border-r bg-background">
          <QuestionSidebar onAddQuestion={addQuestion} />
        </div>

        {/* Main Canvas */}
        <div className="flex-1">
          <FormCanvas
            questions={formState.questions}
            currentQuestionId={formState.currentQuestionId}
            onSelectQuestion={setCurrentQuestion}
            onDeleteQuestion={deleteQuestion}
            formTitle={formState.title}
          />
        </div>

        {/* Right Sidebar - Question Editor */}
        {currentQuestion && (
          <div className="w-80 border-l bg-background">
            <QuestionEditor
              question={currentQuestion}
              onUpdate={(updates) => updateQuestion(currentQuestion.id, updates)}
            />
          </div>
        )}
      </div>
    </div>
  );
};
