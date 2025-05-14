"use client";
import React, { useState } from "react";
import NotFound from "@/components/ui/not-found";
import AnimatedBoxes from "@/components/ui/loader/CustomLoader";
import { usePaper } from "@/hooks/usePaperQueries";
import { getPDF } from "@/indexedDBUtils";

type Props = {
  params: {
    paperUrl?: string;
  };
};

const PDFContent: React.FC<{ url: string }> = async ({ url }) => {
  const [pdfUrl, setPdfUrl] = useState<string | null>(null);
  const { data, error, isLoading } = usePaper(url);

  if (!data) {
    return <NotFound />;
  }

  if (error) {
    return <p>Error loading PDF: {error.toString()}</p>;
  }

  if (isLoading) {
    return <AnimatedBoxes />;
  }

  // try {
  //   const cachedPDF = await getPDF(data.filePath);

  //   if (cachedPDF) {
  //     setPdfUrl(URL.createObjectURL(cachedPDF));
  //   }
  // } catch (error) {}

  return (
    <div className="relative w-full h-full max-w-full max-h-full">
      {pdfUrl ? (
        <embed
          src={pdfUrl}
          type="application/pdf"
          className="w-full h-full"
          style={{ height: "calc(100vh - 0px)" }}
        />
      ) : (
        <AnimatedBoxes />
      )}
    </div>
  );
};

const Paper: React.FC<Props> = ({ params: { paperUrl } }) => {
  if (!paperUrl) {
    return <NotFound />;
  }

  return (
    <main className="h-screen">
      <PDFContent url={paperUrl} />
    </main>
  );
};

export default Paper;
