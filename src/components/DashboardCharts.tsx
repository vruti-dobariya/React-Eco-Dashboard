import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell
} from "recharts"

const salesData = [
  { month: "Jan", sales: 12400, orders: 240 },
  { month: "Feb", sales: 15600, orders: 310 },
  { month: "Mar", sales: 18200, orders: 280 },
  { month: "Apr", sales: 22100, orders: 420 },
  { month: "May", sales: 19800, orders: 380 },
  { month: "Jun", sales: 24500, orders: 450 },
]

const categoryData = [
  { name: "Electronics", value: 4500, color: "hsl(217, 91%, 60%)" },
  { name: "Clothing", value: 3200, color: "hsl(142, 71%, 45%)" },
  { name: "Home", value: 2800, color: "hsl(38, 92%, 50%)" },
  { name: "Sports", value: 1900, color: "hsl(320, 65%, 55%)" },
]

const revenueData = [
  { day: "Mon", revenue: 2400 },
  { day: "Tue", revenue: 3200 },
  { day: "Wed", revenue: 2800 },
  { day: "Thu", revenue: 3800 },
  { day: "Fri", revenue: 4200 },
  { day: "Sat", revenue: 3600 },
  { day: "Sun", revenue: 2900 },
]

export function DashboardCharts() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Sales Trend Chart */}
      <div className="col-span-1 lg:col-span-2 rounded-xl border border-border/50 bg-card/50 backdrop-blur-sm p-6 shadow-admin animate-fade-in">
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-foreground">Sales Overview</h3>
          <p className="text-sm text-muted-foreground">Monthly sales and order trends</p>
        </div>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={salesData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="salesGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="hsl(217, 91%, 60%)" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="hsl(217, 91%, 60%)" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(240, 6%, 20%)" />
              <XAxis 
                dataKey="month" 
                stroke="hsl(240, 5%, 65%)"
                fontSize={12}
              />
              <YAxis 
                stroke="hsl(240, 5%, 65%)"
                fontSize={12}
              />
              <Tooltip 
                contentStyle={{
                  backgroundColor: "hsl(240, 10%, 6%)",
                  border: "1px solid hsl(240, 6%, 20%)",
                  borderRadius: "8px",
                  color: "hsl(0, 0%, 98%)"
                }}
              />
              <Area 
                type="monotone" 
                dataKey="sales" 
                stroke="hsl(217, 91%, 60%)" 
                strokeWidth={2}
                fillOpacity={1} 
                fill="url(#salesGradient)" 
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Daily Revenue Chart */}
      <div className="rounded-xl border border-border/50 bg-card/50 backdrop-blur-sm p-6 shadow-admin animate-fade-in" style={{ animationDelay: "200ms" }}>
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-foreground">Daily Revenue</h3>
          <p className="text-sm text-muted-foreground">This week's performance</p>
        </div>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={revenueData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(240, 6%, 20%)" />
              <XAxis 
                dataKey="day" 
                stroke="hsl(240, 5%, 65%)"
                fontSize={12}
              />
              <YAxis 
                stroke="hsl(240, 5%, 65%)"
                fontSize={12}
              />
              <Tooltip 
                contentStyle={{
                  backgroundColor: "hsl(240, 10%, 6%)",
                  border: "1px solid hsl(240, 6%, 20%)",
                  borderRadius: "8px",
                  color: "hsl(0, 0%, 98%)"
                }}
              />
              <Bar 
                dataKey="revenue" 
                fill="hsl(142, 71%, 45%)"
                radius={[4, 4, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Category Distribution */}
      <div className="rounded-xl border border-border/50 bg-card/50 backdrop-blur-sm p-6 shadow-admin animate-fade-in" style={{ animationDelay: "400ms" }}>
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-foreground">Sales by Category</h3>
          <p className="text-sm text-muted-foreground">Product category breakdown</p>
        </div>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={categoryData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={90}
                paddingAngle={5}
                dataKey="value"
              >
                {categoryData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip 
                contentStyle={{
                  backgroundColor: "hsl(240, 10%, 6%)",
                  border: "1px solid hsl(240, 6%, 20%)",
                  borderRadius: "8px",
                  color: "hsl(0, 0%, 98%)"
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div className="mt-4 space-y-2">
          {categoryData.map((item, index) => (
            <div key={index} className="flex items-center justify-between text-sm">
              <div className="flex items-center gap-2">
                <div 
                  className="w-3 h-3 rounded-full" 
                  style={{ backgroundColor: item.color }}
                />
                <span className="text-muted-foreground">{item.name}</span>
              </div>
              <span className="text-foreground font-medium">${item.value}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}