import { cn } from '@/lib/utils';
import { BackButton } from './back-button';

type HeaderProfileProps = React.HTMLAttributes<HTMLDivElement> & {
  title: string;
  subtitle?: string;
};

export function HeaderProfile({
  title,
  subtitle,
  className,
  ...props
}: HeaderProfileProps) {
  return (
    <header
      className={cn(
        'sticky z-50 w-full top-[57px] border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/85',
        className,
      )}
      {...props}
    >
      <div className="container flex h-14 max-w-[600px] w-full items-center flex-row justify-center px-4 mx-auto">
        <div className="flex min-w-14 items-start min-h-8">
          <BackButton />
        </div>

        <div className="flex flex-col flex-shrink h-full justify-center items-stretch flex-grow ">
          <h2 className="font-bold text-xl leading-6 whitespace-nowrap">
            {title}
          </h2>
          {subtitle && (
            <span className="break-words text-muted-foreground text-sm max-w-full min-w-0 whitespace-nowrap leading-4">
              {subtitle}
            </span>
          )}
        </div>
      </div>
    </header>
  );
}
