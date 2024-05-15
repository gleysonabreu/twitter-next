import { cn } from '@/lib/utils';
import { VariantProps, cva } from 'class-variance-authority';
import * as React from 'react';

const postActionButtonVariants = cva('flex gap-1 group text-muted-foreground', {
  variants: {
    variant: {
      primary: 'hover:text-primary group-hover:bg-primary/10',
      green: 'hover:text-green-500 group-hover:bg-green-500/10',
      red: 'hover:text-red-500 group-hover:bg-red-500/10',
    },
  },
  defaultVariants: {
    variant: 'primary',
  },
});

export interface PostActionButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof postActionButtonVariants> {}

const PostActionButton = React.forwardRef<
  HTMLButtonElement,
  PostActionButtonProps
>(({ className, variant, children, title, ...props }, ref) => {
  return (
    <button
      className={cn(postActionButtonVariants({ variant, className }))}
      ref={ref}
      {...props}
    >
      <div className="inline-block relative">
        <div
          className={cn(
            'rounded-full -m-2 inline-flex left-0 bg-black/0 outline-none bottom-0 transition-colors top-0 right-0 absolute',
            postActionButtonVariants({ variant }),
          )}
        />
        {children}
      </div>
      {title && <span>{title}</span>}
    </button>
  );
});

PostActionButton.displayName = 'PostActionButton';

export { PostActionButton, postActionButtonVariants };
