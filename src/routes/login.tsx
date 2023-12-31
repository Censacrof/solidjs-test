import { Show, createSignal } from "solid-js";
import { Navigate, createRouteAction } from "solid-start";
import { authenticate } from "~/auth/authenticate";
import { Button } from "~/components/Button";
import { Input } from "~/components/Input";
import { useSession } from "~/context/SessionContext";

export default function Login() {
  const { session, setAccessToken } = useSession();

  const [username, setUsername] = createSignal("");
  const [password, setPassword] = createSignal("");

  const [enrolling, login] = createRouteAction(async (formData: FormData) => {
    const username = formData.get("username") as string;
    const password = formData.get("password") as string;

    if (!username || !password) {
      throw new Error("fill all the fields");
    }

    const result = await authenticate({ username, password });

    console.log({ result });

    if (result.type === "error") {
      throw new Error(result.error);
    }

    setAccessToken(result.data);
  });

  return (
    <>
      {session.accessToken && <Navigate href={"/"} />}

      <div class="fixed inset-0 flex items-center justify-center">
        <login.Form class="flex flex-col w-modal h-modal bg-zinc-900 p-4 rounded-lg gap-4">
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
          <Button type="submit">Login</Button>
        </login.Form>
      </div>
    </>
  );
}
