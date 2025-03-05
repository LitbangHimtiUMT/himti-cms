import { formatTime } from "@features/_global/lib/FormatTime";
import { useAttendance } from "@features/attendances/hooks/useAttendance";
import { useMeetingById } from "@features/event-meeting/hooks/useMeeting";
import jsPDF from "jspdf";
import autoTable, { RowInput } from "jspdf-autotable";
import { useState } from "react";
import {
  FaChevronDown,
  FaChevronUp,
  FaFileExcel,
  FaFilePdf,
} from "react-icons/fa";
import * as XLSX from "xlsx";

interface PayloadPrint {
  No: number;
  Name: string;
  NIM: string;
  Time: string;
  Location: string;
  Point: number;
}

export const DropdownPrint = () => {
  const { data: attendances } = useAttendance({
    perPage: 9999,
    page: 1,
  });

  const { data: meeting } = useMeetingById();
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  // Cetak Excel
  const handleExportExcel = () => {
    const worksheetData = attendances?.data?.map((row, index) => ({
      No: index + 1,
      Name: row.user.name,
      NIM: row.user.nim,
      Time: formatTime(row.createdAt),
      Location: row.location,
    }));

    const worksheet = XLSX.utils.json_to_sheet([
      ...(worksheetData as PayloadPrint[]),
    ]);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(
      workbook,
      worksheet,
      `${meeting?.data?.name?.slice(0, 31)}`
    );

    const excelBuffer = XLSX.write(workbook, {
      bookType: "xlsx",
      type: "array",
    });
    const blob = new Blob([excelBuffer], { type: "application/octet-stream" });

    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "report.xlsx";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Cetak PDF
  const handleExportPDF = () => {
    const doc = new jsPDF();

    // Menambahkan judul dengan posisi yang tepat
    doc.text(`Attendance Report ${meeting?.data?.name}`, 14, 20);

    const rows = attendances?.data?.map((row, index) => [
      index + 1,
      row.user.name,
      row.user.nim,
      formatTime(row.createdAt),
      row.location,
    ]);
    autoTable(doc, {
      startY: 30,
      head: [["No", "Name", "NIM", "Time", "Location"]],
      body: [...(rows as RowInput[])],
      theme: "striped",
      headStyles: { fillColor: [41, 128, 185] },
      styles: { halign: "center" },
      columnStyles: {
        0: { halign: "center", cellWidth: 20 },
        1: { halign: "center", cellWidth: 40 },
        2: { halign: "center", cellWidth: 35 },
        3: { halign: "center", cellWidth: 25 },
      },
    });

    const pdfBlob = doc.output("blob");

    const link = document.createElement("a");
    link.href = URL.createObjectURL(pdfBlob);
    link.download = "report.pdf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="relative text-right">
      <button
        type="button"
        className="inline-flex items-center text-sm justify-center text-white px-3 py-2 bg-gray-900 rounded-md hover:opacity-90 focus:outline-none"
        onClick={toggleDropdown}
      >
        Options
        {isOpen ? (
          <FaChevronUp className="ml-2 -mr-1" />
        ) : (
          <FaChevronDown className="ml-2 -mr-1" />
        )}
      </button>
      {isOpen && (
        <div
          className="origin-top-left absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
          role="menu"
          aria-orientation="vertical"
          aria-labelledby="options-menu"
        >
          <div className="py-1" role="none">
            <button
              className="text-gray-700 flex items-center px-4 py-2 text-sm hover:bg-gray-100 w-full"
              role="menuitem"
              onClick={handleExportPDF}
            >
              <FaFilePdf className="mr-2 text-red-600" />
              Print PDF
            </button>
            <button
              className="text-gray-700 flex items-center px-4 py-2 text-sm hover:bg-gray-100 w-full"
              role="menuitem"
              onClick={handleExportExcel}
            >
              <FaFileExcel className="mr-2 text-green-600" />
              Print Excel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
