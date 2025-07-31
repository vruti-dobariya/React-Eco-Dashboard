import { AdminSidebar } from "./AdminSidebar"

interface AdminLayoutProps {
  children: React.ReactNode
}

export function AdminLayout({ children }: AdminLayoutProps) {
  return (
    <div className="min-h-screen bg-background w-full">
      <AdminSidebar />
      <main className="md:ml-64 min-h-screen">
        <div className="p-8">
          {children}
        </div>
      </main>
    </div>
  )
}