'use client';

import {
  useScroll,
  motion,
  useMotionValueEvent,
  useAnimate,
} from 'framer-motion';
import { Button } from './ui/button';
import { PencilLine } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { PostForm } from '@/app/(home)/(user)/components/post-form';

export function FloatingPostButton() {
  const { scrollY } = useScroll();
  const [scope, animation] = useAnimate();

  useMotionValueEvent(scrollY, 'change', (latest) => {
    if (latest > 200) {
      animation(scope.current, { opacity: 1, scale: 1, display: 'block' });
    } else {
      animation(scope.current, { opacity: 0, scale: 0, display: 'hidden' });
    }
  });

  return (
    <motion.div
      transition={{
        type: 'spring',
        stiffness: 260,
        damping: 20,
      }}
      ref={scope}
      className="fixed hidden md:left-10 md:bottom-10 bottom-5 left-5 z-50"
    >
      <Dialog>
        <DialogTrigger asChild>
          <Button size="icon">
            <PencilLine />
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Post</DialogTitle>
          </DialogHeader>
          <div>
            <PostForm />
          </div>
        </DialogContent>
      </Dialog>
    </motion.div>
  );
}
