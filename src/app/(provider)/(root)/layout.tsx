import Footer from "@/components/common/Footer";
import Header from "@/components/common/Header";
import WriteButton from "@/components/post/write/WriteButton";
import { PropsWithChildren } from "react";

function MainLayout({ children }: PropsWithChildren) {
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
