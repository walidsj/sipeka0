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
import { useNavigate, useParams } from "react-router-dom";
import { z } from "zod";
import { potonganBelanjaSchema } from "#server/schema/belanja.schema";
import { Input } from "@/components/ui/input";
import { NumericFormat } from "react-number-format";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const createPotonganBelanjaSchema = potonganBelanjaSchema.omit({
  belanjaId: true,
});

export default function CreateForm() {
  const params = useParams<{ belanjaId: string }>();

  const navigate = useNavigate();
  const utils = api.useUtils();

  const form = useForm<z.infer<typeof createPotonganBelanjaSchema>>({
    resolver: zodResolver(createPotonganBelanjaSchema),
    mode: "onTouched",
    defaultValues: {
      jenis: undefined,
      jumlah: undefined,
      billing: "",
      ntpn: "",
    },
  });

  const edit = api.belanja.createPotonganById.useMutation({
    onMutate() {
      toast.loading("Menyimpan data...");
    },
    onSuccess(res) {
      toast.dismiss();
      utils.belanja.invalidate();
      navigate(-1);
      toast.success(res.message);
    },
    onError(error) {
      toast.dismiss();
      toast.error(error.message);
    },
  });

  function onSubmit(val: z.infer<typeof createPotonganBelanjaSchema>) {
    edit.mutate({ belanjaId: Number(params.belanjaId), ...val });
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
            name="jenis"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Jenis</FormLabel>
                <FormControl>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {potonganBelanjaSchema.shape.jenis.options.map((item) => (
                        <SelectItem value={item}>{item}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            name="jumlah"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Jumlah</FormLabel>
                <FormControl>
                  <NumericFormat
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
            control={form.control}
            name="billing"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Kode Billing</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="ntpn"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Kode NTPN</FormLabel>
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
        </fieldset>
      </form>
    </Form>
  );
}
