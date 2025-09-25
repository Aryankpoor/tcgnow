
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

   
      <main className="pt-16">
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
