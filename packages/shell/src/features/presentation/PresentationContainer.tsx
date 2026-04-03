import type { FunctionalComponent } from "preact";
import { lazy, Suspense } from "preact/compat";
import { useKeyboard } from "../../core/hooks/useKeyboard";
import { usePresentationData } from "./usePresentationData";

const BottomBar = lazy(() => import("ui_components/atoms/BottomBar/BottomBar"));
const NavArrows = lazy(() => import("ui_components/atoms/NavArrows/NavArrows"));
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
				header={
					<Header
						title={data.currentSection?.title ?? ""}
						currentSectionIndex={data.sectionIndex}
						totalSections={data.totalSections}
					/>
				}
				sidebar={
					<Sidebar
						sections={data.sidebarSections}
						activeSectionId={data.currentSectionId}
						onSectionClick={data.handleSectionClick}
					/>
				}
				center={
					<SlideTransition transitionKey={data.transitionKey}>
						<CenterPanel>
							<h2>{data.currentSlide?.title ?? "No slides yet"}</h2>
							<p>{data.currentSlide?.content ?? ""}</p>
						</CenterPanel>
					</SlideTransition>
				}
				diagram={
					data.showDiagram && data.currentSlide?.diagram ? (
						<DiagramPanel>
							<p>{data.currentSlide.diagram}</p>
						</DiagramPanel>
					) : null
				}
				bottom={
					<BottomBar currentSlideIndex={data.currentSlideIndex} totalSlides={data.totalSlides}>
						<NavArrows
							onNext={data.goNext}
							onPrev={data.goPrev}
							canGoNext={data.canGoNext}
							canGoPrev={data.canGoPrev}
						/>
					</BottomBar>
				}
			/>
		</Suspense>
	);
};

export { PresentationContainer };
