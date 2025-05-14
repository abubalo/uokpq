"use client";
import { useEffect, useState } from "react";
import axios, { AxiosError } from "axios";
import { getPDF, savePDF } from "@/indexedDBUtils";

export const usePdfFetcher = (paperUrl: string | undefined) => {
  const [pdfUrl, setPdfUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPDF = async () => {
      if (!paperUrl) {
        setIsLoading(false);
        return;
      }

      try {
        const cachedPdf = await getPDF(paperUrl);
        if (cachedPdf) {
          setPdfUrl(URL.createObjectURL(cachedPdf));
        } else {
          const response = await axios.get<Blob>(
            "https://pub-2fe06c28f94d40f3ba92e350ada984e5.r2.dev/lorem-ipsum.pdf",
            { responseType: "blob" }
          );

          const blob = response.data;
          await savePDF(paperUrl, blob);
          setPdfUrl(URL.createObjectURL(blob));
        }
      } catch (error) {
        const errorMessage =
          error instanceof AxiosError ? error.message : String(error);
        console.log("Error fetching pdf: ", errorMessage);
        setError(errorMessage);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPDF();
  }, [paperUrl]);

  return { pdfUrl, isLoading, error };
};
