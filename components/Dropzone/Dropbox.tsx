"use client";

import { cn } from "@/lib/utils";
import Dropzone from "react-dropzone";
import { useState } from "react";
import {
  addDoc,
  collection,
  doc,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";
import { useUser } from "@clerk/nextjs";
import { db, storage } from "@/FirebaseHelper";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

export default function Dropbox() {
  const [loading, setLoading] = useState(false);

  const { user } = useUser();

  const maxSize = 2097152;

  const onDrop = (acceptedFiles: File[]) => {
    acceptedFiles.forEach((file) => {
      const reader = new FileReader();
      reader.onabort = () => console.log("file reading was aborted");
      reader.onerror = () => console.log("file reading has failed");
      reader.onload = async () => {
        await uploadFile(file);
      };
      reader.readAsArrayBuffer(file);
    });
  };

  const uploadFile = async (file: File) => {
    if (loading) return;

    if (!user) return console.error("User not found");

    try {
      setLoading(true);

      const docRef = await addDoc(collection(db, "users", user.id, "files"), {
        userId: user?.id,
        filename: file.name,
        username: user?.fullName,
        profileImg: user?.imageUrl,
        timestamp: serverTimestamp(),
        type: file.type,
        size: file.size,
      });

      const imageRef = ref(storage, `users/${user?.id}/files/${docRef.id}`);

      uploadBytes(imageRef, file).then(async (snapshot) => {
        const downloadURL = await getDownloadURL(imageRef);

        await updateDoc(doc(db, "users", user.id, "files", docRef.id), {
          downloadURL,
        });
      });
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dropzone onDrop={onDrop} maxSize={maxSize}>
      {({
        getRootProps,
        getInputProps,
        isDragActive,
        isDragReject,
        fileRejections,
      }) => {
        const isFileTooLarge =
          fileRejections.length > 0 && fileRejections[0].file.size > maxSize;

        return (
          <section className="m-4">
            <div
              {...getRootProps()}
              className={cn(
                "w-full cursor-pointer h-56 flex justify-center items-center border-2 border-dashed rounded-lg text-center",
                isDragActive
                  ? "bg-[#035FFE] text-white animate-pulse"
                  : "bg-slate-100/50 dark:bg-slate-800/80 text-slate-400"
              )}
            >
              <input {...getInputProps()} />
              {!isDragActive && "Click here or drop a file to upload!"}
              {isDragActive && !isDragReject && "Drop it like it's hot!"}
              {isDragReject && "File type not accepted, sorry!"}
              {isFileTooLarge && (
                <div className="bg-red-500 text-white">File is too large.</div>
              )}
            </div>
          </section>
        );
      }}
    </Dropzone>
  );
}
