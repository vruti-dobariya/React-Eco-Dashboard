import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Package, Upload, X, Save } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

const productSchema = z.object({
  name: z.string().min(1, "Product name is required"),
  category: z.string().min(1, "Category is required"),
  price: z.number().min(0, "Price must be positive"),
  stock: z.number().min(0, "Stock must be positive"),
  status: z.enum(["active", "inactive", "out-of-stock"]),
  description: z.string().optional(),
})

type ProductFormData = z.infer<typeof productSchema>

export interface Product {
  id: string
  name: string
  category: string
  price: number
  stock: number
  status: "active" | "inactive" | "out-of-stock"
  image: string
  description?: string
}

interface ProductFormProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  product?: Product | null
  onSubmit: (data: ProductFormData) => void
}

const categories = [
  "Electronics",
  "Clothing", 
  "Home",
  "Sports",
  "Books",
  "Health",
  "Beauty",
  "Automotive"
]

export function ProductForm({ open, onOpenChange, product, onSubmit }: ProductFormProps) {
  const [selectedImage, setSelectedImage] = useState<string | null>(null)
  
  const form = useForm<ProductFormData>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      name: product?.name || "",
      category: product?.category || "",
      price: product?.price || 0,
      stock: product?.stock || 0,
      status: product?.status || "active",
      description: product?.description || "",
    }
  })

  const handleSubmit = (data: ProductFormData) => {
    onSubmit(data)
    form.reset()
    setSelectedImage(null)
    onOpenChange(false)
  }

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        setSelectedImage(e.target?.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto bg-card border-border/50 backdrop-blur-sm">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-foreground">
            <Package className="h-5 w-5 text-primary" />
            {product ? "Edit Product" : "Add New Product"}
          </DialogTitle>
          <DialogDescription className="text-muted-foreground">
            {product ? "Update product details" : "Create a new product for your inventory"}
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
            {/* Image Upload Section */}
            <div className="space-y-4">
              <Label className="text-sm font-medium text-foreground">Product Image</Label>
              <div className="border-2 border-dashed border-border/50 rounded-lg p-6 hover:border-primary/50 transition-colors">
                {selectedImage || product?.image ? (
                  <div className="relative">
                    <img 
                      src={selectedImage || product?.image} 
                      alt="Product preview"
                      className="w-full h-48 object-cover rounded-lg"
                    />
                    <Button
                      type="button"
                      variant="destructive"
                      size="sm"
                      className="absolute top-2 right-2"
                      onClick={() => setSelectedImage(null)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ) : (
                  <div className="text-center">
                    <Upload className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                    <div className="space-y-2">
                      <p className="text-sm text-muted-foreground">
                        Click to upload or drag and drop
                      </p>
                      <p className="text-xs text-muted-foreground">
                        PNG, JPG, GIF up to 10MB
                      </p>
                    </div>
                  </div>
                )}
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Product Name */}
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-foreground">Product Name</FormLabel>
                    <FormControl>
                      <Input 
                        placeholder="Enter product name" 
                        className="bg-background border-border/50 focus:border-primary"
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Category */}
              <FormField
                control={form.control}
                name="category"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-foreground">Category</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger className="bg-background border-border/50 focus:border-primary">
                          <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent className="bg-popover border-border/50">
                        {categories.map((category) => (
                          <SelectItem key={category} value={category}>
                            {category}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Price */}
              <FormField
                control={form.control}
                name="price"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-foreground">Price ($)</FormLabel>
                    <FormControl>
                      <Input 
                        type="number" 
                        step="0.01"
                        placeholder="0.00" 
                        className="bg-background border-border/50 focus:border-primary"
                        {...field}
                        onChange={(e) => field.onChange(parseFloat(e.target.value) || 0)}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Stock */}
              <FormField
                control={form.control}
                name="stock"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-foreground">Stock Quantity</FormLabel>
                    <FormControl>
                      <Input 
                        type="number" 
                        placeholder="0" 
                        className="bg-background border-border/50 focus:border-primary"
                        {...field}
                        onChange={(e) => field.onChange(parseInt(e.target.value) || 0)}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Status */}
            <FormField
              control={form.control}
              name="status"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-foreground">Status</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger className="bg-background border-border/50 focus:border-primary">
                        <SelectValue placeholder="Select status" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent className="bg-popover border-border/50">
                      <SelectItem value="active">
                        <div className="flex items-center gap-2">
                          <Badge variant="default" className="bg-success text-success-foreground">
                            Active
                          </Badge>
                        </div>
                      </SelectItem>
                      <SelectItem value="inactive">
                        <div className="flex items-center gap-2">
                          <Badge variant="secondary" className="bg-warning text-warning-foreground">
                            Inactive
                          </Badge>
                        </div>
                      </SelectItem>
                      <SelectItem value="out-of-stock">
                        <div className="flex items-center gap-2">
                          <Badge variant="destructive">
                            Out of Stock
                          </Badge>
                        </div>
                      </SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Description */}
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-foreground">Description</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="Enter product description (optional)" 
                      className="bg-background border-border/50 focus:border-primary min-h-[100px]"
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Form Actions */}
            <div className="flex justify-end gap-3 pt-6 border-t border-border/50">
              <Button
                type="button"
                variant="outline"
                onClick={() => onOpenChange(false)}
                className="border-border/50 hover:bg-accent"
              >
                Cancel
              </Button>
              <Button 
                type="submit"
                className="bg-admin-gradient hover:shadow-glow transition-all duration-300"
              >
                <Save className="mr-2 h-4 w-4" />
                {product ? "Update Product" : "Create Product"}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}