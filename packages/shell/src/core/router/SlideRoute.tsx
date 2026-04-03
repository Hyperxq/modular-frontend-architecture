import type { FunctionalComponent } from "preact";
import { useEffect } from "preact/hooks";
import { Navigate, useParams } from "react-router";
import { PresentationContainer } from "../../features/presentation/PresentationContainer";
import { getSectionById, sections } from "../domain/slides";
import { useProgressStore } from "../store/progress.store";

const SlideRoute: FunctionalComponent = () => {
	const { sectionId, slideIndex: slideParam } = useParams();
	const navigate = useProgressStore((s) => s.navigate);
	const slideIndex = Number(slideParam);

	const section = sectionId ? getSectionById(sections, sectionId) : undefined;
	const isValid = section !== undefined && slideIndex >= 0 && slideIndex < section.slides.length;

	useEffect(() => {
		if (isValid && sectionId) {
			navigate(sectionId, slideIndex);
		}
	}, [sectionId, slideIndex, isValid, navigate]);

	if (sections.length === 0) {
		return <PresentationContainer />;
	}

	if (!isValid) {
		return <Navigate to={`/${sections[0].id}/0`} replace />;
	}

	return <PresentationContainer />;
};

export { SlideRoute };
