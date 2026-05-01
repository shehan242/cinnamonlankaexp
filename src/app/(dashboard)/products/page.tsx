
'use client';

import { useState } from 'react';
import { useAppStore, Product } from '@/lib/store';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { 
  Package, 
  Search, 
  Plus, 
  AlertTriangle, 
  Filter,
  MoreVertical,
  Layers,
  BarChart2
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import { Progress } from '@/components/ui/progress';

export default function ProductsPage() {
  const { products, companySettings } = useAppStore();
  const [searchTerm, setSearchTerm] = useState('');

  const isLKR = companySettings.currency === 'LKR';
  const currencySymbol = isLKR ? 'Rs. ' : '$';

  const filteredProducts = products.filter(p => 
    p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.sku.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-primary">Product Inventory</h1>
          <p className="text-muted-foreground">Real-time stock monitoring and price management.</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="gap-2">
            <Layers className="w-4 h-4" />
            Categories
          </Button>
          <Button className="gap-2 shadow-md">
            <Plus className="w-4 h-4" />
            New Product
          </Button>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input 
            placeholder="Search SKU or Name..." 
            className="pl-10 h-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <Button variant="outline" className="gap-2">
          <Filter className="w-4 h-4" />
          Filters
        </Button>
      </div>

      <Card className="border-none shadow-sm overflow-hidden">
        <CardHeader className="bg-muted/10 border-b">
          <CardTitle className="text-lg flex items-center gap-2">
            <BarChart2 className="w-5 h-5 text-primary" />
            Stock Inventory List
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow className="bg-muted/30">
                <TableHead className="w-[80px]">Image</TableHead>
                <TableHead>Product Name</TableHead>
                <TableHead>Product Code (SKU)</TableHead>
                <TableHead>Stock Units</TableHead>
                <TableHead>Stock Percentage</TableHead>
                <TableHead className="text-right">Price ({companySettings.currency})</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredProducts.map((product) => {
                const stockPercentage = (product.stock / product.maxStockCapacity) * 100;
                const isLowStock = product.stock <= product.lowStockThreshold;
                const displayPrice = isLKR ? product.priceLKR : product.priceUSD;
                
                return (
                  <TableRow key={product.id} className="hover:bg-muted/10">
                    <TableCell>
                      <div className="w-12 h-12 relative rounded-md overflow-hidden border bg-muted">
                        <Image 
                          src={product.image} 
                          alt={product.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-col">
                        <span className="font-bold text-sm">{product.name}</span>
                        <Badge variant="outline" className="w-fit text-[10px] mt-1 uppercase opacity-70">
                          {product.category}
                        </Badge>
                      </div>
                    </TableCell>
                    <TableCell>
                      <span className="font-mono text-xs text-muted-foreground">{product.sku}</span>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <span className={cn(
                          "font-bold",
                          isLowStock ? "text-accent" : "text-foreground"
                        )}>
                          {product.stock}
                        </span>
                        {isLowStock && <AlertTriangle className="w-3 h-3 text-accent" />}
                      </div>
                    </TableCell>
                    <TableCell className="min-w-[200px]">
                      <div className="space-y-1.5">
                        <div className="flex justify-between text-[10px] font-medium text-muted-foreground uppercase">
                          <span>Usage</span>
                          <span>{Math.round(stockPercentage)}%</span>
                        </div>
                        <Progress 
                          value={stockPercentage} 
                          className={cn(
                            "h-1.5",
                            stockPercentage < 20 ? "bg-accent/20" : "bg-primary/20"
                          )} 
                        />
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex flex-col items-end">
                        <span className="font-bold text-primary">{currencySymbol}{displayPrice.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                        <span className="text-[10px] text-muted-foreground">
                          {isLKR ? `$${product.priceUSD.toFixed(2)}` : `Rs. ${product.priceLKR.toLocaleString()}`}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <MoreVertical className="w-4 h-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                );
              })}
              {filteredProducts.length === 0 && (
                <TableRow>
                  <TableCell colSpan={7} className="h-32 text-center text-muted-foreground italic">
                    No products found.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
