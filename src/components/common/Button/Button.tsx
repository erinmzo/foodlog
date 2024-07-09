import { PropsWithChildren } from "react";

function Button({ children }: PropsWithChildren) {
  return (
    <button className="rounded py-2 px-4 bg-[#24CAFF] border-[#00BBF7] text-center text-white font-bold">
      {children}
    </button>
  );
}

export default Button;
