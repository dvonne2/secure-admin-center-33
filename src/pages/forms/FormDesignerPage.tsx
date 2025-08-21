
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { FormSchema, FormField, FieldType } from '@/modules/forms/types';
import { getFormsService } from '@/modules/forms/storage/FormsService';
import { 
  ArrowLeft, 
  Eye, 
  Save, 
  Type, 
  AlignLeft, 
  Mail, 
  Phone, 
  MousePointer, 
  CheckSquare, 
  ChevronDown, 
  Star, 
  Upload,
  Settings,
  FileText,
  Plus
} from 'lucide-react';

const questionTypes = [
  { type: 'text' as FieldType, label: 'Short Text', icon: Type, description: 'Single line input' },
  { type: 'textarea' as FieldType, label: 'Long Text', icon: AlignLeft, description: 'Multi-line input' },
  { type: 'email' as FieldType, label: 'Email', icon: Mail, description: 'Email address' },
  { type: 'phone' as FieldType, label: 'Phone', icon: Phone, description: 'Phone number' },
  { type: 'radio' as FieldType, label: 'Multiple Choice', icon: MousePointer, description: 'Single selection' },
  { type: 'checkbox' as FieldType, label: 'Checkboxes', icon: CheckSquare, description: 'Multiple selections' },
  { type: 'select' as FieldType, label: 'Dropdown', icon: ChevronDown, description: 'Select from list' },
  { type: 'number' as FieldType, label: 'Rating', icon: Star, description: 'Star or number rating' },
  { type: 'file' as FieldType, label: 'File Upload', icon: Upload, description: 'Upload files' },
];

export default function FormDesignerPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [form, setForm] = useState<FormSchema | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedField, setSelectedField] = useState<FormField | null>(null);

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
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate('/forms')}
              className="text-gray-600 hover:text-gray-900"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
            </Button>
            <div className="flex items-center gap-2">
              <Input 
                value={form.meta.name} 
                className="text-lg font-semibold border-none p-0 bg-transparent focus:ring-0 focus:outline-none" 
                placeholder="Untitled Form"
              />
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm">
              <FileText className="h-4 w-4 mr-2" />
              Embed
            </Button>
            <Button variant="ghost" size="sm">
              <Settings className="h-4 w-4 mr-2" />
              Settings
            </Button>
            <Button 
              variant="ghost" 
              size="sm"
              onClick={() => navigate(`/forms/${id}/preview`)}
            >
              <Eye className="h-4 w-4 mr-2" />
              Preview
            </Button>
            <Button className="bg-gray-900 hover:bg-gray-800 text-white">
              <Save className="h-4 w-4 mr-2" />
              Save
            </Button>
          </div>
        </div>
      </div>

      <div className="flex h-[calc(100vh-80px)]">
        {/* Left Sidebar - Question Types */}
        <div className="w-80 bg-white border-r border-gray-200 p-6">
          <h3 className="text-lg font-semibold mb-6">Question Types</h3>
          <div className="space-y-3">
            {questionTypes.map((questionType) => (
              <div
                key={questionType.type}
                className="flex items-center gap-3 p-3 rounded-lg border border-gray-200 hover:border-gray-300 hover:bg-gray-50 cursor-pointer transition-colors"
                draggable
              >
                <questionType.icon className="h-5 w-5 text-gray-600" />
                <div className="flex-1">
                  <div className="font-medium text-sm">{questionType.label}</div>
                  <div className="text-xs text-gray-500">{questionType.description}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Center Canvas */}
        <div className="flex-1 flex flex-col">
          <div className="flex-1 p-8 overflow-auto">
            <div className="max-w-2xl mx-auto">
              <div className="bg-white rounded-lg border border-gray-200 min-h-[600px]">
                {/* Form Header */}
                <div className="p-8 border-b border-gray-100">
                  <div className="text-center">
                    <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                      <FileText className="h-6 w-6 text-gray-600" />
                    </div>
                    <h2 className="text-xl font-semibold">{form.meta.name}</h2>
                    <p className="text-gray-600 mt-2">Your form preview will appear here</p>
                  </div>
                </div>

                {/* Form Fields */}
                <div className="p-8">
                  {form.fields.length > 0 ? (
                    <div className="space-y-6">
                      {form.fields.map((field, index) => (
                        <div 
                          key={field.id} 
                          className={`p-4 rounded-lg border-2 border-dashed transition-colors cursor-pointer ${
                            selectedField?.id === field.id 
                              ? 'border-blue-300 bg-blue-50' 
                              : 'border-gray-200 hover:border-gray-300'
                          }`}
                          onClick={() => setSelectedField(field)}
                        >
                          <div className="flex items-center gap-2 mb-2">
                            <span className="text-sm font-medium text-gray-700">
                              {field.type.charAt(0).toUpperCase() + field.type.slice(1)}
                            </span>
                            {field.required && (
                              <Badge variant="secondary" className="text-xs">Required</Badge>
                            )}
                          </div>
                          {field.label && (
                            <div className="font-medium">{field.label}</div>
                          )}
                          {field.helpText && (
                            <div className="text-sm text-gray-500 mt-1">{field.helpText}</div>
                          )}
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-12">
                      <Plus className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                      <h3 className="text-lg font-medium text-gray-900 mb-2">No questions yet</h3>
                      <p className="text-gray-600">Select a question type from the sidebar to get started</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Sidebar - Properties */}
        {selectedField && (
          <div className="w-80 bg-white border-l border-gray-200 p-6">
            <h3 className="text-lg font-semibold mb-6">Properties</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Question Label
                </label>
                <Input 
                  value={selectedField.label || ''} 
                  placeholder="Enter question label"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Help Text
                </label>
                <Input 
                  value={selectedField.helpText || ''} 
                  placeholder="Add help text (optional)"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Placeholder
                </label>
                <Input 
                  value={selectedField.placeholder || ''} 
                  placeholder="Enter placeholder text"
                />
              </div>

              <div className="flex items-center gap-2">
                <input 
                  type="checkbox" 
                  checked={selectedField.required || false}
                  className="rounded"
                />
                <label className="text-sm font-medium text-gray-700">
                  Required field
                </label>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
