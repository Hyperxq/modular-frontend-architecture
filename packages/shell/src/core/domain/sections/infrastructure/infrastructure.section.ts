import type { Section } from "../types";
import { awsProposal } from "./aws-proposal.slide";
import { githubPagesAlternative } from "./github-pages-alternative.slide";
import { independentDeploymentPerPackage } from "./independent-deployment-per-package.slide";

export const infrastructureSection: Section = {
	id: "infrastructure",
	title: "Infrastructure",
	description: "Deployment and infrastructure options",
	slides: [independentDeploymentPerPackage, awsProposal, githubPagesAlternative],
};
