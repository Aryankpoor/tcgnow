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

export default function CardProfilePage() {
  const { cardId } = useParams<{ cardId: string }>(); 
  const [cardData, setCardData] = useState<CardEntry | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!cardId) return;

    fetch(`/api/items/MA2425/${encodeURIComponent(cardId)}`)
      .then((res) => res.json())
      .then((data) => {
        setCardData(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [cardId]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p>Loading card details...</p>
      </div>
    );
  }

  if (!cardData) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p>Card not found.</p>
      </div>
    );
  }

  return (
    <div>
      <Navbar />
      <main className="pt-20 pb-8 px-4">
        <div className="max-w-3xl mx-auto border rounded-xl p-6 shadow-sm">
          <h1 className="text-3xl font-bold mb-4 text-center">{cardData.card}</h1>

          {cardData.image && (
            <div className="flex justify-center mb-6">
              <Image
                src={cardData.image}
                alt={cardData.card}
                width={250}
                height={250}
                className="rounded-lg border object-cover"
              />
            </div>
          )}

          <div className="grid gap-3 text-lg">
            <p>
              <strong>Serial No:</strong> {cardData.sno}
            </p>
            <p>
              <strong>Type:</strong> {cardData.type}
            </p>
            <p>
              <strong>Subcollection:</strong> {cardData.subcollection}
            </p>
            <p>
              <strong>Rarity:</strong> {cardData.rarity}
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
