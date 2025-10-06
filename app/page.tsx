
import Navbar from "@/components/Navbar";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import Image from "next/image";

export default function Home() {
  return (
    <div>
      <Navbar />
      <section className="relative w-full h-[400px]">
        <Image
          src="/public/banner.png"
          alt="TCGNOW banner"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
          <h1 className="text-white text-4xl md:text-5xl font-bold text-center drop-shadow-lg">
            Welcome to TCGNOW
          </h1>
        </div>
      </section>
      <header className="pt-20 pb-8 px-4">
        
        <p className="text-xl text-center mt-4">
          An archive for all from hobbyists to box breakers! Find all you need regarding a Topps collection!<br />
          Only Match Attax 2024-25 and Cricket Attax 2011 are the current active collections!<br /> More to come in the coming days!
        </p>
      </header>

      <main className="px-4">
        {/* main content goes here */}
      </main>

      <footer className="flex justify-center py-8">
        <div className="w-full max-w-2xl px-4">
          <Accordion type="single" collapsible className="w-full" defaultValue="item-1" >
            <AccordionItem value="item-1">
              <AccordionTrigger>Which card designs does TCGNOW support?</AccordionTrigger>
              <AccordionContent className="flex flex-col gap-4 text-balance">
                <p>TCGNOW currently includes UK, US and Indian Design pattern of trading cards. Only these variants are currently available in site</p>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger>Where does TCGNOW ship?</AccordionTrigger>
              <AccordionContent className="flex flex-col gap-4 text-balance">
                <p>TCGNOW currently ships within India. TCGNOW also ships outside India, but with extra shipping cost.</p>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </footer>
    </div>
  );
}
