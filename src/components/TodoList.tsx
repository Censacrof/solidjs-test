import { createSignal } from "solid-js";
import { Button } from "./Button";
import { Input } from "./Input";

export const TodoList = () => {
  const [inputElement, setInputElement] = createSignal<HTMLDivElement>();

  const [items, setItems] = createSignal<string[]>(["clean room"]);
  const [newItem, setnewItem] = createSignal("");

  return (
    <div class="flex-grow flex flex-col gap-4">
      <div class="flex w-80 gap-2">
        <Input
          ref={setInputElement}
          placeholder="buy milk"
          onInput={(event) => setnewItem(() => event.target.value)}
          value={newItem()}
        />
        <Button
          onClick={() => {
            setItems((items) => items.concat([newItem()]));
            setnewItem("");
            inputElement()?.focus();
          }}
          disabled={!newItem()}
          colorScheme="gray"
        >
          Add
        </Button>
      </div>
      <div class="flex-grow flex flex-col gap-4 bg-zinc-800 rounded-lg p-4">
        {items().map((item, i) => (
          <div class="flex items-center px-8 rounded-full h-10 self-stretch bg-zinc-900">
            <span class="flex-grow">{item}</span>
            <Button
              onclick={() => {
                setItems(items().filter((_item, index) => i !== index));
              }}
              colorScheme="red"
            >
              delete
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
};
