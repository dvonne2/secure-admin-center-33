
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { FormSchema } from '@/modules/forms/types';
import { getFormsService } from '@/modules/forms/storage/FormsService';
import { Plus, Edit, Eye, Copy, Check, Code, Trash2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { NewFormModal } from './NewFormModal';

export default function FormsListPage() {
  const navigate = useNavigate();
  const [forms, setForms] = useState<FormSchema[]>([]);
  const [loading, setLoading] = useState(true);
  const [showNewFormModal, setShowNewFormModal] = useState(false);
  const [embedDialogOpen, setEmbedDialogOpen] = useState(false);
  const [selectedFormId, setSelectedFormId] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const formsService = getFormsService();
  const { toast } = useToast();

  useEffect(() => {
    loadForms();
  }, []);

  const loadForms = async () => {
    try {
      const formsList = await formsService.list();
      setForms(formsList);
    } catch (error) {
      console.error('Failed to load forms:', error);
    } finally {
      setLoading(false);
    }
  };

  const generateEmbedCode = (formId: string) => {
    return `<iframe src="https://erp.vitalvida.ng/forms/${formId}" width="100%" height="600px" frameborder="0"></iframe>`;
  };

  const handleCopyEmbedCode = async (formId: string) => {
    const embedCode = generateEmbedCode(formId);
    try {
      await navigator.clipboard.writeText(embedCode);
      setCopied(true);
      toast({
        title: "Embed code copied!",
        description: "The iframe code has been copied to your clipboard.",
      });
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      toast({
        title: "Copy failed",
        description: "Please manually select and copy the code.",
        variant: "destructive"
      });
    }
  };

  const handleOpenEmbedDialog = (formId: string) => {
    setSelectedFormId(formId);
    setEmbedDialogOpen(true);
  };

  const handleDeleteForm = async (formId: string) => {
    try {
      await formsService.remove(formId);
      toast({
        title: "Form deleted",
        description: "The form has been successfully deleted.",
      });
      loadForms(); // Reload the forms list
    } catch (error) {
      toast({
        title: "Delete failed",
        description: "Failed to delete the form. Please try again.",
        variant: "destructive"
      });
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  if (loading) {
    return (
      <div className="p-6">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary mx-auto"></div>
      </div>
    );
  }

  return (
    <TooltipProvider>
      <div className="p-6 space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold">Forms</h1>
            <p className="text-muted-foreground">Manage your data collection forms</p>
          </div>
          <Button onClick={() => setShowNewFormModal(true)}>
            <Plus className="h-4 w-4 mr-2" />
            New Form
          </Button>
        </div>

        {forms.length === 0 ? (
          <Card>
            <CardContent className="p-6 text-center">
              <p className="text-muted-foreground mb-4">No forms created yet</p>
              <Button onClick={() => setShowNewFormModal(true)}>
                <Plus className="h-4 w-4 mr-2" />
                Create Your First Form
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {forms.map((form) => (
              <Card key={form.meta.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <CardTitle className="text-lg">{form.meta.name}</CardTitle>
                      <CardDescription className="mt-1">
                        {form.meta.description || "No description provided"}
                      </CardDescription>
                    </div>
                    <Badge variant={form.meta.status === 'published' ? 'default' : 'secondary'}>
                      {form.meta.status}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between text-sm text-muted-foreground">
                      <span>Fields: {form.fields.length}</span>
                      <span>Updated: {formatDate(form.meta.updatedAt)}</span>
                    </div>
                    
                    <div className="flex gap-2">
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => navigate(`/forms/${form.meta.id}/preview`)}
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Preview form</p>
                        </TooltipContent>
                      </Tooltip>

                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => navigate(`/forms/${form.meta.id}/design`)}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Edit form</p>
                        </TooltipContent>
                      </Tooltip>

                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleOpenEmbedDialog(form.meta.id)}
                          >
                            <Code className="h-4 w-4" />
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Copy embed code</p>
                        </TooltipContent>
                      </Tooltip>

                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleDeleteForm(form.meta.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Delete form</p>
                        </TooltipContent>
                      </Tooltip>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* Embed Dialog */}
        <Dialog open={embedDialogOpen} onOpenChange={setEmbedDialogOpen}>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>Embed Form Code</DialogTitle>
              <DialogDescription>
                Copy the iframe code below and paste it into your WordPress page to embed this form.
              </DialogDescription>
            </DialogHeader>
            {selectedFormId && (
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="embed-code">Iframe Code</Label>
                  <div className="relative">
                    <Input
                      id="embed-code"
                      value={generateEmbedCode(selectedFormId)}
                      readOnly
                      className="font-mono text-sm pr-12"
                      onClick={(e) => e.currentTarget.select()}
                    />
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button
                          size="sm"
                          variant="ghost"
                          className="absolute right-1 top-1 h-8 w-8 p-0"
                          onClick={() => handleCopyEmbedCode(selectedFormId)}
                        >
                          {copied ? (
                            <Check className="h-4 w-4 text-green-600" />
                          ) : (
                            <Copy className="h-4 w-4" />
                          )}
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Paste this code into your WordPress page to embed the form</p>
                      </TooltipContent>
                    </Tooltip>
                  </div>
                </div>
                <div className="bg-muted p-4 rounded-lg">
                  <h4 className="font-medium mb-2">How to use:</h4>
                  <ol className="text-sm text-muted-foreground space-y-1">
                    <li>1. Copy the iframe code above</li>
                    <li>2. Paste it into your WordPress page or post editor</li>
                    <li>3. The form will display embedded on your website</li>
                  </ol>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>

        <NewFormModal
          isOpen={showNewFormModal}
          onClose={() => setShowNewFormModal(false)}
          onFormCreated={loadForms}
        />
      </div>
    </TooltipProvider>
  );
}
