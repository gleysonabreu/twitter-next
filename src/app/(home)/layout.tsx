import { Header } from '@/components/header';

export default function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative flex min-h-screen flex-col bg-background">
      <Header />
      {children}
    </div>
  );
}
