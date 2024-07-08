import { PropsWithChildren } from "react";

function Button({ children }: PropsWithChildren) {
  return <div className="py-2 px-4 bg-sky-400 border-sky-500">{children}</div>;
}

export default Button;
