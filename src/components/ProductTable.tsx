import { useState, useEffect } from "react"
import { Edit, Trash2, Eye, MoreHorizontal, Package, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { ProductForm, Product } from "./ProductForm"
import { cn } from "@/lib/utils"
import { toast } from "@/hooks/use-toast"

const initialProducts: Product[] = [
  {
    id: "1",
    name: "Wireless Headphones Pro",
    category: "Electronics",
    price: 299.99,
    stock: 45,
    status: "active",
    image: "/placeholder.svg",
    description: "High-quality wireless headphones with noise cancellation"
  },
  {
    id: "2", 
    name: "Organic Cotton T-Shirt",
    category: "Clothing",
    price: 29.99,
    stock: 120,
    status: "active",
    image: "/placeholder.svg",
    description: "Comfortable organic cotton t-shirt"
  },
  {
    id: "3",
    name: "Smart Watch Series X",
    category: "Electronics", 
    price: 399.99,
    stock: 0,
    status: "out-of-stock",
    image: "/placeholder.svg",
    description: "Advanced smartwatch with health monitoring"
  },
  {
    id: "4",
    name: "Yoga Mat Premium",
    category: "Sports",
    price: 59.99,
    stock: 30,
    status: "active",
    image: "/placeholder.svg",
    description: "Non-slip premium yoga mat"
  },
  {
    id: "5",
    name: "Coffee Maker Deluxe",
    category: "Home",
    price: 149.99,
    stock: 15,
    status: "inactive",
    image: "/placeholder.svg",
    description: "Automatic coffee maker with timer"
  }
]

export function ProductTable() {
  const [products, setProducts] = useState<Product[]>(initialProducts)
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)
  const [deleteProduct, setDeleteProduct] = useState<Product | null>(null)
  const [perPage, setPerPage] = useState(20);
  const [page, setPage] = useState(1);

  useEffect(() => {
    const stored = localStorage.getItem("products");
    if (stored) {
      setProducts(JSON.parse(stored));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("products", JSON.stringify(products));
  }, [products]);

  const handleAddProduct = (data: any) => {
    const newProduct: Product = {
      id: Date.now().toString(),
      ...data,
      image: "/placeholder.svg"
    }
    setProducts(prev => [newProduct, ...prev])
    toast({
      title: "Success",
      description: "Product added successfully",
    })
  }

  const handleEditProduct = (data: any) => {
    if (!selectedProduct) return
    
    setProducts(prev => prev.map(product => 
      product.id === selectedProduct.id 
        ? { ...product, ...data }
        : product
    ))
    setSelectedProduct(null)
    toast({
      title: "Success", 
      description: "Product updated successfully",
    })
  }

  const handleDeleteProduct = (productToDelete: Product) => {
    setProducts(prev => prev.filter(product => product.id !== productToDelete.id))
    setDeleteProduct(null)
    toast({
      title: "Success",
      description: "Product deleted successfully",
    })
  }

  const openEditForm = (product: Product) => {
    setSelectedProduct(product)
    setIsFormOpen(true)
  }

  const openAddForm = () => {
    setSelectedProduct(null)
    setIsFormOpen(true)
  }

  const getStatusBadge = (status: Product["status"]) => {
    switch (status) {
      case "active":
        return (
          <Badge variant="default" className="bg-success text-success-foreground">
            Active
          </Badge>
        )
      case "inactive":
        return (
          <Badge variant="secondary" className="bg-warning text-warning-foreground">
            Inactive
          </Badge>
        )
      case "out-of-stock":
        return (
          <Badge variant="destructive">
            Out of Stock
          </Badge>
        )
    }
  }

  const getStockStatus = (stock: number) => {
    if (stock === 0) return "text-destructive"
    if (stock < 20) return "text-warning" 
    return "text-success"
  }

  const total = products.length;
  const totalPages = Math.max(1, Math.ceil(total / perPage));
  const paginated = products.slice((page - 1) * perPage, page * perPage);

  return (
    <>
      <div className="rounded-xl border border-border/50 bg-card/50 backdrop-blur-sm overflow-hidden shadow-admin animate-fade-in">

        <div className="p-6 border-b border-border/50">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold text-foreground">Products</h3>
              <p className="text-sm text-muted-foreground mt-1">
                Manage your product inventory and details
              </p>
            </div>
            <Button 
              onClick={openAddForm}
              className="bg-admin-gradient hover:shadow-glow transition-all duration-300 transform hover:scale-105"
            >
              <Plus className="mr-2 h-4 w-4" />
              Add Product
            </Button>
          </div>
        </div>

        <Table>
          <TableHeader>
            <TableRow className="border-border/50 hover:bg-accent/30">
              <TableHead className="text-muted-foreground font-medium">Product</TableHead>
              <TableHead className="text-muted-foreground font-medium">Category</TableHead>
              <TableHead className="text-muted-foreground font-medium">Price</TableHead>
              <TableHead className="text-muted-foreground font-medium">Stock</TableHead>
              <TableHead className="text-muted-foreground font-medium">Status</TableHead>
              <TableHead className="text-muted-foreground font-medium text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginated.map((product, index) => (
              <TableRow 
                key={product.id} 
                className="border-border/50 hover:bg-accent/30 transition-all duration-200 group"
                style={{ 
                  animationDelay: `${index * 100}ms`,
                  animation: "fade-in 0.5s ease-out forwards"
                }}
              >
                <TableCell>
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-lg bg-admin-gradient-subtle flex items-center justify-center border border-border/50">
                      <Package className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium text-foreground group-hover:text-primary transition-colors">
                        {product.name}
                      </p>
                      <p className="text-sm text-muted-foreground">ID: {product.id}</p>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <span className="text-sm text-muted-foreground">
                    {product.category}
                  </span>
                </TableCell>
                <TableCell>
                  <span className="font-medium text-foreground">
                    ${product.price.toFixed(2)}
                  </span>
                </TableCell>
                <TableCell>
                  <span className={cn("font-medium", getStockStatus(product.stock))}>
                    {product.stock}
                  </span>
                </TableCell>
                <TableCell>
                  {getStatusBadge(product.status)}
                </TableCell>
                <TableCell className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="h-8 w-8 p-0 hover:bg-accent opacity-0 group-hover:opacity-100 transition-all duration-200"
                      >
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="bg-popover border-border/50 backdrop-blur-sm">
                      <DropdownMenuItem 
                        className="hover:bg-accent cursor-pointer"
                        onClick={() => {
                          toast({
                            title: "View Details",
                            description: `Viewing details for ${product.name}`,
                          })
                        }}
                      >
                        <Eye className="mr-2 h-4 w-4" />
                        View Details
                      </DropdownMenuItem>
                      <DropdownMenuItem 
                        className="hover:bg-accent cursor-pointer"
                        onClick={() => openEditForm(product)}
                      >
                        <Edit className="mr-2 h-4 w-4" />
                        Edit Product
                      </DropdownMenuItem>
                      <DropdownMenuSeparator className="bg-border/50" />
                      <DropdownMenuItem 
                        className="hover:bg-destructive/10 text-destructive cursor-pointer"
                        onClick={() => setDeleteProduct(product)}
                      >
                        <Trash2 className="mr-2 h-4 w-4" />
                        Delete Product
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        <div className="p-4 border border-border/50 flex items-center justify-between mt-4">
          <div>
            <span>{total} records found</span>
          </div>
          <div className="flex items-center gap-2">
            <span>
              <select
                className="border rounded px-2 py-1 text-black"
                value={perPage}
                onChange={e => {
                  setPerPage(Number(e.target.value));
                  setPage(1); // Reset to first page on perPage change
                }}
              >
                <option value={10}>10</option>
                <option value={20}>20</option>
                <option value={30}>30</option>
              </select>
              <span className="ml-2">per page</span>
            </span>
            <Button
              size="sm"
              variant="outline"
              disabled={page === 1}
              onClick={() => setPage(page - 1)}
            >
              &lt;
            </Button>
            <span>
              {page} of {totalPages}
            </span>
            <Button
              size="sm"
              variant="outline"
              disabled={page === totalPages}
              onClick={() => setPage(page + 1)}
            >
              &gt;
            </Button>
          </div>
        </div>

        {products.length === 0 && (
          <div className="text-center py-12">
            <Package className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
            <h3 className="text-lg font-medium text-foreground mb-2">No products found</h3>
            <p className="text-sm text-muted-foreground mb-6">
              Get started by adding your first product
            </p>
            <Button 
              onClick={openAddForm}
              className="bg-admin-gradient hover:shadow-glow transition-all duration-300"
            >
              <Plus className="mr-2 h-4 w-4" />
              Add Your First Product
            </Button>
          </div>
        )}
      </div>

      {/* Product Form Dialog */}
      <ProductForm
        open={isFormOpen}
        onOpenChange={setIsFormOpen}
        product={selectedProduct}
        onSubmit={selectedProduct ? handleEditProduct : handleAddProduct}
      />

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={!!deleteProduct} onOpenChange={() => setDeleteProduct(null)}>
        <AlertDialogContent className="bg-card border-border/50 backdrop-blur-sm">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-foreground">Delete Product</AlertDialogTitle>
            <AlertDialogDescription className="text-muted-foreground">
              Are you sure you want to delete "{deleteProduct?.name}"? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="border-border/50 hover:bg-accent">
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction 
              onClick={() => deleteProduct && handleDeleteProduct(deleteProduct)}
              className="bg-destructive hover:bg-destructive/90 text-destructive-foreground"
            >
              Delete Product
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}