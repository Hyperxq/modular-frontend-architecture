export type ImportMapPluginOptions = Partial<{
	dir: string;
	specPrefix: string;
	baseUrl: string;
	outFile: string;
	includeCss: boolean;
	componentPath: string[];
}>;
