import { JSX, Ref } from "solid-js";
import { twMerge } from "tailwind-merge";

export type ButtonProps = JSX.IntrinsicElements["button"] & {
  ref?: Ref<HTMLButtonElement>;
  colorScheme?: "gray" | "red";
};

export const Button = (props: ButtonProps) => {
  return (
    <button
      {...props}
      class={twMerge(
        "bg-zinc-700 px-4 py-1 rounded-md disabled:opacity-40",
        props.colorScheme === "red" && "bg-red-400 text-zinc-50",
        props.class,
      )}
    ></button>
  );
};
