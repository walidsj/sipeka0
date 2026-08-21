import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { cn, formatAngka } from "@/lib/utils";
import { api } from "@/trpc/react";
import { keepPreviousData } from "@tanstack/react-query";
import { HiOutlineChevronDoubleDown, HiOutlineEye } from "react-icons/hi";
import { Link, getRouteApi } from "@tanstack/react-router";
import { MonthFilter } from "@/components/month-filter";
import { useAuth } from "@/lib/auth";

const routeApi = getRouteApi("/_dashboard/akuntansi/lra/");

export default function LraTable() {
  const search = routeApi.useSearch();
  const navigate = routeApi.useNavigate();
  const { user } = useAuth();
  const tahun = user?.tahun ?? "2026";
  const startDate = search["startDate"] || `${tahun}-01-01`;
  const endDate = search["endDate"] || `${tahun}-12-31`;

  const { data: belanja } = api.belanja.getBelanjaLra.useQuery(
    {
      startDate,
      endDate,
    },
    { placeholderData: keepPreviousData, suspense: true },
  );

  if (!belanja) return <div>Data tidak dapat dimuat.</div>;

  const isFullPeriod = startDate.slice(5) === "01-01";
  const realisasi = (item: (typeof belanja)[number]) =>
    Number(item.jumlahSebelumnya ?? 0) + Number(item.jumlah ?? 0);

  return (
    <div className="flex flex-col gap-5">
      <div className="flex flex-row items-center gap-5">
        <MonthFilter
          startDate={startDate}
          endDate={endDate}
          tahun={tahun}
          onChange={(range) =>
            navigate({ search: (prev) => ({ ...prev, ...range }) })
          }
        />
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Kode Rekening</TableHead>
            <TableHead>Uraian</TableHead>
            <TableHead className="text-right">Anggaran (Rp)</TableHead>
            {isFullPeriod ? (
              <TableHead className="text-right">Realisasi (Rp)</TableHead>
            ) : (
              <>
                <TableHead className="text-right">
                  Realisasi Periode Sebelumnya (Rp)
                </TableHead>
                <TableHead className="text-right">
                  Realisasi Periode Ini (Rp)
                </TableHead>
                <TableHead className="text-right">
                  Jumlah Realisasi (Rp)
                </TableHead>
              </>
            )}
            <TableHead className="text-right">Sisa Anggaran (Rp)</TableHead>
            <TableHead className="w-1" />
          </TableRow>
        </TableHeader>
        <TableBody>
          {belanja.map((item, index) => {
            return (
              <TableRow
                key={index}
                className={cn(
                  realisasi(item) > item.anggaran && "text-red-500",
                )}
              >
                <TableCell className="font-semibold">
                  {item.kodeRekening}
                </TableCell>
                <TableCell className="font-semibold">{item.uraian}</TableCell>
                <TableCell className="text-right">
                  {formatAngka(item.anggaran)}
                </TableCell>
                {isFullPeriod ? (
                  <TableCell className="text-right">
                    {formatAngka(item.jumlah)}
                  </TableCell>
                ) : (
                  <>
                    <TableCell className="text-right">
                      {formatAngka(item.jumlahSebelumnya)}
                    </TableCell>
                    <TableCell className="text-right">
                      {formatAngka(item.jumlah)}
                    </TableCell>
                    <TableCell className="text-right">
                      {formatAngka(realisasi(item))}
                    </TableCell>
                  </>
                )}
                <TableCell className="text-right">
                  {formatAngka(item.anggaran - realisasi(item))}
                </TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger>
                      <Button variant="outline">
                        Aksi <HiOutlineChevronDoubleDown />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      <Link
                        to="/akuntansi/lra/$kodeRekening"
                        params={{ kodeRekening: String(item.kodeRekening) }}
                        search={{ startDate, endDate }}
                      >
                        <DropdownMenuItem>
                          <HiOutlineEye />
                          Detail
                        </DropdownMenuItem>
                      </Link>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            );
          })}
          {belanja.length === 0 && (
            <TableRow>
              <TableCell colSpan={100} className="text-center">
                Tidak ada data
              </TableCell>
            </TableRow>
          )}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableHead colSpan={2}>Total</TableHead>
            <TableHead className="text-right">
              {formatAngka(
                belanja.reduce((acc, item) => acc + item.anggaran, 0),
              )}
            </TableHead>
            {isFullPeriod ? (
              <TableHead className="text-right">
                {formatAngka(
                  belanja.reduce((acc, item) => acc + item.jumlah, 0),
                )}
              </TableHead>
            ) : (
              <>
                <TableHead className="text-right">
                  {formatAngka(
                    belanja.reduce(
                      (acc, item) => acc + Number(item.jumlahSebelumnya ?? 0),
                      0,
                    ),
                  )}
                </TableHead>
                <TableHead className="text-right">
                  {formatAngka(
                    belanja.reduce((acc, item) => acc + item.jumlah, 0),
                  )}
                </TableHead>
                <TableHead className="text-right">
                  {formatAngka(
                    belanja.reduce((acc, item) => acc + realisasi(item), 0),
                  )}
                </TableHead>
              </>
            )}
            <TableHead className="text-right">
              {formatAngka(
                belanja.reduce(
                  (acc, item) => acc + item.anggaran - realisasi(item),
                  0,
                ),
              )}
            </TableHead>
            <TableHead />
          </TableRow>
        </TableFooter>
      </Table>
    </div>
  );
}
