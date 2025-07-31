import { 
  DollarSign, 
  ShoppingCart, 
  Users, 
  Package,
  TrendingUp,
  Activity
} from "lucide-react"
import { StatsCard } from "@/components/StatsCard"
import { DashboardCharts } from "@/components/DashboardCharts"
import { ProductTable } from "@/components/ProductTable"

export default function Dashboard() {
  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header */}
      <div className="space-y-2">
        <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
        <p className="text-muted-foreground">
          Welcome back! Here's what's happening with your store today.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard
          title="Total Revenue"
          value="$45,231"
          change="+20.1%"
          changeType="positive"
          description="from last month"
          icon={DollarSign}
          gradient={true}
        />
        <StatsCard
          title="Orders"
          value="1,234"
          change="+12.5%"
          changeType="positive"
          description="from last week"
          icon={ShoppingCart}
        />
        <StatsCard
          title="Customers"
          value="2,345"
          change="+5.2%"
          changeType="positive"
          description="new this month"
          icon={Users}
        />
        <StatsCard
          title="Products"
          value="567"
          change="-2.1%"
          changeType="negative"
          description="active products"
          icon={Package}
        />
      </div>

      {/* Charts Section */}
      <DashboardCharts />

      {/* Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <div className="rounded-xl border p-6 bg-card border border-border/50 shadow-admin">
            <h2 className="text-xl font-bold mb-4">Recent Orders</h2>
            <table className="min-w-full text-sm">
              <thead>
                <tr className="bg-muted/50">
                  <th className="px-3 py-2 text-left font-semibold text-muted-foreground">Order #</th>
                  <th className="px-3 py-2 text-left font-semibold text-muted-foreground">Customer</th>
                  <th className="px-3 py-2 text-left font-semibold text-muted-foreground">Date</th>
                  <th className="px-3 py-2 text-left font-semibold text-muted-foreground">Total</th>
                  <th className="px-3 py-2 text-left font-semibold text-muted-foreground">Status</th>
                </tr>
              </thead>
              <tbody>
                {/* Example static data, replace with real data as needed */}
                <tr className="border-b">
                  <td className="px-3 py-2 font-mono">#1001</td>
                  <td className="px-3 py-2">John Doe</td>
                  <td className="px-3 py-2">2024-05-01</td>
                  <td className="px-3 py-2">$120.00</td>
                  <td className="px-3 py-2"><span className="px-2 py-1 rounded bg-green-100 text-green-700 text-xs">Paid</span></td>
                </tr>
                <tr className="border-b">
                  <td className="px-3 py-2 font-mono">#1000</td>
                  <td className="px-3 py-2">Jane Smith</td>
                  <td className="px-3 py-2">2024-04-30</td>
                  <td className="px-3 py-2">$89.99</td>
                  <td className="px-3 py-2"><span className="px-2 py-1 rounded bg-yellow-100 text-yellow-700 text-xs">Pending</span></td>
                </tr>
                <tr>
                  <td className="px-3 py-2 font-mono">#999</td>
                  <td className="px-3 py-2">Alice Lee</td>
                  <td className="px-3 py-2">2024-04-29</td>
                  <td className="px-3 py-2">$45.50</td>
                  <td className="px-3 py-2"><span className="px-2 py-1 rounded bg-red-100 text-red-700 text-xs">Cancelled</span></td>
                </tr>
              </tbody>
            </table>
            <div className="flex justify-end mt-4">
              <a href="/orders" className="text-primary hover:underline text-sm font-medium">View all orders &rarr;</a>
            </div>
          </div>
        </div>
        
        <div className="space-y-6">
          {/* Recent Activity */}
          <div className="rounded-xl border border-border/50 bg-card/50 backdrop-blur-sm p-6 shadow-admin animate-fade-in">
            <div className="flex items-center gap-2 mb-4">
              <Activity className="h-5 w-5 text-primary" />
              <h3 className="text-lg font-semibold text-foreground">Recent Activity</h3>
            </div>
            <div className="space-y-4">
              {[
                { action: "New order #1234", time: "2 minutes ago", type: "order" },
                { action: "Product updated", time: "15 minutes ago", type: "product" },
                { action: "Customer registered", time: "1 hour ago", type: "customer" },
                { action: "Payment received", time: "2 hours ago", type: "payment" },
              ].map((activity, index) => (
                <div key={index} className="flex items-center gap-3 p-3 rounded-lg hover:bg-accent/30 transition-colors">
                  <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
                  <div className="flex-1">
                    <p className="text-sm font-medium text-foreground">{activity.action}</p>
                    <p className="text-xs text-muted-foreground">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Stats */}
          <div className="rounded-xl border border-border/50 bg-card/50 backdrop-blur-sm p-6 shadow-admin animate-fade-in">
            <div className="flex items-center gap-2 mb-4">
              <TrendingUp className="h-5 w-5 text-success" />
              <h3 className="text-lg font-semibold text-foreground">Quick Stats</h3>
            </div>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Conversion Rate</span>
                <span className="text-sm font-medium text-success">3.2%</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Avg. Order Value</span>
                <span className="text-sm font-medium text-foreground">$89.50</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Customer Satisfaction</span>
                <span className="text-sm font-medium text-success">98.5%</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Return Rate</span>
                <span className="text-sm font-medium text-warning">2.1%</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}