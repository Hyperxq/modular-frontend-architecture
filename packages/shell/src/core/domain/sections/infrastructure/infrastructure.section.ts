import { lazy } from "preact/compat";
import type { Section } from "../types";

const LazyIndependentDeploymentPerPackage = lazy(() =>
	import(
		/* webpackChunkName: "section-infrastructure" */ "./independent-deployment-per-package.slide"
	).then((m) => ({ default: m.independentDeploymentPerPackage.Content })),
);

const LazyAwsProposal = lazy(() =>
	import(/* webpackChunkName: "section-infrastructure" */ "./aws-proposal.slide").then((m) => ({
		default: m.awsProposal.Content,
	})),
);

const LazyGithubPagesAlternative = lazy(() =>
	import(/* webpackChunkName: "section-infrastructure" */ "./github-pages-alternative.slide").then(
		(m) => ({ default: m.githubPagesAlternative.Content }),
	),
);

export const infrastructureSection: Section = {
	id: "infrastructure",
	title: "Infrastructure",
	description: "Deployment and infrastructure options",
	slides: [
		{
			title: "Independent Deployment Per Package",
			type: "concept",
			Content: LazyIndependentDeploymentPerPackage,
		},
		{ title: "AWS Proposal", type: "concept", Content: LazyAwsProposal },
		{
			title: "GitHub Pages Alternative",
			type: "concept",
			Content: LazyGithubPagesAlternative,
		},
	],
};
