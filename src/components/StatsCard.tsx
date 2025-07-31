import { LucideIcon } from "lucide-react"
import { cn } from "@/lib/utils"

interface StatsCardProps {
  title: string
  value: string
  change: string
  changeType: "positive" | "negative" | "neutral"
  icon: LucideIcon
  description?: string
  gradient?: boolean
}

export function StatsCard({ 
  title, 
  value, 
  change, 
  changeType, 
  icon: Icon, 
  description,
  gradient = false 
}: StatsCardProps) {
  return (
    <div className={cn(
      "group relative overflow-hidden rounded-xl border border-border/50 p-6 transition-all duration-300 hover:scale-[1.02] hover:shadow-admin-lg",
      gradient 
        ? "bg-admin-gradient text-white shadow-admin" 
        : "bg-card hover:bg-card/80 backdrop-blur-sm"
    )}>
      {/* Background pattern */}
      <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      
      <div className="relative flex items-start justify-between">
        <div className="space-y-2">
          <p className={cn(
            "text-sm font-medium",
            gradient ? "text-white/80" : "text-muted-foreground"
          )}>
            {title}
          </p>
          <div className="space-y-1">
            <p className={cn(
              "text-3xl font-bold tracking-tight",
              gradient ? "text-white" : "text-foreground"
            )}>
              {value}
            </p>
            <div className="flex items-center gap-2 text-sm">
              <span className={cn(
                "font-medium",
                changeType === "positive" && "text-success",
                changeType === "negative" && "text-destructive",
                changeType === "neutral" && (gradient ? "text-white/60" : "text-muted-foreground")
              )}>
                {change}
              </span>
              {description && (
                <span className={cn(
                  "text-xs",
                  gradient ? "text-white/60" : "text-muted-foreground"
                )}>
                  {description}
                </span>
              )}
            </div>
          </div>
        </div>
        
        <div className={cn(
          "flex h-12 w-12 items-center justify-center rounded-xl transition-all duration-300 group-hover:scale-110",
          gradient 
            ? "bg-white/20 backdrop-blur-sm" 
            : "bg-primary/10 group-hover:bg-primary/20"
        )}>
          <Icon className={cn(
            "h-6 w-6",
            gradient ? "text-white" : "text-primary"
          )} />
        </div>
      </div>
      
      {/* Animated border on hover */}
      <div className="absolute inset-0 rounded-xl border-2 border-primary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
    </div>
  )
}