import json

# Base template for each card
template = {
    "sno": "",
    "card": "",  # Empty card field
    "type": "Base",
    "subcollection": "",
    "rarity": "6 in every packet",
    "position": "",
    "image": "https://cdn.jsdelivr.net/gh/Aryankpoor/tcgnow/images/ma2223/",
    "collection": "MA2223"
}

# Generate 446 entries
cards = []
for i in range(1, 447):
    entry = template.copy()
    entry["sno"] = str(i)
    cards.append(entry)

# Save to a JSON file with square brackets
with open("cards.json", "w", encoding="utf-8") as f:
    json.dump(cards, f, indent=4, ensure_ascii=False)

print("✅ cards.json file created successfully with 446 entries (empty 'card' field).")
