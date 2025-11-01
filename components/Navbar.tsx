import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";

import Link from "next/link"

export default function Navbar() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background border-b mt-0">
      <NavigationMenu>
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuTrigger className="font-bold">Topps UCC</NavigationMenuTrigger>
            <NavigationMenuContent>
              <NavigationMenuLink className="font-bold" asChild>
                <Link href="/match-attax-24-25-extra">Match Attax 24/25 Extra</Link>
              </NavigationMenuLink>
              <NavigationMenuLink className="font-bold" asChild>
                <Link href="/match-attax-24-25">Match Attax 24/25</Link>
              </NavigationMenuLink>
              <NavigationMenuLink className="font-bold" asChild>
                <Link href="/match-attax-23-24-extra">Match Attax 23/24 Extra</Link>
              </NavigationMenuLink>
              <NavigationMenuLink className="font-bold" asChild>
                <Link href="/match-attax-23-24">Match Attax 23/24</Link>
              </NavigationMenuLink>
              <NavigationMenuLink className="font-bold" asChild>
                <Link href="/match-attax-22-23-extra">Match Attax 22/23 Extra</Link>
              </NavigationMenuLink>
              <NavigationMenuLink className="font-bold" asChild>
                <Link href="/match-attax-22-23">Match Attax 22/23</Link>
              </NavigationMenuLink>
              <NavigationMenuLink className="font-bold" asChild>
                <Link href="/match-attax-21-22">Match Attax 21/22</Link>
              </NavigationMenuLink>
              <ul className="grid gap-2 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
                <li className="row-span-3">
                  <NavigationMenuLink asChild>
                    <Link
                      className="from-muted/50 to-muted flex h-full w-full flex-col justify-end rounded-md bg-linear-to-b p-6 no-underline outline-hidden select-none focus:shadow-md"
                      href="/"
                    >
                      <div className="mt-4 mb-2 text-lg font-medium">
                        Match Attax
                      </div>
                      <p className="text-muted-foreground text-sm leading-tight">
                        2025 edition will be uploaded following Indian rollout
                      </p>
                    </Link>
                  </NavigationMenuLink>
                </li> 
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>

          <NavigationMenuItem>
            <NavigationMenuTrigger className="font-bold">Topps Match Attax</NavigationMenuTrigger>
            <NavigationMenuContent>
              <NavigationMenuLink className="font-bold" asChild>
                <Link href="/match-attax-20-21">Match Attax 20/21</Link>
              </NavigationMenuLink>
              <NavigationMenuLink className="font-bold" asChild>
                <Link href="/match-attax-19-20">Match Attax 19/20</Link>
              </NavigationMenuLink>
              <NavigationMenuLink className="font-bold" asChild>
                <Link href="/match-attax-18-19">Match Attax 18/19</Link>
              </NavigationMenuLink>
              <NavigationMenuLink className="font-bold" asChild>
                <Link href="/match-attax-16-17-ucl">Match Attax 16/17 UCL</Link>
              </NavigationMenuLink>
              <ul className="grid gap-2 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
                <li className="row-span-3">
                  <NavigationMenuLink asChild>
                    <Link
                      className="from-muted/50 to-muted flex h-full w-full flex-col justify-end rounded-md bg-linear-to-b p-6 no-underline outline-hidden select-none focus:shadow-md"
                      href="/"
                    >
                      <div className="mt-4 mb-2 text-lg font-medium">
                        Topps UCC
                      </div>
                      <p className="text-muted-foreground text-sm leading-tight">
                        Other collections on the way!
                      </p>
                    </Link>
                  </NavigationMenuLink>
                </li> 
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>

          <NavigationMenuItem>
            <NavigationMenuTrigger className="font-bold">Topps Match Attax Premier League</NavigationMenuTrigger>
            <NavigationMenuContent>
              <NavigationMenuLink className="font-bold" asChild>
                <Link href="/match-attax-20-21">Topps Premier League 2026</Link>
              </NavigationMenuLink>
              <NavigationMenuLink className="font-bold" asChild>
                <Link href="/match-attax-19-20">Match Attax 17/18</Link>
              </NavigationMenuLink>
              <NavigationMenuLink className="font-bold" asChild>
                <Link href="/match-attax-18-19">Match Attax 14/15</Link>
              </NavigationMenuLink>
              <ul className="grid gap-2 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
                <li className="row-span-3">
                  <NavigationMenuLink asChild>
                    <Link
                      className="from-muted/50 to-muted flex h-full w-full flex-col justify-end rounded-md bg-linear-to-b p-6 no-underline outline-hidden select-none focus:shadow-md"
                      href="/"
                    >
                      <div className="mt-4 mb-2 text-lg font-medium">
                        Topps UCC
                      </div>
                      <p className="text-muted-foreground text-sm leading-tight">
                        Other collections on the way!
                      </p>
                    </Link>
                  </NavigationMenuLink>
                </li> 
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>

          <NavigationMenuItem>
            <NavigationMenuTrigger className="font-bold">Topps Cricket Attax</NavigationMenuTrigger>
            <NavigationMenuContent>
              <NavigationMenuLink className="font-bold" asChild>
                <Link href="/cricket-attax-2011">Cricket Attax 2011</Link>
              </NavigationMenuLink>
              <NavigationMenuLink className="font-bold" asChild>
                <Link href="/cricket-attax-2012">Cricket Attax 2012</Link>
              </NavigationMenuLink>
              <NavigationMenuLink className="font-bold" asChild>
                <Link href="/cricket-attax-2013">Cricket Attax 2013</Link>
              </NavigationMenuLink>
              <NavigationMenuLink className="font-bold" asChild>
                <Link href="/cricket-attax-2014">Cricket Attax 2014</Link>
              </NavigationMenuLink>
              <NavigationMenuLink className="font-bold" asChild>
                <Link href="/cricket-attax-2015">Cricket Attax 2015</Link>
              </NavigationMenuLink>
              <NavigationMenuLink className="font-bold" asChild>
                <Link href="/cricket-attax-2016">Cricket Attax 2016</Link>
              </NavigationMenuLink>
              <NavigationMenuLink className="font-bold" asChild>
                <Link href="/cricket-attax-2017">Cricket Attax 2017</Link>
              </NavigationMenuLink>
              <NavigationMenuLink className="font-bold" asChild>
                <Link href="/cricket-attax-2021">Cricket Attax 2021</Link>
              </NavigationMenuLink>
              <ul className="grid gap-2 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
                <li className="row-span-3">
                  <NavigationMenuLink asChild>
                    <Link
                      className="from-muted/50 to-muted flex h-full w-full flex-col justify-end rounded-md bg-linear-to-b p-6 no-underline outline-hidden select-none focus:shadow-md"
                      href="/"
                    >
                      <div className="mt-4 mb-2 text-lg font-medium">
                        Cricket Attax
                      </div>
                      <p className="text-muted-foreground text-sm leading-tight">
                        Other editions will be uploaded on 24th October!
                      </p>
                    </Link>
                  </NavigationMenuLink>
                </li> 
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>

          
       
        </NavigationMenuList>

        

        
      </NavigationMenu> 
    </header>
  );
}