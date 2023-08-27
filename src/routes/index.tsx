import { TodoList } from "~/components/TodoList";

export default function Home() {
  return (
    <main class="text-center mx-auto text-gray-700 p-4">
      <div class="fixed inset-0 grid grid-cols-main grid-rows-main bg-zinc-950">
        <div class="row-start-2 col-start-2 flex flex-col bg-zinc-900 rounded-xl text-zinc-100 p-4 gap-4">
          <div class="flex flex-col items-center">
            <p class="text-xl">yet another</p>
            <h1 class="text-5xl">Todo list!</h1>
          </div>
          <TodoList />
        </div>
      </div>
    </main>
  );
}
