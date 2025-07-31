import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

type Category = {
  id: number;
  name: string;
  enabled: boolean;
  includeInMenu: boolean;
  image?: string;
  description?: string;
  urlKey?: string;
  metaTitle?: string;
  metaKeywords?: string;
  metaDescription?: string;
  children: Category[];
};

let idCounter = 1000;

const initialCategories: Category[] = [];

function renderTree(
  categories: Category[],
  selectedId: number | null,
  onSelect: (id: number) => void,
  onDelete: (cat: Category) => void
) {
  return (
    <ul className="pl-4">
      {categories.map((cat) => (
        <li key={cat.id}>
          <div
            className={`cursor-pointer flex justify-between px-2 py-1 rounded ${
              selectedId === cat.id
                ? "bg-admin-gradient text-white"
                : "hover:bg-accent"
            }`}
            onClick={() => onSelect(cat.id)}
          >
            <span>{cat.name}</span>
            <span
              className="text-destructive ml-2 cursor-pointer"
              onClick={e => {
                e.stopPropagation();
                onDelete(cat);
              }}
            >
              delete
            </span>
          </div>
          {cat.children && cat.children.length > 0 &&
            renderTree(cat.children, selectedId, onSelect, onDelete)}
        </li>
      ))}
    </ul>
  );
}

// Helper to update a category in the tree
function updateCategory(
  categories: Category[],
  id: number,
  updater: (cat: Category) => void
): Category[] {
  return categories.map((cat) => {
    if (cat.id === id) {
      const updated = { ...cat };
      updater(updated);
      return updated;
    }
    if (cat.children) {
      return { ...cat, children: updateCategory(cat.children, id, updater) };
    }
    return cat;
  });
}

// Helper to add a subcategory
function addSubcategory(
  categories: Category[],
  parentId: number,
  sub: Category
): Category[] {
  return categories.map((cat) => {
    if (cat.id === parentId) {
      return { ...cat, children: [...cat.children, sub] };
    }
    if (cat.children) {
      return { ...cat, children: addSubcategory(cat.children, parentId, sub) };
    }
    return cat;
  });
}

function deleteCategory(categories: Category[], id: number): Category[] {
  return categories
    .filter(cat => cat.id !== id)
    .map(cat => ({
      ...cat,
      children: deleteCategory(cat.children, id)
    }));
}

function findCategoryById(categories: Category[], id: number | null): Category | null {
  for (const cat of categories) {
    if (cat.id === id) return cat;
    if (cat.children) {
      const found = findCategoryById(cat.children, id);
      if (found) return found;
    }
  }
  return null;
}

export default function ProductCategory() {
  const [categories, setCategories] = useState<Category[]>(initialCategories);
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [imagePreview, setImagePreview] = useState<string | undefined>();

  // Load categories from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem("categories");
    if (stored) {
      setCategories(JSON.parse(stored));
    }
  }, []);

  // Save categories to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("categories", JSON.stringify(categories));
  }, [categories]);

  // Set the first root category as selected by default
  useEffect(() => {
    if (!selectedId && categories.length > 0) {
      setSelectedId(categories[0].id);
    }
  }, [categories, selectedId]);

  // Add Root Category
  const handleAddRoot = () => {
    const newCat: Category = {
      id: ++idCounter,
      name: "New Root Category",
      enabled: true,
      includeInMenu: true,
      children: [],
    };
    setCategories((prev) => [...prev, newCat]);
    setSelectedId(newCat.id);
    setImagePreview(undefined);
  };

  // Add Subcategory
  const handleAddSub = () => {
    if (!selectedId) return;
    const newCat: Category = {
      id: ++idCounter,
      name: "New Subcategory",
      enabled: true,
      includeInMenu: true,
      children: [],
    };
    setCategories((prev) => addSubcategory(prev, selectedId, newCat));
    setSelectedId(newCat.id);
    setImagePreview(undefined);
  };

  // Handle form change
  const handleFormChange = (field: keyof Category, value: any) => {
    if (!selectedId) return;
    setCategories((prev) =>
      updateCategory(prev, selectedId, (cat) => {
        (cat as any)[field] = value;
      })
    );
    const selectedCategory = findCategoryById(categories, selectedId);
    if (selectedCategory) {
      setSelectedId(selectedId); // Keep the selected category highlighted
    }
  };

  // Handle image upload
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (ev) => {
        handleFormChange("image", ev.target?.result as string);
        setImagePreview(ev.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDelete = (cat: Category) => {
    setCategories(prev => deleteCategory(prev, cat.id));
    if (selectedId === cat.id) {
      setSelectedId(null);
    }
  };

  return (
    <div className="relative min-h-screen bg-black overflow-x-hidden">
      {/* Page Title */}
      <div className="pb-6 ">
        <h1 className="text-2xl md:text-3xl font-bold text-white tracking-tight flex items-center gap-4 animate-fade-in-up">
          <span>Product Categories</span>
        </h1>
        <p className="text-muted-foreground mt-2 text-base md:text-lg">
          Manage your product categories and organize your catalog.
        </p>
      </div>
      {/* Main content flex */}
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Category Tree */}
        <Card className="border border-border/50 shadow-admin lg:w-1/3 lg:min-w-[250px] w-full p-4 ">
          <div className="flex gap-2 mb-4">
            <Button size="sm" variant="outline" onClick={handleAddRoot}>
              Add Root Category
            </Button>
            <Button
              size="sm"
              variant="outline"
              disabled={!selectedId}
              onClick={handleAddSub}
            >
              Add Subcategory
            </Button>
          </div>
          <div>
            {renderTree(categories, selectedId, setSelectedId, handleDelete)}
          </div>
        </Card>
        {/* Category Details */}
        <Card className="border border-border/50 shadow-admin flex-1 p-6">
          {categories.length === 0 ? (
            <div className="text-muted-foreground text-center mt-16">
              No categories yet.<br />
              <Button className="mt-4" onClick={handleAddRoot}>Add Root Category</Button>
            </div>
          ) : findCategoryById(categories, selectedId) ? (
            <form
              className="space-y-6"
              onSubmit={(e) => {
                e.preventDefault();
                // Save logic here if needed
              }}
            >
              <div className="flex items-center gap-4">
                <Label htmlFor="categoryName" className="text-foreground">
                  Category Name
                </Label>
                <Input
                  id="categoryName"
                  value={findCategoryById(categories, selectedId)?.name || ""}
                  onChange={(e) => handleFormChange("name", e.target.value)}
                  className="w-1/2"
                  required
                />
              </div>
              <div className="flex items-center gap-8">
                <div>
                  <Label className="mr-2">Enable Category</Label>
                  <input
                    type="checkbox"
                    checked={findCategoryById(categories, selectedId)?.enabled || false}
                    onChange={(e) => handleFormChange("enabled", e.target.checked)}
                    className="scale-125 accent-primary"
                  />
                </div>
                <div>
                  <Label className="mr-2">Include in Menu</Label>
                  <input
                    type="checkbox"
                    checked={findCategoryById(categories, selectedId)?.includeInMenu || false}
                    onChange={(e) =>
                      handleFormChange("includeInMenu", e.target.checked)
                    }
                    className="scale-125 accent-primary"
                  />
                </div>
              </div>
              <div>
                <Label>ChildCategory image</Label>
                <div className="mt-2 flex items-center gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    type="button"
                    onClick={() => {
                      const input = document.getElementById(
                        "cat-image-upload"
                      ) as HTMLInputElement;
                      input?.click();
                    }}
                  >
                    Upload
                  </Button>
                  <input
                    id="cat-image-upload"
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleImageUpload}
                  />
                  {/* Gallery button can be implemented as needed */}
                  <Button size="sm" variant="outline" type="button" disabled>
                    Select from Gallery
                  </Button>
                </div>
                <div className="mt-4 border-2 border-dashed rounded-lg p-6 text-center text-muted-foreground">
                  {findCategoryById(categories, selectedId)?.image || imagePreview ? (
                    <img
                      src={findCategoryById(categories, selectedId)?.image || imagePreview}
                      alt="Category"
                      className="mx-auto h-24 object-contain"
                    />
                  ) : (
                    <span>Browse to find or drag image here</span>
                  )}
                </div>
                <div className="text-xs text-muted-foreground mt-2">
                  Maximum file size: 4 MB. Allowed file types: JPG, GIF, PNG, SVG, WEBP.
                </div>
              </div>
              <div>
                <Label htmlFor="description" className="text-foreground mb-2 block">
                  Description
                </Label>
                <Textarea
                  id="description"
                  value={findCategoryById(categories, selectedId)?.description || ""}
                  onChange={(e) => handleFormChange("description", e.target.value)}
                  placeholder="Enter category description"
                  className="min-h-[80px] space-y-2"
                />
              </div>
              <div className="pt-4 border-t border-border/50">
                <h3 className="font-semibold mb-4 text-foreground">
                  Search Engine Optimization
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="urlKey" className="text-foreground mb-2 block">
                      URL Key
                    </Label>
                    <Input
                      id="urlKey"
                      value={findCategoryById(categories, selectedId)?.urlKey || ""}
                      onChange={(e) => handleFormChange("urlKey", e.target.value)}
                      placeholder="category-url-key"
                    />
                  </div>
                  <div>
                    <Label htmlFor="metaTitle" className="text-foreground mb-2 block">
                      Meta Title
                    </Label>
                    <Input
                      id="metaTitle"
                      value={findCategoryById(categories, selectedId)?.metaTitle || ""}
                      onChange={(e) =>
                        handleFormChange("metaTitle", e.target.value)
                      }
                      placeholder="Meta Title"
                    />
                  </div>
                  <div>
                    <Label htmlFor="metaKeywords" className="text-foreground mb-2 block">
                      Meta Keywords
                    </Label>
                    <Input
                      id="metaKeywords"
                      value={findCategoryById(categories, selectedId)?.metaKeywords || ""}
                      onChange={(e) =>
                        handleFormChange("metaKeywords", e.target.value)
                      }
                      placeholder="Meta Keywords"
                    />
                  </div>
                  <div>
                    <Label htmlFor="metaDescription" className="text-foreground mb-2 block">
                      Meta Description
                    </Label>
                    <Textarea
                      id="metaDescription"
                      value={findCategoryById(categories, selectedId)?.metaDescription || ""}
                      onChange={(e) =>
                        handleFormChange("metaDescription", e.target.value)
                      }
                      placeholder="Meta Description"
                      className="min-h-[60px]"
                    />
                  </div>
                </div>
              </div>
              <Button className="bg-admin-gradient">Save Category</Button>
            </form>
          ) : (
            <div className="text-muted-foreground text-center mt-16">
              Select a category to view details
            </div>
          )}
        </Card>
      </div>
      <style>{`
        @keyframes underline {
          0% { width: 0; }
          100% { width: 6rem; }
        }
        .animate-underline {
          animation: underline 1s cubic-bezier(.4,0,.2,1) both;
        }
        @media (min-width: 768px) {
          .animate-underline {
            animation: underline 1s cubic-bezier(.4,0,.2,1) both;
            width: 10rem;
          }
        }
        @keyframes fade-in-up {
          0% { opacity: 0; transform: translateY(20px);}
          100% { opacity: 1; transform: translateY(0);}
        }
        .animate-fade-in-up { animation: fade-in-up 0.7s cubic-bezier(.4,0,.2,1) both; }
      `}</style>
    </div>
  );
}
