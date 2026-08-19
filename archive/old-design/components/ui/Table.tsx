import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

export interface TableColumn<T> {
  key: string;
  header: string;
  render: (row: T) => ReactNode;
}

export interface TableProps<T> {
  columns: TableColumn<T>[];
  rows: T[];
  getRowKey: (row: T) => string;
  variant?: "striped" | "bordered";
  caption?: string;
  className?: string;
}

export function Table<T>({
  columns,
  rows,
  getRowKey,
  variant = "bordered",
  caption,
  className,
}: TableProps<T>) {
  return (
    <div className={className}>
      {/* Table on sm+ screens */}
      <div className="hidden overflow-x-auto rounded-lg border border-neutral-100 sm:block">
        <table className="w-full text-left text-body-sm">
          {caption && <caption className="sr-only">{caption}</caption>}
          <thead>
            <tr className="bg-neutral-50">
              {columns.map((col) => (
                <th key={col.key} className="px-4 py-3 text-eyebrow uppercase text-neutral-600">
                  {col.header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, i) => (
              <tr
                key={getRowKey(row)}
                className={cn(
                  "border-t border-neutral-100 hover:bg-neutral-25",
                  variant === "striped" && i % 2 === 1 && "bg-neutral-25",
                )}
              >
                {columns.map((col) => (
                  <td key={col.key} className="px-4 py-4 text-neutral-700">
                    {col.render(row)}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Stacked cards on mobile (<640px) */}
      <div className="flex flex-col gap-3 sm:hidden">
        {rows.map((row) => (
          <div
            key={getRowKey(row)}
            className="rounded-lg border border-neutral-100 bg-white p-4 text-body-sm"
          >
            {columns.map((col) => (
              <div
                key={col.key}
                className="flex items-center justify-between gap-3 border-b border-neutral-100 py-2 last:border-b-0"
              >
                <span className="text-eyebrow uppercase text-neutral-500">{col.header}</span>
                <span className="text-right text-neutral-700">{col.render(row)}</span>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
