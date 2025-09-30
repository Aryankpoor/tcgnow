import Navbar from "@/components/Navbar";

export default function MatchAttax2223() {
  return (
    <div>
      <Navbar />
      <main className="pt-20 pb-8 px-4">
        <h1 className="scroll-m-20 text-center text-4xl font-extrabold tracking-tight text-balance mb-8">
          Match Attax 22/23
        </h1>
        <div className="max-w-4xl mx-auto">
          <p className="text-lg text-center mb-8">
            Discover all the cards from the Match Attax 22/23 collection.
          </p>
          {/* Add your content here */}
          <div className="grid gap-4">
            <div className="p-6 border rounded-lg">
              <h2 className="text-2xl font-bold mb-4">Collection Overview</h2>
              <p>Information about Match Attax 22/23 collection</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}