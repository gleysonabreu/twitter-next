import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

import { Suspense } from 'react';
import { LoadingPosts } from '../components/loading-posts';
import { Metadata } from 'next';
import { Favorites } from './components/favorites';
import { Likes } from './components/likes';

export const revalidate = 900; // revalidate at most every 15 minutes

export const metadata: Metadata = {
  title: 'Your Activity',
};

const tabs = [
  {
    name: 'favorites',
    disabled: false,
  },
  {
    name: 'likes',
    disabled: false,
  },
];

export default function YourActivity({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const paramTab = searchParams.tab as string;
  const defaultTab = tabs.some((tab) => tab.name === paramTab)
    ? paramTab
    : tabs[0].name;

  return (
    <Tabs defaultValue={defaultTab}>
      <div className="flex px-4 py-2 items-center border-b">
        <h1 className="text-xl font-bold">Your Activity</h1>
        <TabsList className="ml-auto">
          {tabs.map((tab) => (
            <TabsTrigger
              key={tab.name}
              value={tab.name}
              disabled={tab.disabled}
              className="capitalize"
            >
              {tab.name}
            </TabsTrigger>
          ))}
        </TabsList>
      </div>

      <TabsContent value="favorites" className="mt-0">
        <Suspense fallback={<LoadingPosts />}>
          <Favorites />
        </Suspense>
      </TabsContent>

      <TabsContent value="likes" className="mt-0">
        <Suspense fallback={<LoadingPosts />}>
          <Likes />
        </Suspense>
      </TabsContent>
    </Tabs>
  );
}
