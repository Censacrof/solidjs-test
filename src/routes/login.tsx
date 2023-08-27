import { createSignal } from "solid-js";
import { Navigate } from "solid-start";
import { useSession } from "~/SessionContext";
import { Button } from "~/components/Button";
import { Input } from "~/components/Input";

export default function Login() {
  const { accessToken, setAccessToken } = useSession();

  const [email, setEmail] = createSignal("");
  const [password, setPassword] = createSignal("");

  return (
    <>
      {accessToken() && <Navigate href={"/"} />}

      <div class="fixed inset-0 flex items-center justify-center">
        <div class="flex flex-col w-modal h-modal bg-zinc-900 p-4 rounded-lg gap-4">
          <div class="flex-grow flex flex-col bg-zinc-800 rounded-md p-2 justify-evenly">
            <label class="flex flex-col gap-1">
              <span class="text-zinc-50">e-mail</span>
              <Input
                type="email"
                placeholder="eg. foo@bar.com"
                value={email()}
                onChange={(event) => setEmail(() => event.target.value)}
              />
            </label>
            <label class="flex flex-col gap-1">
              <span class="text-zinc-50">password</span>
              <Input
                type="password"
                placeholder="enter your password"
                value={password()}
                onChange={(event) => setPassword(() => event.target.value)}
              />
            </label>
            <a href="#" class="text-blue-400">
              I forgot my password
            </a>
          </div>
          <Button onClick={() => setAccessToken("a valid access token")}>
            Login
          </Button>
        </div>
      </div>
    </>
  );
}
