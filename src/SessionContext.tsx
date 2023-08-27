import {
  Accessor,
  JSXElement,
  Setter,
  createContext,
  createSignal,
  useContext,
} from "solid-js";

export type SessionContextValue = {
  accessToken: Accessor<string | undefined>;
  setAccessToken: Setter<string | undefined>;
};

const SessionContext = createContext<SessionContextValue>();

export const SessionProvider = (props: {
  children?: JSXElement | JSXElement[];
}) => {
  const [accessToken, setAccessToken] = createSignal<string>();

  return (
    <SessionContext.Provider
      value={{
        accessToken,
        setAccessToken,
      }}
    >
      {props.children}
    </SessionContext.Provider>
  );
};

export const useSession = () => {
  const context = useContext(SessionContext);

  if (!context) {
    throw new Error("useSession invoked outside of SessionProvider");
  }

  return context;
};
