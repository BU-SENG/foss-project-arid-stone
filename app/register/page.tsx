"use client";

import {
	AlertCircle,
	GraduationCap,
	Lock,
	Mail,
	User as UserIcon,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import * as v from "valibot";
import { RegisterSchema } from "../lib/schemas/user";
import { createUser, setCurrentUser } from "../lib/storage/user";

export default function RegisterPage() {
	const router = useRouter();
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [error, setError] = useState("");
	const [loading, setLoading] = useState(false);
	const [fieldErrors, setFieldErrors] = useState<{
		name?: string;
		email?: string;
		password?: string;
		confirmPassword?: string;
	}>({});

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setError("");
		setFieldErrors({});
		setLoading(true);

		try {
			if (password !== confirmPassword) {
				throw new Error("Passwords do not match");
			}

			const data = v.parse(RegisterSchema, {
				name,
				email,
				password,
				confirmPassword,
			});

			const user = createUser(data);
			setCurrentUser(user);
			router.push("/dashboard");
		} catch (err) {
			if (err instanceof v.ValiError) {
				const newFieldErrors: {
					name?: string;
					email?: string;
					password?: string;
					confirmPassword?: string;
				} = {};
				for (const issue of err.issues) {
					const pathKey = issue.path?.[0]?.key;
					const path = typeof pathKey === "string" ? pathKey : "";
					if (
						path === "name" ||
						path === "email" ||
						path === "password" ||
						path === "confirmPassword"
					) {
						newFieldErrors[path as keyof typeof newFieldErrors] = issue.message;
					}
				}
				if (Object.keys(newFieldErrors).length > 0) {
					setFieldErrors(newFieldErrors);
				} else {
					setError(err.issues[0].message);
				}
			} else if (err instanceof Error) {
				setError(err.message);
			} else {
				setError("Registration failed. Please try again.");
			}
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className="min-h-screen flex items-center justify-center bg-base-200 p-4 sm:p-6 lg:p-8">
			<div className="card w-full max-w-md bg-base-100 shadow-xl">
				<div className="card-body p-6 sm:p-8">
					<div className="text-center mb-6">
						<div className="flex justify-center mb-3">
							<GraduationCap className="w-16 h-16 text-primary" />
						</div>
						<h1 className="text-2xl sm:text-3xl font-bold">Create Account</h1>
						<p className="text-sm sm:text-base opacity-70 mt-2">
							Start tracking your academic progress
						</p>
					</div>

					{error && (
						<div role="alert" className="alert alert-error">
							<AlertCircle className="h-6 w-6 shrink-0" />
							<span>{error}</span>
						</div>
					)}

					<form onSubmit={handleSubmit} className="space-y-4">
						<div>
							<label htmlFor="name-input" className="label">
								<span className="label-text font-medium">Full Name</span>
							</label>
							<div
								className={`input input-bordered flex items-center gap-2 ${
									fieldErrors.name ? "input-error" : ""
								}`}
							>
								<UserIcon className="w-4 h-4 opacity-70" />
								<input
									id="name-input"
									type="text"
									className="grow"
									placeholder="John Doe"
									value={name}
									onChange={(e) => setName(e.target.value)}
									required
									autoComplete="name"
									aria-invalid={fieldErrors.name ? "true" : "false"}
									aria-describedby={fieldErrors.name ? "name-error" : undefined}
								/>
							</div>
							{fieldErrors.name && (
								<div className="label">
									<span className="label-text-alt text-error" id="name-error">
										{fieldErrors.name}
									</span>
								</div>
							)}
						</div>

						<div>
							<label htmlFor="email-input" className="label">
								<span className="label-text font-medium">Email Address</span>
							</label>
							<div
								className={`input input-bordered flex items-center gap-2 ${
									fieldErrors.email ? "input-error" : ""
								}`}
							>
								<Mail className="w-4 h-4 opacity-70" />
								<input
									id="email-input"
									type="email"
									className="grow"
									placeholder="you@example.com"
									value={email}
									onChange={(e) => setEmail(e.target.value)}
									required
									autoComplete="email"
									aria-invalid={fieldErrors.email ? "true" : "false"}
									aria-describedby={
										fieldErrors.email ? "email-error" : undefined
									}
								/>
							</div>
							{fieldErrors.email && (
								<div className="label">
									<span className="label-text-alt text-error" id="email-error">
										{fieldErrors.email}
									</span>
								</div>
							)}
						</div>

						<div>
							<label htmlFor="password-input" className="label">
								<span className="label-text font-medium">Password</span>
							</label>
							<div
								className={`input input-bordered flex items-center gap-2 ${
									fieldErrors.password ? "input-error" : ""
								}`}
							>
								<Lock className="w-4 h-4 opacity-70" />
								<input
									id="password-input"
									type="password"
									className="grow"
									placeholder="Create a password"
									value={password}
									onChange={(e) => setPassword(e.target.value)}
									required
									autoComplete="new-password"
									aria-invalid={fieldErrors.password ? "true" : "false"}
									aria-describedby={
										fieldErrors.password ? "password-error" : undefined
									}
								/>
							</div>
							{fieldErrors.password && (
								<div className="label">
									<span
										className="label-text-alt text-error"
										id="password-error"
									>
										{fieldErrors.password}
									</span>
								</div>
							)}
						</div>

						<div>
							<label htmlFor="confirm-password-input" className="label">
								<span className="label-text font-medium">Confirm Password</span>
							</label>
							<div
								className={`input input-bordered flex items-center gap-2 ${
									fieldErrors.confirmPassword ? "input-error" : ""
								}`}
							>
								<Lock className="w-4 h-4 opacity-70" />
								<input
									id="confirm-password-input"
									type="password"
									className="grow"
									placeholder="Confirm your password"
									value={confirmPassword}
									onChange={(e) => setConfirmPassword(e.target.value)}
									required
									autoComplete="new-password"
									aria-invalid={fieldErrors.confirmPassword ? "true" : "false"}
									aria-describedby={
										fieldErrors.confirmPassword
											? "confirm-password-error"
											: undefined
									}
								/>
							</div>
							{fieldErrors.confirmPassword && (
								<div className="label">
									<span
										className="label-text-alt text-error"
										id="confirm-password-error"
									>
										{fieldErrors.confirmPassword}
									</span>
								</div>
							)}
						</div>

						<button
							type="submit"
							className="btn btn-primary w-full mt-2"
							disabled={
								loading || !name || !email || !password || !confirmPassword
							}
							aria-label={loading ? "Creating account..." : "Sign Up"}
						>
							{loading ? (
								<>
									<span className="loading loading-spinner loading-sm" />
									<span>Creating account...</span>
								</>
							) : (
								"Sign Up"
							)}
						</button>

						<div className="text-center text-sm sm:text-base">
							<p className="opacity-70">
								Already have an account?{" "}
								<Link href="/" className="link link-primary">
									Login
								</Link>
							</p>
						</div>
					</form>
				</div>
			</div>
		</div>
	);
}
