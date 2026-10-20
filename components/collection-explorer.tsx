
"use client";

import { useMemo, useRef, useState } from "react";
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
  Layers3,
  Search,
  X,
} from "lucide-react";

gsap.registerPlugin(useGSAP);

type CardRecord = {
  sno: number;
  collectionSno: number | string;
  card: string;
  type: string;
  subcollection: string;
  rarity: string;
  position: string;
  image: string;
};

type ColumnKey = keyof CardRecord;

const previewRows: CardRecord[] = [
  { sno: 1, collectionSno: 1, card: "Preview card 001", type: "Player", subcollection: "Base set", rarity: "Common", position: "Batter", image: "—" },
  { sno: 2, collectionSno: 2, card: "Preview card 002", type: "Player", subcollection: "Rising stars", rarity: "Rare", position: "Bowler", image: "—" },
  { sno: 3, collectionSno: 3, card: "Preview card 003", type: "Team", subcollection: "Base set", rarity: "Common", position: "—", image: "—" },
  { sno: 4, collectionSno: 4, card: "Preview card 004", type: "Special", subcollection: "Legends", rarity: "Limited edition", position: "All-rounder", image: "—" },
  { sno: 5, collectionSno: 5, card: "Preview card 005", type: "Player", subcollection: "Base set", rarity: "Rare", position: "Wicketkeeper", image: "—" },
  { sno: 6, collectionSno: 6, card: "Preview card 006", type: "Player", subcollection: "Rising stars", rarity: "Common", position: "Batter", image: "—" },
  { sno: 7, collectionSno: 7, card: "Preview card 007", type: "Special", subcollection: "Legends", rarity: "Limited edition", position: "Bowler", image: "—" },
  { sno: 8, collectionSno: 8, card: "Preview card 008", type: "Team", subcollection: "Base set", rarity: "Common", position: "—", image: "—" },
  { sno: 9, collectionSno: 9, card: "Preview card 009", type: "Player", subcollection: "Base set", rarity: "Rare", position: "All-rounder", image: "—" },
  { sno: 10, collectionSno: 10, card: "Preview card 010", type: "Player", subcollection: "Rising stars", rarity: "Common", position: "Batter", image: "—" },
  { sno: 11, collectionSno: 11, card: "Preview card 011", type: "Special", subcollection: "Legends", rarity: "Limited edition", position: "Bowler", image: "—" },
  { sno: 12, collectionSno: 12, card: "Preview card 012", type: "Player", subcollection: "Base set", rarity: "Common", position: "Wicketkeeper", image: "—" },
];

const catalogue = [
  { sport: "Cricket", season: "2011", collection: "Cricket Attax 2011" },
  { sport: "Cricket", season: "2012", collection: "Cricket Attax 2012" },
  { sport: "Cricket", season: "2024–25", collection: "Cricket Attax 2024–25" },
  { sport: "Football", season: "2024–25", collection: "Match Attax 2024–25" },
  { sport: "WWE", season: "2024", collection: "WWE Trading Cards 2024" },
];

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
  "sno", "collectionSno", "card", "type",
  "subcollection", "rarity", "position", "image",
];

const defaultColumns: ColumnKey[] = [
  "sno", "collectionSno", "card", "type",
  "subcollection", "rarity", "position",
];

export default function CollectionExplorer() {
  const root = useRef<HTMLElement>(null);

  const [sport, setSport] = useState("Cricket");
  const [season, setSeason] = useState("2011");
  const [collection, setCollection] = useState("Cricket Attax 2011");
  const [query, setQuery] = useState("");
  const [sortKey, setSortKey] = useState<ColumnKey>("sno");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");
  const [visibleColumns, setVisibleColumns] =
    useState<ColumnKey[]>(defaultColumns);
  const [showColumns, setShowColumns] = useState(false);
  const [page, setPage] = useState(1);

  const pageSize = 8;

  
useGSAP(() => {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    return;
  }

  const timeline = gsap.timeline({
    defaults: { ease: "power3.out" },
  });

  timeline
    // Header drops in
    .from(".tcg-topbar", {
      y: -24,
      opacity: 0,
      duration: 0.7,
    })
    // Heading reveals
    .from(
      ".tcg-kicker",
      {
        x: -20,
        opacity: 0,
        duration: 0.45,
      },
      "-=0.25",
    )
    .from(
      ".tcg-intro h1",
      {
        y: 32,
        opacity: 0,
        duration: 0.75,
      },
      "-=0.2",
    )
    .from(
      ".tcg-intro p",
      {
        y: 12,
        opacity: 0,
        duration: 0.45,
      },
      "-=0.4",
    )
    // Collection selector enters
    .from(
      ".tcg-finder",
      {
        y: 35,
        opacity: 0,
        scale: 0.985,
        duration: 0.65,
      },
      "-=0.1",
    )
    .from(
      ".tcg-field",
      {
        y: 15,
        opacity: 0,
        stagger: 0.1,
        duration: 0.4,
      },
      "-=0.3",
    )
    // Table appears last
    .from(
      ".tcg-table-card",
      {
        y: 40,
        opacity: 0,
        duration: 0.7,
      },
      "-=0.15",
    )
    .from(
      ".data-table tbody tr",
      {
        y: 8,
        opacity: 0,
        stagger: 0.045,
        duration: 0.28,
      },
      "-=0.25",
    );
}, { scope: root });

  
useGSAP(() => {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    return;
  }

  gsap.fromTo(
    ".data-table tbody tr",
    {
      opacity: 0,
      y: 10,
    },
    {
      opacity: 1,
      y: 0,
      duration: 0.3,
      stagger: 0.035,
      ease: "power2.out",
      clearProps: "all",
    },
  );
}, {
  scope: root,
  dependencies: [collection, query, sortKey, sortDirection, page],
  revertOnUpdate: true,
});

  
useGSAP(() => {
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
}, { scope: root });


  const seasons = [
    ...new Set(
      catalogue
        .filter((item) => item.sport === sport)
        .map((item) => item.season),
    ),
  ];

  const collections = catalogue.filter(
    (item) => item.sport === sport && item.season === season,
  );

  const filteredRows = useMemo(() => {
    const normalized = query.trim().toLowerCase();

    return previewRows
      .filter(
        (row) =>
          !normalized ||
          Object.values(row).some((value) =>
            String(value).toLowerCase().includes(normalized),
          ),
      )
      .sort((a, b) => {
        const left = a[sortKey];
        const right = b[sortKey];

        const comparison =
          typeof left === "number" && typeof right === "number"
            ? left - right
            : String(left).localeCompare(String(right), undefined, {
                numeric: true,
              });

        return sortDirection === "asc" ? comparison : -comparison;
      });
  }, [query, sortKey, sortDirection]);

  const pageCount = Math.max(
    1,
    Math.ceil(filteredRows.length / pageSize),
  );

  const rows = filteredRows.slice(
    (page - 1) * pageSize,
    page * pageSize,
  );

  function changeSport(nextSport: string) {
    const nextItems = catalogue.filter(
      (item) => item.sport === nextSport,
    );

    setSport(nextSport);
    setSeason(nextItems[0]?.season ?? "");
    setCollection(nextItems[0]?.collection ?? "");
    setPage(1);
  }

  function changeSeason(nextSeason: string) {
    const nextItems = catalogue.filter(
      (item) =>
        item.sport === sport && item.season === nextSeason,
    );

    setSeason(nextSeason);
    setCollection(nextItems[0]?.collection ?? "");
    setPage(1);
  }

  function toggleSort(key: ColumnKey) {
    if (sortKey === key) {
      setSortDirection((direction) =>
        direction === "asc" ? "desc" : "asc",
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
        // Keep at least one column visible.
        if (current.length === 1) return current;
        return current.filter((column) => column !== key);
      }

      return allColumns.filter(
        (column) => column === key || current.includes(column),
      );
    });
  }

  function exportCsv() {
    const lines = [
      visibleColumns.map((key) => columnLabels[key]).join(","),
      ...filteredRows.map((row) =>
        visibleColumns
          .map(
            (key) =>
              `"${String(row[key]).replaceAll('"', '""')}"`,
          )
          .join(","),
      ),
    ];

    const blob = new Blob(["\uFEFF", lines.join("\r\n")], {
      type: "text/csv;charset=utf-8;",
    });

    const url = URL.createObjectURL(blob);
    const anchor = document.createElement("a");

    anchor.href = url;
    anchor.download = "tcgnow-preview.csv";
    anchor.click();

    setTimeout(() => URL.revokeObjectURL(url), 1000);
  }

  return (
    <main ref={root} className="tcg-shell" id="top">
      <nav className="tcg-topbar">
        <a className="tcg-brand" href="#top" aria-label="TCG NOW home">
          <span className="tcg-mark"><Layers3 size={18} /></span>
          <span>TCG<span className="brand-light">NOW</span></span>
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
          <p>Browse collections, search cards, and manage your checklist.</p>
        </header>

        <section className="tcg-finder" aria-labelledby="finder-title">
          <div className="panel-heading">
            <div className="panel-title-icon"><Database size={17} /></div>
            <div>
              <h2 id="finder-title">Select a collection</h2>
              <p>Choose a sport, season, and set.</p>
            </div>
            <span className="panel-index">01 / COLLECTION</span>
          </div>

          <div className="tcg-select-grid">
            <label className="tcg-field">
              <span>SPORT</span>
              <div className="select-wrap">
                <select
                  value={sport}
                  onChange={(event) => changeSport(event.target.value)}
                >
                  <option>Cricket</option>
                  <option>Football</option>
                  <option>WWE</option>
                </select>
                <ChevronDown size={15} />
              </div>
            </label>

            <label className="tcg-field">
              <span>YEAR / SEASON</span>
              <div className="select-wrap">
                <select
                  value={season}
                  onChange={(event) => changeSeason(event.target.value)}
                >
                  {seasons.map((value) => (
                    <option key={value}>{value}</option>
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
                  onChange={(event) => {
                    setCollection(event.target.value);
                    setPage(1);
                  }}
                >
                  {collections.map((item) => (
                    <option key={item.collection}>
                      {item.collection}
                    </option>
                  ))}
                </select>
                <ChevronDown size={15} />
              </div>
            </label>
          </div>

          <div className="selected-collection">
            <span className="selected-icon"><Layers3 size={19} /></span>
            <div className="selected-details">
              <span>SELECTED COLLECTION</span>
              <strong>{collection || "Choose a collection"}</strong>
              <small>{sport} · {season}</small>
            </div>
            <span className="preview-tag">
              <span className="status-dot" /> PREVIEW DATA
            </span>
          </div>
        </section>

        <section
          id="catalogue"
          className="tcg-table-card"
          aria-labelledby="catalogue-title"
        >
          <div className="table-heading">
            <div>
              <div className="tcg-kicker"><span /> CARD LIST</div>
              <h2 id="catalogue-title">{collection || "Cards"}</h2>
            </div>
            <span className="result-count">
              {filteredRows.length} preview records
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
                placeholder="Search cards or attributes…"
                aria-label="Search cards"
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
                  className={`tool-button ${showColumns ? "is-active" : ""}`}
                  type="button"
                  onClick={() => setShowColumns((open) => !open)}
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
                      <label key={key} className="column-option">
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
                      onClick={() => setVisibleColumns(defaultColumns)}
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
              >
                <Download size={15} /> Export CSV
              </button>
            </div>
          </div>

          <div className="table-meta">
            <span><span className="status-dot" /> SORTABLE TABLE</span>
            <span className="meta-divider" />
            Click a column heading to sort
            <span className="meta-preview">DEMO RECORDS — NOT LIVE DATA</span>
          </div>

          <div className="table-scroll">
            <table className="data-table">
              <thead>
                <tr>
                  {visibleColumns.map((key) => (
                    <th key={key}>
                      <button type="button" onClick={() => toggleSort(key)}>
                        {columnLabels[key]}
                        <ArrowDownUp
                          size={12}
                          className={sortKey === key ? "sort-active" : ""}
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
                  <tr key={row.sno}>
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
                          String(row[key])
                        )}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>

            {rows.length === 0 && (
              <div className="empty-state">
                <Search size={20} />
                <strong>No matching cards</strong>
                <span>Try a different search term.</span>
              </div>
            )}
          </div>

          <div className="table-footer">
            <span>
              Showing{" "}
              <b>
                {rows.length ? (page - 1) * pageSize + 1 : 0}–
                {Math.min(page * pageSize, filteredRows.length)}
              </b>{" "}
              of <b>{filteredRows.length}</b> records
            </span>

            <div className="pagination">
              <button
                type="button"
                disabled={page <= 1}
                onClick={() =>
                  setPage((current) => Math.max(1, current - 1))
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
                  setPage((current) => Math.min(pageCount, current + 1))
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
          This interface currently uses sample records. Live collection data
          will appear here once the database API is connected.
        </p>
      </div>

      <footer className="tcg-footer">
        <span>TCG NOW</span>
        <span>Trading card archive · Built as a personal project</span>
        <a href="#top">Back to top ↑</a>
      </footer>
    </main>
  );
}
