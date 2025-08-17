
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { FormSchema } from '@/modules/forms/types';
import { getFormsService } from '@/modules/forms/storage/FormsService';
import { ArrowLeft, Eye, Save } from 'lucide-react';

export default function FormDesignerPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [form, setForm] = useState<FormSchema | null>(null);
  const [loading, setLoading] = useState(true);

  const formsService = getFormsService();

  useEffect(() => {
    if (id) {
      loadForm(id);
    }
  }, [id]);

  const loadForm = async (formId: string) => {
    try {
      const formData = await formsService.get(formId);
      setForm(formData);
    } catch (error) {
      console.error('Failed to load form:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="p-6">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary mx-auto"></div>
      </div>
    );
  }

  if (!form) {
    return (
      <div className="p-6">
        <Card>
          <CardContent className="p-6">
            <p>Form not found</p>
            <Button onClick={() => navigate('/forms')} className="mt-4">
              Back to Forms
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate('/forms')}
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Forms
          </Button>
          <div>
            <h1 className="text-2xl font-bold">{form.meta.name}</h1>
            <p className="text-muted-foreground">Form Designer</p>
          </div>
        </div>
        <div className="flex gap-2">
          <Button
            variant="outline"
            onClick={() => navigate(`/forms/${id}/preview`)}
          >
            <Eye className="h-4 w-4 mr-2" />
            Preview
          </Button>
          <Button>
            <Save className="h-4 w-4 mr-2" />
            Save
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-12 gap-6">
        {/* Left Palette */}
        <div className="col-span-3">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Field Types</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Designer palette coming soon...
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Canvas */}
        <div className="col-span-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Form Canvas</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {form.fields.length > 0 ? (
                  form.fields.map((field) => (
                    <div key={field.id} className="p-4 border rounded-lg">
                      <div className="font-medium">{field.type}</div>
                      {field.label && (
                        <div className="text-sm text-muted-foreground">{field.label}</div>
                      )}
                    </div>
                  ))
                ) : (
                  <p className="text-muted-foreground text-center py-8">
                    No fields added yet. Drag fields from the palette to get started.
                  </p>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Properties Panel */}
        <div className="col-span-3">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Properties</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Properties panel coming soon...
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
