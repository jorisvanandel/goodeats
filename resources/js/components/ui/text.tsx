import * as React from 'react';
import { cn } from '@/lib/utils';
import { cva, VariantProps } from 'class-variance-authority';

const headingVariants = cva(
    "font-medium",
    {
        variants: {
            size: {
                default: "text-xl",
                xs: "text-base",
                sm: "text-lg",
                lg: "text-2xl",
                xl: "text-3xl",
            },
        },
        defaultVariants: {
            size: "default",
        },
    }
)

function TextHeading({ children, size, className, ...props }: React.ComponentProps<'h1'> & VariantProps<typeof headingVariants>) {
    return <h1 className={cn(headingVariants({ size }), className)} {...props}>{children}</h1>
}

const paragraphVariants = cva(
    "",
    {
        variants: {
            variant: {
                default: "text-text",
                muted: "text-muted-foreground"
            },
            size: {
                sm: 'text-sm',
                default: 'text-base',
                lg: 'text-lg',
                xl: 'text-xl,'
            }
        },
        defaultVariants: {
            variant: "default",
            size: 'default'
        },
    }
)

function TextParagraph({ children, variant, size, className, ...props }: React.ComponentProps<'p'> & VariantProps<typeof paragraphVariants>) {
    return <p className={cn(paragraphVariants({ variant, size }), className)} {...props}>{children}</p>
}

export {
    TextHeading,
    TextParagraph
}
