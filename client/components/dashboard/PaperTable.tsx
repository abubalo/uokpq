"use client";
import { useState } from "react";
import { Avatar, AvatarImage, AvatarFallback } from "../ui/avatar/Avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreVertical, Edit, Trash2, Download } from "lucide-react";
import { cn } from "@/lib/utils";
import { Badge } from "../ui/Badge";

type TableRow = {
  id: number;
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
  const [selectedRows, setSelectedRows] = useState<number[]>([]);
  const [selectAll, setSelectAll] = useState(false);

  const getStatusColor = (status: string) => {
    const statusMap: Record<string, string> = {
      published: "bg-green-100 text-green-800",
      draft: "bg-yellow-100 text-yellow-800",
      archived: "bg-red-100 text-red-800",
    };
    return statusMap[status.toLowerCase()] || "bg-gray-100 text-gray-800";
  };

  const toggleSelectAll = () => {
    setSelectAll(!selectAll);
    setSelectedRows(!selectAll ? data.map((row) => row.id) : []);
  };

  const toggleSelectRow = (id: number) => {
    setSelectedRows((prev) =>
      prev.includes(id) ? prev.filter((rowId) => rowId !== id) : [...prev, id]
    );
  };

  return (
    <div className="w-full overflow-auto">
      <table className="w-full caption-bottom text-sm">
        <thead className="[&_tr]:border-b bg-slate-900 rounded-tl-md rounded-tr-md">
          <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
            <th className="flex items-center gap-2 h-12 px-4 text-left space-x-2 align-middle font-medium text-muted-foreground">
              <input
                type="checkbox"
                checked={selectAll}
                onChange={toggleSelectAll}
                className="accent-blue-500 cursor-pointer w-4 h-4 rounded-md"
              />
              Name
            </th>
            <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">
              Type
            </th>
            <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">
              Status
            </th>
            <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">
              Date Taken
            </th>
            <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">
              Date Uploaded
            </th>
            <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">
              Uploader
            </th>
            <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground w-[80px]">
              <span className="sr-only">Actions</span>
            </th>
          </tr>
        </thead>
        <tbody className="[&_tr:last-child]:border-0">
          {data.map((row) => (
            <tr
              key={row.id}
              className={`border-b transition-colors hover:bg-muted/50 ${
                selectedRows.includes(row.id) ? "bg-muted" : ""
              }`}
            >
              <td className="flex items-center gap-2 p-4 align-middle font-medium space-x-2">
                <input
                  type="checkbox"
                  checked={selectedRows.includes(row.id)}
                  onChange={() => toggleSelectRow(row.id)}
                  className=" accent-blue-500 cursor-pointer w-4 h-4"
                />

                {row.name}
              </td>
              <td className="p-4 align-middle">{row.type}</td>
              <td className="p-4 align-middle">
                <Badge className={cn("capitalize", getStatusColor(row.status))}>
                  {row.status}
                </Badge>
              </td>
              <td className="p-4 align-middle">{row.dateTaken}</td>
              <td className="p-4 align-middle">{row.dateUploaded}</td>
              <td className="p-4 align-middle">
                <div className="flex items-center gap-2">
                  <Avatar className="h-8 w-8">
                    <AvatarImage
                      src={row.uploader.image}
                      alt={row.uploader.name}
                    />
                    <AvatarFallback>
                      {row.uploader.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <span>{row.uploader.name}</span>
                </div>
              </td>
              <td className="p-4 align-middle">
                <DropdownMenu>
                  <DropdownMenuTrigger className="flex h-8 w-8 items-center justify-center rounded-md transition-colors cursor-pointer bg-neutral-700/20 hover:bg-muted">
                    <MoreVertical className="h-4 w-4" />
                    <span className="sr-only">Open menu</span>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent
                    align="end"
                    className="bg-slate-700 rounded-md overflow-hidden"
                  >
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
