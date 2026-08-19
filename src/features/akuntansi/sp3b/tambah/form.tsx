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
import { format } from "date-fns";
import PegawaiPicker from "@/components/pegawai-picker";
import { sp3bSchema } from "#server/schema/sp3b.schema";

export default function CreateForm() {
  const utils = api.useUtils();

  const form = useForm<z.infer<typeof sp3bSchema>>({
    resolver: zodResolver(sp3bSchema),
    mode: "onTouched",
    defaultValues: {
      tglMulai: undefined,
      tglSelesai: undefined,
      noDokumen: "",
      tglDokumen: undefined,
      penandatanganId: undefined,
    },
  });

  const create = api.sp3b.create.useMutation({
    onMutate() {
      toast.loading("Menyimpan data...");
    },
    onSuccess(data) {
      toast.dismiss();
      utils.sp3b.invalidate();
      window.history.back();
      toast.success(data.message);
    },
    onError(error) {
      toast.dismiss();
      toast.error(error.message);
    },
  });

  function onSubmit(data: z.infer<typeof sp3bSchema>) {
    create.mutate(data);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <fieldset
          disabled={create.isPending}
          className="flex max-w-96 flex-col gap-2"
        >
          <FormField
            name="tglMulai"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Tanggal Mulai</FormLabel>
                <FormControl>
                  <Input
                    type="date"
                    onChange={(e) => field.onChange(e.target.valueAsDate)}
                    value={
                      field.value
                        ? format(field.value, "yyyy-MM-dd")
                        : undefined
                    }
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            name="tglSelesai"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Tanggal Selesai</FormLabel>
                <FormControl>
                  <Input
                    type="date"
                    onChange={(e) => field.onChange(e.target.valueAsDate)}
                    value={
                      field.value
                        ? format(field.value, "yyyy-MM-dd")
                        : undefined
                    }
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            name="noDokumen"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nomor Dokumen</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            name="tglDokumen"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Tanggal Dokumen</FormLabel>
                <FormControl>
                  <Input
                    type="date"
                    onChange={(e) => field.onChange(e.target.valueAsDate)}
                    value={
                      field.value
                        ? format(field.value, "yyyy-MM-dd")
                        : undefined
                    }
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            name="penandatanganId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Penandatangan</FormLabel>
                <FormControl>
                  <PegawaiPicker
                    value={field.value}
                    onValueChange={(val) => field.onChange(val)}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="mt-3">
            <Button type="submit">
              {create.isPending ? "Menyimpan..." : "Simpan"}
            </Button>
          </div>
        </fieldset>
      </form>
    </Form>
  );
}
