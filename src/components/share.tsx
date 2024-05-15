import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { ReactNode } from 'react';
import { CopyContent } from './copy-content';

type ShareProps = {
  children: ReactNode;
  content: string;
};

export function Share({ children, content }: ShareProps) {
  return (
    <Popover>
      <PopoverTrigger asChild>{children}</PopoverTrigger>
      <PopoverContent align="end" className="w-[520px]">
        <div className="flex flex-col space-y-2 text-center sm:text-left">
          <h3 className="text-lg font-semibold">Share</h3>
        </div>
        <div className="flex items-center space-x-2 pt-4">
          <div className="grid flex-1 gap-2">
            <Label htmlFor="content" className="sr-only">
              Content
            </Label>
            <Input
              id="content"
              defaultValue={content}
              readOnly
              className="h-9"
            />
          </div>

          <CopyContent content={content} />
        </div>
      </PopoverContent>
    </Popover>
  );
}
