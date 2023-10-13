import { Footer } from "@/components/Footer";
import Nav from "@/components/Nav";
import PageWraper from "@/components/PageWraper";
import Particles from "@/components/Particles";
import Image from "next/image";

export default function Home() {
  return (
    <>
      <Nav></Nav>
      <PageWraper>
        <main className="backgroundColor">
          <Particles
            className="absolute inset-0 -z-10 animate-fade-in"
            quantity={300}
          />
          <div className="flex flex-col items-center justify-center w-screen h-screen overflow-hidden dark:bg-gradient-to-tlfrom-black dark:from-black dark:via-zinc-600/20 dark:to-black">
            <div className="hidden w-screen h-px animate-glow md:block animate-fade-left bg-gradient-to-r from-zinc-300/0 via-zinc-300/50 to-zinc-300/0" />
            <h1 className="animate-title z-10 pb-4 pt-0 text-4xl text-transparent duration-1000 dark:bg-purple-100 bg-black cursor-default text-edge-outline  font-display sm:text-6xl md:text-9xl whitespace-nowrap bg-clip-text ">
              UnProyecto
            </h1>
            <h1 className="animate-title z-10 pb-4 pt-0 text-4xl text-transparent duration-1000 dark:bg-purple-100 bg-black cursor-default text-edge-outline  font-display sm:text-6xl md:text-9xl whitespace-nowrap bg-clip-text ">
              UnProyecto
            </h1>
          </div>
          <div className="hidden w-screen h-px animate-glow md:block animate-fade-right bg-gradient-to-r from-zinc-300/0 via-zinc-300/50 to-zinc-300/0" />
        </main>
      </PageWraper>
      <Footer></Footer>
    </>
  );
}
