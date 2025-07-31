import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Table } from "@/components/ui/table";
import { useNavigate, useLocation } from "react-router-dom";

type Customer = {
  id: number;
  name: string;
  email: string;
  group: string;
  phone: string;
  zip: string;
  country: string;
  state: string;
  customerSince: string;
  website: string;
  confirmedEmail: string;
  accountCreatedIn: string;
  dob: string;
  taxVat: string;
  gender: string;
};

export default function CustomersPage() {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [search, setSearch] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const stored = localStorage.getItem("customers");
    const parsed = stored ? JSON.parse(stored) : [];
    setCustomers(parsed);
  }, [location]);

  useEffect(() => {
    localStorage.setItem("customers", JSON.stringify(customers));
  }, [customers]);

  const filtered = customers.filter(
    c =>
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.email.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-6 customer_page">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold text-white tracking-tight animate-fade-in-up">
          Customers
        </h1>
        <Button className="bg-admin-gradient" onClick={() => navigate('/customers/new')}>
          Add New Customer
        </Button>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
        <Input
          placeholder="Search by name or email"
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="w-64"
        />
        <Button variant="outline" onClick={() => setShowFilters(prev => !prev)}>
          {showFilters ? "Hide Filters" : "Show Filters"}
        </Button>
      </div>

      {/* Optional Filter Content */}
      {showFilters && (
        <div className="mb-4 p-4 bg-muted border rounded-lg animate-fade-in-down">
          <p className="text-sm text-muted-foreground">[Add your filters here]</p>
        </div>
      )}

      <Card className="overflow-auto rounded-xl border border-border/50 shadow-admin">
        <div className="min-w-[1200px]">
          <Table>
            <thead className="sticky top-0 z-10 bg-muted text-xs font-medium border-b border-border animate-slide-in-down text-muted-foreground">
              <tr>
                <th className="p-3 text-left font-medium">ID</th>
                <th className="p-3 text-left font-medium">Name</th>
                <th className="p-3 text-left font-medium">Email</th>
                <th className="p-3 text-left font-medium">Group</th>
                <th className="p-3 text-left font-medium">Phone</th>
                <th className="p-3 text-left font-medium">ZIP</th>
                <th className="p-3 text-left font-medium">Country</th>
                <th className="p-3 text-left font-medium">State</th>
                <th className="p-3 text-left font-medium">Customer Since</th>
                <th className="p-3 text-left font-medium">Website</th>
                <th className="p-3 text-left font-medium">Email Confirmed</th>
                <th className="p-3 text-left font-medium">Account Created In</th>
                <th className="p-3 text-left font-medium">DOB</th>
                <th className="p-3 text-left font-medium">Tax VAT</th>
                <th className="p-3 text-left font-medium">Gender</th>
                <th className="p-3 text-left font-medium">Action</th>
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={16} className="text-center py-6 text-muted-foreground">
                    No matching records found.
                  </td>
                </tr>
              ) : (
                filtered.map(c => (
                  <tr
                    key={c.id}
                    className="border-b border-border hover:bg-muted/40 even:bg-muted/20 transition-all"
                  >
                    <td className="p-2">{c.id}</td>
                    <td className="p-2">{c.name}</td>
                    <td className="p-2">{c.email}</td>
                    <td className="p-2">{c.group}</td>
                    <td className="p-2">{c.phone}</td>
                    <td className="p-2">{c.zip}</td>
                    <td className="p-2">{c.country}</td>
                    <td className="p-2">{c.state}</td>
                    <td className="p-2">{c.customerSince}</td>
                    <td className="p-2">{c.website}</td>
                    <td className="p-2">{c.confirmedEmail}</td>
                    <td className="p-2">{c.accountCreatedIn}</td>
                    <td className="p-2">{c.dob}</td>
                    <td className="p-2">{c.taxVat}</td>
                    <td className="p-2">{c.gender}</td>
                    <td className="p-2">
                      <Button size="sm" variant="outline">Edit</Button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </Table>
        </div>
      </Card>

      <div className="flex items-center justify-between mt-4 text-sm text-muted-foreground">
        <span>{filtered.length} records found</span>
        <div className="flex items-center gap-2">
          <Button size="sm" variant="outline" disabled>&lt;</Button>
          <span>1 of 1</span>
          <Button size="sm" variant="outline" disabled>&gt;</Button>
        </div>
      </div>
    </div>
  );
}
