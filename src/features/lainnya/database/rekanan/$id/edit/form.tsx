import { rekanan } from "#server/db/schema";
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
import { z } from "zod";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import BankPicker from "@/components/bank-picker";
import { Textarea } from "@/components/ui/textarea";
import { rekananSchema } from "#server/schema/rekanan";

export default function EditForm({
  data,
}: {
  data: typeof rekanan.$inferSelect;
}) {
  const utils = api.useUtils();

  const form = useForm<z.infer<typeof rekananSchema>>({
    resolver: zodResolver(rekananSchema),
    mode: "onTouched",
    defaultValues: {
      nama: data.nama!,
      jenis: data.jenis!,
      alamat: data.alamat!,
      npwp: data.npwp!,
      noTelp: data.noTelp!,
      statusRekanan: data.statusRekanan!,
      bankId: data.bankId!,
      namaRekening: data.namaRekening!,
      noRekening: data.noRekening!,
    },
  });

  const edit = api.rekanan.updateById.useMutation({
    onMutate() {
      toast.loading("Menyimpan rekanan...");
    },
    onSuccess(data) {
      toast.dismiss();
      utils.rekanan.getById.invalidate();
      window.history.back();
      toast.success(data.message);
    },
    onError(error) {
      toast.dismiss();
      toast.error(error.message);
    },
  });

  function onSubmit(val: z.infer<typeof rekananSchema>) {
    edit.mutate({ id: data.id, ...val });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <fieldset disabled={edit.isPending} className="max-w-3xl">
          <div className="grid grid-cols-2 gap-5">
            <div className="flex flex-col gap-2">
              <FormField
                name="nama"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nama Rekanan</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="jenis"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Jenis Rekanan</FormLabel>
                    <FormControl>
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="PERORANGAN">PERORANGAN</SelectItem>
                          <SelectItem value="SWASTA">SWASTA</SelectItem>
                          <SelectItem value="BUMN/BUMD">BUMN/BUMD</SelectItem>
                          <SelectItem value="PEMERINTAH">PEMERINTAH</SelectItem>
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                name="alamat"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Alamat</FormLabel>
                    <FormControl>
                      <Textarea {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                name="npwp"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>NPWP</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                name="noTelp"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>No. Telp</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="statusRekanan"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Status Rekanan</FormLabel>
                    <FormControl>
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="BIASA">BIASA</SelectItem>
                          <SelectItem value="MOU">MOU</SelectItem>
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="flex flex-col gap-2">
              <FormField
                control={form.control}
                name="bankId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Bank</FormLabel>
                    <FormControl>
                      <BankPicker
                        onValueChange={field.onChange}
                        value={field.value}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                name="namaRekening"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nama Rekening</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                name="noRekening"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>No. Rekening</FormLabel>
                    <FormControl>
                      <Input {...field} />
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
            </div>
          </div>
        </fieldset>
      </form>
    </Form>
  );
}
