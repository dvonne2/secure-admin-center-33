
import React, { useState } from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

export default function VitalVidaOrderForm() {
  const [selectedProduct, setSelectedProduct] = useState('');
  const [selectedDelivery, setSelectedDelivery] = useState('');
  const [selectedPayment, setSelectedPayment] = useState('');

  const products = [
    {
      id: 'self-love-plus',
      name: 'SELF LOVE PLUS',
      description: 'Buy 1 shampoo, 1 pomade, 1 conditioner',
      price: 'N32,750'
    },
    {
      id: 'self-love-b2gof',
      name: 'SELF LOVE B2GOF',
      description: 'Buy 2 shampoo, 2 pomade & Get 1 shampoo, 1 pomade FREE',
      price: 'N52,750'
    },
    {
      id: 'self-love-plus-b2gof',
      name: 'SELF LOVE PLUS B2GOF',
      description: 'Buy 2 shampoo, 2 pomade, 2 conditioners & Get 1 shampoo, 1 pomade, 1 conditioner',
      price: 'N66,750'
    },
    {
      id: 'self-love-return',
      name: 'SELF LOVE RETURN',
      description: 'Buy 3 pomades',
      price: 'N32,750'
    },
    {
      id: 'buy-pomade',
      name: 'Buy 1 Pomade',
      description: '',
      price: 'N25,000'
    },
    {
      id: 'buy-conditioner',
      name: 'Buy 1 Conditioner',
      description: '',
      price: 'N25,000'
    },
    {
      id: 'family-saves',
      name: 'FAMILY SAVES',
      description: 'Buy 6 shampoo, 6 pomades, 6 conditioners and Get 4 shampoos, 4 pomades, 4 conditioners FREE',
      price: 'N215,750'
    }
  ];

  const deliveryOptions = [
    {
      id: 'same-day',
      name: 'Same-Day Delivery',
      description: 'Orders before 12 noon only',
      price: 'N4,000'
    },
    {
      id: 'express',
      name: 'Express Delivery',
      description: '1-2 days delivery',
      price: 'N3,500'
    },
    {
      id: 'standard',
      name: 'Standard Delivery',
      description: '3-5 days delivery',
      price: 'N2,500'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-4xl mx-auto">
        <Card className="shadow-lg">
          <CardHeader className="bg-gradient-to-r from-yellow-500 to-yellow-600 text-white text-center py-6">
            <h1 className="text-2xl font-bold">Vitalvida Order Form (POD)</h1>
            <p className="text-sm opacity-90">Place your order - Only serious buyers should fill this form</p>
          </CardHeader>
          
          <CardContent className="p-8 space-y-8">
            {/* Personal Information */}
            <div className="space-y-4">
              <div className="bg-gradient-to-r from-yellow-500 to-yellow-600 text-white p-3 rounded-lg text-center font-semibold">
                Personal Information
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="fullName">Full Name *</Label>
                  <Input id="fullName" placeholder="Enter your full name" className="mt-1" />
                </div>
                <div>
                  <Label htmlFor="phoneNumber">Phone Number *</Label>
                  <div className="flex mt-1">
                    <Select defaultValue="+234">
                      <SelectTrigger className="w-24">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="+234">+234</SelectItem>
                      </SelectContent>
                    </Select>
                    <Input placeholder="Enter phone number" className="flex-1 ml-2" />
                  </div>
                </div>
              </div>
              
              <div>
                <Label htmlFor="email">Email Address (Optional)</Label>
                <Input id="email" type="email" placeholder="Enter your email" className="mt-1" />
              </div>
            </div>

            {/* Location & Delivery */}
            <div className="space-y-4">
              <div className="bg-gradient-to-r from-yellow-500 to-yellow-600 text-white p-3 rounded-lg text-center font-semibold">
                Location & Delivery
              </div>
              
              <div className="grid grid-cols-1 gap-4">
                <div>
                  <Label htmlFor="state">State *</Label>
                  <Select>
                    <SelectTrigger className="mt-1">
                      <SelectValue placeholder="Select an option" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="lagos">Lagos</SelectItem>
                      <SelectItem value="abuja">Abuja</SelectItem>
                      <SelectItem value="kano">Kano</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <Label htmlFor="deliveryAddress">Delivery Address *</Label>
                  <Textarea 
                    id="deliveryAddress" 
                    placeholder="Enter your full delivery address" 
                    className="mt-1 min-h-[80px]"
                  />
                </div>
              </div>
            </div>

            {/* Product Selection */}
            <div className="space-y-4">
              <div className="bg-gradient-to-r from-yellow-500 to-yellow-600 text-white p-3 rounded-lg text-center font-semibold">
                Product Selection
              </div>
              
              <div>
                <Label>Choose a Package *</Label>
                <RadioGroup value={selectedProduct} onValueChange={setSelectedProduct} className="mt-2">
                  {products.map((product) => (
                    <div key={product.id} className="flex items-center space-x-3 p-4 border rounded-lg hover:bg-gray-50">
                      <RadioGroupItem value={product.id} id={product.id} />
                      <div className="flex-1">
                        <Label htmlFor={product.id} className="font-medium cursor-pointer">
                          {product.name}
                        </Label>
                        {product.description && (
                          <p className="text-sm text-muted-foreground mt-1">{product.description}</p>
                        )}
                      </div>
                      <Badge variant="outline" className="font-semibold text-yellow-600">
                        {product.price}
                      </Badge>
                    </div>
                  ))}
                </RadioGroup>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="promoCode">Promo Code (Optional)</Label>
                  <Input id="promoCode" placeholder="Enter promo code" className="mt-1" />
                </div>
                <div>
                  <Label htmlFor="howDidYouHear">How did you hear about us?</Label>
                  <Select>
                    <SelectTrigger className="mt-1">
                      <SelectValue placeholder="Select an option" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="social-media">Social Media</SelectItem>
                      <SelectItem value="friend">Friend/Family</SelectItem>
                      <SelectItem value="google">Google Search</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>

            {/* Delivery Options */}
            <div className="space-y-4">
              <div className="bg-gradient-to-r from-yellow-500 to-yellow-600 text-white p-3 rounded-lg text-center font-semibold">
                Delivery Options
              </div>
              
              <div>
                <Label>Delivery Speed *</Label>
                <RadioGroup value={selectedDelivery} onValueChange={setSelectedDelivery} className="mt-2">
                  {deliveryOptions.map((option) => (
                    <div key={option.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50">
                      <div className="flex items-center space-x-3">
                        <RadioGroupItem value={option.id} id={option.id} />
                        <div>
                          <Label htmlFor={option.id} className="font-medium cursor-pointer">
                            {option.name}
                          </Label>
                          <p className="text-sm text-muted-foreground">{option.description}</p>
                        </div>
                      </div>
                      <Badge variant="outline" className="font-semibold text-yellow-600">
                        {option.price}
                      </Badge>
                    </div>
                  ))}
                </RadioGroup>
              </div>
            </div>

            {/* Payment Method */}
            <div className="space-y-4">
              <div className="bg-gradient-to-r from-yellow-500 to-yellow-600 text-white p-3 rounded-lg text-center font-semibold">
                Payment Method
              </div>
              
              <div>
                <Label>Choose Payment Method *</Label>
                <RadioGroup value={selectedPayment} onValueChange={setSelectedPayment} className="mt-2">
                  <div className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50">
                    <div className="flex items-center space-x-3">
                      <RadioGroupItem value="pay-on-delivery" id="pay-on-delivery" />
                      <div>
                        <Label htmlFor="pay-on-delivery" className="font-medium cursor-pointer">
                          Pay on Delivery
                        </Label>
                        <p className="text-sm text-muted-foreground">Pay when your order arrives</p>
                      </div>
                    </div>
                    <Badge className="bg-green-100 text-green-800 font-semibold">
                      Most Popular
                    </Badge>
                  </div>
                  
                  <div className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50">
                    <div className="flex items-center space-x-3">
                      <RadioGroupItem value="pay-before-delivery" id="pay-before-delivery" />
                      <div>
                        <Label htmlFor="pay-before-delivery" className="font-medium cursor-pointer">
                          Pay Before Delivery
                        </Label>
                        <p className="text-sm text-muted-foreground">Secure online payment</p>
                      </div>
                    </div>
                    <Badge className="bg-blue-100 text-blue-800 font-semibold">
                      Secure
                    </Badge>
                  </div>
                </RadioGroup>
              </div>
            </div>

            {/* Submit Button */}
            <div className="pt-4">
              <Button className="w-full bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 text-white font-semibold py-3 text-lg">
                Submit Order
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
