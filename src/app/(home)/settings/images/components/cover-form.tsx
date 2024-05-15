'use client';
import { updateCoverImage } from '@/actions/update-cover-image';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { ACCEPTED_IMAGE_TYPES, MAX_IMAGE_SIZE } from '@/config/upload';
import { sizeInMB } from '@/lib/size-in-mb';
import { zodResolver } from '@hookform/resolvers/zod';
import { Image as ImageIcon, Loader2 } from 'lucide-react';
import { useTransition } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';

const updateCoverImageFormSchema = z.object({
  file: z
    .instanceof(File, { message: 'File is required' })
    .refine((file) => {
      return sizeInMB(file.size) <= MAX_IMAGE_SIZE;
    }, `The maximum image size is ${MAX_IMAGE_SIZE}MB`)
    .refine((file) => {
      return ACCEPTED_IMAGE_TYPES.includes(file.type);
    }, 'File type is not supported'),
});

export type UpdateCoverImageFormSchema = z.infer<
  typeof updateCoverImageFormSchema
>;

export function CoverForm() {
  const [isPending, startTransition] = useTransition();
  const defaultValues: Partial<UpdateCoverImageFormSchema> = {};

  const form = useForm<UpdateCoverImageFormSchema>({
    resolver: zodResolver(updateCoverImageFormSchema),
    mode: 'onChange',
    defaultValues,
  });

  function handleUpdateCoverImage(data: UpdateCoverImageFormSchema) {
    const formData = new FormData();
    formData.append('file', data.file);

    startTransition(() => {
      updateCoverImage(formData).then((res) => {
        if (!res.success) {
          toast.error(res.message);
          return;
        }

        toast.success(res.message);
      });
    });
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleUpdateCoverImage)}
        className="space-y-8"
      >
        <FormField
          control={form.control}
          name="file"
          render={({
            field: { onChange },
            fieldState,
            formState,
            ...field
          }) => (
            <FormItem>
              <FormLabel htmlFor="cover">Cover photo</FormLabel>
              <FormControl className="mt-2 flex justify-center rounded-lg border border-dashed border-border px-6 py-10">
                <div className="flex flex-col items-center gap-2">
                  <ImageIcon
                    size={48}
                    className="mx-auto text-muted-foreground"
                    aria-hidden="true"
                  />
                  <div className="mt-4 flex text-sm leading-6">
                    <Input
                      {...field}
                      disabled={isPending}
                      id="cover"
                      onChange={(event) =>
                        onChange(
                          event.target.files ? event.target.files[0] : null,
                        )
                      }
                      type="file"
                    />
                  </div>
                  <p className="text-xs leading-5 text-muted-foreground">
                    PNG, JPG, GIF up to {MAX_IMAGE_SIZE}MB
                  </p>
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" disabled={isPending}>
          {isPending ? <Loader2 className="animate-spin" /> : 'Update cover'}
        </Button>
      </form>
    </Form>
  );
}
