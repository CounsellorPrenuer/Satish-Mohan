import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";

interface Column<T> {
  header: string;
  accessor: keyof T;
  render?: (item: T) => React.ReactNode;
}

interface DataTableProps<T> {
  data: T[];
  columns: Column<T>[];
  loading?: boolean;
  title?: string;
  onExport?: () => void;
  "data-testid"?: string;
}

export default function DataTable<T extends { id: string }>({ 
  data, 
  columns, 
  loading, 
  title, 
  onExport,
  "data-testid": testId
}: DataTableProps<T>) {
  if (loading) {
    return (
      <div className="bg-card rounded-xl shadow-sm border border-border" data-testid={testId}>
        {title && (
          <div className="p-6 border-b border-border">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold">{title}</h2>
              {onExport && (
                <Button variant="ghost" size="sm" disabled>
                  <Download className="w-4 h-4 mr-2" />
                  Export
                </Button>
              )}
            </div>
          </div>
        )}
        <div className="p-6">
          <div className="space-y-4">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="h-16 skeleton rounded"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (!data || data.length === 0) {
    return (
      <div className="bg-card rounded-xl shadow-sm border border-border" data-testid={testId}>
        {title && (
          <div className="p-6 border-b border-border">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold">{title}</h2>
              {onExport && (
                <Button variant="ghost" size="sm" onClick={onExport}>
                  <Download className="w-4 h-4 mr-2" />
                  Export
                </Button>
              )}
            </div>
          </div>
        )}
        <div className="p-6">
          <div className="text-center py-12 text-muted-foreground">
            <p>No data available</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-card rounded-xl shadow-sm border border-border" data-testid={testId}>
      {title && (
        <div className="p-6 border-b border-border">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold">{title}</h2>
            {onExport && (
              <Button variant="ghost" size="sm" onClick={onExport}>
                <Download className="w-4 h-4 mr-2" />
                Export
              </Button>
            )}
          </div>
        </div>
      )}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-muted/30">
            <tr>
              {columns.map((column, index) => (
                <th 
                  key={index} 
                  className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider"
                  data-testid={`table-header-${column.header.toLowerCase().replace(/\s+/g, '-')}`}
                >
                  {column.header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {data.map((item, rowIndex) => (
              <tr key={item.id} className="hover:bg-muted/30" data-testid={`table-row-${item.id}`}>
                {columns.map((column, colIndex) => (
                  <td 
                    key={colIndex} 
                    className="px-6 py-4 whitespace-nowrap text-sm"
                    data-testid={`table-cell-${item.id}-${colIndex}`}
                  >
                    {column.render 
                      ? column.render(item) 
                      : String(item[column.accessor] || '')
                    }
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
