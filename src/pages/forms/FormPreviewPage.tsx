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
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { FormSchema, FormField } from '@/modules/forms/types';
import { getFormsService } from '@/modules/forms/storage/FormsService';
import { fmtNGN } from '@/modules/forms/utils';
import { ArrowLeft, Edit, Code, Copy, Check } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export default function FormPreviewPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [form, setForm] = useState<FormSchema | null>(null);
  const [loading, setLoading] = useState(true);
  const [embedDialogOpen, setEmbedDialogOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  const formsService = getFormsService();
  const { toast } = useToast();

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

  const generateEmbedCode = (formId: string) => {
    return `<iframe src="https://erp.vitalvida.com/forms/${formId}" width="100%" height="600px" frameborder="0"></iframe>`;
  };

  const handleCopyEmbedCode = async () => {
    if (!form) return;
    
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

  const renderField = (field: FormField) => {
    const isRequired = field.required;
    
    // Section headers
    if (field.type === 'section') {
      return (
        <div key={field.id} className="border-b-2 border-orange-200 pb-3 mb-6">
          <h2 className="text-xl font-bold text-gray-900">{field.label}</h2>
          {field.helpText && (
            <p className="text-gray-600 mt-1">{field.helpText}</p>
          )}
        </div>
      );
    }

    const label = field.label ? (
      <Label className="text-sm font-semibold text-gray-800 mb-2 block">
        {field.label}
        {isRequired && <span className="text-red-500 ml-1">*</span>}
      </Label>
    ) : null;

    const helpText = field.helpText ? (
      <p className="text-sm text-gray-500 mt-1">{field.helpText}</p>
    ) : null;

    switch (field.type) {
      case 'text':
        return (
          <div key={field.id} className="space-y-2">
            {label}
            <Input 
              placeholder={field.placeholder} 
              required={isRequired}
              className="border-gray-300 focus:border-orange-400 focus:ring-orange-400"
            />
            {helpText}
          </div>
        );

      case 'textarea':
        return (
          <div key={field.id} className="space-y-2">
            {label}
            <Textarea 
              placeholder={field.placeholder} 
              required={isRequired}
              rows={4}
              className="border-gray-300 focus:border-orange-400 focus:ring-orange-400"
            />
            {helpText}
          </div>
        );

      case 'email':
        return (
          <div key={field.id} className="space-y-2">
            {label}
            <Input 
              type="email"
              placeholder={field.placeholder || "Enter your email"} 
              required={isRequired}
              className="border-gray-300 focus:border-orange-400 focus:ring-orange-400"
            />
            {helpText}
          </div>
        );

      case 'phone':
        return (
          <div key={field.id} className="space-y-2">
            {label}
            <div className="flex gap-2">
              <Select>
                <SelectTrigger className="w-32 border-gray-300">
                  <SelectValue placeholder="+234" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="+234">🇳🇬 +234</SelectItem>
                  <SelectItem value="+1">🇺🇸 +1</SelectItem>
                  <SelectItem value="+44">🇬🇧 +44</SelectItem>
                </SelectContent>
              </Select>
              <Input 
                type="tel"
                placeholder={field.placeholder || "Enter phone number"} 
                required={isRequired}
                className="flex-1 border-gray-300 focus:border-orange-400 focus:ring-orange-400"
              />
            </div>
            {helpText}
          </div>
        );

      case 'select':
        return (
          <div key={field.id} className="space-y-2">
            {label}
            <Select required={isRequired}>
              <SelectTrigger className="border-gray-300 focus:border-orange-400 focus:ring-orange-400">
                <SelectValue placeholder={field.placeholder || "Select an option"} />
              </SelectTrigger>
              <SelectContent>
                {field.options?.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {helpText}
          </div>
        );

      case 'radio':
        return (
          <div key={field.id} className="space-y-4">
            {label}
            <RadioGroup required={isRequired} className="space-y-3">
              {field.options?.map((option) => (
                <div key={option.value} className="border border-gray-200 rounded-lg p-4 hover:border-orange-300 transition-colors">
                  <div className="flex items-start space-x-3">
                    <RadioGroupItem value={option.value} id={option.value} className="mt-1" />
                    <div className="flex-1">
                      <Label htmlFor={option.value} className="font-medium text-gray-900 cursor-pointer">
                        {option.label}
                      </Label>
                      {option.sublabel && (
                        <p className="text-sm text-gray-600 mt-1">{option.sublabel}</p>
                      )}
                      {option.priceNGN && (
                        <p className="text-lg font-bold text-orange-600 mt-2">₦{option.priceNGN.toLocaleString()}</p>
                      )}
                      {option.badge && (
                        <span className="inline-block bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full mt-2">
                          {option.badge}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </RadioGroup>
            {helpText}
          </div>
        );

      case 'date':
        return (
          <div key={field.id} className="space-y-2">
            {label}
            <Input 
              type="date" 
              required={isRequired}
              className="border-gray-300 focus:border-orange-400 focus:ring-orange-400"
            />
            {helpText}
          </div>
        );

      case 'number':
        return (
          <div key={field.id} className="space-y-2">
            {label}
            <Input 
              type="number" 
              required={isRequired}
              min={field.min} 
              max={field.max}
              className="border-gray-300 focus:border-orange-400 focus:ring-orange-400"
            />
            {helpText}
          </div>
        );

      default:
        return (
          <div key={field.id} className="space-y-2">
            {label}
            <Input 
              placeholder={field.placeholder || `Enter ${field.type}`} 
              required={isRequired}
              className="border-gray-300 focus:border-orange-400 focus:ring-orange-400"
            />
            {helpText}
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
    <TooltipProvider>
      <div className="min-h-screen bg-gradient-to-br from-orange-50 to-orange-100">
        <div className="max-w-2xl mx-auto pt-8 pb-12">
          {/* Header */}
          <div className="flex items-center justify-between mb-8 px-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate('/forms')}
              className="text-gray-600 hover:text-gray-900"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Forms
            </Button>
            <div className="flex gap-2">
              <Dialog open={embedDialogOpen} onOpenChange={setEmbedDialogOpen}>
                <DialogTrigger asChild>
                  <Button variant="outline" className="bg-white">
                    <Code className="h-4 w-4 mr-2" />
                    Embed
                  </Button>
                </DialogTrigger>
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
                          value={generateEmbedCode(form.meta.id)}
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
                              onClick={handleCopyEmbedCode}
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
                </DialogContent>
              </Dialog>
              <Button onClick={() => navigate(`/forms/${id}/design`)} className="bg-white text-gray-900 hover:bg-gray-50">
                <Edit className="h-4 w-4 mr-2" />
                Edit
              </Button>
            </div>
          </div>

          {/* Form Card */}
          <div className="bg-white rounded-lg shadow-lg overflow-hidden mx-4">
            {/* Form Header */}
            <div className="bg-gradient-to-r from-orange-400 to-yellow-500 text-white p-6 text-center">
              <h1 className="text-2xl font-bold">{form.meta.name}</h1>
              {form.meta.description && (
                <p className="mt-2 opacity-90">{form.meta.description}</p>
              )}
            </div>

            {/* Form Content */}
            <div className="p-8 space-y-8">
              {form.fields.map(renderField)}
              
              <div className="pt-6">
                <Button className="w-full bg-gradient-to-r from-orange-400 to-yellow-500 hover:from-orange-500 hover:to-yellow-600 text-white font-semibold py-3 text-lg">
                  Submit Order
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </TooltipProvider>
  );
}
