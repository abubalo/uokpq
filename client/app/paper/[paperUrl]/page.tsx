"use client";
import React, { useEffect, useState } from "react";
import NotFound from "../../../components/ui/not-found";
import axios from "axios";
import { getPDF, savePDF } from "@/indexedDBUtils";

type Props = {
  params: {
    paperUrl?: string;
  };
};

const Papers = ({ params: { paperUrl } }: Props) => {
  const [pdfUrl, setPdfUrl] = useState<string | null>(null);

  useEffect(() => {
    const fetchPDF = async () => {
      if (!paperUrl) return;
      try {
        const cachePdf = await getPDF(paperUrl);
        if (cachePdf) {
          setPdfUrl(URL.createObjectURL(cachePdf));
        } else {
          const response = await axios.get<Blob>(
            `https://uokpq.com/papers/e/${paperUrl}.pdf`,
            { responseType: "blob" }
          );

          const blob = response.data;
          const reader = new FileReader();
          await savePDF(paperUrl, blob);
          setPdfUrl(URL.createObjectURL(blob));

          reader.onload = (e) => setPdfUrl(e.target?.result as string);
          reader.readAsDataURL(blob);
        }
      } catch (error) {
        console.log("Error fetching pdf: ", error);
        setPdfUrl(null);
      }
    };

    fetchPDF();
  }, [paperUrl]);

  if (!paperUrl) {
    return NotFound();
  }

  return (
    <main className="h-screen ">
      <div className="relative w-full h-full max-w-full max-h-full">
        <embed
          src={pdfUrl ?? "/pdfs/1984.pdf"}
          type="application/pdf"
          className="w-full h-full"
          style={{ height: "calc(100vh - 0px)" }} // Adjust height as needed
        ></embed>
      </div>
    </main>
  );
};

export default Papers;
