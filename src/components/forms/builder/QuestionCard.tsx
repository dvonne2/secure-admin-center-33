
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Question } from '@/modules/forms/types/formBuilder';
import { 
  Type, 
  AlignLeft, 
  Mail, 
  Phone, 
  Radio, 
  CheckSquare, 
  ChevronDown, 
  Star, 
  Upload, 
  ToggleLeft,
  Trash2,
  GripVertical
} from 'lucide-react';

interface QuestionCardProps {
  question: Question;
  index: number;
  isSelected: boolean;
  onSelect: () => void;
  onDelete: () => void;
}

const getQuestionIcon = (type: string) => {
  switch (type) {
    case 'text': return Type;
    case 'textarea': return AlignLeft;
    case 'email': return Mail;
    case 'phone': return Phone;
    case 'multiple_choice': return Radio;
    case 'checkboxes': return CheckSquare;
    case 'dropdown': return ChevronDown;
    case 'rating': return Star;
    case 'file_upload': return Upload;
    case 'yes_no': return ToggleLeft;
    default: return Type;
  }
};

export const QuestionCard: React.FC<QuestionCardProps> = ({
  question,
  index,
  isSelected,
  onSelect,
  onDelete
}) => {
  const Icon = getQuestionIcon(question.type);

  return (
    <Card 
      className={`cursor-pointer transition-all duration-200 hover:shadow-md ${
        isSelected ? 'ring-2 ring-primary shadow-lg' : ''
      }`}
      onClick={onSelect}
    >
      <CardContent className="p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3 flex-1">
            <GripVertical className="h-4 w-4 text-muted-foreground" />
            <div className="flex items-center space-x-2">
              <div className="p-1.5 rounded bg-primary/10">
                <Icon className="h-4 w-4 text-primary" />
              </div>
              <span className="text-sm font-medium text-muted-foreground">
                {index + 1}
              </span>
            </div>
            <div className="flex-1">
              <h4 className="font-medium text-sm">{question.title}</h4>
              {question.description && (
                <p className="text-xs text-muted-foreground mt-1">
                  {question.description}
                </p>
              )}
            </div>
          </div>
          <div className="flex items-center space-x-2">
            {question.required && (
              <Badge variant="secondary" className="text-xs">
                Required
              </Badge>
            )}
            <Badge variant="outline" className="text-xs">
              {question.type.replace('_', ' ')}
            </Badge>
            <Button
              variant="ghost"
              size="sm"
              className="h-8 w-8 p-0 text-destructive hover:text-destructive hover:bg-destructive/10"
              onClick={(e) => {
                e.stopPropagation();
                onDelete();
              }}
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
