import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface Website {
  id: number;
  name: string;
  code: string;
  sortOrder: number;
}
interface Store {
  id: number;
  websiteId: number;
  name: string;
  code: string;
  rootCategory: string;
}
interface StoreView {
  id: number;
  storeId: number;
  name: string;
  code: string;
  status: string;
  sortOrder: number;
}

export default function StoreManagement() {
  const [websites, setWebsites] = useState<Website[]>([]);
  const [stores, setStores] = useState<Store[]>([]);
  const [storeViews, setStoreViews] = useState<StoreView[]>([]);

  const [openWebsite, setOpenWebsite] = useState(false);
  const [openStore, setOpenStore] = useState(false);
  const [openStoreView, setOpenStoreView] = useState(false);

  const [websiteForm, setWebsiteForm] = useState({ name: "", code: "", sortOrder: "" });
  const [storeForm, setStoreForm] = useState({ websiteId: "", name: "", code: "", rootCategory: "" });
  const [storeViewForm, setStoreViewForm] = useState({ storeId: "", name: "", code: "", status: "Enabled", sortOrder: "" });

  const [editingWebsite, setEditingWebsite] = useState<Website | null>(null);
  const [editWebsiteForm, setEditWebsiteForm] = useState({ name: "", code: "", sortOrder: "" });
  const [openEditWebsite, setOpenEditWebsite] = useState(false);

  const [editingStore, setEditingStore] = useState<Store | null>(null);
  const [editStoreForm, setEditStoreForm] = useState({ websiteId: "", name: "", code: "", rootCategory: "" });
  const [openEditStore, setOpenEditStore] = useState(false);

  const [editingStoreView, setEditingStoreView] = useState<StoreView | null>(null);
  const [editStoreViewForm, setEditStoreViewForm] = useState({ storeId: "", name: "", code: "", status: "Enabled", sortOrder: "" });
  const [openEditStoreView, setOpenEditStoreView] = useState(false);


  const handleCreateWebsite = (e: React.FormEvent) => {
    e.preventDefault();
    const newWebsite = {
      id: Date.now(),
      name: websiteForm.name,
      code: websiteForm.code,
      sortOrder: Number(websiteForm.sortOrder) || 0
    };
    setWebsites(prev => {
      const updated = [...prev, newWebsite];
      localStorage.setItem("websites", JSON.stringify(updated));
      return updated;
    });
    setWebsiteForm({ name: "", code: "", sortOrder: "" });
    setOpenWebsite(false);
  };

  const handleCreateStore = (e: React.FormEvent) => {
    e.preventDefault();
    const newStore = {
      id: Date.now(),
      websiteId: Number(storeForm.websiteId),
      name: storeForm.name,
      code: storeForm.code,
      rootCategory: storeForm.rootCategory
    };
    setStores(prev => {
      const updated = [...prev, newStore];
      localStorage.setItem("stores", JSON.stringify(updated));
      return updated;
    });
    setStoreForm({ websiteId: "", name: "", code: "", rootCategory: "" });
    setOpenStore(false);
  };

  const handleCreateStoreView = (e: React.FormEvent) => {
    e.preventDefault();
    const newStoreView = {
      id: Date.now(),
      storeId: Number(storeViewForm.storeId),
      name: storeViewForm.name,
      code: storeViewForm.code,
      status: storeViewForm.status,
      sortOrder: Number(storeViewForm.sortOrder) || 0
    };
    setStoreViews(prev => {
      const updated = [...prev, newStoreView];
      localStorage.setItem("storeViews", JSON.stringify(updated));
      return updated;
    });
    setStoreViewForm({ storeId: "", name: "", code: "", status: "Enabled", sortOrder: "" });
    setOpenStoreView(false);
  };

  useEffect(() => {
    const stored = localStorage.getItem("websites");
    if (stored) setWebsites(JSON.parse(stored));
  }, []);

  useEffect(() => {
    const stored = localStorage.getItem("stores");
    if (stored) setStores(JSON.parse(stored));
  }, []);

  useEffect(() => {
    const stored = localStorage.getItem("storeViews");
    if (stored) setStoreViews(JSON.parse(stored));
  }, []);

  useEffect(() => {
    localStorage.setItem("websites", JSON.stringify(websites));
  }, [websites]);

  useEffect(() => {
    localStorage.setItem("stores", JSON.stringify(stores));
  }, [stores]);

  useEffect(() => {
    localStorage.setItem("storeViews", JSON.stringify(storeViews));
  }, [storeViews]);

  useEffect(() => {
    if (!openEditWebsite) {
      setEditingWebsite(null);
      setEditWebsiteForm({ name: "", code: "", sortOrder: "" });
    }
  }, [openEditWebsite]);

  return (
    <div className="">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl md:text-3xl font-bold text-white tracking-tight flex items-center gap-4 animate-fade-in-up">Store Management</h1>
        <div className="flex gap-2">
          <Button className="bg-admin-gradient" onClick={() => setOpenStoreView(true)}>Create Store View</Button>
          <Button className="bg-admin-gradient" onClick={() => setOpenStore(true)}>Create Store</Button>
          <Button className="bg-admin-gradient" onClick={() => setOpenWebsite(true)}>Create Website</Button>
        </div>
      </div>

      <Card className="rounded-xl border border-border/50 shadow-admin animate-fade-in">
        <div className="min-w-[1000px] w-full">
          <table className="w-full border-collapse text-sm text-left text-foreground">
            <thead className="bg-muted sticky top-0 z-10 shadow-sm animate-slide-in-down">
              <tr>
                <th className="px-4 py-3 text-xs font-medium text-muted-foreground uppercase tracking-wider border-b">Website</th>
                <th className="px-4 py-3 text-xs font-medium text-muted-foreground uppercase tracking-wider border-b">Store</th>
                <th className="px-4 py-3 text-xs font-medium text-muted-foreground uppercase tracking-wider border-b">Store View</th>
              </tr>
            </thead>
            <tbody className="animate-fade-in">
              {websites.map((website) => {
                const websiteStores = stores.filter((s) => s.websiteId === website.id);
                return websiteStores.length === 0 ? (
                  <tr key={website.id} className="hover:bg-accent/30 transition-colors duration-200">
                    <td className="px-4 py-3 align-top border-b">
                      <div className="font-semibold text-primary cursor-pointer hover:underline"
                        onClick={() => {
                          setEditingWebsite(website);
                          setEditWebsiteForm({
                            name: website.name,
                            code: website.code,
                            sortOrder: website.sortOrder.toString()
                          });
                          setOpenEditWebsite(true);
                        }}
                      >
                        {website.name}
                      </div>
                      <div className="text-xs text-muted-foreground">Code: {website.code}</div>
                    </td>
                    <td className="px-4 py-3 border-b"></td>
                    <td className="px-4 py-3 border-b"></td>
                  </tr>
                ) : (
                  websiteStores.map((store) => {
                    const storeStoreViews = storeViews.filter((v) => v.storeId === store.id);
                    return storeStoreViews.length === 0 ? (
                      <tr key={store.id} className="hover:bg-accent/30 transition-colors duration-200">
                        <td className="px-4 py-3 align-top border-b">
                          <div className="font-semibold text-primary cursor-pointer hover:underline"
                            onClick={() => {
                              setEditingWebsite(website);
                              setEditWebsiteForm({
                                name: website.name,
                                code: website.code,
                                sortOrder: website.sortOrder.toString()
                              });
                              setOpenEditWebsite(true);
                            }}
                          >
                            {website.name}
                          </div>
                          <div className="text-xs text-muted-foreground">Code: {website.code}</div>
                        </td>
                        <td className="px-4 py-3 align-top border-b">
                        <div
                            className="text-primary cursor-pointer hover:underline"
                            onClick={() => {
                              setEditingStore(store);
                              setEditStoreForm({
                                websiteId: store.websiteId.toString(),
                                name: store.name,
                                code: store.code,
                                rootCategory: store.rootCategory,
                              });
                              setOpenEditStore(true);
                            }}
                          >
                            {store.name}
                          </div>

                          <div className="text-xs text-muted-foreground">Code: {store.code}</div>
                        </td>
                        <td className="px-4 py-3 border-b"></td>
                      </tr>
                    ) : (
                      storeStoreViews.map((view) => (
                        <tr key={view.id} className="hover:bg-accent/30 transition-colors duration-200">
                          <td className="px-4 py-3 align-top border-b">
                            <div className="font-semibold text-primary cursor-pointer hover:underline"
                              onClick={() => {
                                setEditingWebsite(website);
                                setEditWebsiteForm({
                                  name: website.name,
                                  code: website.code,
                                  sortOrder: website.sortOrder.toString()
                                });
                                setOpenEditWebsite(true);
                              }}
                            >
                              {website.name}
                            </div>
                            <div className="text-xs text-muted-foreground">Code: {website.code}</div>
                          </td>
                          <td className="px-4 py-3 align-top border-b">
                            <div
                              className="text-primary cursor-pointer hover:underline"
                              onClick={() => {
                                setEditingStore(store);
                                setEditStoreForm({
                                  websiteId: store.websiteId.toString(),
                                  name: store.name,
                                  code: store.code,
                                  rootCategory: store.rootCategory,
                                });
                                setOpenEditStore(true);
                              }}
                            >
                              {store.name}
                            </div>
                            <div className="text-xs text-muted-foreground">Code: {store.code}</div>
                          </td>
                          <td className="px-4 py-3 align-top border-b">
                          <div
                              className="text-primary font-medium cursor-pointer hover:underline"
                              onClick={() => {
                                setEditingStoreView(view);
                                setEditStoreViewForm({
                                  storeId: view.storeId.toString(),
                                  name: view.name,
                                  code: view.code,
                                  status: view.status,
                                  sortOrder: view.sortOrder.toString(),
                                });
                                setOpenEditStoreView(true);
                              }}
                            >
                              {view.name}
                            </div>
                            <div className="text-xs text-muted-foreground">Code: {view.code}</div>
                          </td>
                        </tr>
                      ))
                    );
                  })
                );
              })}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Create Website Modal */}
      <Dialog open={openWebsite} onOpenChange={setOpenWebsite}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create Website</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleCreateWebsite} className="space-y-4">
            <Input placeholder="Name" value={websiteForm.name} onChange={e => setWebsiteForm(f => ({ ...f, name: e.target.value }))} required />
            <Input placeholder="Code" value={websiteForm.code} onChange={e => setWebsiteForm(f => ({ ...f, code: e.target.value }))} required />
            <Input placeholder="Sort Order" type="number" value={websiteForm.sortOrder} onChange={e => setWebsiteForm(f => ({ ...f, sortOrder: e.target.value }))} />
            <Button type="submit" className="bg-admin-gradient w-full">Create Website</Button>
          </form>
        </DialogContent>
      </Dialog>

      {/* Edit Website Modal */}
      <Dialog open={openEditWebsite} onOpenChange={setOpenEditWebsite}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Website</DialogTitle>
          </DialogHeader>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              if (!editingWebsite) return;

              const updatedWebsite = {
                ...editingWebsite,
                name: editWebsiteForm.name,
                code: editWebsiteForm.code,
                sortOrder: Number(editWebsiteForm.sortOrder) || 0
              };

              const updatedWebsites = websites.map(w =>
                w.id === editingWebsite.id ? updatedWebsite : w
              );

              setWebsites(updatedWebsites);
              localStorage.setItem("websites", JSON.stringify(updatedWebsites));
              setOpenEditWebsite(false);
              setEditingWebsite(null);
            }}
            className="space-y-4"
          >
            <Input placeholder="Name" value={editWebsiteForm.name} onChange={e => setEditWebsiteForm(f => ({ ...f, name: e.target.value }))} required />
            <Input placeholder="Code" value={editWebsiteForm.code} onChange={e => setEditWebsiteForm(f => ({ ...f, code: e.target.value }))} required />
            <Input placeholder="Sort Order" type="number" value={editWebsiteForm.sortOrder} onChange={e => setEditWebsiteForm(f => ({ ...f, sortOrder: e.target.value }))} />
            <Button type="submit" className="bg-admin-gradient w-full">Update Website</Button>
          </form>
        </DialogContent>
      </Dialog>

      {/* Create Store Modal */}
      <Dialog open={openStore} onOpenChange={setOpenStore}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create Store</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleCreateStore} className="space-y-4">
            <Select value={storeForm.websiteId} onValueChange={v => setStoreForm(f => ({ ...f, websiteId: v }))}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select Website" />
              </SelectTrigger>
              <SelectContent>
                {websites.map(w => (
                  <SelectItem key={w.id} value={w.id.toString()}>{w.name}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Input placeholder="Name" value={storeForm.name} onChange={e => setStoreForm(f => ({ ...f, name: e.target.value }))} required />
            <Input placeholder="Code" value={storeForm.code} onChange={e => setStoreForm(f => ({ ...f, code: e.target.value }))} required />
            <Input placeholder="Root Category" value={storeForm.rootCategory} onChange={e => setStoreForm(f => ({ ...f, rootCategory: e.target.value }))} required />
            <Button type="submit" className="bg-admin-gradient w-full">Create Store</Button>
          </form>
        </DialogContent>
      </Dialog>

      <Dialog open={openEditStore} onOpenChange={setOpenEditStore}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Store</DialogTitle>
          </DialogHeader>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              if (!editingStore) return;

              const updatedStore = {
                ...editingStore,
                websiteId: Number(editStoreForm.websiteId),
                name: editStoreForm.name,
                code: editStoreForm.code,
                rootCategory: editStoreForm.rootCategory,
              };

              const updatedStores = stores.map(s =>
                s.id === editingStore.id ? updatedStore : s
              );

              setStores(updatedStores);
              localStorage.setItem("stores", JSON.stringify(updatedStores));
              setOpenEditStore(false);
              setEditingStore(null);
            }}
            className="space-y-4"
          >
            <Select value={editStoreForm.websiteId} onValueChange={v => setEditStoreForm(f => ({ ...f, websiteId: v }))}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select Website" />
              </SelectTrigger>
              <SelectContent>
                {websites.map(w => (
                  <SelectItem key={w.id} value={w.id.toString()}>{w.name}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Input placeholder="Name" value={editStoreForm.name} onChange={e => setEditStoreForm(f => ({ ...f, name: e.target.value }))} required />
            <Input placeholder="Code" value={editStoreForm.code} onChange={e => setEditStoreForm(f => ({ ...f, code: e.target.value }))} required />
            <Input placeholder="Root Category" value={editStoreForm.rootCategory} onChange={e => setEditStoreForm(f => ({ ...f, rootCategory: e.target.value }))} required />
            <Button type="submit" className="bg-admin-gradient w-full">Update Store</Button>
          </form>
        </DialogContent>
      </Dialog>

      {/* Create Store View Modal */}
      <Dialog open={openStoreView} onOpenChange={setOpenStoreView}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create Store View</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleCreateStoreView} className="space-y-4">
            <Select value={storeViewForm.storeId} onValueChange={v => setStoreViewForm(f => ({ ...f, storeId: v }))}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select Store" />
              </SelectTrigger>
              <SelectContent>
                {stores.map(s => (
                  <SelectItem key={s.id} value={s.id.toString()}>{s.name}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Input placeholder="Name" value={storeViewForm.name} onChange={e => setStoreViewForm(f => ({ ...f, name: e.target.value }))} required />
            <Input placeholder="Code" value={storeViewForm.code} onChange={e => setStoreViewForm(f => ({ ...f, code: e.target.value }))} required />
            <Select value={storeViewForm.status} onValueChange={v => setStoreViewForm(f => ({ ...f, status: v }))}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Enabled">Enabled</SelectItem>
                <SelectItem value="Disabled">Disabled</SelectItem>
              </SelectContent>
            </Select>
            <Input placeholder="Sort Order" type="number" value={storeViewForm.sortOrder} onChange={e => setStoreViewForm(f => ({ ...f, sortOrder: e.target.value }))} />
            <Button type="submit" className="bg-admin-gradient w-full">Create Store View</Button>
          </form>
        </DialogContent>
      </Dialog>

      <Dialog open={openEditStoreView} onOpenChange={setOpenEditStoreView}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Store View</DialogTitle>
          </DialogHeader>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              if (!editingStoreView) return;

              const updatedView = {
                ...editingStoreView,
                storeId: Number(editStoreViewForm.storeId),
                name: editStoreViewForm.name,
                code: editStoreViewForm.code,
                status: editStoreViewForm.status,
                sortOrder: Number(editStoreViewForm.sortOrder) || 0,
              };

              const updatedViews = storeViews.map(v =>
                v.id === editingStoreView.id ? updatedView : v
              );

              setStoreViews(updatedViews);
              localStorage.setItem("storeViews", JSON.stringify(updatedViews));
              setOpenEditStoreView(false);
              setEditingStoreView(null);
            }}
            className="space-y-4"
          >
            <Select value={editStoreViewForm.storeId} onValueChange={v => setEditStoreViewForm(f => ({ ...f, storeId: v }))}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select Store" />
              </SelectTrigger>
              <SelectContent>
                {stores.map(s => (
                  <SelectItem key={s.id} value={s.id.toString()}>{s.name}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Input placeholder="Name" value={editStoreViewForm.name} onChange={e => setEditStoreViewForm(f => ({ ...f, name: e.target.value }))} required />
            <Input placeholder="Code" value={editStoreViewForm.code} onChange={e => setEditStoreViewForm(f => ({ ...f, code: e.target.value }))} required />
            <Select value={editStoreViewForm.status} onValueChange={v => setEditStoreViewForm(f => ({ ...f, status: v }))}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Enabled">Enabled</SelectItem>
                <SelectItem value="Disabled">Disabled</SelectItem>
              </SelectContent>
            </Select>
            <Input placeholder="Sort Order" type="number" value={editStoreViewForm.sortOrder} onChange={e => setEditStoreViewForm(f => ({ ...f, sortOrder: e.target.value }))} />
            <Button type="submit" className="bg-admin-gradient w-full">Update Store View</Button>
          </form>
        </DialogContent>
      </Dialog>

    </div>
  );
}
