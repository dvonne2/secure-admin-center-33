import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Plus, MoreHorizontal, Eye, Copy, Trash2, Edit, Code, Check } from 'lucide-react';
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
            <p className="text-muted-foreground">Manage your forms and surveys</p>
          </div>
          <Link to="/forms/new">
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              New Form
            </Button>
          </Link>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>All Forms</CardTitle>
            <CardDescription>
              {forms.length} form{forms.length !== 1 ? 's' : ''} total
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Updated</TableHead>
                  <TableHead className="w-[100px]">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {forms.map((form) => (
                  <TableRow key={form.meta.id}>
                    <TableCell>
                      <div>
                        <div className="font-medium">{form.meta.name}</div>
                        {form.meta.description && (
                          <div className="text-sm text-muted-foreground">{form.meta.description}</div>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant={getStatusBadgeVariant(form.meta.status)}>
                        {form.meta.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      {new Date(form.meta.updatedAt).toLocaleDateString()}
                    </TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" className="h-8 w-8 p-0">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem asChild>
                            <Link to={`/forms/${form.meta.id}/design`}>
                              <Edit className="h-4 w-4 mr-2" />
                              Open
                            </Link>
                          </DropdownMenuItem>
                          <DropdownMenuItem asChild>
                            <Link to={`/forms/${form.meta.id}/preview`}>
                              <Eye className="h-4 w-4 mr-2" />
                              Preview
                            </Link>
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleEmbedClick(form)}>
                            <Code className="h-4 w-4 mr-2" />
                            Copy Embed Code
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleDuplicate(form.meta.id)}>
                            <Copy className="h-4 w-4 mr-2" />
                            Duplicate
                          </DropdownMenuItem>
                          <DropdownMenuItem 
                            onClick={() => handleDelete(form.meta.id)}
                            className="text-destructive"
                          >
                            <Trash2 className="h-4 w-4 mr-2" />
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

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
