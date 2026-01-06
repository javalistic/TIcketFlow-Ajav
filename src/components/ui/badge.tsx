import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "../lib/utils";

const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default: "border-transparent bg-primary text-primary-foreground hover:bg-primary/80",
        secondary: "border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80",
        destructive: "border-transparent bg-destructive text-destructive-foreground hover:bg-destructive/80",
        outline: "text-foreground",
        open: "border-transparent bg-[hsl(var(--status-open-light))] text-[hsl(var(--status-open))] hover:bg-[hsl(var(--status-open))]/20",
        in_progress: "border-transparent bg-[hsl(var(--status-progress-light))] text-[hsl(var(--status-progress))] hover:bg-[hsl(var(--status-progress))]/20",
        closed: "border-transparent bg-[hsl(var(--status-closed-light))] text-[hsl(var(--status-closed))] hover:bg-[hsl(var(--status-closed))]/20",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return <div className={cn(badgeVariants({ variant }), className)} {...props} />;
}

export { Badge, badgeVariants };
