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
import { login } from '@/services/auth-services';
import { Toaster, toast } from 'sonner';

const IFormDataSchema = z.object({
  email: z
    .string({ message: 'Email is required' })
    .email({ message: 'Invalid email address' }),
  password: z
    .string({ message: 'Password is required' })
    .min(6, { message: 'Password must be at least 6 characters long' }),
});

type IFormData = z.infer<typeof IFormDataSchema>;

function LoginForm() {
  const form = useForm({
    resolver: zodResolver(IFormDataSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  // Singning in state
  const [loading, setLoading] = useState(false);

  const onSubmit: SubmitHandler<IFormData> = useCallback((data) => {
    setLoading(true);
    login(data.email, data.password)
      .catch((e) => {
        console.error(e);
        if (e.code == 'auth/wrong-password') {
          toast.error('Wrong password');
        } else if (e.code == 'auth/user-not-found') {
          toast.error('Email not found');
        } else {
          toast.error('Unknown error occured.');
        }
      })
      .finally(() => setLoading(false));
  }, []);

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
            'Sign in'
          )}
        </Button>
      </form>
    </Form>
  );
}
export default LoginForm;
