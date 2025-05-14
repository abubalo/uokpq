import React, { useEffect, useRef } from "react";
const pdfjsLib = require("pdfjs-dist/build/pdf");
import 'pdfjs-dist/web/pdf_viewer.css';

pdfjsLib.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.js`;

type Props = {
  paperUrl: string;
};

const PDFViewer: React.FC<Props> = ({ paperUrl }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const renderPDF = async () => {
      if (!canvasRef.current) return;
      
      const loadingTask = pdfjsLib.getDocument(paperUrl);
      const pdf = await loadingTask.promise;
      const page = await pdf.getPage(1);

      const viewport = page.getViewport({ scale: 1 });
      const canvas = canvasRef.current;
      const context = canvas.getContext("2d");

      canvas.height = viewport.height;
      canvas.width = viewport.width;

      const renderContext = {
        canvasContext: context,
        viewport,
      };

      await page.render(renderContext).promise;
    };

    renderPDF();
  }, [paperUrl]);

  return <canvas ref={canvasRef} />;
};

export default PDFViewer;

