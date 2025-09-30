
import Navbar from "@/components/Navbar";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

export default function Home() {
  return (
    <div>
      <Navbar />
      <header className="pt-20 pb-8 px-4">
        <h1 className="scroll-m-20 text-center text-4xl font-extrabold tracking-tight text-balance">
          Welcome to TCGNOW</h1>
        <p className="text-xl text-center mt-4">
          An archive for all from hobbyists to box breakers! Find all you need regarding a Topps collection :)
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
