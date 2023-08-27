import { JSX, Ref } from "solid-js";
import { twMerge } from "tailwind-merge";

export type InputProps = JSX.IntrinsicElements["input"] & {
  ref?: Ref<HTMLInputElement>;
};

export const Input = (props: InputProps) => {
  return (
    <input
      {...props}
      class={twMerge("text-zinc-950 rounded-md", props.class)}
    ></input>
  );
};
