import {
  JSXElement,
  Signal,
  createContext,
  createSignal,
  useContext,
} from "solid-js";

type SessionContextValue = {
  accessTokenSignal: Signal<string | undefined>;
};

const SessionContext = createContext<SessionContextValue>();

export const SessionProvider = (props: {
  children?: JSXElement | JSXElement[];
}) => {
  const accessTokenSignal = createSignal<string>();

  return (
    <SessionContext.Provider
      value={{
        accessTokenSignal,
      }}
    >
      {props.children}
    </SessionContext.Provider>
  );
};

export const useSession = () => useContext(SessionContext);
