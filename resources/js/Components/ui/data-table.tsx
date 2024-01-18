import { useState } from "react";
import { router } from "@inertiajs/react";
import {
    ColumnDef,
    ColumnFiltersState,
    Row,
    SortingState,
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    useReactTable,
} from "@tanstack/react-table";

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/Components/ui/table";

import { Button } from "@/Components/ui/button";
import { Input } from "@/Components/ui/input";

interface DataTableProps<TData, TValue> {
    columns: ColumnDef<TData, TValue>[];
    data: TData[];
    showPagination?: boolean;
    onRowClick?: (row: TData) => void;
}

export function DataTable<TData, TValue>({
    columns,
    data,
    showPagination = true,
    onRowClick,
}: DataTableProps<TData, TValue>) {
    const [sorting, setSorting] = useState<SortingState>([]);
    const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);

    const clickable = !!onRowClick;

    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: showPagination
            ? getPaginationRowModel()
            : undefined,
        onSortingChange: setSorting,
        getSortedRowModel: getSortedRowModel(),
        onColumnFiltersChange: setColumnFilters,
        getFilteredRowModel: getFilteredRowModel(),
        enableRowSelection: clickable,
        state: {
            sorting,
            columnFilters,
        },
    });

    const renderRows = (rows: Row<TData>[]) => {
        if (!rows.length) {
            return (
                <TableRow>
                    <TableCell
                        colSpan={columns.length}
                        className="h-24 text-center"
                    >
                        No results.
                    </TableCell>
                </TableRow>
            );
        }

        return rows.map((row) => (
            <TableRow
                onClick={() => onRowClick && onRowClick(row.original)}
                key={row.id}
                data-state={row.getIsSelected() && "selected"}
                className={clickable ? "cursor-pointer" : ""}
            >
                {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                        {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext()
                        )}
                    </TableCell>
                ))}
            </TableRow>
        ));
    };

    return (
        <div>
            <div className="rounded-md border">
                <Table>
                    <TableHeader>
                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow key={headerGroup.id}>
                                {headerGroup.headers.map((header) => {
                                    return (
                                        <TableHead key={header.id}>
                                            {header.isPlaceholder
                                                ? null
                                                : flexRender(
                                                      header.column.columnDef
                                                          .header,
                                                      header.getContext()
                                                  )}
                                        </TableHead>
                                    );
                                })}
                            </TableRow>
                        ))}
                    </TableHeader>
                    <TableBody>
                        {renderRows(table.getRowModel().rows)}
                    </TableBody>
                </Table>
            </div>
            {showPagination && (
                <div className="flex items-center justify-end space-x-2 p-4">
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => table.previousPage()}
                        disabled={!table.getCanPreviousPage()}
                    >
                        Previous
                    </Button>
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => table.nextPage()}
                        disabled={!table.getCanNextPage()}
                    >
                        Next
                    </Button>
                </div>
            )}
        </div>
    );
}
