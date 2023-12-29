import React from "react";
import Dropbox from "@/components/Dropzone/Dropbox";
import { collection, getDocs } from "firebase/firestore";
import { auth } from "@clerk/nextjs";
import { db } from "@/FirebaseHelper";
import { FileType } from "@/typings";
import TableWrapper from "@/components/Dashboard/TableWrapper";

export default async function page() {
  const { userId } = auth();

  const Resources = await getDocs(collection(db, "users", userId!, "files"));

  const skeletonFiles: FileType[] = Resources.docs.map((doc) => ({
    id: doc.id,
    filename: doc.data().filename || doc.id,
    timestamp: new Date(
      doc.data().timestamp.seconds * 1000
    ).toLocaleDateString(),
    username: doc.data().username || "",
    downloadURL: doc.data().downloadURL,
    type: doc.data().type,
    size: doc.data().size,
  }));

  return (
    <div className="border-t border-gray-200 dark:border-gray-700">
      <Dropbox />
      <section>
        <TableWrapper resources={skeletonFiles} />
      </section>
    </div>
  );
}
