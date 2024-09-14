"use client";
import React, { useEffect, useState } from "react";
import NotFound from "../../../components/ui/not-found";
import axios, { AxiosError } from "axios";
import { getPDF, savePDF } from "@/indexedDBUtils";

type Props = {
  params: {
    paperUrl?: string;
  };
};

const Paper = ({ params: { paperUrl } }: Props) => {
  const [pdfUrl, setPdfUrl] = useState<string | null>(null);

  useEffect(() => {
    const fetchPDF = async () => {
      if (!paperUrl) return;
      try {
        const cachedPdf = await getPDF(paperUrl);
        if (cachedPdf) {
          setPdfUrl(URL.createObjectURL(cachedPdf));
        } else {
          const response = await axios.get<Blob>(
            "https://pub-2fe06c28f94d40f3ba92e350ada984e5.r2.dev/dummy.pdf",
            { responseType: "blob" }
          );

          const blob = response.data;
          await savePDF(paperUrl, blob);
          setPdfUrl(URL.createObjectURL(blob));
        }
      } catch (error) {
        const errorMessage =
          error instanceof AxiosError ? error.message : error;
        console.log("Error fetching pdf: ", errorMessage);
        setPdfUrl(null);
      }
    };

    fetchPDF();
  }, [paperUrl]);

  if (!paperUrl) {
    return NotFound();
  }

  return (
    <main className="h-screen">
      <div className="relative w-full h-full max-w-full max-h-full">
        {pdfUrl ? (
          <embed
            src={pdfUrl}
            type="application/pdf"
            className="w-full h-full"
            style={{ height: "calc(100vh - 0px)" }}
          />
        ) : (
          <p>Loading PDF...</p>
        )}
      </div>
    </main>
  );
};

export default Paper;
