import { useState } from "react";
import ProductFilterBar from "@/components/ProductFilterBar";
import { ProductTable } from "@/components/ProductTable";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ChevronDown, ChevronUp } from "lucide-react";

export default function Products() {
  const [filters, setFilters] = useState({});
  const [showFilters, setShowFilters] = useState(false);
  const [search, setSearch] = useState("");

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearch(value);
    setFilters({ ...filters, search: value });
  };

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header */}
      <div className="space-y-2">
        <h1 className="text-2xl md:text-3xl font-bold text-white tracking-tight flex items-center gap-4 animate-fade-in-up"><span>Products</span></h1>
        <p className="text-muted-foreground">
          Manage your product catalog and inventory.
        </p>
      </div>

      {/* Top Bar: Search (left) + Filter Toggle (right) */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <Input
          placeholder="Search by name, SKU, etc."
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="w-64"
        />

        <Button
          variant="outline"
          onClick={() => setShowFilters(!showFilters)}
          className="flex items-center gap-1"
        >
          {showFilters ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
          {showFilters ? "Hide Filters" : "Show Filters"}
        </Button>
      </div>

      {/* Filters */}
      {showFilters && <ProductFilterBar onFilter={setFilters} />}

      {/* Table */}
      <ProductTable filters={filters} />
    </div>
  );
}
