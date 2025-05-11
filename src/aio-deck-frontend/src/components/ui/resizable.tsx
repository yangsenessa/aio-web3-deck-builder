import * as React from "react"
import { DragHandleDots2Icon } from "@radix-ui/react-icons"
import * as ResizablePrimitive from "react-resizable-panels"

import { cn } from "../../lib/utils"

const ResizablePanel = ResizablePrimitive.Panel

const ResizablePanelGroup = React.forwardRef<
  React.ElementRef<typeof ResizablePrimitive.PanelGroup>,
  React.ComponentPropsWithoutRef<typeof ResizablePrimitive.PanelGroup>
>(({ className, ...props }, ref) => (
  <ResizablePrimitive.PanelGroup
    ref={ref}
    className={cn("border-border rounded-md border", className)}
    {...props}
  />
))
ResizablePanelGroup.displayName = ResizablePrimitive.PanelGroup.displayName

const ResizablePanelSeparator = React.forwardRef<
  React.ElementRef<typeof ResizablePrimitive.PanelSeparator>,
  React.ComponentPropsWithoutRef<typeof ResizablePrimitive.PanelSeparator>
>(({ className, ...props }, ref) => (
  <ResizablePrimitive.PanelSeparator
    ref={ref}
    className={cn(
      "flex h-6 w-6 items-center justify-center border-r border-border text-muted-foreground hover:bg-secondary [&:hover>svg]:opacity-100 data-[dragging=true]:bg-secondary data-[dragging=true]>svg:opacity-100",
      className
    )}
    {...props}
  >
    <DragHandleDots2Icon className="h-4 w-4 opacity-0 transition-opacity" />
  </ResizablePrimitive.PanelSeparator>
))
ResizablePanelSeparator.displayName =
  ResizablePrimitive.PanelSeparator.displayName

export {
  ResizablePanel,
  ResizablePanelGroup,
  ResizablePanelSeparator,
}
