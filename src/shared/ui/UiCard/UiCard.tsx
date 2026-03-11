import * as React from "react"
import {Card} from "@/shared/ui_shadcn/card";
import {cn} from "@/shared/lib/ui_shadcn/utils";

interface UiCardProps {
    className?: string
    glass?: boolean
    hover?: boolean
    borderAccent?: "primary" | "success" | "none"
}

const UiCard = React.forwardRef<HTMLDivElement, UiCardProps>(
    ({ className, glass, hover, borderAccent = "none", ...props }, ref) => {
        return (
            <Card
                ref={ref}
                className={cn(
                    "bg-card/90 backdrop-blur-sm border-border/40",
                    glass && "backdrop-blur-md bg-card/70 border-border/30",
                    hover && "hover:shadow-md hover:border-border/70 transition-all duration-200",
                    borderAccent === "primary" && "border-l-4 border-l-primary/70",
                    borderAccent === "success" && "border-l-4 border-l-success/70",
                    className
                )}
                {...props}
            />
        )
    }
)
UiCard.displayName = "UiCard"

export { UiCard }
