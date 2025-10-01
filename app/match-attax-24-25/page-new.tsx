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

// Function to generate 594 cards with sequential numbers
function generateChecklists() {
  const cards = [];
  
  // First 8 cards as you defined them
  const firstCards = [
    { card: "Aston Villa Logo", type: "Base", subcollection: "Aston Villa team set", rarity: "4 in Every packet" },
    { card: "Emiliano Martinez", type: "Base", subcollection: "Aston Villa team set", rarity: "4 in every packets" },
    { card: "Pau Torres", type: "Base", subcollection: "Base", rarity: "4 in every packets" },
    { card: "Erling Haaland", type: "Black Edge", subcollection: "Black Edge", rarity: "1 in 10 packets" },
    { card: "Kylian Mbappe", type: "Die cut Shield", subcollection: "Chrome Shield", rarity: "Only available in 1/50 multipacks" },
    { card: "Lamine Yamal", type: "Foil-Tin exclusive Limited Edition", subcollection: "Star Ballers", rarity: "Only available in Star Ballers Tin" },
    { card: "Virgil Van Dijk", type: "Power Player Limited Edition", subcollection: "Limited Edition", rarity: "Only available in Tins/Booster Boxes" },
    { card: "Mohamed Salah", type: "Power Player Limited Edition", subcollection: "Limited Edition", rarity: "Only available in Tins/Booster Boxes" }
  ];

  // Add first 8 cards with their sequential numbers
  firstCards.forEach((cardData, index) => {
    cards.push({
      sno: index + 1,
      ...cardData
    });
  });

  // Generate remaining cards from 9 to 594
  for (let i = 9; i <= 594; i++) {
    cards.push({
      sno: i,
      card: "Player Card " + i,
      type: "Base",
      subcollection: "Base Set",
      rarity: "4 in every packets"
    });
  }

  return cards;
}

const checklists = generateChecklists();

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
              {checklists.map((card, index) => (
                <TableRow key={`${card.sno}-${index}`}>
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
                <TableCell colSpan={4}>Total</TableCell>
                <TableCell className="text-right">594 Cards</TableCell>
              </TableRow>
            </TableFooter>
          </Table>
        </div>
      </main>
    </div>
  );
}