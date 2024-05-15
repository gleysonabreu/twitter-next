import { Icons } from '@/components/icons';
import { ToggleTheme } from '@/components/toggle-theme';
import { siteConfig } from '@/config/site';

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="container h-screen relative flex flex-col items-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0">
      <div className="relative hidden h-full flex-col p-10 lg:flex border-r border-border">
        <div className="absolute inset-0 bg-muted" />
        <div className="relative z-20 flex gap-2 items-center text-lg font-medium">
          <Icons.logo className="w-10" />
          {siteConfig.name}
        </div>

        <div className="relative z-20 mt-auto">
          <blockquote className="space-y-2">
            <p className="text-sm">
              © {new Date().getFullYear()} {siteConfig.name}.
            </p>
          </blockquote>
        </div>
      </div>

      <div className="absolute z-50 top-10 right-10">
        <ToggleTheme />
      </div>
      <div className="relative flex flex-col items-center justify-center">
        {children}
      </div>
    </div>
  );
}
