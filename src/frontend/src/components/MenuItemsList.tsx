import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { ScrollArea } from "@/components/ui/scroll-area";
import type { MenuItem } from "../data/menuData";

interface Props {
  items: MenuItem[];
  selectedItems: Set<string>;
  onToggleItem: (id: string) => void;
  onToggleAll: (ids: string[], select: boolean) => void;
  subCategoryName: string;
}

export function MenuItemsList({
  items,
  selectedItems,
  onToggleItem,
  onToggleAll,
  subCategoryName,
}: Props) {
  const allIds = items.map((i) => i.id);
  const allSelected =
    allIds.length > 0 && allIds.every((id) => selectedItems.has(id));
  const someSelected =
    allIds.some((id) => selectedItems.has(id)) && !allSelected;

  return (
    <div
      className="bg-card rounded-lg border border-border shadow-xs flex flex-col overflow-hidden"
      data-ocid="menu.items.panel"
    >
      <div className="px-4 py-3 border-b border-border bg-secondary/50 flex items-center justify-between">
        <div>
          <h3 className="font-serif text-lg font-bold text-foreground">
            {subCategoryName || "Select a Category"}
          </h3>
          <p className="text-xs text-muted-foreground">
            {items.length} items available
          </p>
        </div>
        {items.length > 0 && (
          <Button
            variant="outline"
            size="sm"
            onClick={() => onToggleAll(allIds, !allSelected)}
            className="text-xs border-gold/40 text-gold hover:bg-gold/10"
            data-ocid="menu.select_all.button"
          >
            {allSelected
              ? "Deselect All"
              : someSelected
                ? "Select Rest"
                : "Select All"}
          </Button>
        )}
      </div>

      <ScrollArea className="flex-1 h-[calc(100vh-320px)] min-h-[360px]">
        {items.length === 0 ? (
          <div
            className="flex items-center justify-center h-48 text-muted-foreground text-sm"
            data-ocid="menu.items.empty_state"
          >
            <p>Select a category from the left panel</p>
          </div>
        ) : (
          <div className="p-4 grid grid-cols-1 sm:grid-cols-2 gap-2">
            {items.map((item, idx) => {
              const checked = selectedItems.has(item.id);
              const checkboxId = `item-cb-${item.id}`;
              return (
                <div
                  key={item.id}
                  className={`flex items-center gap-3 p-3 rounded-md transition-all border ${
                    checked
                      ? "bg-gold/10 border-gold/30 shadow-gold"
                      : "bg-card border-transparent hover:border-border hover:bg-secondary/50"
                  }`}
                  data-ocid={`menu.item.${idx + 1}`}
                >
                  <Checkbox
                    id={checkboxId}
                    checked={checked}
                    onCheckedChange={() => onToggleItem(item.id)}
                    className="border-gold data-[state=checked]:bg-gold data-[state=checked]:border-gold shrink-0"
                    data-ocid={`menu.checkbox.${idx + 1}`}
                  />
                  <label
                    htmlFor={checkboxId}
                    className={`text-sm cursor-pointer select-none flex-1 ${
                      checked
                        ? "font-semibold text-foreground"
                        : "text-muted-foreground"
                    }`}
                  >
                    {item.name}
                  </label>
                </div>
              );
            })}
          </div>
        )}
      </ScrollArea>
    </div>
  );
}
