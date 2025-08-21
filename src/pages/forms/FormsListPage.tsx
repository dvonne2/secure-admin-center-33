import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Plus, Eye, Copy, Trash2, Edit, Code, Check, FileText, Search, CalendarDays } from 'lucide-react';
import { FormSchema } from '@/modules/forms/types';
import { getFormsService } from '@/modules/forms/storage/FormsService';
import { useToast } from '@/hooks/use-toast';

export default function FormsListPage() {
  const [forms, setForms] = useState<FormSchema[]>([]);
  const [loading, setLoading] = useState(true);
  const [embedDialogOpen, setEmbedDialogOpen] = useState(false);
  const [selectedForm, setSelectedForm] = useState<FormSchema | null>(null);
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

  const handleDuplicate = async (id: string) => {
    try {
      await formsService.duplicate(id);
      loadForms();
    } catch (error) {
      console.error('Failed to duplicate form:', error);
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this form?')) {
      try {
        await formsService.remove(id);
        loadForms();
      } catch (error) {
        console.error('Failed to delete form:', error);
      }
    }
  };

  const getStatusBadgeVariant = (status: string) => {
    switch (status) {
      case 'published': return 'default';
      case 'draft': return 'secondary';
      case 'archived': return 'outline';
      default: return 'secondary';
    }
  };

  const generateEmbedCode = (formId: string) => {
    return `<iframe src="https://erp.vitalvida.com/forms/${formId}" width="100%" height="600px" frameborder="0"></iframe>`;
  };

  const handleCopyEmbedCode = async (form: FormSchema) => {
    const embedCode = generateEmbedCode(form.meta.id);
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

  const handleEmbedClick = (form: FormSchema) => {
    setSelectedForm(form);
    setEmbedDialogOpen(true);
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
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Forms</h1>
            <p className="text-muted-foreground">Create and manage your forms</p>
          </div>
          <Link to="/forms/new">
            <Button className="bg-blue-600 hover:bg-blue-700">
              <Plus className="h-4 w-4 mr-2" />
              Create New Form
            </Button>
          </Link>
        </div>

        <div className="w-full max-w-md">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              placeholder="Search forms..."
              className="pl-10 bg-background border-input"
            />
          </div>
        </div>

        {forms.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12">
            <div className="w-24 h-24 bg-muted rounded-lg flex items-center justify-center mb-6">
              <FileText className="h-12 w-12 text-muted-foreground" />
            </div>
            <h3 className="text-xl font-semibold mb-2">No forms found</h3>
            <p className="text-muted-foreground mb-6">Get started by creating your first form.</p>
            <Link to="/forms/new">
              <Button className="bg-gray-900 hover:bg-gray-800 text-white">
                <Plus className="h-4 w-4 mr-2" />
                Create Your First Form
              </Button>
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {forms.map((form) => (
              <Card key={form.meta.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <h3 className="font-semibold text-lg">{form.meta.name}</h3>
                      <p className="text-sm text-muted-foreground mt-1">{form.meta.description}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4 mb-4">
                    <Badge 
                      variant={getStatusBadgeVariant(form.meta.status)}
                      className="text-xs"
                    >
                      {form.meta.status}
                    </Badge>
                    <div className="flex items-center text-xs text-muted-foreground gap-1">
                      <FileText className="h-3 w-3" />
                      {form.fields.length} fields
                    </div>
                    <div className="flex items-center text-xs text-muted-foreground gap-1">
                      <CalendarDays className="h-3 w-3" />
                      Created {new Date(form.meta.createdAt).toLocaleDateString()}
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    <Button 
                      variant="ghost" 
                      size="sm"
                      className="text-xs"
                      asChild
                    >
                      <Link to={`/forms/${form.meta.id}/preview`}>
                        <Eye className="h-3 w-3 mr-1" />
                        Preview
                      </Link>
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="sm"
                      className="text-xs text-blue-600 hover:text-blue-700"
                      asChild
                    >
                      <Link to={`/forms/${form.meta.id}/design`}>
                        <Edit className="h-3 w-3 mr-1" />
                        Open
                      </Link>
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="sm"
                      className="text-xs bg-blue-50 text-blue-600 hover:bg-blue-100"
                      asChild
                    >
                      <Link to={`/forms/${form.meta.id}/design`}>
                        <Edit className="h-3 w-3 mr-1" />
                        Edit
                      </Link>
                    </Button>
                  </div>

                  <div className="flex flex-wrap gap-2 mt-2">
                    <Button 
                      variant="ghost" 
                      size="sm"
                      className="text-xs"
                      onClick={() => handleEmbedClick(form)}
                    >
                      <Code className="h-3 w-3 mr-1" />
                      Embed
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="sm"
                      className="text-xs"
                      onClick={() => handleDuplicate(form.meta.id)}
                    >
                      <Copy className="h-3 w-3 mr-1" />
                      Duplicate
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="sm"
                      className="text-xs text-red-600 hover:text-red-700"
                      onClick={() => handleDelete(form.meta.id)}
                    >
                      <Trash2 className="h-3 w-3 mr-1" />
                      Delete
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        <Dialog open={embedDialogOpen} onOpenChange={setEmbedDialogOpen}>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>Embed Form Code</DialogTitle>
              <DialogDescription>
                Copy the iframe code below and paste it into your WordPress page to embed this form.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="embed-code">Iframe Code</Label>
                <div className="relative">
                  <Input
                    id="embed-code"
                    value={selectedForm ? generateEmbedCode(selectedForm.meta.id) : ''}
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
                        onClick={() => selectedForm && handleCopyEmbedCode(selectedForm)}
                      >
                        {copied ? (
                          <Check className="h-4 w-4 text-green-600" />
                        ) : (
                          <Copy className="h-4 w-4" />
                        )}
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Copy embed code</p>
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
          </DialogContent>
        </Dialog>
      </div>
    </TooltipProvider>
  );
}
