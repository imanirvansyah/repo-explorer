import { type VariantProps } from "class-variance-authority"
import * as React from "react"
import { buttonVariants } from "./variant"
import { cn } from "../../../lib/utils"

function Button({
  className,
  variant,
  size,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants>) {
  const Comp = "button"

  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  )
}

export { Button }

