// File: components/ProductFilterBar.tsx
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";

export default function ProductFilterBar({ onFilter }: { onFilter: (filters: any) => void }) {
  const [filters, setFilters] = useState<any>({
    idFrom: "",
    idTo: "",
    priceFrom: "",
    priceTo: "",
    qtyFrom: "",
    qtyTo: "",
    updatedFrom: "",
    updatedTo: "",
    storeView: "",
    asset: "",
    name: "",
    type: "",
    attributeSet: "",
    sku: "",
    visibility: "",
    status: "",
  });

  const handleChange = (field: string, value: string) => {
    setFilters(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onFilter(filters);
  };

  const handleReset = () => {
    const resetFilters = {
      idFrom: "",
      idTo: "",
      priceFrom: "",
      priceTo: "",
      qtyFrom: "",
      qtyTo: "",
      updatedFrom: "",
      updatedTo: "",
      storeView: "",
      asset: "",
      name: "",
      type: "",
      attributeSet: "",
      sku: "",
      visibility: "",
      status: "",
    };
    setFilters(resetFilters);
    onFilter(resetFilters);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-card/80 border border-border/50 rounded-xl p-6 mb-6 shadow flex flex-col gap-4 animate-fade-in"
    >
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {Object.entries(filters).map(([key, value]) => (
          <div key={key}>
            <label className="block text-xs font-semibold text-muted-foreground mb-1">
              {key.replace(/([A-Z])/g, " $1").replace(/^./, s => s.toUpperCase())}
            </label>
            <Input
              placeholder={key.includes("From") || key.includes("To") ? key.includes("From") ? "from" : "to" : ""}
              value={value}
              onChange={e => handleChange(key, e.target.value)}
              className="w-full"
              type={key.toLowerCase().includes("date") ? "date" : "text"}
            />
          </div>
        ))}
      </div>
      <div className="flex justify-end gap-2 mt-4">
        <Button type="submit" className="bg-admin-gradient">Apply Filters</Button>
        <Button type="button" variant="outline" onClick={handleReset}>Reset</Button>
      </div>
    </form>
  );
}
