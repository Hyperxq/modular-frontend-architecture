import { zodResolver } from "@hookform/resolvers/zod";
import type { FunctionalComponent } from "preact";
import { useForm } from "react-hook-form";
import { homeFormSchema } from "../domain/home.schema";
import type { HomeFormData } from "../domain/home.types";

interface HomeSearchFormProps {
	onSubmit: (data: HomeFormData) => void;
	isSubmitting?: boolean;
}

const HomeSearchForm: FunctionalComponent<HomeSearchFormProps> = ({
	onSubmit,
	isSubmitting = false,
}) => {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<HomeFormData>({
		resolver: zodResolver(homeFormSchema),
	});

	return (
		<form onSubmit={handleSubmit(onSubmit)} class="max-w-md mx-auto p-6">
			<div class="mb-4">
				<label for="name" class="block text-sm font-medium text-slate-300 mb-1">
					Name
				</label>
				<input
					id="name"
					type="text"
					{...register("name")}
					class="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-md text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
					placeholder="Your name"
				/>
				{errors.name && (
					<p class="mt-1 text-sm text-red-400" role="alert">
						{errors.name.message}
					</p>
				)}
			</div>

			<div class="mb-6">
				<label for="email" class="block text-sm font-medium text-slate-300 mb-1">
					Email
				</label>
				<input
					id="email"
					type="email"
					{...register("email")}
					class="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-md text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
					placeholder="you@example.com"
				/>
				{errors.email && (
					<p class="mt-1 text-sm text-red-400" role="alert">
						{errors.email.message}
					</p>
				)}
			</div>

			<button
				type="submit"
				disabled={isSubmitting}
				class="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white font-semibold rounded-md transition-colors"
			>
				{isSubmitting ? "Submitting..." : "Submit"}
			</button>
		</form>
	);
};

export default HomeSearchForm;
