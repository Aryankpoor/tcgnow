import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";

import Link from "next/link";

export default function Navbar() {
  
  const activeCollections = [
    "match-attax-22-23",
    "match-attax-22-23-extra",
    "match-attax-23-24",
    "match-attax-23-24-extra",
    "match-attax-24-25",
    "match-attax-24-25-extra",
    "match-attax-16-17-ucl",
    "match-attax-19-20",
  ];

  
  const getHref = (slug: string) =>
    activeCollections.includes(slug) ? `/${slug}` : "/coming-soon";

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background border-b mt-0">
      <NavigationMenu>
        <NavigationMenuList>
          {/* Topps UCC */}
          <NavigationMenuItem>
            <NavigationMenuTrigger className="font-bold">
              Topps UCC
            </NavigationMenuTrigger>
            <NavigationMenuContent>
              <NavigationMenuLink className="font-bold" asChild>
                <Link href={getHref("match-attax-24-25-extra")}>
                  Match Attax 24/25 Extra
                </Link>
              </NavigationMenuLink>
              <NavigationMenuLink className="font-bold" asChild>
                <Link href={getHref("match-attax-24-25")}>
                  Match Attax 24/25
                </Link>
              </NavigationMenuLink>
              <NavigationMenuLink className="font-bold" asChild>
                <Link href={getHref("match-attax-23-24-extra")}>
                  Match Attax 23/24 Extra
                </Link>
              </NavigationMenuLink>
              <NavigationMenuLink className="font-bold" asChild>
                <Link href={getHref("match-attax-23-24")}>
                  Match Attax 23/24
                </Link>
              </NavigationMenuLink>
              <NavigationMenuLink className="font-bold" asChild>
                <Link href={getHref("match-attax-22-23-extra")}>
                  Match Attax 22/23 Extra
                </Link>
              </NavigationMenuLink>
              <NavigationMenuLink className="font-bold" asChild>
                <Link href={getHref("match-attax-22-23")}>
                  Match Attax 22/23
                </Link>
              </NavigationMenuLink>
              <NavigationMenuLink className="font-bold" asChild>
                <Link href={getHref("match-attax-21-22")}>
                  Match Attax 21/22
                </Link>
              </NavigationMenuLink>
              <ul className="grid gap-2 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
                <li className="row-span-3">
                  <NavigationMenuLink asChild>
                    <Link
                      className="from-muted/50 to-muted flex h-full w-full flex-col justify-end rounded-md bg-linear-to-b p-6 no-underline outline-hidden select-none focus:shadow-md"
                      href="/coming-soon"
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

          {/* Topps Match Attax */}
          <NavigationMenuItem>
            <NavigationMenuTrigger className="font-bold">
              Topps Match Attax
            </NavigationMenuTrigger>
            <NavigationMenuContent>
              <NavigationMenuLink className="font-bold" asChild>
                <Link href={getHref("match-attax-20-21")}>
                  Match Attax 20/21
                </Link>
              </NavigationMenuLink>
              <NavigationMenuLink className="font-bold" asChild>
                <Link href={getHref("match-attax-19-20")}>
                  Match Attax 19/20
                </Link>
              </NavigationMenuLink>
              <NavigationMenuLink className="font-bold" asChild>
                <Link href={getHref("match-attax-18-19")}>
                  Match Attax 18/19
                </Link>
              </NavigationMenuLink>
              <NavigationMenuLink className="font-bold" asChild>
                <Link href={getHref("match-attax-16-17-ucl")}>
                  Match Attax 16/17 UCL
                </Link>
              </NavigationMenuLink>
              <ul className="grid gap-2 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
                <li className="row-span-3">
                  <NavigationMenuLink asChild>
                    <Link
                      className="from-muted/50 to-muted flex h-full w-full flex-col justify-end rounded-md bg-linear-to-b p-6 no-underline outline-hidden select-none focus:shadow-md"
                      href="/coming-soon"
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

          {/* Topps Cricket Attax */}
          <NavigationMenuItem>
            <NavigationMenuTrigger className="font-bold">
              Topps Cricket Attax
            </NavigationMenuTrigger>
            <NavigationMenuContent>
              <NavigationMenuLink className="font-bold" asChild>
                <Link href={getHref("cricket-attax-2011")}>
                  Cricket Attax 2011
                </Link>
              </NavigationMenuLink>
              <ul className="grid gap-2 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
                <li className="row-span-3">
                  <NavigationMenuLink asChild>
                    <Link
                      className="from-muted/50 to-muted flex h-full w-full flex-col justify-end rounded-md bg-linear-to-b p-6 no-underline outline-hidden select-none focus:shadow-md"
                      href="/coming-soon"
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
