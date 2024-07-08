import { PropsWithChildren } from "react";

function Button({ children }: PropsWithChildren) {
  return <div className="rounded py-2 px-4 bg-sky-400 border-sky-500 text-center">{children}</div>;
}

export default Button;
