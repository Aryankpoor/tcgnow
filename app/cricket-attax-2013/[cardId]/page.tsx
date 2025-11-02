"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Navbar from "@/components/Navbar";
import Image from "next/image";

type CardEntry = {
  sno: number;
  card: string;
  type: string;
  subcollection: string;
  rarity: string;
  image?: string;
};

export default function CardDetailPage() {
  const { cardId } = useParams<{ cardId: string }>();
  const [card, setCard] = useState<CardEntry | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!cardId) return;

    fetch("/data/ca2013/CA2013.json")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch JSON");
        return res.json();
      })
      .then((data: CardEntry[]) => {
        const found = data.find(
          (c) => c.card.toLowerCase() === decodeURIComponent(cardId).toLowerCase()
        );
        if (!found) {
          setError("Card not found");
        } else {
          setCard(found);
        }
      })
      .catch((err) => {
        console.error("Error fetching card:", err);
        setError("Failed to load card");
      });
  }, [cardId]);

  return (
    <div>
      <Navbar />
      <main className="pt-20 pb-8 px-4 max-w-3xl mx-auto">
        {error ? (
          <p className="text-center text-red-600">{error}</p>
        ) : !card ? (
          <p className="text-center">Loading...</p>
        ) : (
          <>
            <h1 className="text-center text-3xl font-bold mb-6">{card.card}</h1>
            {card.image && (
              <div className="flex justify-center mb-6">
                <Image
                  src={card.image}
                  alt={card.card}
                  width={240}
                  height={240}
                  className="rounded-lg border"
                />
              </div>
            )}
            <div className="space-y-2 text-lg">
              <p>
                <strong>Type:</strong> {card.type}
              </p>
              <p>
                <strong>Subcollection:</strong> {card.subcollection}
              </p>
              <p>
                <strong>Rarity:</strong> {card.rarity}
              </p>
              <p>
                <strong>Serial No.:</strong> {card.sno}
              </p>
            </div>
          </>
        )}
      </main>
    </div>
  );
}
