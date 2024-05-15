import { FloatingPostButton } from '@/components/floating-post-button';

export default function UserLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="max-w-[600px] w-full mx-auto border-l border-r flex flex-col flex-1 items-stretch">
      {children}
      <FloatingPostButton />
    </main>
  );
}
