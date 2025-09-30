import Navbar from "@/components/Navbar";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

const checklists = [
  {
    sno: 25,
    card: "Phil Foden",
    type: "Base",
    subcollection: "Man City team set",
    rarity: "4 in Every packet",
  },
  {
    sno: 125,
    card: "Rodrygo",
    type: "Base Foil",
    subcollection: "Real madrid team set/UCL winner",
    rarity: "1 in 2 packets",
  },
  {
    sno: 225,
    card: "Lionel Messi",
    type: "Foil",
    subcollection: "Vintage Vibes Legends",
    rarity: "1 in 3 packets",
  },
  {
    sno: 6,
    card: "Erling Haaland",
    type: "Black Edge",
    subcollection: "Black Edge",
    rarity: "1 in 10 packets",
  },
  {
    sno: 545,
    card: "Kylian Mbappe",
    type: "Die cut Shield",
    subcollection: "Chrome Shield",
    rarity: "Only available in 1/50 multipacks",
  },
  {
    sno: 444,
    card: "Lamine Yamal",
    type: "Foil-Tin exclusive Limited Edition",
    subcollection: "Star Ballers",
    rarity: "Only available in Star Ballers Tin",
  },
  {
    sno: 859,
    card: "Virgil Van Dijk",
    type: "Power Player Limited Edition",
    subcollection: "Limited Edition",
    rarity: "Only available in Tins/Booster Boxes",
  },
]


export default function MatchAttax2425() {
  return (
    <div>
      <Navbar />
      <main className="pt-20 pb-8 px-4">
        <h1 className="scroll-m-20 text-center text-4xl font-extrabold tracking-tight text-balance mb-8">
          Match Attax 24/25
        </h1>
        <div className="max-w-4xl mx-auto">
          <p className="text-lg text-center mb-8">
            Explore the complete Match Attax 24/25 collection.
          </p>
          
          <div className="grid gap-4">
            <div className="p-6 border rounded-lg">
              <h2 className="text-2xl font-bold mb-4">Collection Overview</h2>
              <p>Information about Match Attax 24/25 collection.</p>
            </div>
          </div>

          <Table>
      <TableCaption>Match Attax 24/25 Checklist</TableCaption>
      <TableHeader>
        <TableRow>
            <TableHead>No.</TableHead>
          <TableHead className="w-[100px]">Name</TableHead>
          <TableHead>Card</TableHead>
          <TableHead className="w-[100px]">Sub Collection</TableHead>
          <TableHead className="w-[80px]">Collection Rarity</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {checklists.map((card) => (
          <TableRow key={card.card}>
            <TableCell className="font-medium">{card.sno}</TableCell>
            <TableCell className="font-medium">{card.card}</TableCell>
            <TableCell>{card.type}</TableCell>
            <TableCell>{card.subcollection}</TableCell>
            <TableCell className="text-right">{card.rarity}</TableCell>
          </TableRow>
        ))}
      </TableBody>
      <TableFooter>
        <TableRow>
          <TableCell colSpan={3}>Total</TableCell>
          <TableCell className="text-right">712 Cards</TableCell>
        </TableRow>
      </TableFooter>
    </Table>
        </div>
      </main>
    </div>
  );
}