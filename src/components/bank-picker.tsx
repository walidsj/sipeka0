import { Button } from "@/components/ui/button";
import { api } from "@/trpc/react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import React from "react";
import { cn } from "@/lib/utils";
import { useDebounce } from "use-debounce";
import { Input } from "@/components/ui/input";
import { keepPreviousData } from "@tanstack/react-query";
import { Spinner } from "@/components/ui/spinner";

export default function BankPicker({
  value,
  onValueChange,
  defaultValue,
}: {
  value?: number | undefined;
  onValueChange?: (value: number | undefined) => void;
  defaultValue?: number;
}) {
  const [selected, setSelected] = React.useState<number | undefined>(
    value ?? defaultValue ?? 0,
  );

  const bankSelected = api.bank.getById.useQuery(selected!, {
    enabled: !!selected,
    placeholderData: keepPreviousData,
  });

  const [search, setSearch] = React.useState<string>("");
  const [searchValue] = useDebounce(search, 300);

  const bank = api.bank.getAll.useQuery(
    { search: searchValue },
    { placeholderData: keepPreviousData },
  );

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          type="button"
          variant="outline"
          className={cn(
            "w-full justify-start bg-slate-100 text-sm font-normal",
            selected && "h-auto min-h-12",
          )}
        >
          {selected !== undefined && (
            <div>
              {bankSelected.isSuccess && bankSelected.data && (
                <div className="flex items-center gap-3">
                  <img
                    src="/images/icons/bank.png"
                    alt="bank"
                    className="h-10 w-10"
                  />
                  <div className="flex flex-col text-left">
                    <span className="line-clamp-1">
                      {bankSelected.data.nama}
                    </span>
                    <span className="line-clamp-1 text-xs text-slate-500">
                      {bankSelected.data.kode}
                    </span>
                  </div>
                </div>
              )}
              {bankSelected.isLoading && (
                <div className="flex items-center gap-3">
                  <Spinner />
                </div>
              )}
            </div>
          )}
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Pilih Bank</DialogTitle>
          <DialogDescription>Referensi bank untuk transaksi</DialogDescription>
        </DialogHeader>
        <Input
          placeholder="Cari bank..."
          onChange={(e) => setSearch(e.target.value)}
        />
        <div className="max-h-96 overflow-y-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-1">No.</TableHead>
                <TableHead>Nama Bank</TableHead>
                <TableHead className="text-center">Kode Bank</TableHead>
                <TableHead className="w-1">Aksi</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {bank.isSuccess &&
                bank.data?.map((item, index) => (
                  <TableRow
                    key={index}
                    className={cn(
                      selected === item.id &&
                        "bg-yellow-100 hover:bg-yellow-200",
                    )}
                  >
                    <TableCell className="text-center">{index + 1}.</TableCell>
                    <TableCell>{item.nama}</TableCell>
                    <TableCell className="text-center">{item.kode}</TableCell>
                    <TableCell>
                      {selected === item.id ? (
                        <Button
                          variant="destructive"
                          onClick={() => {
                            setSelected(undefined);
                            onValueChange?.(undefined);
                          }}
                        >
                          Batal
                        </Button>
                      ) : (
                        <Button
                          variant="outline"
                          onClick={() => {
                            setSelected(item.id);
                            onValueChange?.(item.id);
                          }}
                        >
                          Pilih
                        </Button>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              {bank.isSuccess && bank.data?.length === 0 && (
                <TableRow>
                  <TableCell colSpan={4} className="text-center">
                    Tidak ada data
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </DialogContent>
    </Dialog>
  );
}
