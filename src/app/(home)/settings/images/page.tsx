import { Separator } from '@/components/ui/separator';
import { Metadata } from 'next';
import { CoverForm } from './components/cover-form';
import { PictureForm } from './components/picture-form';

export const metadata: Metadata = {
  title: 'Avatar / Cover',
};

export default function SettingsImagePage() {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Images</h3>
        <p className="text-sm text-muted-foreground">
          Change your avatar and profile cover
        </p>
      </div>

      <Separator />
      <CoverForm />

      <Separator />
      <PictureForm />
    </div>
  );
}
