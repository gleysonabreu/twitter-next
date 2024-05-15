'use client';
import { updatePictureProfile } from '@/actions/update-picture-profile';
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
import { useRouter } from 'next/navigation';
import { useTransition } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';

const updatePictureFormSchema = z.object({
  file: z
    .instanceof(File, { message: 'File is required' })
    .refine((file) => {
      return sizeInMB(file.size) <= MAX_IMAGE_SIZE;
    }, `The maximum image size is ${MAX_IMAGE_SIZE}MB`)
    .refine((file) => {
      return ACCEPTED_IMAGE_TYPES.includes(file.type);
    }, 'File type is not supported'),
});

export type UpdatePictureFormSchema = z.infer<typeof updatePictureFormSchema>;

export function PictureForm() {
  const router = useRouter();

  const [isPending, startTransition] = useTransition();
  const defaultValues: Partial<UpdatePictureFormSchema> = {};

  const form = useForm<UpdatePictureFormSchema>({
    resolver: zodResolver(updatePictureFormSchema),
    mode: 'onChange',
    defaultValues,
  });

  function handleUpdatePicture(data: UpdatePictureFormSchema) {
    const formData = new FormData();
    formData.append('file', data.file);

    startTransition(() => {
      updatePictureProfile(formData).then((res) => {
        if (!res.success) {
          toast.error(res.message);
          return;
        }

        toast.success(res.message);
        router.refresh();
      });
    });
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleUpdatePicture)}
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
              <FormLabel htmlFor="picture">Profile picture</FormLabel>
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
                      id="picture"
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
          {isPending ? <Loader2 className="animate-spin" /> : 'Update picture'}
        </Button>
      </form>
    </Form>
  );
}
