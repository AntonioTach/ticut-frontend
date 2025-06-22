import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { LucideIcon, TrendingUp, TrendingDown, ArrowRight, Eye, Plus } from "lucide-react";

interface StatsCardProps {
  title: string;
  value: string | number;
  description?: string;
  icon: LucideIcon;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  color?: "blue" | "green" | "orange" | "red";
  action?: {
    label: string;
    href: string;
    icon?: LucideIcon;
  };
  secondaryValue?: string;
  secondaryLabel?: string;
  showViewButton?: boolean;
  showAddButton?: boolean;
}

const getColorClasses = (color: string = "blue") => {
  const colors = {
    blue: {
      iconBg: "bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700",
      iconContainer: "bg-blue-50 dark:bg-blue-950/30",
      text: "text-blue-600 dark:text-blue-400",
      buttonBg: "bg-blue-50 hover:bg-blue-100 dark:bg-blue-950/30 dark:hover:bg-blue-900/50",
      buttonText: "text-blue-600 dark:text-blue-400"
    },
    green: {
      iconBg: "bg-gradient-to-r from-green-500 via-green-600 to-green-700",
      iconContainer: "bg-green-50 dark:bg-green-950/30",
      text: "text-green-600 dark:text-green-400",
      buttonBg: "bg-green-50 hover:bg-green-100 dark:bg-green-950/30 dark:hover:bg-green-900/50",
      buttonText: "text-green-600 dark:text-green-400"
    },
    orange: {
      iconBg: "bg-gradient-to-r from-orange-500 via-orange-600 to-orange-700",
      iconContainer: "bg-orange-50 dark:bg-orange-950/30",
      text: "text-orange-600 dark:text-orange-400",
      buttonBg: "bg-orange-50 hover:bg-orange-100 dark:bg-orange-950/30 dark:hover:bg-orange-900/50",
      buttonText: "text-orange-600 dark:text-orange-400"
    },
    red: {
      iconBg: "bg-gradient-to-r from-red-500 via-red-600 to-red-700",
      iconContainer: "bg-red-50 dark:bg-red-950/30",
      text: "text-red-600 dark:text-red-400",
      buttonBg: "bg-red-50 hover:bg-red-100 dark:bg-red-950/30 dark:hover:bg-red-900/50",
      buttonText: "text-red-600 dark:text-red-400"
    }
  };
  return colors[color as keyof typeof colors] || colors.blue;
};

export function StatsCard({ 
  title, 
  value, 
  description, 
  icon: Icon, 
  trend, 
  color = "blue",
  action,
  secondaryValue,
  secondaryLabel,
  showViewButton = false,
  showAddButton = false
}: StatsCardProps) {
  const colorClasses = getColorClasses(color);
  
  return (
    <Card className="group hover:shadow-xl transition-all duration-300 hover:scale-[1.02] border-0 bg-gradient-to-br from-white via-gray-50 to-gray-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-br from-current/5 to-transparent rounded-full blur-2xl"></div>
      
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">
          {title}
        </CardTitle>
        <div className={`relative p-2 rounded-xl shadow-lg ${colorClasses.iconContainer} group-hover:scale-110 transition-transform duration-300`}>
          <div className={`p-1.5 rounded-lg ${colorClasses.iconBg} shadow-md`}>
            <Icon className="h-4 w-4 text-white" />
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-2 pb-3">
        <div className="space-y-0.5">
          <div className="text-2xl font-bold text-gray-900 dark:text-gray-100">{value}</div>
          {secondaryValue && (
            <div className="text-sm text-muted-foreground">
              {secondaryLabel && <span className="mr-1">{secondaryLabel}:</span>}
              <span className="font-medium">{secondaryValue}</span>
            </div>
          )}
        </div>
        
        {description && (
          <p className="text-xs text-muted-foreground">{description}</p>
        )}
        
        {trend && (
          <div className="flex items-center">
            <div className={`p-0.5 rounded-full ${trend.isPositive ? 'bg-green-100 dark:bg-green-900/30' : 'bg-red-100 dark:bg-red-900/30'}`}>
              {trend.isPositive ? (
                <TrendingUp className="h-3 w-3 text-green-600 dark:text-green-400" />
              ) : (
                <TrendingDown className="h-3 w-3 text-red-600 dark:text-red-400" />
              )}
            </div>
            <span
              className={`text-xs font-semibold ml-2 ${
                trend.isPositive ? "text-green-600 dark:text-green-400" : "text-red-600 dark:text-red-400"
              }`}
            >
              {trend.isPositive ? "+" : ""}{trend.value}%
            </span>
            <span className="text-xs text-muted-foreground ml-1">vs mes anterior</span>
          </div>
        )}
        
        {/* Action Buttons */}
        <div className="flex items-center gap-2 pt-1">
          {action && (
            <Link href={action.href}>
              <Button
                variant="ghost"
                size="sm"
                className={`${colorClasses.buttonBg} ${colorClasses.buttonText} hover:scale-105 transition-transform duration-200 h-7 px-2 text-xs`}
              >
                {action.icon && <action.icon className="h-3 w-3 mr-1" />}
                {action.label}
                <ArrowRight className="h-3 w-3 ml-1" />
              </Button>
            </Link>
          )}
          
          {showViewButton && (
            <Button
              variant="ghost"
              size="sm"
              className={`${colorClasses.buttonBg} ${colorClasses.buttonText} hover:scale-105 transition-transform duration-200 h-7 px-2 text-xs`}
            >
              <Eye className="h-3 w-3 mr-1" />
              Ver
            </Button>
          )}
          
          {showAddButton && (
            <Button
              variant="ghost"
              size="sm"
              className={`${colorClasses.buttonBg} ${colorClasses.buttonText} hover:scale-105 transition-transform duration-200 h-7 px-2 text-xs`}
            >
              <Plus className="h-3 w-3 mr-1" />
              Agregar
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
} 