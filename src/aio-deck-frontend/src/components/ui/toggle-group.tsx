
import * as React from "react"
import * as ToggleGroupPrimitive from "@radix-ui/react-toggle-group"
import { VariantProps } from "class-variance-authority"

import { cn } from "../../lib/utils"
import { toggleVariants } from "./toggle"

// Update the toggle group component to fix the TypeScript errors
const ToggleGroupContext = React.createContext<{
  type: "single" | "multiple"
  value?: string | string[]
}>({ type: "single" })

const ToggleGroup = React.forwardRef<
  React.ElementRef<typeof ToggleGroupPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof ToggleGroupPrimitive.Root>
>(({ className, type = "single", ...props }, ref) => {
  return (
    <ToggleGroupContext.Provider value={{ type, value: props.value }}>
      <ToggleGroupPrimitive.Root
        ref={ref}
        type={type}
        className={cn("flex items-center gap-1", className)}
        {...props}
      />
    </ToggleGroupContext.Provider>
  )
})
ToggleGroup.displayName = ToggleGroupPrimitive.Root.displayName

const ToggleGroupItem = React.forwardRef<
  React.ElementRef<typeof ToggleGroupPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof ToggleGroupPrimitive.Item> &
    VariantProps<typeof toggleVariants>
>(({ className, variant = "default", size = "default", value, ...props }, ref) => {
  const context = React.useContext(ToggleGroupContext)
  
  return (
    <ToggleGroupPrimitive.Item
      ref={ref}
      value={value}
      className={cn(
        toggleVariants({ variant, size }),
        context.type === "single" &&
          "data-[state=on]:bg-accent data-[state=on]:text-accent-foreground",
        context.type === "multiple" &&
          "data-[state=on]:bg-accent data-[state=on]:text-accent-foreground",
        className
      )}
      {...props}
    />
  )
})
ToggleGroupItem.displayName = ToggleGroupPrimitive.Item.displayName

export { ToggleGroup, ToggleGroupItem }
