"use client";
import React, { useEffect, useState } from "react";
import NotFound from "../../../components/ui/not-found";
import axios from "axios";

type Props = {
  params: {
    paperId?: string;
  };
};

const Papers = ({ params: { paperId } }: Props) => {
  const [pdfUrl, setPdfUrl] = useState<string | null>(null);

  useEffect(() => {
    const fetchPDF = async () => {
      if (!paperId) return;
      try {
        const cachePdf = await getPDF(paperId);

        if (cachePdf) {
          setPdfUrl(URL.createObjectURL(cachePdf));
        } else {
          const response = await axios.get<Blob>(
            `https://uokpq.com/papers/e/${paperId}.pdf`,
            { responseType: "blob" }
          );

          const blob = response.data;
          const reader = new FileReader();
          await savePDF(paperId, blob);
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
  }, [paperId]);

  if (!paperId) {
    return NotFound();
  }

  return (
    <div className="conatiner mx-auto h-dvh">
      <div className="">
        <embed
          src={pdfUrl ?? "/pdfs/mapreduce-osdi04.pdf"}
          type="application/pdf"
          width="100%"
          height="500"
          className="w-full h-dvh"
        ></embed>
      </div>
    </div>
  );
};

export default Papers;
