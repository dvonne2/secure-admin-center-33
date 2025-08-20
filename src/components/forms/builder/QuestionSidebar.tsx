
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
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
  ToggleLeft 
} from 'lucide-react';
import { QuestionType } from '@/modules/forms/types/formBuilder';

interface QuestionSidebarProps {
  onAddQuestion: (type: QuestionType) => void;
}

const questionTypes = [
  { type: 'text' as QuestionType, label: 'Short Text', icon: Type, description: 'Single line input' },
  { type: 'textarea' as QuestionType, label: 'Long Text', icon: AlignLeft, description: 'Multi-line input' },
  { type: 'email' as QuestionType, label: 'Email', icon: Mail, description: 'Email address' },
  { type: 'phone' as QuestionType, label: 'Phone', icon: Phone, description: 'Phone number' },
  { type: 'multiple_choice' as QuestionType, label: 'Multiple Choice', icon: Radio, description: 'Single selection' },
  { type: 'checkboxes' as QuestionType, label: 'Checkboxes', icon: CheckSquare, description: 'Multiple selections' },
  { type: 'dropdown' as QuestionType, label: 'Dropdown', icon: ChevronDown, description: 'Select from list' },
  { type: 'rating' as QuestionType, label: 'Rating', icon: Star, description: 'Star or number rating' },
  { type: 'file_upload' as QuestionType, label: 'File Upload', icon: Upload, description: 'Upload files' },
  { type: 'yes_no' as QuestionType, label: 'Yes/No', icon: ToggleLeft, description: 'Binary choice' }
];

export const QuestionSidebar: React.FC<QuestionSidebarProps> = ({ onAddQuestion }) => {
  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle className="text-lg">Question Types</CardTitle>
      </CardHeader>
      <CardContent className="space-y-2">
        {questionTypes.map(({ type, label, icon: Icon, description }) => (
          <Button
            key={type}
            variant="ghost"
            className="w-full justify-start h-auto p-3 hover:bg-accent transition-colors"
            onClick={() => onAddQuestion(type)}
          >
            <div className="flex items-center space-x-3 w-full">
              <div className="p-2 rounded-lg bg-primary/10">
                <Icon className="h-4 w-4 text-primary" />
              </div>
              <div className="text-left">
                <div className="font-medium text-sm">{label}</div>
                <div className="text-xs text-muted-foreground">{description}</div>
              </div>
            </div>
          </Button>
        ))}
      </CardContent>
    </Card>
  );
};
