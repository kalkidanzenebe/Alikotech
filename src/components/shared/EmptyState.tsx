import { FolderOpen } from "lucide-react";

interface EmptyStateProps {
  title?: string;
  description?: string;
}

const EmptyState = ({
  title = "No items found",
  description = "There's nothing here yet.",
}: EmptyStateProps) => (
  <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-border bg-secondary/30 px-6 py-16 text-center">
    <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-accent/10">
      <FolderOpen size={26} className="text-accent" aria-hidden="true" />
    </div>
    <p className="text-base font-semibold text-foreground">{title}</p>
    <p className="mt-1 max-w-sm text-sm leading-relaxed text-muted-foreground">{description}</p>
  </div>
);

export default EmptyState;
