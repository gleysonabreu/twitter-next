import { BackButton } from './components/back-button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

export default function NotFound() {
  return (
    <>
      <header className="sticky top-14 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/85">
        <div className="container flex h-14 max-w-[600px] w-full items-center flex-row justify-center px-4 mx-auto">
          <div className="flex min-w-14 items-start min-h-8">
            <BackButton />
          </div>

          <div className="flex flex-col flex-shrink h-full justify-center items-stretch flex-grow ">
            <h2 className="font-bold text-xl leading-6 whitespace-nowrap">
              Profile
            </h2>
          </div>
        </div>
      </header>

      <div className="flex-grow-1">
        <div>
          <div className="bg-muted h-44 relative mb-20">
            <div className="absolute -bottom-16 left-4">
              <Avatar className="h-28 w-28 lg:h-36 lg:w-36 border-2 lg:border-4 border-background bg-background">
                <AvatarImage alt="not found" />
                <AvatarFallback>NF</AvatarFallback>
              </Avatar>
            </div>
          </div>
          <div className="border-b pb-4">
            <div />
            <div className="mt-8 px-4">
              <div className="flex flex-col">
                <p className="text-xl font-bold">Not Found</p>
              </div>
            </div>
          </div>

          <div className="flex flex-col max-w-[400px] bg-background self-center w-full my-8 px-5 mx-auto py-10">
            <span className="break-words min-w-0 leading-9 text-center mb-2 text-xl font-bold">
              This account does not exist
            </span>
          </div>
        </div>
      </div>
    </>
  );
}
