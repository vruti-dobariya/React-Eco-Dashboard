import React from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { AdminLayout } from "@/components/AdminLayout";
import Index from "./pages/Index";
import Products from "./pages/Products";
import NotFound from "./pages/NotFound";
import OrdersPage from "./pages/Orders";
import ProductCategory from "./pages/ProductCategory";
import CustomersPage from "./pages/Customers";
import NewCustomer from "./pages/NewCustomer";
import Login from "./pages/Login";
import ForgotPassword from "./pages/ForgotPassword";
import { RequireAuth } from "./components/RequireAuth";
import StoreManagement from "./pages/StoreManagement";

const queryClient = new QueryClient();

const RouteWrapper = ({ children }: { children: React.ReactNode }) => {
  const location = useLocation();
  return <>{React.cloneElement(children as React.ReactElement, { key: location.pathname })}</>;
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/login" element={<Login />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route
            path="/products"
            element={
              <RequireAuth>
                <AdminLayout>
                  <Products />
                </AdminLayout>
              </RequireAuth>
            }
          />
          <Route
            path="/catalog/categories"
            element={
              <RequireAuth>
                <AdminLayout>
                  <ProductCategory />
                </AdminLayout>
              </RequireAuth>
            }
          />
          <Route
            path="/orders"
            element={
              <RequireAuth>
                <AdminLayout>
                  <OrdersPage />
                </AdminLayout>
              </RequireAuth>
            }
          />
          <Route
            path="/stores"
            element={
              <RequireAuth>
                <AdminLayout>
                  <StoreManagement />
                </AdminLayout>
              </RequireAuth>
            }
          />
          <Route
            path="/customers"
            element={
              <RequireAuth>
                <AdminLayout>
                  <RouteWrapper>
                    <CustomersPage />
                  </RouteWrapper>
                </AdminLayout>
              </RequireAuth>
            }
          />
          <Route
            path="/customers/new"
            element={
              <RequireAuth>
                <AdminLayout>
                  <NewCustomer />
                </AdminLayout>
              </RequireAuth>
            }
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;

