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
import { registerUser } from '@/services/auth-services';
import { Toaster, toast } from 'sonner';
import { registerSchema } from '@/schemas/Auth';

type IFormData = z.infer<typeof registerSchema>;

function RegisterForm() {
  const form = useForm({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      email: '',
      password: '',
      confirmPassword: '',
    },
  });

  // Singning up state
  const [loading, setLoading] = useState(false);

  const onSubmit: SubmitHandler<IFormData> = useCallback(
    (data) => {
      if (data.password !== data.confirmPassword) {
        form.setError('confirmPassword', {
          message: "Confirm password doesn't match",
        });
        return;
      }
      setLoading(true);
      registerUser(data.email, data.password)
        .catch((e) => {
          console.error(e);
          if (e.code == 'auth/email-already-in-use') {
            toast.error('Email already registered');
          } else {
            toast.error('Unknown error occured.');
          }
        })
        .finally(() => setLoading(false));
    },
    [form],
  );

  return (
    <Form {...form}>
      <Toaster />
      <form onSubmit={form.handleSubmit(onSubmit)} className="mt-5">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem className="mt-3">
              {/* <FormLabel>Email</FormLabel> */}
              <FormControl>
                <Input placeholder="Email" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem className="mt-3">
              {/* <FormLabel>Password</FormLabel> */}
              <FormControl>
                <Input type="password" placeholder="Password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="confirmPassword"
          render={({ field }) => (
            <FormItem className="mt-3">
              {/* <FormLabel>Password</FormLabel> */}
              <FormControl>
                <Input
                  type="password"
                  placeholder="Confirm password"
                  {...field}
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
            'Sign Up'
          )}
        </Button>
      </form>
    </Form>
  );
}
export default RegisterForm;
