import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { PlusCircle, Search, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import type { MenuItem } from "../data/menuData";

interface Props {
  allItems: MenuItem[];
  selectedItems: Set<string>;
  onToggleItem: (id: string) => void;
  onToggleAll: (ids: string[], select: boolean) => void;
  onAddCustomItem: (name: string) => void;
  courseName: string;
  subCategoryName: string | null;
}

export function MenuItemsList({
  allItems,
  selectedItems,
  onToggleItem,
  onToggleAll,
  onAddCustomItem,
  courseName,
  subCategoryName,
}: Props) {
  const [query, setQuery] = useState("");
  const containerRef = useRef<HTMLDivElement>(null);

  // Scroll to top when category or subcategory changes
  // biome-ignore lint/correctness/useExhaustiveDependencies: props are valid deps
  useEffect(() => {
    if (containerRef.current) {
      const viewport = containerRef.current.querySelector<HTMLElement>(
        "[data-radix-scroll-area-viewport]",
      );
      if (viewport) {
        viewport.scrollTop = 0;
      }
    }
  }, [courseName, subCategoryName]);

  const isSearching = query.trim().length > 0;
  const trimmed = query.trim();

  // Items for the selected course
  const courseItems = allItems.filter((item) => item.course === courseName);

  // If a subcategory is selected, filter to just that subcategory
  const baseItems = subCategoryName
    ? courseItems.filter((item) => item.subCategory === subCategoryName)
    : courseItems;

  const filtered = isSearching
    ? allItems.filter((item) =>
        item.name.toLowerCase().includes(trimmed.toLowerCase()),
      )
    : baseItems;

  // Build grouped structure for non-search mode
  const grouped: Record<string, MenuItem[]> = {};
  if (!isSearching) {
    for (const item of filtered) {
      if (!grouped[item.subCategory]) grouped[item.subCategory] = [];
      grouped[item.subCategory].push(item);
    }
  }

  const exactMatch = allItems.some(
    (item) => item.name.toLowerCase() === trimmed.toLowerCase(),
  );
  const showAddCustom = isSearching && !exactMatch;

  const allFilteredIds = filtered.map((i) => i.id);
  const allSelected =
    allFilteredIds.length > 0 &&
    allFilteredIds.every((id) => selectedItems.has(id));

  function handleAddCustom() {
    if (trimmed) {
      onAddCustomItem(trimmed);
      setQuery("");
    }
  }

  const panelTitle = isSearching
    ? "Search Results"
    : subCategoryName
      ? subCategoryName
      : courseName || "Menu Items";

  return (
    <div
      ref={containerRef}
      className="bg-card rounded-lg border border-border shadow-xs flex flex-col overflow-hidden"
      data-ocid="menu.items.panel"
    >
      <div className="px-4 py-3 border-b border-border bg-secondary/50">
        <h3 className="font-serif text-lg font-bold text-foreground mb-2">
          {panelTitle}
        </h3>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
          <Input
            placeholder="Search or type custom item name…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && showAddCustom && trimmed)
                handleAddCustom();
            }}
            className="pl-9 pr-8 h-9 text-sm"
            data-ocid="menu.search.input"
          />
          {query && (
            <button
              type="button"
              onClick={() => setQuery("")}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>
        {showAddCustom && (
          <button
            type="button"
            onClick={handleAddCustom}
            className="mt-2 flex items-center gap-1.5 text-xs font-semibold text-gold hover:underline"
            data-ocid="menu.add_custom"
          >
            <PlusCircle className="h-3.5 w-3.5" />
            Add &ldquo;{trimmed}&rdquo; as custom item
          </button>
        )}
        {!isSearching && filtered.length > 0 && (
          <button
            type="button"
            onClick={() => onToggleAll(allFilteredIds, !allSelected)}
            className="mt-2 text-xs font-semibold text-gold hover:underline"
            data-ocid="menu.select_all"
          >
            {allSelected ? "Deselect All" : "Select All"}
          </button>
        )}
      </div>

      <ScrollArea className="flex-1 h-[calc(100vh-320px)] min-h-[360px]">
        {filtered.length === 0 ? (
          <div
            className="flex flex-col items-center justify-center h-48 text-muted-foreground text-sm text-center px-6"
            data-ocid="menu.items.empty_state"
          >
            <Search className="h-8 w-8 mb-2 opacity-30" />
            {isSearching ? (
              <>
                <p>No matches for &ldquo;{query}&rdquo;</p>
                <p className="mt-1 text-xs">
                  Press Enter or click the button above to add it as a custom
                  item.
                </p>
              </>
            ) : (
              <p>Select a category from the left to browse items.</p>
            )}
          </div>
        ) : isSearching ? (
          <div className="p-4 flex flex-col gap-1.5">
            {filtered.map((item, idx) => {
              const checked = selectedItems.has(item.id);
              return (
                <button
                  type="button"
                  key={item.id}
                  onClick={() => onToggleItem(item.id)}
                  className={`flex items-center gap-3 p-3 rounded-md transition-all border text-left w-full ${
                    checked
                      ? "bg-gold/10 border-gold/30"
                      : "bg-card border-transparent hover:border-border hover:bg-secondary/50"
                  }`}
                  data-ocid={`menu.item.${idx + 1}`}
                >
                  <span
                    className={`w-4 h-4 rounded-sm border flex items-center justify-center shrink-0 text-[10px] ${
                      checked
                        ? "bg-gold border-gold text-white"
                        : "border-gold/40"
                    }`}
                  >
                    {checked ? "✓" : ""}
                  </span>
                  <span
                    className={`text-sm flex-1 ${
                      checked
                        ? "font-semibold text-foreground"
                        : "text-muted-foreground"
                    }`}
                  >
                    {item.name}
                  </span>
                  <span className="text-[10px] text-muted-foreground shrink-0">
                    {item.subCategory}
                  </span>
                </button>
              );
            })}
          </div>
        ) : (
          <div className="p-4">
            {Object.entries(grouped).map(([subCat, items]) => {
              const subIds = items.map((i) => i.id);
              const allSubSelected = subIds.every((id) =>
                selectedItems.has(id),
              );
              return (
                <div key={subCat} className="mb-5">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="text-xs font-bold text-gold uppercase tracking-wider border-b border-gold/20 pb-1 flex-1">
                      {subCat}
                    </h4>
                    <button
                      type="button"
                      onClick={() => onToggleAll(subIds, !allSubSelected)}
                      className="ml-3 text-[10px] font-semibold text-gold hover:underline shrink-0"
                    >
                      {allSubSelected ? "Deselect All" : "Select All"}
                    </button>
                  </div>
                  <div className="flex flex-col gap-1.5">
                    {items.map((item, idx) => {
                      const checked = selectedItems.has(item.id);
                      return (
                        <button
                          type="button"
                          key={item.id}
                          onClick={() => onToggleItem(item.id)}
                          className={`flex items-center gap-3 p-2.5 rounded-md transition-all border text-left w-full ${
                            checked
                              ? "bg-gold/10 border-gold/30"
                              : "bg-card border-transparent hover:border-border hover:bg-secondary/50"
                          }`}
                          data-ocid={`menu.item.${idx + 1}`}
                        >
                          <span
                            className={`w-4 h-4 rounded-sm border flex items-center justify-center shrink-0 text-[10px] ${
                              checked
                                ? "bg-gold border-gold text-white"
                                : "border-gold/40"
                            }`}
                          >
                            {checked ? "✓" : ""}
                          </span>
                          <span
                            className={`text-sm flex-1 ${
                              checked
                                ? "font-semibold text-foreground"
                                : "text-muted-foreground"
                            }`}
                          >
                            {item.name}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </ScrollArea>
    </div>
  );
}
