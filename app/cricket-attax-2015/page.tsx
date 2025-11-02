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
  image?: string;
};

export default function CricketAttax2015() {
  const [checklists, setChecklists] = useState<CardEntry[]>([]);
  const collection = "CA2015";

  useEffect(() => {
    fetch("/data/ca2015/CA2015.json")
      .then((res) => {
        if (!res.ok) throw new Error(`Failed to load: ${res.status}`);
        return res.json();
      })
      .then((data) => {
        console.log("Fetched data:", data);
        setChecklists(Array.isArray(data) ? data : []);
      })
      .catch((err) => {
        console.error("Failed to fetch JSON:", err);
        setChecklists([]);
      });
  }, []);

  return (
    <div>
      <Navbar />
      <main className="pt-20 pb-8 px-4">
        <div className="relative w-full max-w-5xl mx-auto mb-8">
          <Image
          src={`/images/${collection.toLowerCase()}/banner.png`} // example path
          alt="Collection Banner"
          width={1200}
          height={400}
          style={{
            objectFit: "cover",
            objectPosition: "center",
          }}
          priority
        />
        </div>
        <h1 className="scroll-m-20 text-center text-4xl font-extrabold tracking-tight text-balance mb-8">
          Cricket Attax 2015
        </h1>

        <div className="max-w-4xl mx-auto">
          <p className="text-lg text-center mb-8">
            Explore the complete Cricket Attax 2015 collection.
          </p>

          <div className="grid gap-4">
            <div className="p-6 border rounded-lg">
              <h2 className="text-2xl font-bold mb-4">Collection Overview</h2>
              <p>
                Total Cards: 199<br />
                Total Base Cards: 154<br />
                Total Foil Cards: 45<br />
                Pack Types: Flowpacks<br />
                Total Teams: 9  
              </p>
            </div>
          </div>
          <br />
          <Table>
            <TableCaption>Cricket Attax 2015 Checklist</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead>No.</TableHead>
                <TableHead className="w-[70px]">Name</TableHead>
                <TableHead>Card</TableHead>
                <TableHead>Sub Collection</TableHead>
                <TableHead >Rarity</TableHead>
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
                            href={`/cricket-attax-2015/${encodeURIComponent(card.card)}`}
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
