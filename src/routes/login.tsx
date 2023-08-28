import { Show, createSignal } from "solid-js";
import { Navigate, createRouteAction } from "solid-start";
import { useSession } from "~/SessionContext";
import { authenticate } from "~/auth/authenticate";
import { Button } from "~/components/Button";
import { Input } from "~/components/Input";

export default function Login() {
  const { accessToken, setAccessToken } = useSession();

  const [username, setUsername] = createSignal("");
  const [password, setPassword] = createSignal("");

  const [enrolling, login] = createRouteAction(
    async ({ username, password }: { username: string; password: string }) => {
      const result = await authenticate({ username, password });

      console.log({ result });

      if (result.type === "error") {
        throw new Error(result.error);
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
            <div class="h-4 text-lg">
              <Show when={enrolling.pending}>
                <span class="text text-blue-400">please, wait...</span>
              </Show>
              <Show when={enrolling.error}>
                <span class="text text-red-400">{enrolling.error.message}</span>
              </Show>
            </div>
          </div>
          <Button
            onClick={() =>
              login({ username: username(), password: password() })
            }
          >
            Login
          </Button>
        </div>
      </div>
    </>
  );
}
