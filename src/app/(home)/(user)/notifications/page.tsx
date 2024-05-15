import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

import { Suspense } from 'react';
import { LoadingPosts } from '../components/loading-posts';
import { Metadata } from 'next';
import { Shell } from 'lucide-react';

export const revalidate = 900; // revalidate at most every 15 minutes

export const metadata: Metadata = {
  title: 'Notifications',
};

export default function Notifications() {
  return (
    <>
      <div className="flex px-4 py-2 items-center border-b">
        <h1 className="text-xl font-bold">Notifications</h1>
      </div>

      <div className="flex flex-col flex-1 p-5 items-center justify-center text-muted-foreground">
        <Shell size={100} />
        <h1>No notifications</h1>
      </div>
    </>
  );
}
