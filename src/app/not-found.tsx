import { ButtonLink } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <div className="relative mx-auto flex min-h-[70svh] max-w-[1440px] flex-col justify-center px-4 py-24 sm:px-6 lg:px-10">
      <p className="eyebrow text-lime">Error 404</p>
      <h1 className="display mt-4 text-[clamp(5rem,16vw,14rem)]">Off the program.</h1>
      <p className="mt-4 max-w-md text-lg text-muted">This page doesn’t exist or has moved. Let’s get you back to training.</p>
      <div className="mt-10 flex flex-wrap gap-3">
        <ButtonLink href="/">Home</ButtonLink>
        <ButtonLink href="/shop" variant="ghost">
          Shop all
        </ButtonLink>
      </div>
    </div>
  );
}
