"use client";

import { useMemo, useState } from "react";
import { SlidersHorizontal, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { ProductCard } from "@/components/shop/product-card";
import type { CardProduct, Category } from "@/lib/products";

type SortKey = "featured" | "price-asc" | "price-desc" | "name";

const SORTS: { key: SortKey; label: string }[] = [
  { key: "featured", label: "Featured" },
  { key: "price-asc", label: "Price: low to high" },
  { key: "price-desc", label: "Price: high to low" },
  { key: "name", label: "Name: A–Z" },
];

export function ShopCatalog({
  products,
  categories,
  concerns,
}: {
  products: CardProduct[];
  categories: Category[];
  concerns: { name: string; count: number }[];
}) {
  const [category, setCategory] = useState("all");
  const [concern, setConcern] = useState("all");
  const [sort, setSort] = useState<SortKey>("featured");
  const [filtersOpen, setFiltersOpen] = useState(false);

  const filtered = useMemo(() => {
    let list = products;
    if (category !== "all") list = list.filter((p) => p.category === category);
    if (concern !== "all") list = list.filter((p) => p.concerns.includes(concern));
    const arr = [...list];
    switch (sort) {
      case "price-asc":
        arr.sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        arr.sort((a, b) => b.price - a.price);
        break;
      case "name":
        arr.sort((a, b) => a.name.localeCompare(b.name));
        break;
      default:
        arr.sort(
          (a, b) =>
            Number(b.bestseller) - Number(a.bestseller) ||
            Number(b.isNew) - Number(a.isNew),
        );
    }
    return arr;
  }, [products, category, concern, sort]);

  const activeFilters = (category !== "all" ? 1 : 0) + (concern !== "all" ? 1 : 0);

  const Sidebar = (
    <div className="space-y-9">
      <FilterGroup title="Category">
        <FilterItem
          label="All products"
          count={products.length}
          active={category === "all"}
          onClick={() => setCategory("all")}
        />
        {categories.map((c) => (
          <FilterItem
            key={c.key}
            label={c.name}
            count={c.count}
            active={category === c.key}
            onClick={() => setCategory(c.key)}
          />
        ))}
      </FilterGroup>

      <FilterGroup title="Concern">
        <FilterItem
          label="All concerns"
          active={concern === "all"}
          onClick={() => setConcern("all")}
        />
        {concerns.map((c) => (
          <FilterItem
            key={c.name}
            label={c.name}
            count={c.count}
            active={concern === c.name}
            onClick={() => setConcern(c.name)}
          />
        ))}
      </FilterGroup>

      {activeFilters > 0 && (
        <button
          type="button"
          onClick={() => {
            setCategory("all");
            setConcern("all");
          }}
          className="font-body text-xs uppercase tracking-[0.16em] text-gold-deep underline-offset-4 transition-colors hover:text-espresso hover:underline"
        >
          Clear filters
        </button>
      )}
    </div>
  );

  return (
    <div className="lg:grid lg:grid-cols-[230px_1fr] lg:gap-12">
      {/* Mobile: a compact Filters toggle + collapsible panel */}
      <div className="lg:hidden">
        <button
          type="button"
          onClick={() => setFiltersOpen((o) => !o)}
          aria-expanded={filtersOpen}
          className="inline-flex items-center gap-2 rounded-full border border-espresso/20 px-4 py-2.5 font-body text-xs uppercase tracking-[0.16em] text-espresso transition-colors hover:border-gold/60"
        >
          {filtersOpen ? <X className="size-4" /> : <SlidersHorizontal className="size-4" />}
          Filters
          {activeFilters > 0 && (
            <span className="grid size-5 place-items-center rounded-full bg-espresso text-[10px] text-pearl">
              {activeFilters}
            </span>
          )}
        </button>
        {filtersOpen && (
          <div className="mt-5 rounded-md border border-espresso/10 bg-pearl/60 p-6">{Sidebar}</div>
        )}
      </div>

      {/* Desktop: sticky left sidebar */}
      <aside className="hidden lg:block">
        <div className="sticky top-28">{Sidebar}</div>
      </aside>

      {/* Main column */}
      <div className="mt-8 lg:mt-0">
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-espresso/10 pb-4">
          <p className="font-body text-sm text-ink-500">
            {filtered.length} {filtered.length === 1 ? "product" : "products"}
          </p>
          <div className="flex items-center gap-3">
            <label
              htmlFor="sort"
              className="font-body text-[11px] uppercase tracking-[0.2em] text-ink-400"
            >
              Sort
            </label>
            <select
              id="sort"
              value={sort}
              onChange={(e) => setSort(e.target.value as SortKey)}
              className="rounded-sm border border-espresso/20 bg-transparent px-3 py-2 font-body text-sm text-espresso focus:border-gold-deep focus:outline-none"
            >
              {SORTS.map((s) => (
                <option key={s.key} value={s.key}>
                  {s.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="mt-8 grid grid-cols-2 gap-x-5 gap-y-10 lg:grid-cols-3">
          {filtered.map((p, i) => (
            <ProductCard key={p.slug} product={p} priority={i < 3} />
          ))}
        </div>

        {filtered.length === 0 && (
          <p className="py-20 text-center font-body text-ink-500">
            No products match that combination yet.
          </p>
        )}
      </div>
    </div>
  );
}

function FilterGroup({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h3 className="mb-3 font-body text-[11px] font-medium uppercase tracking-[0.2em] text-gold-deep">
        {title}
      </h3>
      <div className="space-y-0.5">{children}</div>
    </div>
  );
}

function FilterItem({
  label,
  count,
  active,
  onClick,
}: {
  label: string;
  count?: number;
  active?: boolean;
  onClick?: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={cn(
        "flex w-full items-center justify-between gap-2 rounded-md px-3 py-2 text-left font-body text-sm transition-colors",
        active
          ? "bg-espresso text-pearl"
          : "text-ink-600 hover:bg-cream hover:text-espresso",
      )}
    >
      <span>{label}</span>
      {typeof count === "number" && (
        <span className={cn("text-xs tabular-nums", active ? "text-pearl/70" : "text-ink-400")}>
          {count}
        </span>
      )}
    </button>
  );
}
