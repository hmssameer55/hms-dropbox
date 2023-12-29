"use client";

import { FileType } from "@/typings";

import { ColumnDef } from "@tanstack/react-table";
import prettyBytes from "pretty-bytes";
import { FileIcon, defaultStyles } from "react-file-icon";
import { Skeleton } from "../ui/skeleton";
import { Download } from "lucide-react";
import { Button } from "../ui/button";

type Props = {
  resources: FileType[];
};

export const columns: ColumnDef<FileType>[] = [
  {
    accessorKey: "type",
    header: "type",
    cell: ({ renderValue, ...props }) => {
      const type = renderValue() as string;
      const extention = type.split("/")[1];
      return (
        <div className="w-10">
          <FileIcon
            extension={extention}
            labelColor={COLOR_EXTENSION_MAP[extention]}
            //@ts-ignore
            {...defaultStyles[extention]}
          />
        </div>
      );
    },
  },
  {
    accessorKey: "filename",
    header: "Filename",
  },
  {
    accessorKey: "timestamp",
    header: "Date Added",
  },
  {
    accessorKey: "size",
    header: "Size",
    cell: ({ renderValue, ...props }) => {
      return <span>{prettyBytes(renderValue() as number)}</span>;
    },
  },
  {
    accessorKey: "downloadURL",
    header: "Download",
    cell: ({ renderValue, ...props }) => {
      if (!renderValue()) return <Skeleton className="h-5 w-1/4" />;

      return (
        <Button
          variant={"ghost"}
          className="ml-2 hover:bg-white"
          onClick={() => window.open(renderValue() as string, "_blank")}
        >
          <Download size={25} className="text-blue-500" />
        </Button>
      );
    },
  },
];

const COLOR_EXTENSION_MAP: Record<string, string> = {
  pdf: "#ff0000",
  doc: "#2b579a",
  docx: "#2b579a",
  xls: "#2b579a",
  xlsx: "#2b579a",
  ppt: "#d24726",
  pptx: "#d24726",
  jpg: "#94592e",
  jpeg: "#94592e",
  png: "#94592e",
  gif: "#94592e",
  txt: "#008000",
  zip: "#008000",
  rar: "#008000",
  default: "#000000",
};
