import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import {Button, buttonVariants} from "@/shared/ui_shadcn/button";
import {cn} from "@/shared/lib/ui_shadcn/utils";

const appButtonVariants = cva(
    buttonVariants(),
    {
        variants: {
            intent: {
                primary: "bg-primary text-primary-foreground hover:bg-primary/90 shadow-sm",
                success: "bg-success text-success-foreground hover:bg-success/90 shadow-sm",
                outline: "border border-input bg-transparent hover:bg-accent hover:text-accent-foreground",
                ghost: "hover:bg-accent/60 hover:text-accent-foreground",
                subtle: "bg-muted/50 hover:bg-muted text-muted-foreground",
            },
            elevation: {
                none: "",
                sm: "shadow-sm hover:shadow",
                md: "shadow-md hover:shadow-lg",
            },
        },
        defaultVariants: {
            intent: "primary",
            elevation: "sm",
        },
    }
)

export interface UiButtonProps
    extends React.ComponentProps<typeof Button>,
        VariantProps<typeof appButtonVariants> {}

const UiButton = React.forwardRef<HTMLButtonElement, UiButtonProps>(
    ({ className, intent, elevation, ...props }, ref) => {
        return (
            <Button
                className={cn(
                    appButtonVariants({ intent, elevation, className }),
                    "transition-all duration-200 active:scale-[0.98]",
                )}
                ref={ref}
                {...props}
            />
        )
    }
)
UiButton.displayName = "UiButton"

export { UiButton, appButtonVariants }
