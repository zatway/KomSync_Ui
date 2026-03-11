import * as React from "react"
import {Avatar, AvatarFallback, AvatarImage} from "@/shared/ui_shadcn/avatar";
import {cn} from "@/shared/lib/ui_shadcn/utils";

export interface UiAvatarProps {
    className?: string
    size?: "sm" | "md" | "lg"
    ring?: boolean
}

const UiAvatar = React.forwardRef<HTMLDivElement, UiAvatarProps>(
    ({ className, size = "md", ring, ...props }, ref) => {
        const sizeClasses = {
            sm: "h-7 w-7",
            md: "h-9 w-9",
            lg: "h-11 w-11",
        }

        return (
            <Avatar
                ref={ref}
                className={cn(
                    sizeClasses[size],
                    ring && "ring-2 ring-primary/30 ring-offset-2 ring-offset-background",
                    "transition-transform hover:scale-105",
                    className
                )}
                {...props}
            />
        )
    }
)
UiAvatar.displayName = "UiAvatar"

export { UiAvatar, AvatarImage, AvatarFallback }
