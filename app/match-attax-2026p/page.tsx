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
  sno: string; // changed from number → string
  card: string;
  type: string;
  subcollection: string;
  rarity: string;
  image?: string;
};

export default function MatchAttax2026p() {
  const [checklists, setChecklists] = useState<CardEntry[]>([]);

  useEffect(() => {
    fetch("/api/items/MA2026p")
      .then((res) => res.json())
      .then((data) => {
        console.log("Fetched data:", data);

        // ✅ Ensure data stays in original order as in JSON
        if (Array.isArray(data)) {
          setChecklists(data);
        } else {
          setChecklists([]);
        }
      })
      .catch((err) => {
        console.error("Failed to fetch items:", err);
        setChecklists([]);
      });
  }, []);

  return (
    <div>
      <Navbar />
      <main className="pt-20 pb-8 px-4">
        <h1 className="scroll-m-20 text-center text-4xl font-extrabold tracking-tight text-balance mb-8">
          Topps Premier League 2026
        </h1>
        <div className="max-w-4xl mx-auto">
          <p className="text-lg text-center mb-8">
            Explore the complete Topps Premier League 2026 collection.
          </p>

          <div className="grid gap-4">
            <div className="p-6 border rounded-lg">
              <h2 className="text-2xl font-bold mb-4">Collection Overview</h2>
              <p>The First New Installment in the Topps Premier League lineup with brand new designs and players</p>
            </div>
          </div>

          <Table>
            <TableCaption>Topps Premier League 2026 Checklist</TableCaption>
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
                <TableRow key={`${card.card}-${index}`}>
                  <TableCell className="font-medium">{card.sno}</TableCell>

                  <TableCell className="font-medium">
                    {card.image ? (
                      <HoverCard>
                        <HoverCardTrigger asChild>
                          <a
                            href={`/match-attax-20-26p/${encodeURIComponent(card.card)}`}
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
                  <TableCell className="text-right">{card.rarity}</TableCell>
                </TableRow>
              ))}
            </TableBody>

            <TableFooter>
              <TableRow>
                <TableCell colSpan={3}>Total</TableCell>
                <TableCell className="text-right">
                  {checklists.length} Cards
                </TableCell>
              </TableRow>
            </TableFooter>
          </Table>
        </div>
      </main>
    </div>
  );
}
