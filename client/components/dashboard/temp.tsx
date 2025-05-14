import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreVertical, Edit, Trash2, Download } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

type TableRow = {
  name: string;
  type: string;
  status: string;
  dateTaken: string;
  dateUploaded: string;
  uploader: {
    name: string;
    image: string;
  };
};

type Props = {
  data: TableRow[];
  onEdit?: (row: TableRow) => void;
  onDelete?: (row: TableRow) => void;
  onDownload?: (row: TableRow) => void;
};

const Table = ({ data, onEdit, onDelete, onDownload }: Props) => {
  const getStatusColor = (status: string) => {
    const statusMap: Record<string, string> = {
      active: "bg-green-100 text-green-800",
      pending: "bg-yellow-100 text-yellow-800",
      inactive: "bg-red-100 text-red-800",
    };
    return statusMap[status.toLowerCase()] || "bg-gray-100 text-gray-800";
  };

  return (
    <div className="w-full overflow-auto">
      <table className="w-full caption-bottom text-sm">
        <thead className="[&_tr]:border-b">
          <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
            <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0 w-[200px]">
              Name
            </th>
            <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0">
              Type
            </th>
            <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0">
              Status
            </th>
            <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0">
              Date Taken
            </th>
            <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0">
              Date Uploaded
            </th>
            <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0">
              Uploader
            </th>
            <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0 w-[80px]">
              <span className="sr-only">Actions</span>
            </th>
          </tr>
        </thead>
        <tbody className="[&_tr:last-child]:border-0">
          {data.map((row, index) => (
            <tr
              key={index}
              className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted"
            >
              <td className="p-4 align-middle [&:has([role=checkbox])]:pr-0 font-medium">
                {row.name}
              </td>
              <td className="p-4 align-middle [&:has([role=checkbox])]:pr-0">
                {row.type}
              </td>
              <td className="p-4 align-middle [&:has([role=checkbox])]:pr-0">
                <Badge
                  className={cn(
                    "capitalize",
                    getStatusColor(row.status)
                  )}
                >
                  {row.status}
                </Badge>
              </td>
              <td className="p-4 align-middle [&:has([role=checkbox])]:pr-0">
                {row.dateTaken}
              </td>
              <td className="p-4 align-middle [&:has([role=checkbox])]:pr-0">
                {row.dateUploaded}
              </td>
              <td className="p-4 align-middle [&:has([role=checkbox])]:pr-0">
                <div className="flex items-center gap-2">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={row.uploader.image} alt={row.uploader.name} />
                    <AvatarFallback>
                      {row.uploader.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <span>{row.uploader.name}</span>
                </div>
              </td>
              <td className="p-4 align-middle [&:has([role=checkbox])]:pr-0">
                <DropdownMenu>
                  <DropdownMenuTrigger className="flex h-8 w-8 items-center justify-center rounded-md border transition-colors hover:bg-muted">
                    <MoreVertical className="h-4 w-4" />
                    <span className="sr-only">Open menu</span>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    {onEdit && (
                      <DropdownMenuItem onClick={() => onEdit(row)}>
                        <Edit className="mr-2 h-4 w-4" />
                        Edit
                      </DropdownMenuItem>
                    )}
                    {onDownload && (
                      <DropdownMenuItem onClick={() => onDownload(row)}>
                        <Download className="mr-2 h-4 w-4" />
                        Download
                      </DropdownMenuItem>
                    )}
                    {onDelete && (
                      <DropdownMenuItem
                        onClick={() => onDelete(row)}
                        className="text-red-600 focus:text-red-600"
                      >
                        <Trash2 className="mr-2 h-4 w-4" />
                        Delete
                      </DropdownMenuItem>
                    )}
                  </DropdownMenuContent>
                </DropdownMenu>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;