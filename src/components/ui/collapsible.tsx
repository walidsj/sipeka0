import * as React from "react"
import { Collapsible as CollapsiblePrimitive } from "@base-ui/react/collapsible"

function Collapsible({
  asChild,
  render,
  children,
  ...props
}: CollapsiblePrimitive.Root.Props & { asChild?: boolean }) {
  return (
    <CollapsiblePrimitive.Root
      data-slot="collapsible"
      render={asChild ? (React.Children.only(children) as React.ReactElement) : render}
      {...props}
    >
      {!asChild && children}
    </CollapsiblePrimitive.Root>
  )
}

function CollapsibleTrigger({
  asChild,
  render,
  children,
  ...props
}: CollapsiblePrimitive.Trigger.Props & { asChild?: boolean }) {
  return (
    <CollapsiblePrimitive.Trigger
      data-slot="collapsible-trigger"
      render={asChild ? (React.Children.only(children) as React.ReactElement) : render}
      {...props}
    >
      {!asChild && children}
    </CollapsiblePrimitive.Trigger>
  )
}

function CollapsibleContent({ ...props }: CollapsiblePrimitive.Panel.Props) {
  return (
    <CollapsiblePrimitive.Panel data-slot="collapsible-content" {...props} />
  )
}

export { Collapsible, CollapsibleTrigger, CollapsibleContent }
