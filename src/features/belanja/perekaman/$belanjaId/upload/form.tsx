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

const uploadSchema = z.object({
  filePdf: z.instanceof(File),
});

export default function CreateForm({ belanjaId }: { belanjaId: number }) {
  const utils = api.useUtils();

  const form = useForm<z.infer<typeof uploadSchema>>({
    resolver: zodResolver(uploadSchema),
    mode: "onTouched",
    defaultValues: {
      filePdf: undefined,
    },
  });

  const create = api.belanja.uploadFile.useMutation({
    onMutate() {
      toast.loading("Menyimpan data...");
    },
    onSuccess(data) {
      toast.dismiss();
      utils.rekeningKoran.invalidate();
      window.history.back();
      toast.success(data.message);
    },
    onError(error) {
      toast.dismiss();
      toast.error(error.message);
    },
  });

  function onSubmit(val: z.infer<typeof uploadSchema>) {
    console.log(val);

    const reader = new FileReader();

    reader.readAsDataURL(val.filePdf);
    reader.onload = function () {
      if (typeof reader.result !== "string") return;

      const base64Format = reader.result.split(",")[1];

      create.mutate({ belanjaId, filePdf: base64Format });
    };
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <fieldset
          disabled={create.isPending}
          className="flex flex-row items-end gap-2"
        >
          <FormField
            name="filePdf"
            render={({ field: { value, onChange, ...fieldProps } }) => (
              <FormItem>
                <FormLabel className="normal-case">File PDF</FormLabel>
                <FormControl>
                  <Input
                    {...fieldProps}
                    type="file"
                    accept="application/pdf"
                    onChange={(event) =>
                      onChange(event.target.files && event.target.files[0])
                    }
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="mt-3">
            <Button type="submit">
              {create.isPending ? "Uploading..." : "Upload PDF"}
            </Button>
          </div>
        </fieldset>
      </form>
    </Form>
  );
}
