"use client";

import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import {
  Table,
  TableBody,
  TableFooter,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  TableCaption,
} from "@/components/ui/table";
import { HoverCard, HoverCardTrigger, HoverCardContent } from "@/components/ui/hover-card";
import Image from "next/image";

type CardEntry = {
  sno: number;
  card: string;
  type: string;
  subcollection: string;
  rarity: string;
  image?: string; // optional if some items have no image
};

export default function MatchAttax2425() {
  const [checklists, setChecklists] = useState<CardEntry[]>([]);

  useEffect(() => {
  fetch("/api/items/CA2011")
    .then(res => res.json())
    .then(data => {
      console.log("Fetched data:", data);
      setChecklists(Array.isArray(data) ? data : []);
    })
    .catch(err => {
      console.error("Failed to fetch items:", err);
      setChecklists([]);
    });
}, []);


  return (
    <div>
      <Navbar />
      <main className="pt-20 pb-8 px-4">
        <h1 className="scroll-m-20 text-center text-4xl font-extrabold tracking-tight text-balance mb-8">
          Cricket Attax 2011
        </h1>
        <div className="max-w-4xl mx-auto">
          <p className="text-lg text-center mb-8">
            Explore the complete Cricket Attax 2011 collection.
          </p>

          <div className="grid gap-4">
            <div className="p-6 border rounded-lg">
              <h2 className="text-2xl font-bold mb-4">Collection Overview</h2>
              <p>Fun Fact: Deccan Chargers is the only team in this first edition of the collection which does not have a captain.</p>
            </div>
          </div>

          <Table>
            <TableCaption>Cricket Attax 2011 Checklist</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead>No.</TableHead>
                <TableHead className="w-[70px]">Name</TableHead>
                <TableHead>Card</TableHead>
                <TableHead className="w-[50px]">Sub Collection</TableHead>
                <TableHead className="w-[40px] ">Rarity</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {checklists.map((card) => (
                <TableRow key={card.sno}>

                  <TableCell className="font-medium">{card.sno}</TableCell>

                  <TableCell className="font-medium">
                    {card.image ? (
                      <HoverCard>
                        <HoverCardTrigger asChild>
  <a
    href={`/cricket-attax-2011/${encodeURIComponent(card.card)}`}
    className="cursor-pointer text-blue-600 hover:underline"
  >
    {card.card}
  </a>
</HoverCardTrigger>
                        <HoverCardContent className="w-48 p-2">
  <Image
    src={card.image}
    alt={card.card}
    width={180}
    height={180}
    className="object-cover rounded-md border"
  />
</HoverCardContent>
                      </HoverCard>
                    ) : (
                      card.card
                    )}
                  </TableCell>

                  <TableCell>{card.type}</TableCell>
                  <TableCell>{card.subcollection}</TableCell>
                  <TableCell>{card.rarity}</TableCell>
                </TableRow>
              ))}
            </TableBody>

            <TableFooter>
              <TableRow>
                <TableCell colSpan={3}>Total</TableCell>
                <TableCell className="text-right">{checklists.length} Cards</TableCell>
              </TableRow>
            </TableFooter>
          </Table>
        </div>
      </main>
    </div>
  );
}
