import type { FunctionalComponent } from "preact";
import { lazy, Suspense } from "preact/compat";
import { useRef } from "preact/hooks";
import { PresentationSkeleton } from "../../core/components/PresentationSkeleton";
import { useFocusTrap } from "../../core/hooks/useFocusTrap";
import { useKeyboard } from "../../core/hooks/useKeyboard";
import { useIsMobile } from "../../core/hooks/useMediaQuery";
import { useSwipe } from "../../core/hooks/useSwipe";
import { useSidebarDrawer } from "../../core/store/app.store";
import { usePresentationData } from "./usePresentationData";

const BottomBar = lazy(() => import("ui_components/atoms/BottomBar/BottomBar"));
const SlideTransition = lazy(() => import("ui_components/atoms/SlideTransition/SlideTransition"));
const CenterPanel = lazy(() => import("ui_components/molecules/CenterPanel/CenterPanel"));
const DiagramPanel = lazy(() => import("ui_components/molecules/DiagramPanel/DiagramPanel"));
const Header = lazy(() => import("ui_components/molecules/Header/Header"));
const Sidebar = lazy(() => import("ui_components/molecules/Sidebar/Sidebar"));
const PresentationLayout = lazy(
	() => import("ui_components/organisms/PresentationLayout/PresentationLayout"),
);

const PresentationContainer: FunctionalComponent = () => {
	const data = usePresentationData();
	const isMobile = useIsMobile();
	const { isSidebarOpen, toggleSidebar, closeSidebar } = useSidebarDrawer();
	const contentRef = useRef<HTMLDivElement>(null);
	const drawerRef = useRef<HTMLDivElement>(null);

	useFocusTrap(drawerRef, isSidebarOpen);

	const { flashPrev, flashNext } = useKeyboard({
		goNext: data.goNext,
		goPrev: data.goPrev,
		canGoNext: data.canGoNext,
		canGoPrev: data.canGoPrev,
	});

	useSwipe(contentRef, {
		onSwipeLeft: data.goNext,
		onSwipeRight: data.goPrev,
		enabled: isMobile,
	});

	const { SlideContent } = data;

	// ── Arrow visibility logic ──
	// Visible + enabled: canGo is true
	// Visible + disabled (flash): canGo is false BUT user pressed keyboard arrow
	// Hidden: canGo is false AND no flash active
	const showPrev = data.canGoPrev || flashPrev;
	const showNext = data.canGoNext || flashNext;

	const navPrevBtn = showPrev ? (
		<NavButton
			direction="prev"
			onClick={data.goPrev}
			disabled={!data.canGoPrev}
			flash={flashPrev}
		/>
	) : null;
	const navNextBtn = showNext ? (
		<NavButton
			direction="next"
			onClick={data.goNext}
			disabled={!data.canGoNext}
			flash={flashNext}
		/>
	) : null;

	const sidebarProps = {
		sections: data.sidebarSections,
		activeSectionId: data.currentSectionId,
		onSectionClick: data.handleSectionClick,
		appName: data.sidebarAppName,
		version: data.sidebarVersion,
	};

	return (
		<Suspense fallback={<PresentationSkeleton />}>
			<PresentationLayout
				showDiagram={data.showDiagram}
				isMobile={isMobile}
				navPrev={navPrevBtn}
				navNext={navNextBtn}
				header={
					<Header
						title={data.appTitle}
						linkText={data.githubLinkText}
						linkUrl={data.githubLinkUrl}
						showMenuButton={isMobile}
						onMenuToggle={toggleSidebar}
					/>
				}
				sidebar={<Sidebar {...sidebarProps} />}
				sidebarDrawer={
					<div ref={drawerRef}>
						<Sidebar {...sidebarProps} isDrawer isOpen={isSidebarOpen} onClose={closeSidebar} />
					</div>
				}
				center={
					<div ref={contentRef} class="h-full touch-pan-y">
						<SlideTransition transitionKey={data.transitionKey}>
							<CenterPanel sectionLabel={data.sectionLabel} slideTitle={data.slideTitle}>
								{SlideContent && <SlideContent />}
							</CenterPanel>
						</SlideTransition>
					</div>
				}
				diagram={
					data.showDiagram ? (
						<DiagramPanel panelTitle={data.diagramTitle}>
							<p>{data.currentSlide?.diagram ?? ""}</p>
						</DiagramPanel>
					) : null
				}
				bottom={
					<BottomBar
						currentSlideIndex={data.currentSlideIndex}
						totalSlides={data.sectionSlideCount}
						currentSectionIndex={data.sectionIndex}
						totalSections={data.totalSections}
						navPrev={isMobile ? navPrevBtn : undefined}
						navNext={isMobile ? navNextBtn : undefined}
						showSwipeHint={isMobile}
					/>
				}
			/>
		</Suspense>
	);
};

const NAV_LABELS = { prev: "Previous slide", next: "Next slide" } as const;
const NAV_PATHS = { prev: "M15 18l-6-6 6-6", next: "M9 18l6-6-6-6" } as const;

const NAV_BTN_BASE =
	"flex items-center justify-center w-14 h-14 bg-surface-container border border-border-ghost rounded-full transition-all duration-normal ease-default";

const NAV_BTN_ENABLED =
	"cursor-pointer hover:enabled:border-primary hover:enabled:bg-surface-container-high hover:enabled:shadow-[0_0_20px_var(--color-primary-glow-strong)] hover:enabled:scale-[1.04] active:enabled:scale-[0.97]";

const NAV_BTN_DISABLED = "opacity-30 cursor-default";

function NavButton({
	direction,
	onClick,
	disabled,
	flash,
}: {
	direction: "prev" | "next";
	onClick: () => void;
	disabled: boolean;
	flash: boolean;
}) {
	return (
		<button
			type="button"
			class={`${NAV_BTN_BASE} ${disabled ? NAV_BTN_DISABLED : NAV_BTN_ENABLED} ${flash ? "animate-fade-up" : ""}`}
			onClick={onClick}
			disabled={disabled}
			aria-label={NAV_LABELS[direction]}
			data-flash={flash || undefined}
		>
			<svg
				class="w-6 h-6 text-primary"
				viewBox="0 0 24 24"
				fill="none"
				stroke="currentColor"
				stroke-width="2.5"
				stroke-linecap="round"
				stroke-linejoin="round"
				aria-hidden="true"
			>
				<path d={NAV_PATHS[direction]} />
			</svg>
		</button>
	);
}

export { PresentationContainer };
