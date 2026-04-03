import type { FunctionalComponent } from "preact";
import { lazy, Suspense } from "preact/compat";
import { useKeyboard } from "../../core/hooks/useKeyboard";
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

	useKeyboard({
		goNext: data.goNext,
		goPrev: data.goPrev,
		canGoNext: data.canGoNext,
		canGoPrev: data.canGoPrev,
	});

	return (
		<Suspense
			fallback={
				<div style={{ color: "var(--text-muted)", padding: "var(--space-8)" }}>Loading...</div>
			}
		>
			<PresentationLayout
				showDiagram={data.showDiagram}
				navPrev={
					<button
						type="button"
						onClick={data.goPrev}
						disabled={!data.canGoPrev}
						aria-label="Previous slide"
					>
						‹
					</button>
				}
				navNext={
					<button
						type="button"
						onClick={data.goNext}
						disabled={!data.canGoNext}
						aria-label="Next slide"
					>
						›
					</button>
				}
				header={
					<Header
						title={data.appTitle}
						linkText={data.githubLinkText}
						linkUrl={data.githubLinkUrl}
					/>
				}
				sidebar={
					<Sidebar
						sections={data.sidebarSections}
						activeSectionId={data.currentSectionId}
						onSectionClick={data.handleSectionClick}
						appName={data.sidebarAppName}
						version={data.sidebarVersion}
					/>
				}
				center={
					<SlideTransition transitionKey={data.transitionKey}>
						<CenterPanel
							sectionLabel={data.sectionLabel}
							slideTitle={data.slideTitle}
							slideBody={data.slideBody}
						/>
					</SlideTransition>
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
					/>
				}
			/>
		</Suspense>
	);
};

export { PresentationContainer };
