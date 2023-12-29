"use client";

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Trash } from "lucide-react";
import { useAppStore } from "@/store/store";
import { FileType } from "@/typings";
import { DeleteModal } from "../modals/DeleteModal";
import { useUser } from "@clerk/nextjs";
import { deleteObject, ref } from "firebase/storage";
import { db, storage } from "@/FirebaseHelper";
import { deleteDoc, doc } from "firebase/firestore";
import { Button } from "../ui/button";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}

export function DataTable<TData, TValue>({
  columns,
  data,
}: DataTableProps<TData, TValue>) {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  const { user } = useUser();

  const [fileId, setFileId, isDeleteModalOpen, setIsDeleteModalOpen] =
    useAppStore((state) => [
      state.fileId,
      state.setFileId,
      state.isDeleteModalOpen,
      state.setIsDeleteModalOpen,
    ]);

  const openDeleteModal = (id: string) => {
    setFileId(id);
    setIsDeleteModalOpen(true);
  };

  const handleDelete = () => {
    if (!user) return console.error("User not found");

    const fileRef = ref(storage, `users/${user?.id}/files/${fileId}`);

    try {
      deleteObject(fileRef).then(async () => {
        deleteDoc(doc(db, "users", user.id, "files", fileId));
      });
    } catch (error) {
      console.error(error);
    } finally {
      setIsDeleteModalOpen(false);
    }
  };

  return (
    <div className="rounded-md border max-h-[45vh] overflow-y-auto">
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
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                );
              })}
              <TableHead />
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow
                key={row.id}
                data-state={row.getIsSelected() && "selected"}
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell
                    key={cell.id}
                    className={`${
                      cell.column.id == "timestamp" && "min-w-[140px]"
                    }`}
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}

                <TableCell key={(row.original as FileType).id}>
                  <Button
                    variant={"ghost"}
                    className="border rounded-sm hover:bg-white hover:text-red-500"
                  >
                    <Trash
                      size={22}
                      onClick={() =>
                        openDeleteModal((row.original as FileType).id)
                      }
                    />
                  </Button>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
                No results.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
      <DeleteModal onDelete={handleDelete} />
    </div>
  );
}
