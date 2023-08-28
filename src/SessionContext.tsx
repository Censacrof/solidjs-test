import { JSXElement, createContext, useContext } from "solid-js";
import { createStore } from "solid-js/store";

export type Session = {
  accessToken: string | undefined;
};

export type SessionContextValue = {
  session: Session;
  setAccessToken: (token: string) => void;
  logout: () => void;
};

const SessionContext = createContext<SessionContextValue>();

export const SessionProvider = (props: {
  children?: JSXElement | JSXElement[];
}) => {
  const [session, setSession] = createStore<{
    accessToken: string | undefined;
  }>({
    accessToken: undefined,
  });

  const setAccessToken = (accessToken: string) => {
    setSession({
      ...session,
      accessToken,
    });
  };

  const logout = () => {
    setSession({
      ...session,
      accessToken: undefined,
    });
  };

  return (
    <SessionContext.Provider
      value={{
        session,
        setAccessToken,
        logout,
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
