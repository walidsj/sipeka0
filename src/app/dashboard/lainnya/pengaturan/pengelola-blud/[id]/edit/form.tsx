import { pengelolaBlud } from "server/db/schema";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { api } from "@/trpc/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { z } from "zod";
import { pengelolaBludSchema } from "../../schema";
import PegawaiPicker from "@/components/pegawai-picker";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { format } from "date-fns";

export default function EditForm({
  data,
}: {
  data: typeof pengelolaBlud.$inferSelect;
}) {
  const navigate = useNavigate();
  const utils = api.useUtils();

  const form = useForm<z.infer<typeof pengelolaBludSchema>>({
    resolver: zodResolver(pengelolaBludSchema),
    mode: "onTouched",
    defaultValues: {
      pegawaiId: data.pegawaiId!,
      role: data.role!,
      noSk: data.noSk!,
      tglSk: data.tglSk!,
    },
  });

  const edit = api.pengelolaBlud.updateById.useMutation({
    onMutate() {
      toast.loading("Menyimpan data...");
    },
    onSuccess(data) {
      toast.dismiss();
      utils.pengelolaBlud.getById.invalidate();
      navigate(-1);
      toast.success(data.message);
    },
    onError(error) {
      toast.dismiss();
      toast.error(error.message);
    },
  });

  function onSubmit(val: z.infer<typeof pengelolaBludSchema>) {
    edit.mutate({ id: data.id, ...val });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <fieldset
          disabled={edit.isPending}
          className="flex max-w-96 flex-col gap-2"
        >
          <FormField
            control={form.control}
            name="pegawaiId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Pegawai</FormLabel>
                <FormControl>
                  <PegawaiPicker
                    value={field.value}
                    onValueChange={field.onChange}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="role"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Jabatan Pengelola</FormLabel>
                <FormControl>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {[
                        "KUASA PENGGUNA ANGGARAN",
                        "PEJABAT PELAKSANA TEKNIS KEGIATAN",
                        "PEJABAT PEMBUAT KOMITMEN",
                        "BENDAHARA PENGELUARAN",
                        "BENDAHARA PENERIMAAN",
                        "PEJABAT PENATAUSAHAAN KEUANGAN",
                        "PENGURUS BARANG",
                        "PEJABAT PENGADAAN",
                      ].map((item) => (
                        <SelectItem key={item} value={item}>
                          {item}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="noSk"
            render={({ field }) => (
              <FormItem>
                <FormLabel>No. SK</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="tglSk"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Tanggal SK</FormLabel>
                <FormControl>
                  <Input
                    type="date"
                    onChange={(e) => field.onChange(new Date(e.target.value))}
                    value={
                      field.value
                        ? format(new Date(field.value), "yyyy-MM-dd")
                        : undefined
                    }
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="mt-3">
            <Button type="submit">
              {edit.isPending ? "Menyimpan..." : "Simpan"}
            </Button>
          </div>
        </fieldset>
      </form>
    </Form>
  );
}
