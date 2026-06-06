import { cn } from "@/lib/utils";
import * as React from "react";

interface TooltipProps {
  content: string;
  side?: "top" | "right" | "bottom" | "left";
  children: React.ReactNode;
}

export function Tooltip({ content, side = "top", children }: TooltipProps) {
  return (
    <div className="relative group inline-block">
      {children}
      <div
        className={cn(
          "invisible group-hover:visible absolute z-50 mb-2 px-2 py-1 text-xs text-white bg-gray-900 rounded whitespace-nowrap transition-opacity opacity-0 group-hover:opacity-100",
          side === "top" && "bottom-full left-1/2 -translate-x-1/2",
          side === "right" && "left-full top-1/2 -translate-y-1/2 ml-2",
          side === "bottom" && "top-full left-1/2 -translate-x-1/2 mt-2",
          side === "left" && "right-full top-1/2 -translate-y-1/2 mr-2"
        )}
      >
        {content}
      </div>
    </div>
  );
}
