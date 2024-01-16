import Footer from "@/components/footer";
import Header from "@/components/header";
import Head from "next/head";
import { Props } from "next/script";

export function MainLayout({ children }: Props) {
  return (
    <>
      <main>
        <Header />
        
        {children}
        <Footer />
      </main>
    </>
  );
}
