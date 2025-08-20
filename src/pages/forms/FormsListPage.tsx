
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
import { FormSchema } from '@/modules/forms/types';
import { getFormsService } from '@/modules/forms/storage/FormsService';
import { 
  Plus, 
  Search, 
  Eye, 
  Edit, 
  Copy, 
  Trash2, 
  MoreVertical,
  Calendar,
  FileText
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export default function FormsListPage() {
  const navigate = useNavigate();
  const [forms, setForms] = useState<FormSchema[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const { toast } = useToast();

  const formsService = getFormsService();

  useEffect(() => {
    loadForms();
  }, []);

  const loadForms = async () => {
    try {
      const formsData = await formsService.getAll();
      setForms(formsData);
    } catch (error) {
      console.error('Failed to load forms:', error);
      toast({
        title: "Error",
        description: "Failed to load forms",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const filteredForms = forms.filter(form =>
    form.meta.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    form.meta.description?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleCreateNew = () => {
    navigate('/forms/builder');
  };

  const handlePreview = (formId: string) => {
    navigate(`/forms/${formId}/preview`);
  };

  const handleEdit = (formId: string) => {
    navigate(`/forms/${formId}/design`);
  };

  const handleCopyEmbedCode = (formId: string) => {
    const embedCode = `<iframe src="https://erp.vitalvida.ng/forms/${formId}" width="100%" height="600" frameborder="0"></iframe>`;
    navigator.clipboard.writeText(embedCode);
    toast({
      title: "Embed code copied!",
      description: "The iframe code has been copied to your clipboard.",
    });
  };

  const handleDelete = async (formId: string) => {
    if (window.confirm('Are you sure you want to delete this form?')) {
      try {
        await formsService.delete(formId);
        setForms(forms.filter(form => form.meta.id !== formId));
        toast({
          title: "Form deleted",
          description: "The form has been successfully deleted.",
        });
      } catch (error) {
        console.error('Failed to delete form:', error);
        toast({
          title: "Error",
          description: "Failed to delete form",
          variant: "destructive"
        });
      }
    }
  };

  if (loading) {
    return (
      <div className="p-6">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary mx-auto"></div>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Forms</h1>
          <p className="text-muted-foreground">Create and manage your forms</p>
        </div>
        <Button onClick={handleCreateNew} className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
          <Plus className="h-4 w-4 mr-2" />
          Create New Form
        </Button>
      </div>

      {/* Search */}
      <div className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search forms..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10"
        />
      </div>

      {/* Forms Grid */}
      {filteredForms.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredForms.map((form) => (
            <Card key={form.meta.id} className="hover:shadow-lg transition-shadow">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <CardTitle className="text-lg mb-1">{form.meta.name}</CardTitle>
                    {form.meta.description && (
                      <p className="text-sm text-muted-foreground line-clamp-2">
                        {form.meta.description}
                      </p>
                    )}
                  </div>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm">
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => handleEdit(form.meta.id)}>
                        <Edit className="h-4 w-4 mr-2" />
                        Open
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handlePreview(form.meta.id)}>
                        <Eye className="h-4 w-4 mr-2" />
                        Preview
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleCopyEmbedCode(form.meta.id)}>
                        <Copy className="h-4 w-4 mr-2" />
                        Copy Embed Code
                      </DropdownMenuItem>
                      <DropdownMenuItem 
                        onClick={() => handleDelete(form.meta.id)}
                        className="text-destructive focus:text-destructive"
                      >
                        <Trash2 className="h-4 w-4 mr-2" />
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="flex items-center justify-between mb-4">
                  <Badge 
                    variant={form.meta.status === 'published' ? 'default' : 'secondary'}
                  >
                    {form.meta.status}
                  </Badge>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <FileText className="h-4 w-4 mr-1" />
                    {form.fields.length} fields
                  </div>
                </div>
                
                <div className="flex items-center text-xs text-muted-foreground mb-4">
                  <Calendar className="h-3 w-3 mr-1" />
                  Created {new Date(form.meta.createdAt).toLocaleDateString()}
                </div>

                <div className="flex space-x-2">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="flex-1"
                    onClick={() => handlePreview(form.meta.id)}
                  >
                    <Eye className="h-4 w-4 mr-1" />
                    Preview
                  </Button>
                  <Button 
                    size="sm" 
                    className="flex-1"
                    onClick={() => handleEdit(form.meta.id)}
                  >
                    <Edit className="h-4 w-4 mr-1" />
                    Edit
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <Card>
          <CardContent className="p-12 text-center">
            <FileText className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
            <h3 className="text-lg font-medium mb-2">No forms found</h3>
            <p className="text-muted-foreground mb-4">
              {searchTerm ? 'No forms match your search.' : 'Get started by creating your first form.'}
            </p>
            {!searchTerm && (
              <Button onClick={handleCreateNew}>
                <Plus className="h-4 w-4 mr-2" />
                Create Your First Form
              </Button>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
}
