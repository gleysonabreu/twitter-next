import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';

import { PostForm } from './components/post-form';
import { Posts } from './components/posts';
import { Suspense } from 'react';
import { LoadingPosts } from './components/loading-posts';

export const dynamic = 'force-dynamic';

export default async function Home() {
  return (
    <Tabs defaultValue="following">
      <div className="flex px-4 py-2 items-center">
        <h1 className="text-xl font-bold">Posts</h1>
        <TabsList className="ml-auto">
          <TabsTrigger value="foryou" disabled>
            For you
          </TabsTrigger>
          <TabsTrigger value="following">Following</TabsTrigger>
        </TabsList>
      </div>
      <Separator />

      <PostForm />

      <TabsContent value="following">
        <Suspense fallback={<LoadingPosts />}>
          <Posts />
        </Suspense>
      </TabsContent>
    </Tabs>
  );
}
