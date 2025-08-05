
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { UserPlus, Eye, EyeOff, X, AlertCircle, Loader2, CheckCircle } from 'lucide-react';

interface AddUserModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

interface FormData {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
  role: string;
  status: 'active' | 'inactive';
}

interface FormErrors {
  username?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
  role?: string;
}

const roleOptions = [
  { value: 'superadmin', label: 'Super Admin', badgeClass: 'bg-red-100 text-red-800' },
  { value: 'admin', label: 'Admin', badgeClass: 'bg-blue-100 text-blue-800' },
  { value: 'manager', label: 'Manager', badgeClass: 'bg-green-100 text-green-800' },
  { value: 'user', label: 'User', badgeClass: 'bg-gray-100 text-gray-800' },
];

export function AddUserModal({ open, onOpenChange }: AddUserModalProps) {
  const [formData, setFormData] = useState<FormData>({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: '',
    status: 'active'
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const validateField = (name: keyof FormData, value: string): string | undefined => {
    switch (name) {
      case 'username':
        if (!value) return 'Username is required';
        if (value.length < 3) return 'Username must be at least 3 characters';
        break;
      case 'email':
        if (!value) return 'Email is required';
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) return 'Please enter a valid email';
        break;
      case 'password':
        if (!value) return 'Password is required';
        if (value.length < 8) return 'Password must be at least 8 characters';
        break;
      case 'confirmPassword':
        if (!value) return 'Please confirm your password';
        if (value !== formData.password) return 'Passwords do not match';
        break;
      case 'role':
        if (!value) return 'Please select a user role';
        break;
    }
    return undefined;
  };

  const handleInputChange = (name: keyof FormData, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Real-time validation
    const error = validateField(name, value);
    setErrors(prev => ({ ...prev, [name]: error }));
    
    // Re-validate confirm password if password changes
    if (name === 'password' && formData.confirmPassword) {
      const confirmError = validateField('confirmPassword', formData.confirmPassword);
      setErrors(prev => ({ ...prev, confirmPassword: confirmError }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};
    let isValid = true;

    (Object.keys(formData) as Array<keyof FormData>).forEach(key => {
      if (key !== 'status') {
        const error = validateField(key, formData[key]);
        if (error) {
          newErrors[key] = error;
          isValid = false;
        }
      }
    });

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setIsSubmitting(false);
    setShowSuccess(true);
    
    // Hide success message and close modal after 2 seconds
    setTimeout(() => {
      setShowSuccess(false);
      resetForm();
      onOpenChange(false);
    }, 2000);
  };

  const resetForm = () => {
    setFormData({
      username: '',
      email: '',
      password: '',
      confirmPassword: '',
      role: '',
      status: 'active'
    });
    setErrors({});
    setShowPassword(false);
    setShowConfirmPassword(false);
    setShowSuccess(false);
  };

  const handleClose = () => {
    resetForm();
    onOpenChange(false);
  };

  const selectedRole = roleOptions.find(option => option.value === formData.role);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md p-0 overflow-hidden">
        {/* Header */}
        <DialogHeader className="p-6 pb-4 bg-gradient-to-r from-blue-50 to-indigo-50 border-b">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-blue-100 rounded-full">
                <UserPlus className="h-5 w-5 text-blue-600" />
              </div>
              <DialogTitle className="text-lg font-semibold text-gray-900">
                Add New User
              </DialogTitle>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleClose}
              className="h-8 w-8 p-0 hover:bg-blue-100"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </DialogHeader>

        {/* Form Content */}
        <div className="p-6">
          {showSuccess && (
            <Alert className="mb-4 border-green-200 bg-green-50">
              <CheckCircle className="h-4 w-4 text-green-600" />
              <AlertDescription className="text-green-800">
                User created successfully!
              </AlertDescription>
            </Alert>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Username */}
            <div className="space-y-2">
              <Label htmlFor="username" className="text-sm font-medium text-gray-700">
                Username <span className="text-red-500">*</span>
              </Label>
              <Input
                id="username"
                value={formData.username}
                onChange={(e) => handleInputChange('username', e.target.value)}
                className={`transition-colors ${errors.username ? 'border-red-300 focus:border-red-500 focus:ring-red-500' : 'focus:border-blue-500 focus:ring-blue-500'}`}
                placeholder="Enter username"
              />
              {errors.username && (
                <div className="flex items-center space-x-1 text-red-600 text-sm">
                  <AlertCircle className="h-3 w-3" />
                  <span>{errors.username}</span>
                </div>
              )}
            </div>

            {/* Email */}
            <div className="space-y-2">
              <Label htmlFor="email" className="text-sm font-medium text-gray-700">
                Email Address <span className="text-red-500">*</span>
              </Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                className={`transition-colors ${errors.email ? 'border-red-300 focus:border-red-500 focus:ring-red-500' : 'focus:border-blue-500 focus:ring-blue-500'}`}
                placeholder="Enter email address"
              />
              {errors.email && (
                <div className="flex items-center space-x-1 text-red-600 text-sm">
                  <AlertCircle className="h-3 w-3" />
                  <span>{errors.email}</span>
                </div>
              )}
            </div>

            {/* Password */}
            <div className="space-y-2">
              <Label htmlFor="password" className="text-sm font-medium text-gray-700">
                Password <span className="text-red-500">*</span>
              </Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  value={formData.password}
                  onChange={(e) => handleInputChange('password', e.target.value)}
                  className={`pr-10 transition-colors ${errors.password ? 'border-red-300 focus:border-red-500 focus:ring-red-500' : 'focus:border-blue-500 focus:ring-blue-500'}`}
                  placeholder="Enter password"
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-0 top-0 h-full px-3 hover:bg-transparent"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4 text-gray-500" />
                  ) : (
                    <Eye className="h-4 w-4 text-gray-500" />
                  )}
                </Button>
              </div>
              {errors.password && (
                <div className="flex items-center space-x-1 text-red-600 text-sm">
                  <AlertCircle className="h-3 w-3" />
                  <span>{errors.password}</span>
                </div>
              )}
            </div>

            {/* Confirm Password */}
            <div className="space-y-2">
              <Label htmlFor="confirmPassword" className="text-sm font-medium text-gray-700">
                Confirm Password <span className="text-red-500">*</span>
              </Label>
              <div className="relative">
                <Input
                  id="confirmPassword"
                  type={showConfirmPassword ? 'text' : 'password'}
                  value={formData.confirmPassword}
                  onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                  className={`pr-10 transition-colors ${errors.confirmPassword ? 'border-red-300 focus:border-red-500 focus:ring-red-500' : 'focus:border-blue-500 focus:ring-blue-500'}`}
                  placeholder="Confirm password"
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-0 top-0 h-full px-3 hover:bg-transparent"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword ? (
                    <EyeOff className="h-4 w-4 text-gray-500" />
                  ) : (
                    <Eye className="h-4 w-4 text-gray-500" />
                  )}
                </Button>
              </div>
              {errors.confirmPassword && (
                <div className="flex items-center space-x-1 text-red-600 text-sm">
                  <AlertCircle className="h-3 w-3" />
                  <span>{errors.confirmPassword}</span>
                </div>
              )}
            </div>

            {/* User Role */}
            <div className="space-y-2">
              <Label className="text-sm font-medium text-gray-700">
                User Role <span className="text-red-500">*</span>
              </Label>
              <Select value={formData.role} onValueChange={(value) => handleInputChange('role', value)}>
                <SelectTrigger className={`transition-colors ${errors.role ? 'border-red-300 focus:border-red-500 focus:ring-red-500' : 'focus:border-blue-500 focus:ring-blue-500'}`}>
                  <SelectValue placeholder="Select user role" />
                </SelectTrigger>
                <SelectContent>
                  {roleOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      <div className="flex items-center space-x-2">
                        <span>{option.label}</span>
                        <Badge className={option.badgeClass}>
                          {option.label}
                        </Badge>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {selectedRole && (
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-gray-600">Preview:</span>
                  <Badge className={selectedRole.badgeClass}>
                    {selectedRole.label}
                  </Badge>
                </div>
              )}
              {errors.role && (
                <div className="flex items-center space-x-1 text-red-600 text-sm">
                  <AlertCircle className="h-3 w-3" />
                  <span>{errors.role}</span>
                </div>
              )}
            </div>

            {/* Status */}
            <div className="space-y-2">
              <Label className="text-sm font-medium text-gray-700">Status</Label>
              <RadioGroup
                value={formData.status}
                onValueChange={(value: 'active' | 'inactive') => setFormData(prev => ({ ...prev, status: value }))}
                className="flex space-x-4"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="active" id="active" />
                  <Label htmlFor="active" className="text-sm font-normal">Active</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="inactive" id="inactive" />
                  <Label htmlFor="inactive" className="text-sm font-normal">Inactive</Label>
                </div>
              </RadioGroup>
            </div>

            {/* Action Buttons */}
            <div className="flex justify-end space-x-3 pt-4 border-t">
              <Button
                type="button"
                variant="outline"
                onClick={handleClose}
                disabled={isSubmitting}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={isSubmitting}
                className="bg-blue-600 hover:bg-blue-700 text-white"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Creating...
                  </>
                ) : (
                  'Create User'
                )}
              </Button>
            </div>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
}
