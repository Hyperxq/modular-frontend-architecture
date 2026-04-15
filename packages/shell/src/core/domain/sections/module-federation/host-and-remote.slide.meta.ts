import type { SlideMeta } from "../types";

export const hostAndRemoteMeta: SlideMeta = {
	title: "Host And Remote",
	type: "diagram",
	diagram: `sequenceDiagram
    participant Dev as Developer
    participant Shell as Shell :3002
    participant Manifest as mf-manifest.json<br/>(:3001)
    participant Chunk as Component chunk<br/>(:3001/chunks/...)
    participant Browser as Browser DOM

    Note over Dev,Chunk: BUILD TIME
    Dev->>Shell: rslib build (ui-components first)
    Dev->>Manifest: generates mf-manifest.json

    Note over Shell,Browser: RUNTIME
    Browser->>Shell: loads app
    Shell->>Manifest: fetch mf-manifest.json
    Manifest-->>Shell: { exposes: { "./atoms/Button": "/chunks/Button.abc123.js" } }
    Shell->>Chunk: fetch chunk on demand<br/>(only when component is needed)
    Chunk-->>Shell: component module
    Shell->>Browser: render as if local import

    Note over Shell,Browser: Shell never bundled the remote.<br/>It fetched it.`,
};
