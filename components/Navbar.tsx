import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle
} from "@/components/ui/navigation-menu";

import Link from "next/link"

const components: { title: string; href: string; description: string }[] = [
  {
    title: "Match Attax 24/25 Extra",
    href: "/docs/primitives/alert-dialog",
    description:
      "Released January 2025",
  },
  {
    title: "Match Attax 24/25",
    href: "/docs/primitives/hover-card",
    description:
      "Released September 2024",
  },
  {
    title: "Match Attax 23/24 Extra",
    href: "/docs/primitives/progress",
    description:
      "Released December 2023",
  },
  {
    title: "Match Attax 23/24",
    href: "/docs/primitives/scroll-area",
    description: "Released August 2023",
  },
  {
    title: "Match Attax 22/23 Extra",
    href: "/docs/primitives/tabs",
    description:
      "Released January 2023",
  },
  {
    title: "Match Attax 22/23",
    href: "/docs/primitives/tooltip",
    description:
      "Released August 2022",
  },
]

export default function Navbar() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background border-b mt-0">
      <NavigationMenu>
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuTrigger>Topps Match Attax</NavigationMenuTrigger>
            <NavigationMenuContent>
              <NavigationMenuLink>Match Attax 2025</NavigationMenuLink>
              <NavigationMenuLink>Match Attax 24/25 Extra</NavigationMenuLink>
              <NavigationMenuLink>Match Attax 24/25</NavigationMenuLink>
              <NavigationMenuLink>Match Attax 23/24 Extra</NavigationMenuLink>
              <NavigationMenuLink>Match Attax 23/24</NavigationMenuLink>
              <NavigationMenuLink>Match Attax 22/23 Extra</NavigationMenuLink>
              <NavigationMenuLink>Match Attax 22/23</NavigationMenuLink>
              <NavigationMenuLink>Match Attax 21/22 Extra</NavigationMenuLink>
              <NavigationMenuLink>Match Attax 21/22</NavigationMenuLink>
              <NavigationMenuLink>Match Attax 17/18 Premier League</NavigationMenuLink>
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
            <NavigationMenuTrigger>Topps Match Attax Champions League</NavigationMenuTrigger>
            <NavigationMenuContent>
              <NavigationMenuLink>Match Attax 20/21 Extra</NavigationMenuLink>
              <NavigationMenuLink>Match Attax 20/21/</NavigationMenuLink>
              <NavigationMenuLink>Match Attax 19/20 Extra</NavigationMenuLink>
              <NavigationMenuLink>Match Attax 19/20</NavigationMenuLink>
              <NavigationMenuLink>Match Attax 18/19 Extra</NavigationMenuLink>
              <NavigationMenuLink>Match Attax 18/19</NavigationMenuLink>
              
              <NavigationMenuLink>Match Attax 21/22 Extra</NavigationMenuLink>
              <NavigationMenuLink>Match Attax 21/22</NavigationMenuLink>
              <NavigationMenuLink>Match Attax 20/21 Extra</NavigationMenuLink>
              <NavigationMenuLink>Match Attax 20/21</NavigationMenuLink>
              <NavigationMenuLink>Match Attax 19/20 Extra</NavigationMenuLink>
              <NavigationMenuLink>Match Attax 19/20</NavigationMenuLink>
            </NavigationMenuContent>
          </NavigationMenuItem>

          <NavigationMenuItem>
            <NavigationMenuTrigger>Topps Cricket Attax</NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className="grid w-[300px] gap-4">
              <li>
                <NavigationMenuLink asChild>
                  <Link href="#">
                    <div className="font-medium">Cricket Attax THE HUNDRED 2022</div>
        
                  </Link>
                </NavigationMenuLink>
                <NavigationMenuLink asChild>
                  <Link href="#">
                    <div className="font-medium">Documentation</div>
                    <div className="text-muted-foreground">
                      Learn how to use the library.
                    </div>
                  </Link>
                </NavigationMenuLink>
                <NavigationMenuLink asChild>
                  <Link href="#">
                    <div className="font-medium">Blog</div>
                    <div className="text-muted-foreground">
                      Read our latest blog posts.
                    </div>
                  </Link>
                </NavigationMenuLink>
              </li>
            </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>

          <NavigationMenuItem>
          <NavigationMenuTrigger>Components</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-[400px] gap-2 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
              {components.map((component) => (
                <li
                  key={component.title}
                  title={component.title}
                >
                  <NavigationMenuLink asChild>
                    <Link href={component.href}>
                      <div className="font-medium">{component.title}</div>
                      <div className="text-muted-foreground text-sm">{component.description}</div>
                    </Link>
                  </NavigationMenuLink>
                </li>
              ))}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
            <Link href="/docs">Docs</Link>
          </NavigationMenuLink>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuTrigger>List</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-[300px] gap-4">
              <li>
                <NavigationMenuLink asChild>
                  <Link href="#">
                    <div className="font-medium">Components</div>
                    <div className="text-muted-foreground">
                      Browse all components in the library.
                    </div>
                  </Link>
                </NavigationMenuLink>
                <NavigationMenuLink asChild>
                  <Link href="#">
                    <div className="font-medium">Documentation</div>
                    <div className="text-muted-foreground">
                      Learn how to use the library.
                    </div>
                  </Link>
                </NavigationMenuLink>
                <NavigationMenuLink asChild>
                  <Link href="#">
                    <div className="font-medium">Blog</div>
                    <div className="text-muted-foreground">
                      Read our latest blog posts.
                    </div>
                  </Link>
                </NavigationMenuLink>
              </li>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>

          <NavigationMenuItem>
            <NavigationMenuTrigger>Topps Now</NavigationMenuTrigger>
            <NavigationMenuContent>
              <NavigationMenuLink>Lamine Yamal Inherits Messi no 10</NavigationMenuLink>
            </NavigationMenuContent>
          </NavigationMenuItem>
        </NavigationMenuList>

        <NavigationMenuItem>
          <NavigationMenuTrigger>Topps Chrome</NavigationMenuTrigger>
          <NavigationMenuContent>
            <NavigationMenuLink>Premier League 2026 Chrome</NavigationMenuLink>
            <NavigationMenuLink>Match Attax 21/22 Chrome</NavigationMenuLink>
          </NavigationMenuContent>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <NavigationMenuTrigger>Other Topps Collections</NavigationMenuTrigger>
          <NavigationMenuContent>
            <NavigationMenuLink>Topps Premier League 2026</NavigationMenuLink>
          </NavigationMenuContent>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <NavigationMenuTrigger>By Sport</NavigationMenuTrigger>
          <NavigationMenuContent>
            <NavigationMenuLink>Cricket</NavigationMenuLink>
            <NavigationMenuLink>Football</NavigationMenuLink>
          </NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenu> 
    </header>
  );
}