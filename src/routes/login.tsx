import { createSignal } from "solid-js";
import { Navigate, createRouteAction } from "solid-start";
import { useSession } from "~/SessionContext";
import { authenticate } from "~/auth/authenticate";
import { Button } from "~/components/Button";
import { Input } from "~/components/Input";

export default function Login() {
  const { accessToken, setAccessToken } = useSession();

  const [username, setUsername] = createSignal("francesco");
  const [password, setPassword] = createSignal("foffo");

  const [{ pending, error }, login] = createRouteAction(
    async ({ username, password }: { username: string; password: string }) => {
      const result = await authenticate(username, password);

      console.log({ result });

      if (result.type === "error") {
        throw new Error(error);
      }

      setAccessToken(result.data);
    },
  );

  return (
    <>
      {accessToken() && <Navigate href={"/"} />}

      <div class="fixed inset-0 flex items-center justify-center">
        <div class="flex flex-col w-modal h-modal bg-zinc-900 p-4 rounded-lg gap-4">
          <div class="flex-grow flex flex-col bg-zinc-800 rounded-md p-2 justify-evenly">
            <label class="flex flex-col gap-1">
              <span class="text-zinc-50">e-mail</span>
              <Input
                type="text"
                placeholder="eg. johndoe"
                name="username"
                value={username()}
                onChange={(event) => setUsername(() => event.target.value)}
              />
            </label>
            <label class="flex flex-col gap-1">
              <span class="text-zinc-50">password</span>
              <Input
                type="password"
                placeholder="enter your password"
                name="password"
                value={password()}
                onChange={(event) => setPassword(() => event.target.value)}
              />
            </label>
            <a href="#" class="text-blue-400">
              I forgot my password
            </a>
          </div>
          <Button
            onClick={() =>
              login({ username: username(), password: password() })
            }
          >
            Login
          </Button>
          {pending && <span>wait a second</span>}
        </div>
      </div>
    </>
  );
}
