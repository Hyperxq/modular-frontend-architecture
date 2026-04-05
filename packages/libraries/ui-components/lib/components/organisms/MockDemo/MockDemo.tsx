import { cn } from "@modular-frontend/shared";
import type { FunctionalComponent } from "preact";
import type { MockDemoProps } from "./MockDemo.types";

const MockDemo: FunctionalComponent<MockDemoProps> = ({
	isMockActive,
	isMockEnabled,
	onToggle,
	users,
	isLoading,
	error,
}) => (
	<div class="flex flex-col gap-6 p-6">
		{/* Toggle section */}
		<div class="flex items-center justify-between rounded-lg border border-border-ghost bg-surface-container p-4">
			<div class="flex flex-col gap-1">
				<span class="font-label text-label-lg text-fg-primary">MSW Interceptor</span>
				<span class="text-body-sm text-fg-muted">
					{isMockEnabled ? "Toggle API mocking at runtime" : "Mock mode is not enabled"}
				</span>
			</div>
			<button
				type="button"
				role="switch"
				aria-checked={isMockActive}
				onClick={onToggle}
				disabled={!isMockEnabled}
				aria-label="MSW mock mode"
				class={cn(
					"relative inline-flex h-8 w-14 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors duration-fast ease-default",
					isMockActive ? "bg-primary" : "bg-surface-container-high",
					!isMockEnabled && "opacity-40 cursor-default",
				)}
			>
				<span
					class={cn(
						"pointer-events-none inline-block h-6 w-6 rounded-full bg-fg-on-primary shadow-sm transition-transform duration-fast ease-default",
						isMockActive ? "translate-x-6" : "translate-x-1",
					)}
				/>
			</button>
		</div>

		{/* Source indicator */}
		<div class="flex items-center gap-3">
			<div
				class={cn("h-3 w-3 rounded-full", isMockActive ? "bg-accent-success" : "bg-accent-warning")}
				aria-hidden="true"
			/>
			<div aria-live="polite" aria-atomic="true">
				<span class="font-label text-label-md text-fg-secondary" data-testid="source-label">
					Source: {isMockActive ? "Mock" : "Real API"}
				</span>
			</div>
		</div>

		{/* User list */}
		<section
			class="rounded-lg border border-border-ghost bg-surface-container-low"
			aria-labelledby="users-section-title"
		>
			<div class="border-b border-border-ghost px-4 py-3">
				<h3 id="users-section-title" class="font-label text-label-md text-primary uppercase m-0">
					Users — GET /users
				</h3>
			</div>
			<div class="p-4">
				{isLoading && (
					<p class="text-body-md text-fg-muted animate-pulse" data-testid="loading-indicator">
						Fetching users...
					</p>
				)}
				{error && (
					<p class="text-body-md text-accent-error" data-testid="error-message">
						{error}
					</p>
				)}
				{!isLoading && !error && users.length === 0 && (
					<p class="text-body-md text-fg-muted">No users found.</p>
				)}
				{!isLoading && !error && users.length > 0 && (
					<ul class="flex flex-col gap-2" data-testid="user-list">
						{users.map((user) => (
							<li
								key={user.id}
								class="flex items-center justify-between rounded border border-border-ghost bg-surface px-3 py-2"
							>
								<span class="text-body-md text-fg-primary">{user.name}</span>
								<span class="text-body-sm text-fg-muted">{user.email}</span>
							</li>
						))}
					</ul>
				)}
			</div>
		</section>
	</div>
);

export default MockDemo;
