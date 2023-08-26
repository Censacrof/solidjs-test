import { createSignal } from "solid-js";

export const TodoList = () => {
  const [inputElement, setInputElement] = createSignal<HTMLDivElement>();

  const [items, setItems] = createSignal<string[]>(["clean room"]);
  const [newItem, setnewItem] = createSignal("");

  return (
    <div class="flex-grow flex flex-col gap-4">
      <div class="flex w-80 gap-2">
        <input
          ref={setInputElement}
          class="text-zinc-950 rounded-md"
          placeholder="buy milk"
          onInput={(event) => setnewItem(() => event.target.value)}
          value={newItem()}
        />
        <button
          class="bg-zinc-700 px-4 py-1 rounded-md disabled:opacity-40"
          onClick={() => {
            setItems((items) => items.concat([newItem()]));
            setnewItem("");
            inputElement()?.focus();
          }}
          disabled={!newItem()}
        >
          Add
        </button>
      </div>
      <div class="flex-grow flex flex-col gap-4 bg-zinc-800 rounded-lg p-4">
        {items().map((item, i) => (
          <div class="flex items-center px-8 rounded-full h-10 self-stretch bg-zinc-900">
            <span class="flex-grow">{item}</span>
            <button
              class="bg-red-400 text-zinc-50 px-4 py-1 rounded-md disabled:opacity-40"
              onclick={() => {
                setItems(items().filter((_item, index) => i !== index));
              }}
            >
              delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};
