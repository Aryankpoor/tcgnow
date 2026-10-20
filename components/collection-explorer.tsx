
"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import {
  ArrowDownUp,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Columns3,
  Database,
  Download,
  GitCompare,
  Layers3,
  RotateCcw,
  Search,
  X,
} from "lucide-react";

gsap.registerPlugin(useGSAP);

type CardRecord = {
  id: string;
  sno: number;
  collectionSno: number | string | null;
  card: string;
  type: string;
  subcollection: string;
  rarity: string;
  position: string;
  image: string;
};

type ColumnKey = Exclude<keyof CardRecord, "id">;

type CollectionOption = {
  code: string;
  cardCount: number;
  season: string;
  sport: Sport | null;
};

type ComparisonResult = {
  card: string;
  appearances: {
    collection: string;
    cards: {
      id: string;
      sno: number | null;
      collectionSno: number | null;
      type: string;
      rarity: string;
      position: string;
      image: string;
    }[];
  }[];
};

type Sport = "Cricket" | "Football" | "WWE";

const sports: Sport[] = ["Cricket", "Football", "WWE"];

function getSportFromCollection(code: string): Sport | null {
  const normalized = code.trim().toUpperCase();

  if (normalized.startsWith("CA")) return "Cricket";
  if (normalized.startsWith("WWE")) return "WWE";
  if (normalized.startsWith("MA")) return "Football";
  return null;
}


function getSeasonFromCode(code: string): string {
  const normalized = code.trim().toUpperCase();

  // Format: MA2223 -> 2022–2023
  const shortRangeMatch = normalized.match(/^[A-Z]+(\d{2})(\d{2})$/);

  if (shortRangeMatch) {
    const startYear = Number(shortRangeMatch[1]);
    const endYear = Number(shortRangeMatch[2]);

    return `${2000 + startYear}–${2000 + endYear}`;
  }

  // Format: MA2021 -> 2020–2021
  const fullYearMatch = normalized.match(/^[A-Z]+(\d{4})$/);

  if (fullYearMatch) {
    const endYear = Number(fullYearMatch[1]);

    return `${endYear - 1}–${endYear}`;
  }

  return "Other / unknown";
}


const columnLabels: Record<ColumnKey, string> = {
  sno: "S. No.",
  collectionSno: "Collection No.",
  card: "Card",
  type: "Type",
  subcollection: "Subcollection",
  rarity: "Rarity",
  position: "Position",
  image: "Image",
};

const allColumns: ColumnKey[] = [
  "sno",
  "collectionSno",
  "card",
  "type",
  "subcollection",
  "rarity",
  "position",
  "image",
];

const defaultColumns: ColumnKey[] = [
  "sno",
  "collectionSno",
  "card",
  "type",
  "subcollection",
  "rarity",
  "position",
];

export default function CollectionExplorer() {
  const root = useRef<HTMLElement>(null);
  const [sport, setSport] = useState<Sport | "">("");
  const [availableCollections, setAvailableCollections] =
    useState<CollectionOption[]>([]);
  const [season, setSeason] = useState("");
  const [collection, setCollection] = useState("");
  const [cardRows, setCardRows] = useState<CardRecord[]>([]);
  const [compareOpen, setCompareOpen] = useState(false);
  const [selectedCompareCollections, setSelectedCompareCollections] =
    useState<string[]>([]);
  const [comparisonRows, setComparisonRows] =
    useState<ComparisonResult[]>([]);
  const [comparisonLoading, setComparisonLoading] = useState(false);
  const [comparisonError, setComparisonError] = useState("");
  const [comparisonDone, setComparisonDone] = useState(false);
  const [loadingCollections, setLoadingCollections] = useState(true);
  const [loadingCards, setLoadingCards] = useState(false);
  const [loadError, setLoadError] = useState("");

  const [query, setQuery] = useState("");
  const [sortKey, setSortKey] = useState<ColumnKey>("sno");
  const [sortDirection, setSortDirection] =
    useState<"asc" | "desc">("asc");
  const [visibleColumns, setVisibleColumns] =
    useState<ColumnKey[]>(defaultColumns);
  const [showColumns, setShowColumns] = useState(false);
  const [page, setPage] = useState(1);

  const pageSize = 8;

  // Discover all collections that exist in Neo4j.
  useEffect(() => {
    let cancelled = false;

    async function loadCollections() {
      try {
        setLoadingCollections(true);
        setLoadError("");

        const response = await fetch("/api/collections");

        if (!response.ok) {
          throw new Error("Could not load collections.");
        }

        const data = await response.json();

        const options: CollectionOption[] = data.collections.map(
  (item: { code: string; cardCount: number }) => ({
    code: item.code,
    cardCount: Number(item.cardCount),
    season: getSeasonFromCode(item.code),
    sport: getSportFromCollection(item.code),
  })
);

        if (!cancelled) {
          setAvailableCollections(options);
        }
      } catch {
        if (!cancelled) {
          setLoadError(
            "Unable to load collections from the database."
          );
        }
      } finally {
        if (!cancelled) setLoadingCollections(false);
      }
    }

    void loadCollections();

    return () => {
      cancelled = true;
    };
  }, []);

  // Load cards only after the user chooses a collection.
  // Fetches additional batches when a collection contains over 200 cards.
  useEffect(() => {
    let cancelled = false;

    async function loadCards() {
      if (!collection) {
        setCardRows([]);
        setLoadingCards(false);
        return;
      }

      try {
        setLoadingCards(true);
        setLoadError("");
        setCardRows([]);
        setPage(1);

        const batchSize = 200;
        let offset = 0;
        const loadedCards: CardRecord[] = [];

        while (true) {
          const params = new URLSearchParams({
            collection,
            limit: String(batchSize),
            offset: String(offset),
          });

          const response = await fetch(`/api/cards?${params}`);

          if (!response.ok) {
            throw new Error("Could not load cards.");
          }

          const data = await response.json();
          const batch = data.cards as Array<Record<string, unknown>>;

          loadedCards.push(
            ...batch.map((item) => ({
              id: String(item.id ?? `${collection}:${item.sno}`),
              sno: Number(item.sno ?? 0),
              collectionSno:
                item["collection-sno"] == null
                  ? null
                  : Number(item["collection-sno"]),
              card: String(item.card ?? ""),
              type: String(item.type ?? "—"),
              subcollection: String(
                item.subcollection ?? "Uncategorized"
              ),
              rarity: String(item.rarity ?? "—"),
              position: String(item.position ?? "—"),
              image: String(item.image ?? ""),
            }))
          );

          if (batch.length < batchSize) break;

          offset += batchSize;
        }

        if (!cancelled) {
          setCardRows(loadedCards);
        }
      } catch {
        if (!cancelled) {
          setCardRows([]);
          setLoadError(
            "Unable to load cards for this collection."
          );
        }
      } finally {
        if (!cancelled) setLoadingCards(false);
      }
    }

    void loadCards();

    return () => {
      cancelled = true;
    };
  }, [collection]);

  // Intro animations.
  useGSAP(
    () => {
      if (
        window.matchMedia("(prefers-reduced-motion: reduce)").matches
      ) {
        return;
      }

      const timeline = gsap.timeline({
        defaults: { ease: "power3.out" },
      });

      timeline
        .from(".tcg-topbar", {
          y: -24,
          opacity: 0,
          duration: 0.7,
        })
        .from(
          ".tcg-kicker",
          {
            x: -20,
            opacity: 0,
            duration: 0.45,
          },
          "-=0.25"
        )
        .from(
          ".tcg-intro h1",
          {
            y: 32,
            opacity: 0,
            duration: 0.75,
          },
          "-=0.2"
        )
        .from(
          ".tcg-intro p",
          {
            y: 12,
            opacity: 0,
            duration: 0.45,
          },
          "-=0.4"
        )
        .from(
          ".tcg-finder",
          {
            y: 35,
            opacity: 0,
            scale: 0.985,
            duration: 0.65,
          },
          "-=0.1"
        )
        .from(
          ".tcg-field",
          {
            y: 15,
            opacity: 0,
            stagger: 0.1,
            duration: 0.4,
          },
          "-=0.3"
        )
        .from(
          ".tcg-table-card",
          {
            y: 40,
            opacity: 0,
            duration: 0.7,
          },
          "-=0.15"
        );
    },
    { scope: root }
  );

  // Animate real rows when results or table controls change.
  useGSAP(
    () => {
      if (
        window.matchMedia("(prefers-reduced-motion: reduce)").matches
      ) {
        return;
      }

      gsap.fromTo(
        ".data-table tbody tr",
        { opacity: 0, y: 10 },
        {
          opacity: 1,
          y: 0,
          duration: 0.3,
          stagger: 0.035,
          ease: "power2.out",
          clearProps: "all",
        }
      );
    },
    {
      scope: root,
      dependencies: [
        cardRows,
        collection,
        query,
        sortKey,
        sortDirection,
        page,
      ],
      revertOnUpdate: true,
    }
  );

  // Finder panel hover animation.
  useGSAP(
    () => {
      const panel = root.current?.querySelector(".tcg-finder");

      if (!panel) return;

      const handleEnter = () => {
        gsap.to(panel, {
          borderColor: "#566443",
          duration: 0.25,
          ease: "power2.out",
        });
      };

      const handleLeave = () => {
        gsap.to(panel, {
          borderColor: "#2b3027",
          duration: 0.3,
          ease: "power2.out",
        });
      };

      panel.addEventListener("mouseenter", handleEnter);
      panel.addEventListener("mouseleave", handleLeave);

      return () => {
        panel.removeEventListener("mouseenter", handleEnter);
        panel.removeEventListener("mouseleave", handleLeave);
        gsap.killTweensOf(panel);
      };
    },
    { scope: root }
  );

  const sportCollections = useMemo(
  () =>
    availableCollections.filter(
      (item) => !sport || item.sport === sport
    ),
  [availableCollections, sport]
);

const seasons = useMemo(
  () =>
    [...new Set(sportCollections.map((item) => item.season))].sort(
      (a, b) => a.localeCompare(b, undefined, { numeric: true })
    ),
  [sportCollections]
);

const collections = useMemo(
  () =>
    sportCollections.filter(
      (item) => !season || item.season === season
    ),
  [sportCollections, season]
);

  const filteredRows = useMemo(() => {
    const normalized = query.trim().toLowerCase();

    return cardRows
      .filter(
        (row) =>
          !normalized ||
          Object.values(row).some((value) =>
            String(value ?? "").toLowerCase().includes(normalized)
          )
      )
      .sort((a, b) => {
        const left = a[sortKey];
        const right = b[sortKey];

        const comparison =
          typeof left === "number" && typeof right === "number"
            ? left - right
            : String(left ?? "").localeCompare(
                String(right ?? ""),
                undefined,
                { numeric: true }
              );

        return sortDirection === "asc" ? comparison : -comparison;
      });
  }, [cardRows, query, sortKey, sortDirection]);

  const pageCount = Math.max(
    1,
    Math.ceil(filteredRows.length / pageSize)
  );

  const rows = filteredRows.slice(
    (page - 1) * pageSize,
    page * pageSize
  );

  function changeSeason(nextSeason: string) {
    setSeason(nextSeason);
    setCollection("");
    setQuery("");
    setPage(1);
  }

  function changeCollection(nextCollection: string) {
    setCollection(nextCollection);
    setQuery("");
    setPage(1);
  }

  function toggleSort(key: ColumnKey) {
    if (sortKey === key) {
      setSortDirection((direction) =>
        direction === "asc" ? "desc" : "asc"
      );
    } else {
      setSortKey(key);
      setSortDirection("asc");
    }

    setPage(1);
  }

  function toggleColumn(key: ColumnKey) {
    setVisibleColumns((current) => {
      if (current.includes(key)) {
        if (current.length === 1) return current;
        return current.filter((column) => column !== key);
      }

      return allColumns.filter(
        (column) => column === key || current.includes(column)
      );
    });
  }

  function exportCsv() {
    if (!collection || filteredRows.length === 0) return;

    const escapeCsv = (value: unknown) =>
      `"${String(value ?? "").replaceAll('"', '""')}"`;

    const lines = [
      visibleColumns
        .map((key) => escapeCsv(columnLabels[key]))
        .join(","),
      ...filteredRows.map((row) =>
        visibleColumns
          .map((key) => escapeCsv(row[key]))
          .join(",")
      ),
    ];

    const blob = new Blob(["\uFEFF", lines.join("\r\n")], {
      type: "text/csv;charset=utf-8;",
    });

    const url = URL.createObjectURL(blob);
    const anchor = document.createElement("a");

    anchor.href = url;
    anchor.download = `tcgnow-${collection}.csv`;
    anchor.click();

    URL.revokeObjectURL(url);
  }

  function toggleCompareCollection(code: string) {
    setSelectedCompareCollections((current) =>
      current.includes(code)
        ? current.filter((item) => item !== code)
        : [...current, code]
    );
    setComparisonRows([]);
    setComparisonDone(false);
    setComparisonError("");
  }

  async function runComparison() {
    if (selectedCompareCollections.length < 2) return;

    setComparisonLoading(true);
    setComparisonError("");
    setComparisonRows([]);
    setComparisonDone(false);

    try {
      const response = await fetch("/api/compare", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ collections: selectedCompareCollections }),
      });
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error ?? "Unable to compare collections.");
      }

      setComparisonRows(data.commonCards ?? []);
      setComparisonDone(true);
    } catch (error) {
      setComparisonError(
        error instanceof Error
          ? error.message
          : "Unable to compare collections."
      );
    } finally {
      setComparisonLoading(false);
    }
  }

  function resetComparison() {
    setSelectedCompareCollections([]);
    setComparisonRows([]);
    setComparisonError("");
    setComparisonDone(false);
    setComparisonLoading(false);
  }

  return (
    <main ref={root} className="tcg-shell" id="top">
      <nav className="tcg-topbar">
        <a className="tcg-brand" href="#top" aria-label="TCG NOW home">
          <span className="tcg-mark">
            <Layers3 size={18} />
          </span>
          <span>
            TCG<span className="brand-light">NOW</span>
          </span>
        </a>

        <span className="tcg-topbar-label">
          <span className="status-dot" />
          TRADING CARD ARCHIVE
        </span>

        <a className="tcg-nav-link" href="#catalogue">
          Browse cards <ChevronDown size={14} />
        </a>
      </nav>

      <div className="tcg-content">
        <header className="tcg-intro">
          <div className="tcg-kicker">
            <span /> COLLECTION DATABASE
          </div>
          <h1>Trading Card Archive</h1>
          <p>
            Browse collections, search cards, and manage your checklist.
          </p>
        </header>

        <section
          className="tcg-finder"
          aria-labelledby="finder-title"
        >
          <div className="panel-heading">
            <div className="panel-title-icon">
              <Database size={17} />
            </div>
            <div>
              <h2 id="finder-title">Select a collection</h2>
              <p>Choose a year or season, then select a collection.</p>
            </div>
            <span className="panel-index">01 / COLLECTION</span>
          </div>

          <div className="tcg-select-grid">
            <label className="tcg-field">
  <span>SPORT</span>
  <div className="select-wrap">
    <select
      value={sport}
      onChange={(event) => {
        setSport(event.target.value as Sport | "");
        setSeason("");
        setCollection("");
        setQuery("");
        setPage(1);
      }}
      disabled={loadingCollections}
    >
      <option value="">Choose a sport</option>
      {sports.map((value) => (
        <option key={value} value={value}>
          {value}
        </option>
      ))}
    </select>
    <ChevronDown size={15} />
  </div>
</label>
            <label className="tcg-field">
              <span>YEAR / SEASON</span>
              <div className="select-wrap">
                <select
                  value={season}
                  onChange={(event) =>
                    changeSeason(event.target.value)
                  }
                  disabled={loadingCollections}
                >
                  <option value="">All seasons</option>
                  {seasons.map((value) => (
                    <option key={value} value={value}>
                      {value}
                    </option>
                  ))}
                </select>
                <ChevronDown size={15} />
              </div>
            </label>

            <label className="tcg-field">
              <span>COLLECTION</span>
              <div className="select-wrap">
                <select
                  value={collection}
                  onChange={(event) =>
                    changeCollection(event.target.value)
                  }
                  disabled={
                    loadingCollections ||
                    availableCollections.length === 0
                  }
                >
                  <option value="">
                    {loadingCollections
                      ? "Loading collections…"
                      : "Choose a collection"}
                  </option>
                  {collections.map((item) => (
                    <option key={item.code} value={item.code}>
                      {item.code} ({item.cardCount} cards)
                    </option>
                  ))}
                </select>
                <ChevronDown size={15} />
              </div>
            </label>
          </div>

          <div className="selected-collection">
            <span className="selected-icon">
              <Layers3 size={19} />
            </span>
            <div className="selected-details">
              <span>SELECTED COLLECTION</span>
              <strong>
                {collection || "No collection selected"}
              </strong>
              <small>
                {collection
                  ? `${
                      availableCollections.find(
                        (item) => item.code === collection
                      )?.cardCount ?? 0
                    } cards in this collection`
                  : "Choose a collection to begin"}
              </small>
            </div>
            {collection && (
              <span className="preview-tag">
                <span className="status-dot" /> DATABASE
              </span>
            )}
          </div>

          {loadError && (
            <p role="alert" className="data-note">
              <span className="note-mark">!</span>
              {loadError}
            </p>
          )}
        </section>

        <section className="tcg-table-card compare-panel" aria-labelledby="compare-title">
          <div className="table-heading">
            <div>
              <div className="tcg-kicker">
                <span /> DATABASE QUERY
              </div>
              <h2 id="compare-title">Collection comparison</h2>
              <p className="compare-description">
                Find card names shared by every selected collection using an INNER JOIN-style comparison.
              </p>
            </div>
            <span className="result-count">
              {selectedCompareCollections.length} selected
            </span>
          </div>

          <div className="compare-controls">
            <button
              type="button"
              className="tool-button"
              onClick={() => setCompareOpen((open) => !open)}
              aria-expanded={compareOpen}
            >
              <GitCompare size={15} />
              {compareOpen ? "Hide collections" : "Compare collections"}
              <ChevronDown size={14} />
            </button>
            <button
              type="button"
              className="tool-button"
              onClick={resetComparison}
              disabled={
                selectedCompareCollections.length === 0 &&
                !comparisonDone &&
                !comparisonError
              }
            >
              <RotateCcw size={15} /> Reset table
            </button>
          </div>

          {compareOpen && (
            <div className="compare-picker">
              <p className="compare-help">
                Select at least two collections. Collections can come from different seasons.
              </p>
              {availableCollections.length === 0 && !loadingCollections ? (
                <p className="compare-help">No collections are available in the database yet.</p>
              ) : (
                <div className="compare-options">
                  {availableCollections.map((item) => (
                    <label key={item.code} className="compare-option">
                      <input
                        type="checkbox"
                        checked={selectedCompareCollections.includes(item.code)}
                        onChange={() => toggleCompareCollection(item.code)}
                      />
                      <span className="compare-option-details">
                        <strong>{item.code}</strong>
                        <small>{item.season} · {item.cardCount} cards</small>
                      </span>
                    </label>
                  ))}
                </div>
              )}
              <button
                type="button"
                className="tool-button compare-run"
                onClick={runComparison}
                disabled={selectedCompareCollections.length < 2 || comparisonLoading}
              >
                <GitCompare size={15} />
                {comparisonLoading
                  ? "Comparing…"
                  : `Compare ${selectedCompareCollections.length} collections`}
              </button>
              {selectedCompareCollections.length < 2 && (
                <p className="compare-help">Select at least two collections to enable comparison.</p>
              )}
            </div>
          )}

          {comparisonError && (
            <p className="data-note" role="alert">
              <span className="note-mark">!</span> {comparisonError}
            </p>
          )}

          <div className="table-scroll">
            <table className="data-table compare-results">
              <thead>
                <tr>
                  <th>Common card</th>
                  {selectedCompareCollections.map((code) => (
                    <th key={code}>{code}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {comparisonRows.map((result, index) => (
                  <tr key={`${result.card}-${index}`}>
                    <td>
                      <span className="card-cell">
                        <span className="mini-card"><Layers3 size={12} /></span>
                        {result.card}
                      </span>
                    </td>
                    {selectedCompareCollections.map((code) => {
                      const appearance = result.appearances.find(
                        (item) => item.collection === code
                      );
                      return (
                        <td key={code}>
                          {appearance?.cards.length ? (
                            <div className="compare-card-details">
                              {appearance.cards.map((card, cardIndex) => (
                                <div key={`${card.id}-${cardIndex}`}>
                                  <strong>{card.type}</strong>
                                  <small>
                                    No. {card.collectionSno ?? card.sno ?? "—"} · {card.rarity}
                                  </small>
                                </div>
                              ))}
                            </div>
                          ) : "—"}
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
            {comparisonRows.length === 0 && (
              <div className="empty-state">
                {comparisonLoading ? <Database size={20} /> : <GitCompare size={20} />}
                <strong>
                  {comparisonLoading
                    ? "Comparing collections…"
                    : comparisonDone
                      ? "No common cards found"
                      : "Comparison table is empty"}
                </strong>
                <span>
                  {comparisonLoading
                    ? "Finding names present in every selected collection."
                    : comparisonDone
                      ? "Try different collections or add more card data."
                      : "Choose Compare collections to get started."}
                </span>
              </div>
            )}
          </div>
          <div className="table-footer">
            <span>
              {comparisonDone ? `${comparisonRows.length} common card names` : "Awaiting comparison"}
            </span>
            {comparisonDone && <span>Across {selectedCompareCollections.length} collections</span>}
          </div>
        </section>

        <section
          id="catalogue"
          className="tcg-table-card"
          aria-labelledby="catalogue-title"
        >
          <div className="table-heading">
            <div>
              <div className="tcg-kicker">
                <span /> CARD LIST
              </div>
              <h2 id="catalogue-title">
                {collection || "Cards"}
              </h2>
            </div>
            <span className="result-count">
              {loadingCards
                ? "Loading cards…"
                : `${filteredRows.length} records`}
            </span>
          </div>

          <div className="table-toolbar">
            <label className="search-box">
              <Search size={16} />
              <input
                value={query}
                onChange={(event) => {
                  setQuery(event.target.value);
                  setPage(1);
                }}
                placeholder={
                  collection
                    ? "Search cards or attributes…"
                    : "Select a collection to search"
                }
                aria-label="Search cards"
                disabled={!collection || loadingCards}
              />
              {query && (
                <button
                  type="button"
                  onClick={() => {
                    setQuery("");
                    setPage(1);
                  }}
                  aria-label="Clear search"
                >
                  <X size={14} />
                </button>
              )}
            </label>

            <div className="toolbar-actions">
              <div className="column-control">
                <button
                  className={`tool-button ${
                    showColumns ? "is-active" : ""
                  }`}
                  type="button"
                  onClick={() =>
                    setShowColumns((open) => !open)
                  }
                  aria-expanded={showColumns}
                >
                  <Columns3 size={15} /> Columns
                </button>

                {showColumns && (
                  <div className="column-menu">
                    <div className="menu-heading">
                      VISIBLE COLUMNS
                      <button
                        type="button"
                        onClick={() => setShowColumns(false)}
                        aria-label="Close columns"
                      >
                        <X size={13} />
                      </button>
                    </div>

                    {allColumns.map((key) => (
                      <label
                        key={key}
                        className="column-option"
                      >
                        <input
                          type="checkbox"
                          checked={visibleColumns.includes(key)}
                          disabled={
                            visibleColumns.includes(key) &&
                            visibleColumns.length === 1
                          }
                          onChange={() => toggleColumn(key)}
                        />
                        {columnLabels[key]}
                      </label>
                    ))}

                    <button
                      className="reset-columns"
                      type="button"
                      onClick={() =>
                        setVisibleColumns(defaultColumns)
                      }
                    >
                      Reset defaults
                    </button>
                  </div>
                )}
              </div>

              <button
                className="tool-button"
                type="button"
                onClick={exportCsv}
                disabled={!collection || filteredRows.length === 0}
              >
                <Download size={15} /> Export CSV
              </button>
            </div>
          </div>

          <div className="table-meta">
            <span>
              <span className="status-dot" /> SORTABLE TABLE
            </span>
            <span className="meta-divider" />
            Click a column heading to sort
          </div>

          <div className="table-scroll">
            <table className="data-table">
              <thead>
                <tr>
                  {visibleColumns.map((key) => (
                    <th key={key}>
                      <button
                        type="button"
                        onClick={() => toggleSort(key)}
                      >
                        {columnLabels[key]}
                        <ArrowDownUp
                          size={12}
                          className={
                            sortKey === key ? "sort-active" : ""
                          }
                        />
                        {sortKey === key && (
                          <span className="sr-only">
                            {sortDirection === "asc"
                              ? "ascending"
                              : "descending"}
                          </span>
                        )}
                      </button>
                    </th>
                  ))}
                </tr>
              </thead>

              <tbody>
                {rows.map((row) => (
                  <tr key={row.id}>
                    {visibleColumns.map((key) => (
                      <td key={key}>
                        {key === "sno" ? (
                          <span className="row-number">
                            {String(row.sno).padStart(3, "0")}
                          </span>
                        ) : key === "card" ? (
                          <span className="card-cell">
                            <span className="mini-card">
                              <Layers3 size={12} />
                            </span>
                            {row.card}
                          </span>
                        ) : key === "rarity" ? (
                          <span
                            className={`rarity rarity-${row.rarity
                              .toLowerCase()
                              .replaceAll(" ", "-")}`}
                          >
                            {row.rarity}
                          </span>
                        ) : (
                          String(row[key] ?? "—")
                        )}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>

            {rows.length === 0 && (
              <div className="empty-state">
                {loadingCards ? (
                  <Database size={20} />
                ) : (
                  <Search size={20} />
                )}
                <strong>
                  {loadingCards
                    ? "Loading cards…"
                    : loadError
                      ? "Unable to load data"
                      : !collection
                        ? "Select a collection to begin"
                        : "No matching cards"}
                </strong>
                <span>
                  {loadError ||
                    (!collection
                      ? "Choose a collection above to display its cards."
                      : loadingCards
                        ? "Retrieving records from the database."
                        : "Try a different search term.")}
                </span>
              </div>
            )}
          </div>

          <div className="table-footer">
            <span>
              Showing{" "}
              <b>
                {rows.length
                  ? (page - 1) * pageSize + 1
                  : 0}
                –
                {Math.min(
                  page * pageSize,
                  filteredRows.length
                )}
              </b>{" "}
              of <b>{filteredRows.length}</b> records
            </span>

            <div className="pagination">
              <button
                type="button"
                disabled={page <= 1}
                onClick={() =>
                  setPage((current) =>
                    Math.max(1, current - 1)
                  )
                }
                aria-label="Previous page"
              >
                <ChevronLeft size={15} />
              </button>
              <span>
                Page <b>{page}</b> of <b>{pageCount}</b>
              </span>
              <button
                type="button"
                disabled={page >= pageCount}
                onClick={() =>
                  setPage((current) =>
                    Math.min(pageCount, current + 1)
                  )
                }
                aria-label="Next page"
              >
                <ChevronRight size={15} />
              </button>
            </div>
          </div>
        </section>

        <p className="data-note">
          <span className="note-mark">i</span>
          Collections are discovered from the database. Select a
          collection to retrieve its card records.
        </p>
      </div>

      <footer className="tcg-footer">
        <span>TCG NOW</span>
        <span>
          Trading card archive · Built as a personal project
        </span>
        <a href="#top">Back to top ↑</a>
      </footer>
    </main>
  );
}
