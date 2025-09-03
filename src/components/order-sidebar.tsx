"use client";

import React, { useState, useCallback } from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { ShoppingCart, Plus, Minus, Trash2, Info, X } from 'lucide-react';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';

interface OrderItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
  description?: string;
}

interface SuggestedItem {
  id: string;
  name: string;
  price: number;
  image: string;
}

interface OrderSidebarProps {
  className?: string;
  isOpen?: boolean;
  onToggle?: () => void;
}

const mockOrderItems: OrderItem[] = [
  {
    id: '1',
    name: 'Margherita Pizza',
    price: 24.99,
    quantity: 2,
    image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=300&h=200&fit=crop',
    description: 'Fresh mozzarella, tomato sauce, basil'
  },
  {
    id: '2',
    name: 'Caesar Salad',
    price: 16.50,
    quantity: 1,
    image: 'https://images.unsplash.com/photo-1546793665-c74683f339c1?w=300&h=200&fit=crop',
    description: 'Romaine lettuce, parmesan, croutons'
  }
];

const mockSuggestedItems: SuggestedItem[] = [
  {
    id: '3',
    name: 'Garlic Bread',
    price: 8.99,
    image: 'https://images.unsplash.com/photo-1573140247632-f8fd74997d5c?w=300&h=200&fit=crop'
  },
  {
    id: '4',
    name: 'Tiramisu',
    price: 12.99,
    image: 'https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=300&h=200&fit=crop'
  }
];

function OrderSidebarContent() {
  const [orderItems, setOrderItems] = useState<OrderItem[]>(mockOrderItems);

  const updateQuantity = useCallback((id: string, newQuantity: number) => {
    if (newQuantity <= 0) {
      removeItem(id);
      return;
    }
    setOrderItems(prev => prev.map(item => 
      item.id === id ? { ...item, quantity: newQuantity } : item
    ));
  }, []);

  const removeItem = useCallback((id: string) => {
    setOrderItems(prev => prev.filter(item => item.id !== id));
  }, []);

  const addSuggestedItem = useCallback((suggestedItem: SuggestedItem) => {
    const newItem: OrderItem = {
      ...suggestedItem,
      quantity: 1,
      description: 'Added from suggestions'
    };
    setOrderItems(prev => {
      const existingItem = prev.find(item => item.id === suggestedItem.id);
      if (existingItem) {
        return prev.map(item =>
          item.id === suggestedItem.id 
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, newItem];
    });
  }, []);

  const subtotal = orderItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  const tax = subtotal * 0.08875; // NY tax rate
  const total = subtotal + tax;
  const points = Math.floor(total * 10); // 10 points per dollar

  return (
    <div className="flex flex-col h-full bg-white">
      {/* Header */}
      <div className="p-6 border-b border-border">
        <div className="flex items-center gap-3">
          <ShoppingCart className="h-6 w-6 text-foreground" />
          <h2 className="text-xl font-semibold text-foreground">Your Order</h2>
        </div>
      </div>

      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto">
        {/* Order Items */}
        <div className="p-6 space-y-4">
          {orderItems.length === 0 ? (
            <div className="text-center py-12">
              <ShoppingCart className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground">Your cart is empty</p>
            </div>
          ) : (
            orderItems.map((item) => (
              <div key={item.id} className="flex gap-4 bg-card rounded-lg p-4 border border-border">
                <div className="relative w-16 h-16 rounded-lg overflow-hidden flex-shrink-0">
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex-1">
                      <h3 className="font-medium text-foreground truncate">{item.name}</h3>
                      {item.description && (
                        <p className="text-sm text-muted-foreground mt-1">{item.description}</p>
                      )}
                      <p className="text-lg font-semibold text-foreground mt-2">
                        ${(item.price * item.quantity).toFixed(2)}
                      </p>
                    </div>
                    <div className="flex items-center gap-1">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-8 w-8 p-0 text-muted-foreground hover:text-foreground"
                      >
                        <Info className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removeItem(item.id)}
                        className="h-8 w-8 p-0 text-muted-foreground hover:text-destructive"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 mt-3">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className="h-8 w-8 p-0"
                    >
                      <Minus className="h-4 w-4" />
                    </Button>
                    <span className="text-sm font-medium text-foreground min-w-[2rem] text-center">
                      {item.quantity}
                    </span>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="h-8 w-8 p-0"
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Suggested Items */}
        {orderItems.length > 0 && (
          <div className="px-6 pb-6">
            <h3 className="text-lg font-semibold text-foreground mb-4">Suggested for You</h3>
            <div className="space-y-3">
              {mockSuggestedItems.map((item) => (
                <div key={item.id} className="flex items-center gap-3 bg-muted/50 rounded-lg p-3">
                  <div className="relative w-12 h-12 rounded-md overflow-hidden flex-shrink-0">
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-medium text-foreground text-sm truncate">{item.name}</h4>
                    <p className="text-sm font-semibold text-foreground">${item.price.toFixed(2)}</p>
                  </div>
                  <Button
                    size="sm"
                    onClick={() => addSuggestedItem(item)}
                    className="bg-primary text-primary-foreground hover:bg-primary/90 h-8 px-3"
                  >
                    <Plus className="h-4 w-4 mr-1" />
                    Add
                  </Button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Footer - Order Summary & Checkout */}
      {orderItems.length > 0 && (
        <div className="border-t border-border bg-white">
          <div className="p-6 space-y-4">
            {/* Order Totals */}
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Subtotal</span>
                <span className="text-foreground">${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Tax & Fees</span>
                <span className="text-foreground">${tax.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-lg font-semibold pt-2 border-t border-border">
                <span className="text-foreground">Total</span>
                <span className="text-foreground">${total.toFixed(2)}</span>
              </div>
            </div>

            {/* Points Info */}
            <div className="bg-muted/50 rounded-lg p-3">
              <p className="text-sm text-muted-foreground">
                You'll earn <span className="font-semibold text-foreground">{points} points</span> with this order
              </p>
            </div>

            {/* Checkout Button */}
            <Button 
              size="lg" 
              className="w-full bg-primary text-primary-foreground hover:bg-primary/90 font-semibold"
            >
              Next: Checkout
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}

export default function OrderSidebar({ className, isOpen, onToggle }: OrderSidebarProps) {
  return (
    <>
      {/* Desktop Sidebar */}
      <div className={`hidden lg:block ${className}`}>
        <div className="w-96 h-full border-l border-border bg-white">
          <OrderSidebarContent />
        </div>
      </div>

      {/* Mobile Sheet */}
      <div className="lg:hidden">
        <Sheet open={isOpen} onOpenChange={onToggle}>
          <SheetContent side="bottom" className="h-[90vh] p-0">
            <div className="relative h-full">
              <Button
                variant="ghost"
                size="sm"
                onClick={onToggle}
                className="absolute top-4 right-4 z-10 h-8 w-8 p-0"
              >
                <X className="h-4 w-4" />
              </Button>
              <OrderSidebarContent />
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </>
  );
}