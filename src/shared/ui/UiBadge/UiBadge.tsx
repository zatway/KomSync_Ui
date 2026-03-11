import * as React from "react"
import {cn} from "@/shared/lib/ui_shadcn/utils";
import {Badge} from "@/shared/ui_shadcn/badge";

export interface UiBadgeProps {
    className?: string
    intent?: "default" | "primary" | "success" | "warning" | "destructive"
    size?: "default" | "sm"
}

const UiBadge = React.forwardRef<HTMLDivElement, UiBadgeProps>(
    ({ className, intent = "default", size = "default", ...props }, ref) => {
        const intentStyles = {
            default: "bg-muted text-muted-foreground",
            primary: "bg-primary/20 text-primary border-primary/30",
            success: "bg-success/20 text-success border-success/30",
            warning: "bg-amber-500/20 text-amber-400 border-amber-500/30",
            destructive: "bg-destructive/20 text-destructive border-destructive/30",
        }

        const sizeStyles = {
            default: "px-2.5 py-0.5 text-xs",
            sm: "px-2 py-0 text-xs",
        }

        return (
            <Badge
                ref={ref}
                className={cn(
                    "font-medium border transition-colors",
                    intentStyles[intent],
                    sizeStyles[size],
                    className
                )}
                {...props}
            />
        )
    }
)
UiBadge.displayName = "UiBadge"

export { UiBadge }
