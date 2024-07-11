import Footer from "@/components/common/Footer";
import Header from "@/components/common/Header";
import WriteButton from "@/components/post/write/WriteButton";
import { createClient } from "@/supabase/server";
import { PropsWithChildren } from "react";

async function MainLayout({ children }: PropsWithChildren) {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  console.log(user);

  return (
    <>
      <div>
        <Header />
        <main>{children}</main>
        <div className="fixed right-[20px] lg:right-[150px] bottom-[40px]">
          <WriteButton />
        </div>
        <Footer />
      </div>
    </>
  );
}

export default MainLayout;
