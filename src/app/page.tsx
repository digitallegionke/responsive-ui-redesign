"use client";

import { useState } from 'react';
import { ShoppingCart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import StoreHeader from '@/components/store-header';
import ProductCatalog from '@/components/product-catalog';
import OrderSidebar from '@/components/order-sidebar';

export default function Page() {
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  const toggleMobileSidebar = () => {
    setIsMobileSidebarOpen(!isMobileSidebarOpen);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Mobile Cart Button */}
      <div className="lg:hidden fixed bottom-4 right-4 z-40">
        <Button 
          onClick={toggleMobileSidebar}
          className="bg-black text-white hover:bg-gray-800 rounded-full w-14 h-14 p-0 shadow-lg"
        >
          <ShoppingCart className="h-6 w-6" />
        </Button>
      </div>

      <div className="flex min-h-screen">
        {/* Main Content Area */}
        <div className="flex-1 lg:mr-96">
          {/* Store Header */}
          <StoreHeader />
          
          {/* Product Catalog */}
          <div className="pb-20 lg:pb-0">
            <ProductCatalog />
          </div>
        </div>

        {/* Order Sidebar */}
        <OrderSidebar 
          className="fixed top-0 right-0 h-full"
          isOpen={isMobileSidebarOpen}
          onToggle={toggleMobileSidebar}
        />
      </div>
    </div>
  );
}