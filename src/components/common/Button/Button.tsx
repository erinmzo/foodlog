import { PropsWithChildren } from "react";

function Button({ children }: PropsWithChildren) {
  return (
    <span className="rounded py-2 px-4 bg-[#24CAFF] border-[#00BBF7] text-center text-white font-bold">{children}</span>
  );
}

export default Button;
