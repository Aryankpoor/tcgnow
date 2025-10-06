
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
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <section className="relative w-full h-[400px]" aria-label="Hero banner">
        <Image
          src="/banner.png"
          alt="TCGNOW - Trading Card Game Hub with collection management and trading features"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
          <h1 className="text-white text-4xl md:text-5xl font-bold text-center drop-shadow-lg px-4">
            Welcome to TCGNOW
          </h1>
        </div>
      </section>
      <header className="pt-20 pb-8 px-4">
        <p className="text-xl text-center mt-4 max-w-4xl mx-auto leading-relaxed">
          An archive for all from hobbyists to box breakers! Find all you need regarding a Topps collection!
          <br />
          <span className="inline-block mt-2">
            Only Match Attax 2024-25 and Cricket Attax 2011 are the current active collections!
          </span>
          <br />
          <span className="inline-block mt-2 text-gray-600 dark:text-gray-400">
            More to come in the coming days!
          </span>
        </p>
      </header>

      <main className="px-4 flex-grow">
        {/* Featured collections or stats can go here */}
      </main>

      <footer className="flex justify-center py-8 mt-auto bg-gray-50 dark:bg-gray-900">
        <div className="w-full max-w-2xl px-4">
          <h2 className="text-2xl font-bold text-center mb-6">Frequently Asked Questions</h2>
          <Accordion type="single" collapsible className="w-full" defaultValue="item-1">
            <AccordionItem value="item-1">
              <AccordionTrigger>Which card designs does TCGNOW support?</AccordionTrigger>
              <AccordionContent className="flex flex-col gap-4 text-balance">
                <p>
                  TCGNOW currently includes UK, US and Indian Design pattern of trading cards. 
                  Only these variants are currently available on the site.
                </p>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger>Where does TCGNOW ship?</AccordionTrigger>
              <AccordionContent className="flex flex-col gap-4 text-balance">
                <p>
                  TCGNOW currently ships within India. TCGNOW also ships outside India, 
                  but with extra shipping cost.
                </p>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3">
              <AccordionTrigger>How often are new collections added?</AccordionTrigger>
              <AccordionContent className="flex flex-col gap-4 text-balance">
                <p>
                  We are actively working on adding new collections daily. Check back regularly 
                  for updates on Match Attax and Cricket Attax collections.
                </p>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
          <div className="text-center mt-8 text-sm text-gray-600 dark:text-gray-400">
            <p>Made with ❤️ by the TCG NOW community</p>
            <p className="mt-2">
              <a 
                href="https://github.com/Anuradha-Herath/tcgnow" 
                target="_blank" 
                rel="noopener noreferrer"
                className="hover:text-blue-600 transition-colors"
              >
                Contribute on GitHub
              </a>
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
