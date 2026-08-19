import { saveAs } from "file-saver";
import * as XLSX from "xlsx";
import { format } from "date-fns";
import { Button } from "@/components/ui/button";
import { FaFileExcel } from "react-icons/fa6";
import { RouterOutputs } from "@/trpc/react";

type DataType = RouterOutputs["belanja"]["getBelanjaLrabyKodeRekening"];

const ExcelExport = ({
  data,
  kodeRekening,
  startDate,
  endDate,
}: {
  data: DataType;
  kodeRekening: string;
  startDate: Date;
  endDate: Date;
}) => {
  const exportToExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, kodeRekening);
    const excelBuffer = XLSX.write(workbook, {
      bookType: "xlsx",
      type: "array",
    });
    const blob = new Blob([excelBuffer], {
      type: "application/octet-stream",
    });

    const now = format(new Date(), "yyyyMMddHHmmss");
    const startDateStr = format(startDate, "yyyyMMdd");
    const endDateStr = format(endDate, "yyyyMMdd");

    saveAs(
      blob,
      `Realisasi ${kodeRekening} ${startDateStr}-${endDateStr}_${now}.xlsx`,
    );
  };

  return (
    <Button className="bg-green-500" onClick={exportToExcel}>
      <FaFileExcel className="mr-2" /> Excel
    </Button>
  );
};

export default ExcelExport;
