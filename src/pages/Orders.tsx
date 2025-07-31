import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"

interface Order {
  id: string
  purchasePoint: string
  purchaseDate: string
  billToName: string
  shipToName: string
  grandTotalBase: string
  grandTotalPurchased: string
  status: string
  allocatedSources: string
  braintreeSource: string
  disputeState: string
}

export default function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>([])
  const [search, setSearch] = useState("")
  const [isCreateOpen, setIsCreateOpen] = useState(false)

  useEffect(() => {
    const stored = localStorage.getItem("orders")
    if (stored) {
      setOrders(JSON.parse(stored))
    }
  }, [])

  useEffect(() => {
    localStorage.setItem("orders", JSON.stringify(orders))
  }, [orders])

  const filteredOrders = orders.filter(
    (order) =>
      order.id.includes(search) ||
      order.billToName.toLowerCase().includes(search.toLowerCase()) ||
      order.shipToName.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="px-4 py-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
        <h1 className="text-2xl md:text-3xl font-bold text-white tracking-tight">
          Orders
        </h1>
        <Button className="bg-admin-gradient" onClick={() => setIsCreateOpen(true)}>
          Create New Order
        </Button>
      </div>

      {/* Search */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-4">
        <Input
          placeholder="Search by keyword"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full sm:w-64"
        />
        <Button variant="outline">Filters</Button>
      </div>

      {/* Table */}
      <Card className="overflow-x-auto rounded-xl border border-border shadow-admin">
        <table className="min-w-[1000px] w-full text-sm text-left text-foreground border-collapse">
          <thead className="bg-muted sticky top-0 z-10 shadow">
            <tr>
              {[
                "ID",
                "Purchase Point",
                "Purchase Date",
                "Bill-to Name",
                "Ship-to Name",
                "Total (Base)",
                "Total (Purchased)",
                "Status",
                "Action",
                "Sources",
                "Braintree",
                "Dispute",
              ].map((col) => (
                <th
                  key={col}
                  className="px-4 py-3 text-xs font-medium text-muted-foreground uppercase tracking-wide border-b"
                >
                  {col}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filteredOrders.length === 0 ? (
              <tr>
                <td colSpan={12} className="text-center py-6 text-muted-foreground">
                  No records found.
                </td>
              </tr>
            ) : (
              filteredOrders.map((order, index) => (
                <tr
                  key={order.id}
                  className={`transition-all ${
                    index % 2 === 0 ? "bg-background" : "bg-muted/20"
                  } hover:bg-accent/30`}
                >
                  <td className="px-4 py-3 border-b font-semibold">{order.id}</td>
                  <td className="px-4 py-3 border-b">{order.purchasePoint}</td>
                  <td className="px-4 py-3 border-b">{order.purchaseDate}</td>
                  <td className="px-4 py-3 border-b truncate max-w-[160px]">{order.billToName}</td>
                  <td className="px-4 py-3 border-b truncate max-w-[160px]">{order.shipToName}</td>
                  <td className="px-4 py-3 border-b">{order.grandTotalBase}</td>
                  <td className="px-4 py-3 border-b">{order.grandTotalPurchased}</td>
                  <td className="px-4 py-3 border-b">
                    <Badge variant="outline" className="text-xs px-2 py-0.5 rounded-md">
                      {order.status}
                    </Badge>
                  </td>
                  <td className="px-4 py-3 border-b">
                    <Button size="sm" variant="ghost" className="text-primary hover:underline">
                      View
                    </Button>
                  </td>
                  <td className="px-4 py-3 border-b">{order.allocatedSources}</td>
                  <td className="px-4 py-3 border-b">{order.braintreeSource}</td>
                  <td className="px-4 py-3 border-b">{order.disputeState}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </Card>

      {/* Pagination */}
      <div className="flex flex-col sm:flex-row justify-between items-center gap-2 mt-4">
        <span>{filteredOrders.length} records found</span>
        <div className="flex items-center gap-2">
          <Button size="sm" variant="outline" disabled>
            &lt;
          </Button>
          <span>1 of 1</span>
          <Button size="sm" variant="outline" disabled>
            &gt;
          </Button>
        </div>
      </div>

      {/* Dialog */}
      <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create New Order</DialogTitle>
          </DialogHeader>
          <form
            onSubmit={(e) => {
              e.preventDefault()
              const form = e.target as HTMLFormElement
              const newOrder: Order = {
                id: Date.now().toString(),
                purchasePoint: form.purchasePoint.value,
                purchaseDate: form.purchaseDate.value,
                billToName: form.billToName.value,
                shipToName: form.shipToName.value,
                grandTotalBase: form.grandTotalBase.value,
                grandTotalPurchased: form.grandTotalPurchased.value,
                status: form.status.value,
                allocatedSources: form.allocatedSources.value,
                braintreeSource: form.braintreeSource.value,
                disputeState: form.disputeState.value,
              }
              setOrders((prev) => [newOrder, ...prev])
              setIsCreateOpen(false)
              form.reset()
            }}
            className="space-y-6"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                { name: "purchasePoint", label: "Purchase Point" },
                { name: "purchaseDate", label: "Purchase Date", type: "date" },
                { name: "billToName", label: "Bill-to Name" },
                { name: "shipToName", label: "Ship-to Name" },
                { name: "grandTotalBase", label: "Grand Total (Base)" },
                { name: "grandTotalPurchased", label: "Grand Total (Purchased)" },
                { name: "status", label: "Status" },
                { name: "allocatedSources", label: "Allocated Sources" },
                { name: "braintreeSource", label: "Braintree Source" },
                { name: "disputeState", label: "Dispute State" },
              ].map(({ name, label, type = "text" }) => (
                <div key={name}>
                  <Label htmlFor={name} className="mb-2 block text-foreground">
                    {label}
                  </Label>
                  <Input id={name} name={name} type={type} placeholder={label} required />
                </div>
              ))}
            </div>
            <Button
              type="submit"
              className="w-full bg-admin-gradient hover:shadow-glow transition-all duration-300"
            >
              Create Order
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  )
}
