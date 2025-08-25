'use client';

import { Head, useForm } from '@inertiajs/react';
import { motion } from 'framer-motion';
import { Eye, EyeOff, LoaderCircle } from 'lucide-react';
import { FormEventHandler, useState } from 'react';

import InputError from '@/components/input-error';
import TextLink from '@/components/text-link';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AuthLayout from '@/layouts/auth-layout';

type LoginForm = {
    email: string;
    password: string;
    remember: boolean;
};

interface LoginProps {
    status?: string;
    canResetPassword: boolean;
}

export default function Login({ status, canResetPassword }: LoginProps) {
    const [showPassword, setShowPassword] = useState(false);
    const {
        data,
        setData,
        post,
        processing,
        errors,
        reset
    } = useForm<Required<LoginForm>>({
        email: '',
        password: '',
        remember: false,
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route('login'), {
            onFinish: () => reset('password'),
        });
    };

    return (
        <AuthLayout
            title="Welcome Back!"
            description="Log in to continue to your dashboard"
        >
            <Head title="Log in" />

            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: 'easeOut' }}
                className="mx-auto w-full max-w-md space-y-6 px-4"
            >
                {status && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="rounded-md bg-green-100 dark:bg-green-900 px-4 py-3 text-center text-sm font-medium text-green-700 dark:text-green-200"
                    >
                        {status}
                    </motion.div>
                )}

                <form
                    onSubmit={submit}
                    className="space-y-6 bg-white/80 dark:bg-black/40 backdrop-blur-sm p-6 rounded-xl shadow-lg dark:shadow-none border dark:border-zinc-700"
                >
                    {/* Email Field */}
                    <motion.div
                        whileFocus={{ scale: 1.02 }}
                        className="space-y-2"
                    >
                        <Label htmlFor="email">Email address</Label>
                        <Input
                            id="email"
                            type="email"
                            autoComplete="email"
                            required
                            autoFocus
                            tabIndex={1}
                            value={data.email}
                            onChange={(e) => setData('email', e.target.value)}
                            placeholder="you@example.com"
                            className="transition-all focus:ring-2 focus:ring-indigo-500 dark:bg-zinc-900 dark:text-white dark:placeholder-zinc-400"
                        />
                        <InputError message={errors.email} />
                    </motion.div>

                    {/* Password Field */}
                    <div className="space-y-2">
                        <div className="flex items-center justify-between">
                            <Label htmlFor="password">Password</Label>
                            {canResetPassword && (
                                <TextLink
                                    href={route('password.request')}
                                    className="text-sm"
                                    tabIndex={5}
                                >
                                    Forgot?
                                </TextLink>
                            )}
                        </div>
                        <div className="relative">
                            <Input
                                id="password"
                                type={showPassword ? 'text' : 'password'}
                                required
                                autoComplete="current-password"
                                tabIndex={2}
                                value={data.password}
                                onChange={(e) => setData('password', e.target.value)}
                                placeholder="••••••••"
                                className="transition-all focus:ring-2 focus:ring-indigo-500 dark:bg-zinc-900 dark:text-white dark:placeholder-zinc-400 pr-10"
                            />

                            <button
                                type="button"
                                onClick={() => setShowPassword((prev) => !prev)}
                                className="absolute inset-y-0 right-0 px-3 flex items-center text-gray-500 dark:text-zinc-400"
                                tabIndex={-1}
                            >
                                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                            </button>
                        </div>
                        <InputError message={errors.password} />
                    </div>

                    {/* Remember Me */}
                    <div className="flex items-center space-x-2">
                        <Checkbox
                            id="remember"
                            name="remember"
                            checked={data.remember}
                            onClick={() => setData('remember', !data.remember)}
                            tabIndex={3}
                        />
                        <Label htmlFor="remember">Remember me</Label>
                    </div>

                    {/* Submit Button */}
                    <Button
                        type="submit"
                        disabled={processing}
                        tabIndex={4}
                        className="w-full bg-gradient-to-r from-indigo-500 to-purple-500 text-white shadow-md hover:shadow-lg transition-all duration-300"
                    >
                        {processing && <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />}
                        Log in
                    </Button>

                    {/* Sign Up Link */}
                    <div className="text-center text-sm text-muted-foreground dark:text-zinc-400">
                        Don&apos;t have an account?{' '}
                        <TextLink href={route('register')} tabIndex={6}>
                            Sign up
                        </TextLink>
                    </div>
                </form>
            </motion.div>
        </AuthLayout>
    );
}
