import HomeBanner from "@/components/Home/HomeBanner";

export default function Home() {
  return (
    <main>
      <HomeBanner />
      <div className="flex flex-col items-center text-center mx-8 mt-4 space-y-2">
        <h3 className="font-semibold">Disclaimer</h3>
        <p>
          This video is made for informational and educational purposes only. We
          do not own or affiliate with Dropbox or/and any of its subsidiaries in
          any form. Copyright Disclaimer under section 107 of the Copyright Act
          1976, allowance is made for “fair use” of this video for education
          purposes.
        </p>
      </div>
    </main>
  );
}
