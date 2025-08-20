
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Question, QuestionOption } from '@/modules/forms/types/formBuilder';
import { Plus, Trash2 } from 'lucide-react';
import { v4 as uuidv4 } from 'uuid';

interface QuestionEditorProps {
  question: Question;
  onUpdate: (updates: Partial<Question>) => void;
}

export const QuestionEditor: React.FC<QuestionEditorProps> = ({ question, onUpdate }) => {
  const hasOptions = ['multiple_choice', 'checkboxes', 'dropdown'].includes(question.type);
  const hasRating = question.type === 'rating';

  const addOption = () => {
    const newOptions = [
      ...(question.options || []),
      { id: uuidv4(), label: `Option ${(question.options?.length || 0) + 1}`, value: `option${(question.options?.length || 0) + 1}` }
    ];
    onUpdate({ options: newOptions });
  };

  const updateOption = (optionId: string, updates: Partial<QuestionOption>) => {
    const newOptions = question.options?.map(opt => 
      opt.id === optionId ? { ...opt, ...updates } : opt
    ) || [];
    onUpdate({ options: newOptions });
  };

  const removeOption = (optionId: string) => {
    const newOptions = question.options?.filter(opt => opt.id !== optionId) || [];
    onUpdate({ options: newOptions });
  };

  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle className="text-lg">Question Settings</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Basic Settings */}
        <div className="space-y-4">
          <div>
            <Label htmlFor="title">Question Title *</Label>
            <Input
              id="title"
              value={question.title}
              onChange={(e) => onUpdate({ title: e.target.value })}
              placeholder="Enter your question..."
            />
          </div>

          <div>
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={question.description || ''}
              onChange={(e) => onUpdate({ description: e.target.value })}
              placeholder="Optional description or help text..."
              className="resize-none"
              rows={2}
            />
          </div>

          {(question.type === 'text' || question.type === 'textarea' || question.type === 'email') && (
            <div>
              <Label htmlFor="placeholder">Placeholder</Label>
              <Input
                id="placeholder"
                value={question.placeholder || ''}
                onChange={(e) => onUpdate({ placeholder: e.target.value })}
                placeholder="Placeholder text..."
              />
            </div>
          )}
        </div>

        <Separator />

        {/* Required Toggle */}
        <div className="flex items-center justify-between">
          <div>
            <Label htmlFor="required">Required</Label>
            <p className="text-sm text-muted-foreground">Make this question mandatory</p>
          </div>
          <Switch
            id="required"
            checked={question.required}
            onCheckedChange={(required) => onUpdate({ required })}
          />
        </div>

        {/* Options for choice-based questions */}
        {hasOptions && (
          <>
            <Separator />
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <Label>Options</Label>
                <Button size="sm" variant="outline" onClick={addOption}>
                  <Plus className="h-4 w-4 mr-1" />
                  Add Option
                </Button>
              </div>
              <div className="space-y-2">
                {question.options?.map((option, index) => (
                  <div key={option.id} className="flex items-center space-x-2">
                    <Input
                      value={option.label}
                      onChange={(e) => updateOption(option.id, { label: e.target.value, value: e.target.value.toLowerCase().replace(/\s+/g, '_') })}
                      placeholder={`Option ${index + 1}`}
                    />
                    {(question.options?.length || 0) > 2 && (
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => removeOption(option.id)}
                        className="text-destructive hover:text-destructive"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </>
        )}

        {/* Rating Settings */}
        {hasRating && (
          <>
            <Separator />
            <div>
              <Label htmlFor="maxRating">Maximum Rating</Label>
              <Input
                id="maxRating"
                type="number"
                min="3"
                max="10"
                value={question.settings?.maxRating || 5}
                onChange={(e) => onUpdate({ 
                  settings: { 
                    ...question.settings, 
                    maxRating: parseInt(e.target.value) || 5 
                  } 
                })}
              />
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
};
