import { Button } from "~/components/Button";

export default function Login() {
  return (
    <div class="fixed inset-0 flex items-center justify-center">
      <div class="flex flex-col w-modal h-modal bg-zinc-900 p-4 rounded-lg gap-4">
        <div class="flex-grow flex flex-col bg-zinc-800 rounded-md p-2 justify-evenly">
          <label class="flex flex-col gap-1">
            <span class="text-zinc-50">e-mail</span>
            <input type="email" placeholder="eg. foo@bar.com" />
          </label>
          <label class="flex flex-col gap-1">
            <span class="text-zinc-50">password</span>
            <input type="password" placeholder="enter your password" />
          </label>
          <a href="#" class="text-blue-400">
            I forgot my password
          </a>
        </div>
        <Button>Login</Button>
      </div>
    </div>
  );
}
