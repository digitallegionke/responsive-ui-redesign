"use client";

import React, { useState, useMemo } from 'react';
import { Search, ShoppingCart } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
}

interface ProductCatalogProps {
  className?: string;
}

const categories = [
  'All Items',
  'Appetizers', 
  'Main Courses',
  'Desserts',
  'Beverages',
  'Specials'
];

const mockProducts: Product[] = [
  {
    id: '1',
    name: 'Grilled Salmon',
    description: 'Fresh Atlantic salmon with lemon herbs and seasonal vegetables',
    price: 24.99,
    image: 'https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=400&h=300&fit=crop',
    category: 'Main Courses'
  },
  {
    id: '2',
    name: 'Caesar Salad',
    description: 'Crisp romaine lettuce with parmesan, croutons, and classic dressing',
    price: 12.99,
    image: 'https://images.unsplash.com/photo-1546793665-c74683f339c1?w=400&h=300&fit=crop',
    category: 'Appetizers'
  },
  {
    id: '3',
    name: 'Chocolate Cake',
    description: 'Rich chocolate layer cake with ganache and fresh berries',
    price: 8.99,
    image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=400&h=300&fit=crop',
    category: 'Desserts'
  },
  {
    id: '4',
    name: 'Margherita Pizza',
    description: 'Classic pizza with fresh mozzarella, tomatoes, and basil',
    price: 16.99,
    image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=400&h=300&fit=crop',
    category: 'Main Courses'
  },
  {
    id: '5',
    name: 'Craft Beer',
    description: 'Local IPA with citrus notes and hoppy finish',
    price: 6.99,
    image: 'https://images.unsplash.com/photo-1608270586620-248524c67de9?w=400&h=300&fit=crop',
    category: 'Beverages'
  },
  {
    id: '6',
    name: 'Truffle Pasta',
    description: 'Handmade pasta with truffle oil, parmesan, and wild mushrooms',
    price: 28.99,
    image: 'https://images.unsplash.com/photo-1621996346565-e3dbc353d2e5?w=400&h=300&fit=crop',
    category: 'Specials'
  },
  {
    id: '7',
    name: 'Bruschetta',
    description: 'Toasted bread with fresh tomatoes, basil, and balsamic glaze',
    price: 9.99,
    image: 'https://images.unsplash.com/photo-1572441713132-51c75654db73?w=400&h=300&fit=crop',
    category: 'Appetizers'
  },
  {
    id: '8',
    name: 'Tiramisu',
    description: 'Traditional Italian dessert with coffee-soaked ladyfingers',
    price: 7.99,
    image: 'https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=400&h=300&fit=crop',
    category: 'Desserts'
  },
  {
    id: '9',
    name: 'Fresh Juice',
    description: 'Daily selection of freshly squeezed seasonal fruit juices',
    price: 4.99,
    image: 'https://images.unsplash.com/photo-1613478223719-2ab802602423?w=400&h=300&fit=crop',
    category: 'Beverages'
  }
];

export default function ProductCatalog({ className = '' }: ProductCatalogProps) {
  const [selectedCategory, setSelectedCategory] = useState('All Items');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredProducts = useMemo(() => {
    return mockProducts.filter(product => {
      const matchesCategory = selectedCategory === 'All Items' || product.category === selectedCategory;
      const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           product.description.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  const handleAddToCart = (product: Product) => {
    // This would integrate with cart functionality
    console.log('Adding to cart:', product);
  };

  return (
    <div className={`w-full ${className}`}>
      {/* Navigation Bar */}
      <div className="bg-black p-4 mb-6">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
          {/* Category Buttons */}
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? "secondary" : "ghost"}
                size="sm"
                onClick={() => setSelectedCategory(category)}
                className={`text-white hover:text-black hover:bg-white transition-colors ${
                  selectedCategory === category 
                    ? 'bg-white text-black' 
                    : 'bg-transparent border-white/20 border'
                }`}
              >
                {category}
              </Button>
            ))}
          </div>

          {/* Search Input */}
          <div className="relative w-full lg:w-80">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 bg-white border-white/20"
            />
          </div>
        </div>
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-4">
        {filteredProducts.map((product) => (
          <Card key={product.id} className="group hover:shadow-xl transition-all duration-300 overflow-hidden border-0 bg-white rounded-xl">
            <div className="relative aspect-[4/3] overflow-hidden rounded-t-xl">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="bg-white/90 backdrop-blur-sm rounded-full p-2">
                  <ShoppingCart className="h-4 w-4 text-gray-700" />
                </div>
              </div>
            </div>
            <CardContent className="p-5">
              <div className="space-y-4">
                <div>
                  <h3 className="font-bold text-xl text-foreground line-clamp-1 mb-2">
                    {product.name}
                  </h3>
                  <p className="text-muted-foreground text-sm line-clamp-2 leading-relaxed">
                    {product.description}
                  </p>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex flex-col">
                    <span className="text-2xl font-bold text-foreground">
                      ${product.price.toFixed(2)}
                    </span>
                    <span className="text-xs text-muted-foreground uppercase tracking-wide">
                      {product.category}
                    </span>
                  </div>
                  <Button
                    size="default"
                    onClick={() => handleAddToCart(product)}
                    className="bg-black text-white hover:bg-gray-900 transition-all duration-200 rounded-lg px-6 py-2.5 font-medium shadow-lg hover:shadow-xl hover:scale-105"
                  >
                    <ShoppingCart className="h-4 w-4 mr-2" />
                    Add to Cart
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* No Results State */}
      {filteredProducts.length === 0 && (
        <div className="text-center py-12 px-4">
          <div className="text-muted-foreground text-lg mb-2">
            No products found
          </div>
          <p className="text-sm text-muted-foreground">
            Try adjusting your search or category filter
          </p>
        </div>
      )}
    </div>
  );
}