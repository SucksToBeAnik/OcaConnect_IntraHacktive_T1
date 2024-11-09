"use client";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "../ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

export default function LoginForm() {
  const router = useRouter();
  const loginFormSchema = z.object({
    email: z.string().email(),
    password: z.string().min(8),
  });
  const loginForm = useForm({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data) => {
    const formSubmissionPromise = new Promise(async (resolve, reject) => {
      try {
        const response = await fetch("/api/login", {
          method: "POST",
          body: JSON.stringify(data),
        });
        const responseData = await response.json();
        console.log(responseData);
        if (response.status === 200) {
          resolve(responseData.message);
        } else {
          reject(responseData.message);
        }
      } catch (error) {
        reject(error);
      }
    });

    toast.promise(formSubmissionPromise, {
      loading: "Logging in...",
      success: (data) => {
        loginForm.reset();
        router.push("/dashboard");
        return data;
      },
      error: (error) => {
        return error;
      },
    });
  };

  return (
    <div>
      <Form {...loginForm}>
        <form onSubmit={loginForm.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={loginForm.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="Enter your (g-suite) email" type="email" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={loginForm.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input placeholder="********" type="password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">Login</Button>
        </form>
      </Form>
    </div>
  );
}
