"use client";

import { useEffect, useState } from "react";
import { DataTable } from "./Table";
import { FileType } from "@/typings";
import { columns } from "./columns";
import { Button } from "../ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useCollection } from "react-firebase-hooks/firestore";
import { useUser } from "@clerk/nextjs";
import { collection, orderBy, query } from "firebase/firestore";
import { db } from "@/FirebaseHelper";
import moment from "moment";

type Props = {
  resources: FileType[];
};

export default function TableWrapper({ resources }: Props) {
  const { user } = useUser();

  const [sortBy, setSortBy] = useState<"asc" | "desc">("asc");

  const [realTimeResources, setResources] = useState<FileType[]>([]);

  const [docs, loading, error] = useCollection(
    user &&
      query(
        collection(db, "users", user.id, "files"),
        orderBy("timestamp", sortBy)
      )
  );

  useEffect(() => {
    if (!docs) return;

    const files: FileType[] = docs.docs.map((doc) => ({
      id: doc.id,
      filename: doc.data().filename || doc.id,
      timestamp: moment(doc.data()?.timestamp?.seconds * 1000).format(
        "ll - h:mm a"
      ),
      username: doc.data().username || "",
      downloadURL: doc.data().downloadURL,
      type: doc.data().type,
      size: doc.data().size,
    }));
    setResources(files);
  }, [docs]);

  if (docs?.docs.length === undefined) {
    return (
      <div className="mx-10">
        <h5 className="text-xl font-bold">Your Files</h5>
        <div className="flex flex-col">
          <Button
            className="flex items-end ml-auto w-36 h-10 mb-5"
            variant={"outline"}
          >
            <Skeleton className="h-5 w-full bg-gray-200 dark:bg-gray-700" />
          </Button>

          <div className="border rounded-lg">
            <div className="border-b h-12" />
            {resources.map((file) => (
              <div
                key={file.id}
                className="flex items-center space-x-4  w-full p-5"
              >
                <Skeleton className="h-12 w-12" />
                <Skeleton className="h-12 w-full" />
              </div>
            ))}
            {resources.length == 0 && (
              <div className="flex items-center space-x-4 w-full p-5">
                <Skeleton className="h-12 w-12" />
                <Skeleton className="h-12 w-full" />
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-8 md:mx-10">
      <h5 className="text-xl font-bold">Your Files</h5>
      <Button
        className="flex items-end ml-auto w-36 h-10 mb-5"
        onClick={() => setSortBy(sortBy === "asc" ? "desc" : "asc")}
        variant={"outline"}
      >
        Sort by {sortBy === "asc" ? "newest" : "oldest"}
      </Button>
      <DataTable columns={columns} data={realTimeResources} />
    </div>
  );
}
