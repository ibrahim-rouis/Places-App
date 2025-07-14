import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import z from 'zod';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useCallback, useState } from 'react';
import { Loader2Icon } from 'lucide-react';
import { Toaster, toast } from 'sonner';
import { createPlaceSchema } from '@/schemas/Place';
import { createPlace } from '@/services/places-services';
import { Textarea } from '../ui/textarea';
import { useNavigate } from 'react-router';

type IFormData = z.infer<typeof createPlaceSchema>;

function CreatePlaceForm() {
  const form = useForm({
    resolver: zodResolver(createPlaceSchema),
    defaultValues: {
      title: '',
      description: '',
      location: '',
    },
  });

  // create place pending state
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const onSubmit: SubmitHandler<IFormData> = useCallback(
    (data) => {
      setLoading(true);
      createPlace(data)
        .then(() => navigate('/'))
        .catch((e) => {
          console.error(e);
          toast.error('Failed to create place.');
        })
        .finally(() => {
          setLoading(false);
        });
    },
    [navigate],
  );

  return (
    <Form {...form}>
      <Toaster />
      <form onSubmit={form.handleSubmit(onSubmit)} className="mt-5">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem className="mt-3">
              <FormControl>
                <Input placeholder="Title" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem className="mt-3">
              <FormControl>
                <Textarea
                  placeholder="Tell us about the place"
                  className="h-30 resize-none"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="location"
          render={({ field }) => (
            <FormItem className="mt-3">
              <FormControl>
                <Input placeholder="Location" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="images"
          render={({ field: { onChange, name, ref } }) => (
            <FormItem className="mt-3">
              <FormControl>
                <Input
                  type="file"
                  accept="image/*"
                  multiple
                  placeholder="Images"
                  name={name}
                  ref={ref}
                  onChange={(e) => {
                    const files = e.target.files;
                    if (files) {
                      onChange(Array.from(files));
                    }
                  }}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          type="submit"
          className="mt-5 w-full px-6 py-5"
          disabled={loading}
        >
          {loading ? (
            <div className="flex items-center gap-2">
              <Loader2Icon className="animate-spin" />
              Please wait
            </div>
          ) : (
            'Create'
          )}
        </Button>
      </form>
    </Form>
  );
}
export default CreatePlaceForm;
