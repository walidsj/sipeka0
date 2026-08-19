import { Button } from "@/components/ui/button";
import { api } from "@/trpc/react";
import {
  Dialog,
  DialogContent,
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
import { cn, formatAngka, formatTanggal } from "@/lib/utils";
import { useDebounce } from "use-debounce";
import { Input } from "@/components/ui/input";
import { keepPreviousData } from "@tanstack/react-query";
import { Spinner } from "@/components/ui/spinner";

export default function LpjBelanjaPicker({
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

  const lpjBelanjaSelected = api.lpjBelanja.getById.useQuery(selected!, {
    enabled: !!selected,
    placeholderData: keepPreviousData,
  });

  const [search, setSearch] = React.useState<string>("");
  const [searchValue] = useDebounce(search, 300);

  const lpjBelanja = api.lpjBelanja.getAll.useQuery(
    { search: searchValue, haveSpp: false },
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
              {lpjBelanjaSelected.isSuccess && lpjBelanjaSelected.data && (
                <div className="flex items-center gap-3">
                  <img
                    src="/images/icons/research.png"
                    alt="lpjBelanja"
                    className="h-10 w-10"
                  />
                  <div className="flex flex-col text-left">
                    <span className="line-clamp-1">
                      {lpjBelanjaSelected.data.noDokumen}
                    </span>
                    <span className="line-clamp-1 text-xs text-slate-500">
                      {formatTanggal(lpjBelanjaSelected.data.tglDokumen)}
                    </span>
                  </div>
                </div>
              )}
              {lpjBelanjaSelected.isLoading && (
                <div className="flex items-center gap-3">
                  <Spinner />
                </div>
              )}
            </div>
          )}
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-5xl">
        <DialogHeader>
          <DialogTitle>Pilih LPJ Belanja</DialogTitle>
        </DialogHeader>
        <Input
          placeholder="Cari LPJ Belanja..."
          onChange={(e) => setSearch(e.target.value)}
        />
        <div className="max-h-[calc(75svh)] overflow-y-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-1">No.</TableHead>
                <TableHead>Tanggal</TableHead>
                <TableHead>Nomor LPJ</TableHead>
                <TableHead>Uraian</TableHead>
                <TableHead className="text-right">Jumlah (Rp)</TableHead>
                <TableHead className="w-1">Aksi</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {lpjBelanja.isSuccess &&
                lpjBelanja.data?.map((item, index) => (
                  <TableRow
                    key={index}
                    className={cn(
                      selected === item.id &&
                        "bg-yellow-100 hover:bg-yellow-200",
                    )}
                  >
                    <TableCell className="text-center">{index + 1}.</TableCell>
                    <TableCell className="font-semibold">
                      {formatTanggal(item.tglDokumen)}
                    </TableCell>
                    <TableCell className="text-center font-semibold">
                      {item.noDokumen}
                    </TableCell>
                    <TableCell className="font-semibold">
                      {item.uraian}
                    </TableCell>
                    <TableCell className="text-right font-semibold">
                      {formatAngka(item.jumlah)}
                    </TableCell>
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
              {lpjBelanja.isSuccess && lpjBelanja.data?.length === 0 && (
                <TableRow>
                  <TableCell colSpan={100} className="text-center">
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
