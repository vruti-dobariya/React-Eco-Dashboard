import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { useNavigate } from "react-router-dom";

export default function NewCustomer() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    website: "Fashion",
    group: "General",
    disableAutoGroup: false,
    namePrefix: "",
    firstName: "",
    middleName: "",
    lastName: "",
    nameSuffix: "",
    email: "",
    allowRemote: false,
    dob: "",
    taxVat: "",
    gender: "",
  });

  const [loading, setLoading] = useState(false);
  const [websiteOptions, setWebsiteOptions] = useState<{ id: number; name: string }[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem("websites");
    if (stored) {
      setWebsiteOptions(JSON.parse(stored));
    } else {
      setWebsiteOptions([{ id: 1, name: "Fashion" }]);
    }
  }, []);

  const handleChange = (field: string, value: any) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await new Promise((res) => setTimeout(res, 1000));

    const stored = localStorage.getItem("customers");
    const customers = stored ? JSON.parse(stored) : [];
    const newCustomer = {
      id: Date.now(),
      ...form,
      customerSince: new Date().toLocaleString(),
    };
    localStorage.setItem("customers", JSON.stringify([newCustomer, ...customers]));
    setLoading(false);
    setTimeout(() => {
      navigate("/customers");
    }, 100);
  };

  const handleReset = () => {
    setForm({
      website: "Fashion",
      group: "General",
      disableAutoGroup: false,
      namePrefix: "",
      firstName: "",
      middleName: "",
      lastName: "",
      nameSuffix: "",
      email: "",
      allowRemote: false,
      dob: "",
      taxVat: "",
      gender: "",
    });
  };

  const handleSaveAndContinue = async () => {
    setLoading(true);
    await new Promise((res) => setTimeout(res, 1000));
    const stored = localStorage.getItem("customers");
    const customers = stored ? JSON.parse(stored) : [];
    const newCustomer = {
      id: Date.now(),
      ...form,
      customerSince: new Date().toLocaleString(),
    };
    localStorage.setItem("customers", JSON.stringify([newCustomer, ...customers]));
    setLoading(false);
  };

  return (
    <div className="p-4 md:p-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-6">
        <h1 className="text-2xl md:text-3xl font-semibold text-foreground">New Customer</h1>
        <div className="flex flex-wrap gap-2">
          <Button variant="outline" type="button" onClick={() => navigate(-1)}>
            Back
          </Button>
          <Button variant="outline" type="button" onClick={handleReset}>
            Reset
          </Button>
          <Button variant="outline" type="button" onClick={handleSaveAndContinue} disabled={loading}>
            {loading ? "Saving..." : "Save and Continue Edit"}
          </Button>
          <Button className="bg-admin-gradient" type="submit" disabled={loading}>
            {loading ? "Saving..." : "Save Customer"}
          </Button>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-6">
        {/* Sidebar */}
        <div className="w-full md:w-64">
          <Card className="p-0">
            <div className="border-b border-border/50">
              <div className="px-6 py-3 font-semibold bg-muted/50 text-foreground">
                CUSTOMER INFORMATION
              </div>
            </div>
            <div className="px-6 py-3 border-l-2 border-primary text-primary font-medium bg-background">
              Account Information
            </div>
          </Card>
        </div>

        {/* Main Form */}
        <Card className="flex-1 p-4 md:p-8">
          <h2 className="text-xl font-semibold mb-6 text-foreground">Account Information</h2>
          <form className="space-y-6" onSubmit={handleSave}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Website */}
              <div>
                <Label htmlFor="website" className="text-foreground mb-2 block">
                  Associate to Website <span className="text-destructive">*</span>
                </Label>
                <Select value={form.website} onValueChange={(v) => handleChange("website", v)}>
                  <SelectTrigger id="website" className="w-full">
                    <SelectValue placeholder="Select website" />
                  </SelectTrigger>
                  <SelectContent>
                    {websiteOptions.map((w) => (
                      <SelectItem key={w.id} value={w.name}>
                        {w.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Group */}
              <div>
                <Label htmlFor="group" className="text-foreground mb-2 block">
                  Group <span className="text-destructive">*</span>
                </Label>
                <Select value={form.group} onValueChange={(v) => handleChange("group", v)}>
                  <SelectTrigger id="group" className="w-full">
                    <SelectValue placeholder="Select group" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="General">General</SelectItem>
                    <SelectItem value="Wholesale">Wholesale</SelectItem>
                    <SelectItem value="Retailer">Retailer</SelectItem>
                  </SelectContent>
                </Select>
                <div className="flex items-center mt-2">
                  <input
                    type="checkbox"
                    id="disableAutoGroup"
                    checked={form.disableAutoGroup}
                    onChange={(e) => handleChange("disableAutoGroup", e.target.checked)}
                    className="scale-125 accent-primary mr-2"
                  />
                  <Label htmlFor="disableAutoGroup" className="text-sm text-muted-foreground">
                    Disable Automatic Group Change Based on VAT ID
                  </Label>
                </div>
              </div>

              {/* Name Fields */}
              <div>
                <Label htmlFor="namePrefix" className="text-foreground mb-2 block">
                  Name Prefix
                </Label>
                <Input id="namePrefix" value={form.namePrefix} onChange={(e) => handleChange("namePrefix", e.target.value)} />
              </div>
              <div>
                <Label htmlFor="firstName" className="text-foreground mb-2 block">
                  First Name <span className="text-destructive">*</span>
                </Label>
                <Input id="firstName" value={form.firstName} onChange={(e) => handleChange("firstName", e.target.value)} required />
              </div>
              <div>
                <Label htmlFor="middleName" className="text-foreground mb-2 block">
                  Middle Name/Initial
                </Label>
                <Input id="middleName" value={form.middleName} onChange={(e) => handleChange("middleName", e.target.value)} />
              </div>
              <div>
                <Label htmlFor="lastName" className="text-foreground mb-2 block">
                  Last Name
                </Label>
                <Input id="lastName" value={form.lastName} onChange={(e) => handleChange("lastName", e.target.value)} />
              </div>
              <div>
                <Label htmlFor="nameSuffix" className="text-foreground mb-2 block">
                  Name Suffix
                </Label>
                <Input id="nameSuffix" value={form.nameSuffix} onChange={(e) => handleChange("nameSuffix", e.target.value)} />
              </div>

              {/* Email */}
              <div>
                <Label htmlFor="email" className="text-foreground mb-2 block">
                  Email
                </Label>
                <Input id="email" value={form.email} onChange={(e) => handleChange("email", e.target.value)} />
              </div>

              {/* Allow Remote */}
              <div className="flex items-center mt-6">
                <Switch id="allowRemote" checked={form.allowRemote} onCheckedChange={(v) => handleChange("allowRemote", v)} />
                <Label htmlFor="allowRemote" className="ml-2 text-foreground">
                  Allow remote shopping assistance
                </Label>
              </div>

              {/* DOB */}
              <div>
                <Label htmlFor="dob" className="text-foreground mb-2 block">
                  Date of Birth
                </Label>
                <Input id="dob" type="date" value={form.dob} onChange={(e) => handleChange("dob", e.target.value)} />
              </div>

              {/* VAT */}
              <div>
                <Label htmlFor="taxVat" className="text-foreground mb-2 block">
                  Tax/VAT Number
                </Label>
                <Input id="taxVat" value={form.taxVat} onChange={(e) => handleChange("taxVat", e.target.value)} />
              </div>

              {/* Gender */}
              <div>
                <Label htmlFor="gender" className="text-foreground mb-2 block">
                  Gender
                </Label>
                <Select value={form.gender} onValueChange={(v) => handleChange("gender", v)}>
                  <SelectTrigger id="gender" className="w-full">
                    <SelectValue placeholder="Select gender" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Male">Male</SelectItem>
                    <SelectItem value="Female">Female</SelectItem>
                    <SelectItem value="Other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="flex justify-end mt-6">
              <Button className="bg-admin-gradient" type="submit" disabled={loading}>
                {loading ? "Saving..." : "Save Customer"}
              </Button>
            </div>
          </form>
        </Card>
      </div>
    </div>
  );
}
