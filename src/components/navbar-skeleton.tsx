import { Skeleton } from "./ui/skeleton";

export default function NavbarSkeleton() {
  return (
    <nav className="mx-auto flex w-full gap-3 overflow-x-auto px-5 py-4 md:px-8 lg:px-10 xl:px-12">
      {Array.from({ length: 5 }).map((_, i) => (
        <Skeleton key={i} className="h-12 w-32 rounded-3xl" />
      ))}
    </nav>
  );
}
