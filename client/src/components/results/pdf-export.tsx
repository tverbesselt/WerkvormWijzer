"use client";

import React from "react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { Button } from "@/components/ui/button";
import { Download, Loader2 } from "lucide-react";

interface PDFExportProps {
    targetRef: React.RefObject<HTMLElement | null>;
    fileName?: string;
}

export function PDFExportButton({ targetRef, fileName = "werkvorm-advies.pdf" }: PDFExportProps) {
    const [loading, setLoading] = React.useState(false);

    const handleDownload = async () => {
        if (!targetRef.current) return;

        setLoading(true);
        try {
            const element = targetRef.current;
            const canvas = await html2canvas(element, {
                scale: 2, // Higher resolution
                useCORS: true,
                logging: false,
                backgroundColor: "#ffffff"
            });

            const imgData = canvas.toDataURL("image/png");
            const pdf = new jsPDF({
                orientation: "portrait",
                unit: "mm",
                format: "a4",
            });

            const imgWidth = 210; // A4 width in mm
            const pageHeight = 297;
            const imgHeight = (canvas.height * imgWidth) / canvas.width;

            let heightLeft = imgHeight;
            let position = 0;

            pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
            heightLeft -= pageHeight;

            // Handle multi-page if content is long
            while (heightLeft >= 0) {
                position = heightLeft - imgHeight;
                pdf.addPage();
                pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
                heightLeft -= pageHeight;
            }

            pdf.save(fileName);
        } catch (error) {
            console.error("PDF Fail:", error);
            alert("Er ging iets mis bij het genereren van de PDF.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <Button onClick={handleDownload} variant="outline" disabled={loading} className="gap-2">
            {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Download className="h-4 w-4" />}
            Download PDF
        </Button>
    );
}
