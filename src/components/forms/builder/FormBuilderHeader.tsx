
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Eye, Save, Settings, Code, Share } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface FormBuilderHeaderProps {
  formTitle: string;
  isPreview: boolean;
  onTitleChange: (title: string) => void;
  onTogglePreview: () => void;
  formId: string;
}

export const FormBuilderHeader: React.FC<FormBuilderHeaderProps> = ({
  formTitle,
  isPreview,
  onTitleChange,
  onTogglePreview,
  formId
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [tempTitle, setTempTitle] = useState(formTitle);
  const { toast } = useToast();

  const handleTitleSave = () => {
    onTitleChange(tempTitle);
    setIsEditing(false);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleTitleSave();
    } else if (e.key === 'Escape') {
      setTempTitle(formTitle);
      setIsEditing(false);
    }
  };

  const copyEmbedCode = () => {
    const embedCode = `<iframe src="https://erp.vitalvida.ng/forms/${formId}" width="100%" height="600" frameborder="0"></iframe>`;
    navigator.clipboard.writeText(embedCode);
    toast({
      title: "Embed code copied!",
      description: "The iframe code has been copied to your clipboard.",
    });
  };

  return (
    <div className="h-16 border-b bg-background flex items-center justify-between px-6">
      <div className="flex items-center space-x-4">
        {isEditing ? (
          <Input
            value={tempTitle}
            onChange={(e) => setTempTitle(e.target.value)}
            onBlur={handleTitleSave}
            onKeyDown={handleKeyPress}
            className="text-lg font-semibold"
            autoFocus
          />
        ) : (
          <h1 
            className="text-lg font-semibold cursor-pointer hover:text-primary transition-colors"
            onClick={() => setIsEditing(true)}
          >
            {formTitle}
          </h1>
        )}
      </div>

      <div className="flex items-center space-x-2">
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline" size="sm">
              <Code className="h-4 w-4 mr-2" />
              Embed
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Embed Form</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium">Embed Code</label>
                <div className="mt-1 p-3 bg-muted rounded-md">
                  <code className="text-sm">
                    {`<iframe src="https://erp.vitalvida.ng/forms/${formId}" width="100%" height="600" frameborder="0"></iframe>`}
                  </code>
                </div>
              </div>
              <Button onClick={copyEmbedCode} className="w-full">
                <Share className="h-4 w-4 mr-2" />
                Copy Embed Code
              </Button>
            </div>
          </DialogContent>
        </Dialog>

        <Button variant="outline" size="sm">
          <Settings className="h-4 w-4 mr-2" />
          Settings
        </Button>

        <Button variant="outline" size="sm" onClick={onTogglePreview}>
          <Eye className="h-4 w-4 mr-2" />
          {isPreview ? 'Edit' : 'Preview'}
        </Button>

        <Button size="sm">
          <Save className="h-4 w-4 mr-2" />
          Save
        </Button>
      </div>
    </div>
  );
};
