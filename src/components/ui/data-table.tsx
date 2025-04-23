import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Plus, Pencil, Trash2, Search, Filter } from "lucide-react";

export interface DataTableColumn {
  header: string;
  accessorKey: string;
  cell?: (value: any, row: any) => React.ReactNode;
}

interface DataTableProps<T> {
  title: string;
  description?: string;
  columns: DataTableColumn[];
  data: T[];
  isLoading?: boolean;
  onSearch?: (searchTerm: string) => void;
  onFilter?: (filterValue: string) => void;
  onPageChange?: (page: number) => void;
  onAdd?: () => void;
  onEdit?: (row: T) => void;
  onDelete?: (row: T) => void;
  renderForm?: (row?: T, onClose?: () => void) => React.ReactNode;
  totalItems?: number;
  pageSize?: number;
  currentPage?: number;
  filterOptions?: { label: string; value: string }[];
}

export function DataTable<T extends Record<string, any>>(
  props: DataTableProps<T>,
) {
  const {
    title,
    description,
    columns,
    data = [],
    isLoading = false,
    onSearch,
    onFilter,
    onPageChange,
    onAdd,
    onEdit,
    onDelete,
    renderForm,
    totalItems = 0,
    pageSize = 10,
    currentPage = 1,
    filterOptions = [
      { label: "All", value: "all" },
      { label: "Active", value: "active" },
      { label: "Inactive", value: "inactive" },
    ],
  } = props;

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedRow, setSelectedRow] = useState<T | undefined>(undefined);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  const totalPages = Math.ceil(totalItems / pageSize);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);
    if (onSearch) {
      onSearch(value);
    }
  };

  const handleFilter = (value: string) => {
    if (onFilter) {
      onFilter(value);
    }
  };

  const handleAdd = () => {
    if (onAdd) {
      onAdd();
    }
    setIsAddDialogOpen(true);
  };

  const handleEdit = (row: T) => {
    setSelectedRow(row);
    if (onEdit) {
      onEdit(row);
    }
    setIsEditDialogOpen(true);
  };

  const handleDelete = (row: T) => {
    setSelectedRow(row);
    setIsDeleteDialogOpen(true);
  };

  const confirmDelete = () => {
    if (onDelete && selectedRow) {
      onDelete(selectedRow);
    }
    setIsDeleteDialogOpen(false);
  };

  return (
    <div className="w-full bg-background rounded-lg border border-border/40 shadow-sm">
      <div className="p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-xl font-semibold">{title}</h2>
            {description && (
              <p className="text-sm text-muted-foreground mt-1">
                {description}
              </p>
            )}
          </div>
          <div className="flex items-center gap-2">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search..."
                value={searchTerm}
                onChange={handleSearch}
                className="pl-9 w-[200px] md:w-[300px]"
              />
            </div>
            <Select defaultValue="all" onValueChange={handleFilter}>
              <SelectTrigger className="w-[120px]">
                <SelectValue placeholder="Filter" />
              </SelectTrigger>
              <SelectContent>
                {filterOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {renderForm && (
              <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
                <DialogTrigger asChild>
                  <Button onClick={handleAdd} className="gap-1">
                    <Plus className="h-4 w-4" /> Add New
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[600px]">
                  <DialogHeader>
                    <DialogTitle>Add New {title.slice(0, -1)}</DialogTitle>
                    <DialogDescription>
                      Fill in the details to create a new record.
                    </DialogDescription>
                  </DialogHeader>
                  {renderForm(undefined, () => setIsAddDialogOpen(false))}
                </DialogContent>
              </Dialog>
            )}
          </div>
        </div>

        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                {columns.map((column, index) => (
                  <TableHead key={index}>{column.header}</TableHead>
                ))}
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading ? (
                <TableRow>
                  <TableCell
                    colSpan={columns.length + 1}
                    className="text-center py-10"
                  >
                    Loading...
                  </TableCell>
                </TableRow>
              ) : data.length > 0 ? (
                data.map((row, rowIndex) => (
                  <TableRow key={rowIndex}>
                    {columns.map((column, cellIndex) => (
                      <TableCell key={cellIndex}>
                        {column.cell
                          ? column.cell(row[column.accessorKey], row)
                          : row[column.accessorKey]}
                      </TableCell>
                    ))}
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        {renderForm && (
                          <Dialog
                            open={isEditDialogOpen && selectedRow === row}
                            onOpenChange={(open) => {
                              if (!open) setSelectedRow(undefined);
                              setIsEditDialogOpen(open);
                            }}
                          >
                            <DialogTrigger asChild>
                              <Button
                                variant="outline"
                                size="icon"
                                onClick={() => handleEdit(row)}
                              >
                                <Pencil className="h-4 w-4" />
                              </Button>
                            </DialogTrigger>
                            <DialogContent className="sm:max-w-[600px]">
                              <DialogHeader>
                                <DialogTitle>
                                  Edit {title.slice(0, -1)}
                                </DialogTitle>
                                <DialogDescription>
                                  Update the details of this record.
                                </DialogDescription>
                              </DialogHeader>
                              {renderForm(row, () => {
                                setIsEditDialogOpen(false);
                                setSelectedRow(undefined);
                              })}
                            </DialogContent>
                          </Dialog>
                        )}

                        <AlertDialog
                          open={isDeleteDialogOpen && selectedRow === row}
                          onOpenChange={(open) => {
                            if (!open) setSelectedRow(undefined);
                            setIsDeleteDialogOpen(open);
                          }}
                        >
                          <AlertDialogTrigger asChild>
                            <Button
                              variant="outline"
                              size="icon"
                              className="text-destructive hover:bg-destructive/10"
                              onClick={() => handleDelete(row)}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>
                                Delete {title.slice(0, -1)}
                              </AlertDialogTitle>
                              <AlertDialogDescription>
                                Are you sure you want to delete this record?
                                This action cannot be undone.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Cancel</AlertDialogCancel>
                              <AlertDialogAction
                                onClick={confirmDelete}
                                className="bg-destructive hover:bg-destructive/90"
                              >
                                Delete
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={columns.length + 1}
                    className="text-center py-10"
                  >
                    No data available
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>

        {totalPages > 1 && (
          <div className="mt-4 flex justify-center">
            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious
                    onClick={() =>
                      onPageChange && onPageChange(Math.max(currentPage - 1, 1))
                    }
                    className={
                      currentPage === 1 ? "pointer-events-none opacity-50" : ""
                    }
                  />
                </PaginationItem>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                  (page) => (
                    <PaginationItem key={page}>
                      <PaginationLink
                        isActive={currentPage === page}
                        onClick={() => onPageChange && onPageChange(page)}
                      >
                        {page}
                      </PaginationLink>
                    </PaginationItem>
                  ),
                )}
                <PaginationItem>
                  <PaginationNext
                    onClick={() =>
                      onPageChange &&
                      onPageChange(Math.min(currentPage + 1, totalPages))
                    }
                    className={
                      currentPage === totalPages
                        ? "pointer-events-none opacity-50"
                        : ""
                    }
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </div>
        )}
      </div>
    </div>
  );
}
