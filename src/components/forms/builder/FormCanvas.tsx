
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Question } from '@/modules/forms/types/formBuilder';
import { QuestionCard } from './QuestionCard';
import { Plus, FileText } from 'lucide-react';

interface FormCanvasProps {
  questions: Question[];
  currentQuestionId?: string;
  onSelectQuestion: (questionId: string) => void;
  onDeleteQuestion: (questionId: string) => void;
  formTitle: string;
}

export const FormCanvas: React.FC<FormCanvasProps> = ({
  questions,
  currentQuestionId,
  onSelectQuestion,
  onDeleteQuestion,
  formTitle
}) => {
  return (
    <div className="flex-1 p-6 bg-gradient-to-br from-blue-50 to-purple-50 min-h-screen">
      <div className="max-w-2xl mx-auto space-y-4">
        {/* Form Header */}
        <Card className="border-2 border-dashed border-primary/20">
          <CardContent className="p-6 text-center">
            <FileText className="h-8 w-8 mx-auto mb-3 text-primary" />
            <h2 className="text-2xl font-bold mb-2">{formTitle}</h2>
            <p className="text-muted-foreground">Your form preview will appear here</p>
          </CardContent>
        </Card>

        {/* Questions */}
        {questions.length > 0 ? (
          <div className="space-y-4">
            {questions.map((question, index) => (
              <QuestionCard
                key={question.id}
                question={question}
                index={index}
                isSelected={question.id === currentQuestionId}
                onSelect={() => onSelectQuestion(question.id)}
                onDelete={() => onDeleteQuestion(question.id)}
              />
            ))}
          </div>
        ) : (
          <Card className="border-2 border-dashed border-muted-foreground/20">
            <CardContent className="p-12 text-center">
              <Plus className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
              <h3 className="text-lg font-medium mb-2">No questions yet</h3>
              <p className="text-muted-foreground">
                Select a question type from the sidebar to get started
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};
