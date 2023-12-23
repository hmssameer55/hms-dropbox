import { ArrowRight } from "lucide-react";
import Link from "next/link";

export default function HomeBanner() {
  return (
    <div className="flex flex-col md:flex-row items-center justify-between bg-[#2b2929] dark:bg-slate-800 p-5 text-white">
      <div className="p-5 pb-10">
        <h1 className="text-5xl font-bold">HMS-Dropbox</h1>
        <div className="space-y-4 mt-8">
          <h2 className="text-4xl font-bold">Store your files in the cloud</h2>
          <p className="font-light">
            Enhance your personal storage with Dropbox, offering a simple and
            efficient way to upload, organize, and access files from anywhere.
            Securely store important documents and media, and experience the
            convenience of easy file management and sharing in one centralized
            solution.
          </p>
        </div>

        <Link
          href="/dashboard"
          className="flex items-center gap-4 p-5 bg-blue-500 w-fit mt-20"
        >
          Try for free
          <ArrowRight />
        </Link>
      </div>
      <div>
        <video loop muted autoPlay className="rounded-lg">
          <source
            src="https://aem.dropbox.com/cms/content/dam/dropbox/warp/en-us/overview/lp-header-graphite200-1920x1080.mp4"
            type="video/mp4"
          />
          your browser does not support the video tag
        </video>
      </div>
    </div>
  );
}
