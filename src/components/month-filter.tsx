import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  endOfMonth,
  format,
  getDaysInMonth,
  startOfMonth,
} from "date-fns";
import { id } from "date-fns/locale";

function generateMonthOptions(tahun: string) {
  const options: { label: string; value: string }[] = [];
  const year = Number(tahun);
  const now = new Date();
  const lastMonth = year === now.getFullYear() ? now.getMonth() : 11;
  for (let month = 0; month <= lastMonth; month++) {
    const date = new Date(year, month, 1);
    options.push({
      label: format(date, "MMMM yyyy", { locale: id }),
      value: format(date, "yyyy-MM"),
    });
  }
  return options;
}

export function defaultDateRange(tahun: string) {
  const year = Number(tahun);
  if (year < new Date().getFullYear()) {
    return { startDate: `${year}-12-01`, endDate: `${year}-12-31` };
  }
  return {
    startDate: format(new Date(), "yyyy-MM-01"),
    endDate: format(new Date(), "yyyy-MM-dd"),
  };
}

export function MonthFilter({
  startDate,
  endDate,
  tahun,
  onChange,
}: {
  startDate: string;
  endDate: string;
  tahun: string;
  onChange: (range: { startDate: string; endDate: string }) => void;
}) {
  const monthOptions = generateMonthOptions(tahun);
  const selectedMonth = (() => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const isFullMonth =
      start.getDate() === 1 &&
      end.getDate() === getDaysInMonth(start) &&
      start.getMonth() === end.getMonth() &&
      start.getFullYear() === end.getFullYear();
    return isFullMonth ? format(start, "yyyy-MM") : "custom";
  })();

  function setMonth(yearMonth: string) {
    const date = new Date(yearMonth + "-01");
    onChange({
      startDate: format(startOfMonth(date), "yyyy-MM-dd"),
      endDate: format(endOfMonth(date), "yyyy-MM-dd"),
    });
  }

  return (
    <div className="flex flex-wrap items-center gap-2">
      <Select
        value={selectedMonth}
        onValueChange={(val) => {
          if (val !== "custom") setMonth(val);
        }}
      >
        <SelectTrigger className="w-44">
          <SelectValue placeholder="Pilih bulan" />
        </SelectTrigger>
        <SelectContent>
          {selectedMonth === "custom" && (
            <SelectItem value="custom" disabled>
              Rentang kustom
            </SelectItem>
          )}
          {monthOptions.map((opt) => (
            <SelectItem key={opt.value} value={opt.value}>
              {opt.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <span className="text-muted-foreground text-sm">atau</span>
      <Input
        value={startDate}
        type="date"
        className="w-40"
        onChange={(e) => onChange({ startDate: e.target.value, endDate })}
      />
      <span className="text-muted-foreground text-sm">s.d.</span>
      <Input
        type="date"
        value={endDate}
        className="w-40"
        onChange={(e) => onChange({ startDate, endDate: e.target.value })}
      />
    </div>
  );
}
