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
import { rekeningKoranSchema } from "#server/schema/rekening-koran";
import { NumericFormat } from "react-number-format";
import { rekeningKoranTable } from "server/db/schema";
import { useNavigate } from "react-router-dom";

const editRekeningKoranSchema = rekeningKoranSchema.omit({
  rekeningBankId: true,
});

export default function EditForm({
  data,
}: {
  data: typeof rekeningKoranTable.$inferSelect;
}) {
  const utils = api.useUtils();
  const navigate = useNavigate();

  const form = useForm<z.infer<typeof editRekeningKoranSchema>>({
    resolver: zodResolver(editRekeningKoranSchema),
    mode: "onTouched",
    defaultValues: {
      tglTransaksi: data.tglTransaksi || undefined,
      keterangan: data.keterangan || undefined,
      noReferensi: data.noReferensi || undefined,
      debet: Number(data.debet) || undefined,
      kredit: Number(data.kredit) || undefined,
      keteranganTambahan: data.keteranganTambahan || undefined,
    },
  });

  const edit = api.rekeningKoran.updateById.useMutation({
    onMutate() {
      toast.loading("Menyimpan data...");
    },
    onSuccess(data) {
      toast.dismiss();
      utils.rekeningKoran.invalidate();
      navigate(-1);
      toast.success(data.message);
    },
    onError(error) {
      toast.dismiss();
      toast.error(error.message);
    },
  });

  function onSubmit(val: z.infer<typeof editRekeningKoranSchema>) {
    edit.mutate({
      id: data.id,
      rekeningBankId: data.rekeningBankId!,
      ...val,
    });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <fieldset
          disabled={edit.isPending}
          className="flex flex-row items-end gap-2"
        >
          <FormField
            name="tglTransaksi"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="normal-case">Tanggal Transaksi</FormLabel>
                <FormControl>
                  <Input
                    className="font-normal"
                    type="date"
                    onChange={(e) => field.onChange(e.target.value)}
                    value={field.value ?? undefined}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            name="keterangan"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="normal-case">Keterangan Mutasi</FormLabel>
                <FormControl>
                  <Input
                    className="font-normal"
                    value={field.value}
                    onChange={field.onChange}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            name="noReferensi"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="normal-case">No. Referensi</FormLabel>
                <FormControl>
                  <Input
                    className="font-normal"
                    value={field.value}
                    onChange={field.onChange}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            name="debet"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="normal-case">Debet</FormLabel>
                <FormControl>
                  <NumericFormat
                    className="font-normal"
                    customInput={Input}
                    value={field.value}
                    onValueChange={(val) => field.onChange(val.floatValue)}
                    thousandSeparator="."
                    decimalSeparator=","
                    decimalScale={2}
                    prefix={"Rp "}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            name="kredit"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="normal-case">Kredit</FormLabel>
                <FormControl>
                  <NumericFormat
                    className="font-normal"
                    customInput={Input}
                    value={field.value}
                    onValueChange={(val) => field.onChange(val.floatValue)}
                    thousandSeparator="."
                    decimalSeparator=","
                    decimalScale={2}
                    prefix={"Rp "}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            name="keteranganTambahan"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="normal-case">
                  Keterangan Tambahan
                </FormLabel>
                <FormControl>
                  <Input
                    className="font-normal"
                    value={field.value}
                    onChange={field.onChange}
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
