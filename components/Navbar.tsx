import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";

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
              <NavigationMenuLink>Cricket Attax &apos;THE HUNDRED&apos; 2022</NavigationMenuLink>
              <NavigationMenuLink>Cricket Attax &apos;THE HUNDRED&apos; 2021</NavigationMenuLink>
              <NavigationMenuLink>Cricket Attax 2017</NavigationMenuLink>
              <NavigationMenuLink>Cricket Attax 2016</NavigationMenuLink>
              <NavigationMenuLink>Cricket Attax 2015</NavigationMenuLink>
              <NavigationMenuLink>Cricket Attax 2014</NavigationMenuLink>
              <NavigationMenuLink>Cricket Attax 2013</NavigationMenuLink>
              <NavigationMenuLink>Cricket Attax 2012</NavigationMenuLink>
              <NavigationMenuLink>Cricket Attax 2011</NavigationMenuLink>
            </NavigationMenuContent>
          </NavigationMenuItem>

          <NavigationMenuItem>
            <NavigationMenuTrigger>Topps Slam Attax</NavigationMenuTrigger>
            <NavigationMenuContent>
              <NavigationMenuLink>Slam Attax Universe</NavigationMenuLink>
              <NavigationMenuLink>Slam Attax Live</NavigationMenuLink>
              <NavigationMenuLink>Slam Attax Superstars</NavigationMenuLink>
              <NavigationMenuLink>Slam Attax Rebellion</NavigationMenuLink>
              <NavigationMenuLink>Slam Attax Rumble</NavigationMenuLink>
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