import { createContext, useContext } from "react";

const InterfaceReadyContext = createContext(true);

export const InterfaceReadyProvider = InterfaceReadyContext.Provider;

/** False while the boot loader is visible; true once the main UI is shown. */
export const useInterfaceReady = () => useContext(InterfaceReadyContext);
