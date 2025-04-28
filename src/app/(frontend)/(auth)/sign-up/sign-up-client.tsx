'use client'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import Link from 'next/link'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { InputPlus } from '@/components/button-plus'
import { signUpSchema } from '@/lib/schemas'

//import { toast } from "@/hooks/use-toast";
import { redirect, useRouter } from 'next/navigation'

import { KeyRound, MailIcon, UserIcon } from 'lucide-react'
import { signup, SignupResponse } from '../actions/signup'
import { toast } from 'sonner'

const SignUpClient = () => {
  const router = useRouter()
  const form = useForm<z.infer<typeof signUpSchema>>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      // name: '',
      email: '',
      password: '',
    },
  })

  async function onSubmit(values: z.infer<typeof signUpSchema>) {
    const { email, password } = values

    const result: SignupResponse = await signup({ email, password })

    console.log({ result })
    if (result.success) {
      toast.success('Successfully signed up!')
      router.push('/dashboard')
    } else {
      toast.error('Error', {
        description: result.error || 'Could not register',
      })
    }
  }

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Sign Up</CardTitle>
        <CardDescription>Create your account to get started</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            {/* <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <InputPlus placeholder="John doe" {...field} Icon={UserIcon} />
                  </FormControl>
                  <FormDescription>This is your public display name.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            /> */}
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <InputPlus placeholder="Email" {...field} Icon={MailIcon} />
                  </FormControl>
                  <FormDescription>Enter your email address</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <InputPlus type="password" placeholder="Password" {...field} Icon={KeyRound} />
                  </FormControl>
                  <FormDescription>Choose a password for your account</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button className="w-full" type="submit">
              Sign Up
            </Button>
          </form>
        </Form>
      </CardContent>
      <CardFooter className="flex justify-center">
        <p className="text-sm text-muted-foreground">
          Already have an account?{' '}
          <Link className="text-primary hover:underline ml-1" href="/sign-in">
            Sign in
          </Link>
        </p>
      </CardFooter>
    </Card>
  )
}

export default SignUpClient
