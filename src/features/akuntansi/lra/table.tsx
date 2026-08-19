import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
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
import { format } from "date-fns";
import { HiOutlineChevronDoubleDown, HiOutlineEye } from "react-icons/hi";
import { Link, getRouteApi } from "@tanstack/react-router";

const routeApi = getRouteApi("/_dashboard/akuntansi/lra/");

export default function LraTable() {
  const search = routeApi.useSearch();
  const navigate = routeApi.useNavigate();
  const { data: belanja } = api.belanja.getBelanjaLra.useQuery(
    {
      startDate: search["startDate"] || undefined,
      endDate: search["endDate"] || undefined,
    },
    { placeholderData: keepPreviousData, suspense: true },
  );

  if (!belanja) return <div>Data tidak dapat dimuat.</div>;

  return (
    <div className="flex flex-col gap-5">
      <div className="flex flex-row items-center gap-5">
        <div className="flex gap-2">
          <Input
            value={search["startDate"] || format(new Date(), "yyyy-01-01")}
            type="date"
            onChange={(e) =>
              navigate({
                search: (prev) => ({ ...prev, startDate: e.target.value }),
              })
            }
          />
          <Input
            type="date"
            value={search["endDate"] || format(new Date(), "yyyy-MM-dd")}
            onChange={(e) =>
              navigate({
                search: (prev) => ({ ...prev, endDate: e.target.value }),
              })
            }
          />
        </div>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Kode Rekening</TableHead>
            <TableHead>Uraian</TableHead>
            <TableHead className="text-right">Anggaran (Rp)</TableHead>
            <TableHead className="text-right">Realisasi (Rp)</TableHead>
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
                  item.jumlah > item.anggaran && "text-red-500",
                  item.jumlah === 0 && "text-gray-400",
                )}
              >
                <TableCell className="font-semibold">
                  {item.kodeRekening}
                </TableCell>
                <TableCell className="font-semibold">{item.uraian}</TableCell>
                <TableCell className="text-right font-semibold">
                  {formatAngka(item.anggaran)}
                </TableCell>
                <TableCell className="text-right font-semibold">
                  {formatAngka(item.jumlah)}
                </TableCell>
                <TableCell className="text-right font-semibold">
                  {formatAngka(item.anggaran - item.jumlah)}
                </TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger>
                      <Button variant="outline">
                        Aksi <HiOutlineChevronDoubleDown className="ml-2" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      <Link
                        to="/akuntansi/lra/$kodeRekening"
                        params={{ kodeRekening: String(item.kodeRekening) }}
                        search={{
                          startDate:
                            search["startDate"] ||
                            format(new Date(), "yyyy-01-01"),
                          endDate:
                            search["endDate"] ||
                            format(new Date(), "yyyy-MM-dd"),
                        }}
                      >
                        <DropdownMenuItem>
                          <HiOutlineEye className="mr-2" />
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
            <TableHead className="text-right">
              {formatAngka(belanja.reduce((acc, item) => acc + item.jumlah, 0))}
            </TableHead>
            <TableHead className="text-right">
              {formatAngka(
                belanja.reduce(
                  (acc, item) => acc + item.anggaran - item.jumlah,
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
