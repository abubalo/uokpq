import React from "react";
import Table from "@/components/dashboard/PaperTable";
import Button from "@/components/ui/button/Button";
import {
  PlusIcon,
  Download,
  Search,
  Command as CommandIcon,
} from "lucide-react";
import { PaginationDemo } from "./Pagination";

import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/Command";
import ButtonLink from "@/components/ui/button/ButtonLink";

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
};

const Default: React.FC<Props> = ({ data }) => {
  const [open, setOpen] = React.useState(false);
  const [searchQuery, setSearchQuery] = React.useState("");

  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };
    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  const handleEdit = (row: TableRow) => {
    console.log("Edit:", row);
  };

  const handleDelete = (row: TableRow) => {
    console.log("Delete:", row);
  };

  const handleDownload = (row: TableRow) => {
    console.log("Download:", row);
  };

  const filteredData = data.filter(
    (item) =>
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.type.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.uploader.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <section className="space-y-6 mt-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="relative w-full sm:w-[300px]">
          <Button
            variant="outline"
            className="w-full justify-start text-sm text-muted-foreground"
            onClick={() => setOpen(true)}
          >
            <Search className="mr-2 h-4 w-4" />
            Search papers...
            <kbd className="pointer-events-none absolute right-1.5 top-1.5 hidden h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium opacity-100 sm:flex">
              <span className="text-xs">⌘</span>K
            </kbd>
          </Button>
          <CommandDialog open={open} onOpenChange={setOpen}>
            <Command className="rounded-lg border shadow-md">
              <CommandInput
                placeholder="Search papers..."
                value={searchQuery}
                onValueChange={setSearchQuery}
              />
              <CommandList>
                <CommandEmpty>No results found.</CommandEmpty>
                <CommandGroup heading="Papers">
                  {filteredData.map((item) => (
                    <CommandItem
                      key={item.id}
                      onSelect={() => {
                        console.log("Selected:", item);
                        setOpen(false);
                      }}
                    >
                      <span>{item.name}</span>
                    </CommandItem>
                  ))}
                </CommandGroup>
              </CommandList>
            </Command>
          </CommandDialog>
        </div>
        <div className="flex gap-2 justify-between ">
          <ButtonLink href="dashboard/add-paper" variant="default">
            <PlusIcon className="h-4 w-4" />
            Add Paper
          </ButtonLink>

          <Button
            variant="outline"
            className="flex items-center gap-2 px-4 py-2"
          >
            <Download className="h-4 w-4" />
            Export
          </Button>
        </div>
      </div>

      <div className="rounded-lg shadow">
        <Table
          data={filteredData}
          onEdit={handleEdit}
          onDelete={handleDelete}
          onDownload={handleDownload}
        />
      </div>

      <PaginationDemo />
    </section>
  );
};

export default Default;
