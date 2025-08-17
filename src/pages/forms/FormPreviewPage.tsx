
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Badge } from '@/components/ui/badge';
import { FormSchema, FormField } from '@/modules/forms/types';
import { getFormsService } from '@/modules/forms/storage/FormsService';
import { fmtNGN } from '@/modules/forms/utils';
import { ArrowLeft, Edit } from 'lucide-react';

export default function FormPreviewPage() {
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

  const renderField = (field: FormField) => {
    switch (field.type) {
      case 'section':
        return (
          <div key={field.id} className="py-4">
            <div
              className="text-xl font-bold text-center py-4 rounded-lg"
              style={{
                background: form?.meta.theme.headerGradient 
                  ? `linear-gradient(135deg, ${form.meta.theme.headerGradient.from}, ${form.meta.theme.headerGradient.to})`
                  : form?.meta.theme.primary,
                color: 'white'
              }}
            >
              {field.label}
            </div>
          </div>
        );

      case 'text':
      case 'email':
      case 'phone':
        return (
          <div key={field.id} className="space-y-2">
            <Label>
              {field.label} {field.required && <span className="text-red-500">*</span>}
            </Label>
            <Input placeholder={field.placeholder} />
            {field.helpText && (
              <p className="text-sm text-muted-foreground">{field.helpText}</p>
            )}
          </div>
        );

      case 'textarea':
        return (
          <div key={field.id} className="space-y-2">
            <Label>
              {field.label} {field.required && <span className="text-red-500">*</span>}
            </Label>
            <Textarea placeholder={field.placeholder} />
            {field.helpText && (
              <p className="text-sm text-muted-foreground">{field.helpText}</p>
            )}
          </div>
        );

      case 'select':
        return (
          <div key={field.id} className="space-y-2">
            <Label>
              {field.label} {field.required && <span className="text-red-500">*</span>}
            </Label>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Select an option" />
              </SelectTrigger>
              <SelectContent>
                {field.options?.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        );

      case 'radio':
        return (
          <div key={field.id} className="space-y-4">
            <Label>
              {field.label} {field.required && <span className="text-red-500">*</span>}
            </Label>
            <RadioGroup>
              {field.options?.map((option) => (
                <div key={option.value} className="flex items-center space-x-2 p-3 border rounded-lg">
                  <RadioGroupItem value={option.value} id={option.value} />
                  <div className="flex-1">
                    <Label htmlFor={option.value} className="font-medium cursor-pointer">
                      {option.label}
                    </Label>
                    {option.sublabel && (
                      <p className="text-sm text-muted-foreground">{option.sublabel}</p>
                    )}
                  </div>
                  <div className="flex items-center gap-2">
                    {option.priceNGN && (
                      <Badge variant="outline">{fmtNGN(option.priceNGN)}</Badge>
                    )}
                    {option.badge && (
                      <Badge>{option.badge}</Badge>
                    )}
                  </div>
                </div>
              ))}
            </RadioGroup>
          </div>
        );

      case 'date':
        return (
          <div key={field.id} className="space-y-2">
            <Label>
              {field.label} {field.required && <span className="text-red-500">*</span>}
            </Label>
            <Input type="date" />
          </div>
        );

      case 'number':
        return (
          <div key={field.id} className="space-y-2">
            <Label>
              {field.label} {field.required && <span className="text-red-500">*</span>}
            </Label>
            <Input type="number" min={field.min} max={field.max} />
          </div>
        );

      default:
        return (
          <div key={field.id} className="p-4 border rounded-lg">
            <p className="text-muted-foreground">Field type "{field.type}" not implemented yet</p>
          </div>
        );
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
            <p className="text-muted-foreground">Form Preview</p>
          </div>
        </div>
        <Button onClick={() => navigate(`/forms/${id}/design`)}>
          <Edit className="h-4 w-4 mr-2" />
          Edit Form
        </Button>
      </div>

      <div className="max-w-4xl mx-auto">
        <Card>
          <CardHeader>
            <CardTitle>{form.meta.name}</CardTitle>
            {form.meta.description && (
              <p className="text-muted-foreground">{form.meta.description}</p>
            )}
          </CardHeader>
          <CardContent className="space-y-6">
            {form.fields.map(renderField)}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
