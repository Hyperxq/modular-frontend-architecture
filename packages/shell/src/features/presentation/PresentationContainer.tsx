import type { FunctionalComponent } from "preact";
import BottomBar from "ui_components/atoms/BottomBar/BottomBar";
import NavArrows from "ui_components/atoms/NavArrows/NavArrows";
import SlideTransition from "ui_components/atoms/SlideTransition/SlideTransition";
import CenterPanel from "ui_components/molecules/CenterPanel/CenterPanel";
import DiagramPanel from "ui_components/molecules/DiagramPanel/DiagramPanel";
import Header from "ui_components/molecules/Header/Header";
import Sidebar from "ui_components/molecules/Sidebar/Sidebar";
import PresentationLayout from "ui_components/organisms/PresentationLayout/PresentationLayout";
import { useKeyboard } from "../../core/hooks/useKeyboard";
import { usePresentationData } from "./usePresentationData";

const PresentationContainer: FunctionalComponent = () => {
	const data = usePresentationData();

	useKeyboard({
		goNext: data.goNext,
		goPrev: data.goPrev,
		canGoNext: data.canGoNext,
		canGoPrev: data.canGoPrev,
	});

	return (
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
	);
};

export { PresentationContainer };
