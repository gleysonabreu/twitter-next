import type { Metadata } from 'next';
import { Baloo_Chettan_2 } from 'next/font/google';
import '../styles/globals.css';
import { Providers } from '@/components/providers';

const baloo_chettan_2 = Baloo_Chettan_2({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: {
    template: '%s / Twitter',
    default: 'Twitter',
  },
  description: 'Twitter app clone',
  icons: {
    icon: '/logo-symbol.svg',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={baloo_chettan_2.className}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
