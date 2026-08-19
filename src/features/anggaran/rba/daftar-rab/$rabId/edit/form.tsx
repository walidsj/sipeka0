import { rab } from "#server/db/schema";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { api } from "@/trpc/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { z } from "zod";
import { Textarea } from "@/components/ui/textarea";
import { rabSchema } from "#server/schema/rab";
import KodeRekeningPicker from "@/components/kode-rekening-picker";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import UnitKerjaPicker from "@/components/unit-kerja-picker";

export default function EditForm({ data }: { data: typeof rab.$inferSelect }) {
  const utils = api.useUtils();

  const form = useForm<z.infer<typeof rabSchema>>({
    resolver: zodResolver(rabSchema),
    mode: "onTouched",
    defaultValues: {
      kodeRekening: data.kodeRekening ?? undefined,
      spesifikasi: data.spesifikasi ?? "",
      uraian: data.uraian ?? "",
      sumberDana: data.sumberDana ?? undefined,
      unitKerjaId: data.unitKerjaId ?? undefined,
    },
  });

  const edit = api.rab.updateById.useMutation({
    onMutate() {
      toast.loading("Menyimpan data...");
    },
    onSuccess(res) {
      toast.dismiss();
      utils.rab.getById.invalidate();
      window.history.back();
      toast.success(res.message);
    },
    onError(error) {
      toast.dismiss();
      toast.error(error.message);
    },
  });

  function onSubmit(val: z.infer<typeof rabSchema>) {
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
            name="sumberDana"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Sumber Dana</FormLabel>
                <FormControl>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="JASA LAYANAN">JASA LAYANAN</SelectItem>
                      <SelectItem value="HIBAH">HIBAH</SelectItem>
                      <SelectItem value="HASIL KERJA SAMA">
                        HASIL KERJA SAMA
                      </SelectItem>
                      <SelectItem value="LAIN-LAIN PENDAPATAN BLUD YANG SAH">
                        LAIN-LAIN PENDAPATAN BLUD YANG SAH
                      </SelectItem>
                      <SelectItem value="SILPA">SILPA</SelectItem>
                      <SelectItem value="APBD">APBD</SelectItem>
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            name="unitKerjaId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Unit Kerja</FormLabel>
                <FormControl>
                  <UnitKerjaPicker
                    value={field.value}
                    onValueChange={(val) => field.onChange(val)}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            name="kodeRekening"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Kode Rekening</FormLabel>
                <FormControl>
                  <KodeRekeningPicker
                    value={field.value}
                    onValueChange={(val) => field.onChange(val)}
                    params={{
                      searchKode: "5",
                    }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            name="uraian"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Uraian</FormLabel>
                <FormControl>
                  <Textarea {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            name="spesifikasi"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Spesifikasi</FormLabel>
                <FormControl>
                  <Textarea {...field} />
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
