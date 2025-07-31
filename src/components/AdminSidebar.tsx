import { useEffect, useState } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  Package,
  ShoppingCart,
  Users,
  BarChart3,
  Settings,
  ChevronLeft,
  Store,
  Folder,
  StoreIcon,
  Menu,
  X,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

const menuItems = [
  { title: "Dashboard", url: "/", icon: LayoutDashboard },
  { title: "Products", url: "/products", icon: Package },
  { title: "Categories", url: "/catalog/categories", icon: Folder },
  { title: "Orders", url: "/orders", icon: ShoppingCart },
  { title: "Stores", url: "/stores", icon: StoreIcon },
  { title: "Customers", url: "/customers", icon: Users },
  { title: "Analytics", url: "/analytics", icon: BarChart3 },
  { title: "Settings", url: "/settings", icon: Settings },
];

export function AdminSidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const [user, setUser] = useState<{ name?: string }>({});

  useEffect(() => {
    const stored = localStorage.getItem("adminUser");
    setUser(stored ? JSON.parse(stored) : {});
  }, []);

  useEffect(() => {
    setMobileOpen(false); // Close mobile sidebar on route change
  }, [location.pathname]);

  const isActive = (path: string) => {
    if (path === "/") return location.pathname === "/";
    return location.pathname.startsWith(path);
  };

  const handleLogout = () => {
    localStorage.removeItem("isAdminLoggedIn");
    localStorage.removeItem("adminUser");
    navigate("/login");
  };

  return (
    <>
      {/* Mobile Hamburger Toggle */}
      <div className="md:hidden fixed top-4 left-4 z-50">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setMobileOpen(true)}
          className="bg-background shadow-md"
        >
          <Menu className="w-6 h-6" />
        </Button>
      </div>

      {/* Sidebar Panel */}
      <div
        className={cn(
          "fixed top-0 z-40 h-screen bg-card border-r border-border transition-all duration-300 ease-in-out overflow-y-auto",
          collapsed ? "w-16" : "w-64",
          mobileOpen ? "left-0" : "-left-full",
          "md:left-0 md:z-50"
        )}
      >
        {/* Sidebar Header */}
        <div className="flex items-center justify-between p-4 border-b border-border">
          {!collapsed && (
            <div className="flex items-center gap-2 animate-fade-in">
              <div className="p-2 bg-admin-gradient rounded-lg shadow-glow">
                <Store className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-foreground">EcoAdmin</h1>
                <p className="text-xs text-muted-foreground">Commerce Panel</p>
              </div>
            </div>
          )}
          <div className="flex items-center gap-2">
            {/* Collapse Button (Desktop only) */}
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setCollapsed(!collapsed)}
              className="hidden md:flex hover:bg-accent"
            >
              <ChevronLeft
                className={cn(
                  "h-4 w-4 transition-transform duration-200",
                  collapsed && "rotate-180"
                )}
              />
            </Button>

            {/* Mobile Close Button */}
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setMobileOpen(false)}
              className="md:hidden"
            >
              <X className="w-5 h-5" />
            </Button>
          </div>
        </div>

        {/* Navigation Menu */}
        <nav className="p-4 space-y-2">
          {menuItems.map((item, index) => (
            <NavLink
              key={item.url}
              to={item.url}
              onClick={() => setMobileOpen(false)} // auto close on click (mobile)
              className={cn(
                "flex items-center gap-3 px-3 py-3 rounded-lg text-sm font-medium transition-all duration-200 group relative overflow-hidden",
                "hover:bg-accent hover:shadow-admin transform hover:scale-[1.02]",
                isActive(item.url)
                  ? "bg-admin-gradient text-white shadow-admin-lg"
                  : "text-muted-foreground hover:text-foreground"
              )}
              style={{
                animationDelay: `${index * 100}ms`,
                animation: "fade-in 0.5s ease-out forwards",
              }}
            >
              <item.icon
                className={cn(
                  "h-5 w-5 transition-all duration-200",
                  isActive(item.url) && "drop-shadow-lg"
                )}
              />
              {!collapsed && (
                <span className="transition-all duration-200 group-hover:translate-x-1">
                  {item.title}
                </span>
              )}
              {isActive(item.url) && (
                <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-transparent animate-pulse-glow" />
              )}
            </NavLink>
          ))}
        </nav>

        {/* Sidebar Footer */}
        {!collapsed && (
          <div className="absolute bottom-4 left-4 right-4 animate-fade-in">
            <div className="p-4 border-t border-border text-sm text-muted-foreground">
              {user?.name ? `Logged in as: ${user.name}` : ""}
              <Button
                variant="outline"
                className="w-full mt-4"
                onClick={handleLogout}
              >
                Logout
              </Button>
            </div>
          </div>
        )}
      </div>

      {/* Backdrop for Mobile */}
      {mobileOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30 md:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}
    </>
  );
}
