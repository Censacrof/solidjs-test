import { useSession } from "~/SessionContext";
import { Button } from "~/components/Button";
import { NavigateToLogin } from "~/components/NavigateToLogin";
import { TodoList } from "~/components/TodoList";

export default function Home() {
  const { accessToken } = useSession();

  return (
    <>
      {!accessToken() && <NavigateToLogin />}

      <main class="fixed inset-0 grid grid-cols-main grid-rows-main">
        <div class="row-start-1 col-start-3 justify-self-end p-4">
          <LogoutButton />
        </div>
        <div class="row-start-2 col-start-2 flex flex-col bg-zinc-900 rounded-xl text-zinc-100 p-4 gap-4">
          <div class="flex flex-col items-center">
            <p class="text-xl">yet another</p>
            <h1 class="text-5xl">Todo list!</h1>
          </div>
          <TodoList />
        </div>
      </main>
    </>
  );
}

const LogoutButton = () => {
  const { setAccessToken } = useSession();

  return <Button onClick={() => setAccessToken()}>Logout</Button>;
};
