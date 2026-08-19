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
  subMonths,
} from "date-fns";
import { id } from "date-fns/locale";

function generateMonthOptions() {
  const options: { label: string; value: string }[] = [];
  const now = new Date();
  const start = new Date(2026, 0, 1);
  let cursor = start;
  while (cursor <= now) {
    options.push({
      label: format(cursor, "MMMM yyyy", { locale: id }),
      value: format(cursor, "yyyy-MM"),
    });
    cursor = subMonths(cursor, -1);
  }
  return options.reverse();
}

const MONTH_OPTIONS = generateMonthOptions();

export function MonthFilter({
  startDate,
  endDate,
  onChange,
}: {
  startDate: string;
  endDate: string;
  onChange: (range: { startDate: string; endDate: string }) => void;
}) {
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
          {MONTH_OPTIONS.map((opt) => (
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
