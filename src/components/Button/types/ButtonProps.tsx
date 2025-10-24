import * as React from "react"
import { type VariantProps } from "class-variance-authority"
import type { ButtonVariants } from "../_components/ButtonVariants/ButtonVariants"

export type ButtonProps = React.ComponentProps<"button"> &
  VariantProps<typeof ButtonVariants> & {
    asChild?: boolean
  }
