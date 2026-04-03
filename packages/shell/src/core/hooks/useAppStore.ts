import { useShallow } from "zustand/react/shallow";
import { useAppStore as useAppStoreRaw } from "../store/app.store";

export function useAppLocale() {
	return useAppStoreRaw(useShallow((s) => ({ locale: s.locale, setLocale: s.setLocale })));
}

export function useAppInitialized() {
	return useAppStoreRaw((s) => s.isInitialized);
}
