import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { FileDown, Trash2, X } from "lucide-react";
import { toast } from "sonner";
import type { MenuItem } from "../data/menuData";

interface Props {
  selectedItems: MenuItem[];
  eventName: string;
  eventDate: string;
  onEventNameChange: (v: string) => void;
  onEventDateChange: (v: string) => void;
  onClearAll: () => void;
  onRemoveItem: (id: string) => void;
  onGeneratePdf: () => void;
}

export function SelectedPanel({
  selectedItems,
  eventName,
  eventDate,
  onEventNameChange,
  onEventDateChange,
  onClearAll,
  onRemoveItem,
  onGeneratePdf,
}: Props) {
  const groups: Record<string, MenuItem[]> = {};
  for (const item of selectedItems) {
    if (!groups[item.subCategory]) groups[item.subCategory] = [];
    groups[item.subCategory].push(item);
  }

  function handleGenerate() {
    if (selectedItems.length === 0) {
      toast.error("Please select at least one menu item.");
      return;
    }
    onGeneratePdf();
  }

  return (
    <aside
      className="bg-card rounded-lg border border-border shadow-xs flex flex-col overflow-hidden"
      data-ocid="selected.panel"
    >
      <div className="bg-gold px-4 py-3 flex items-center justify-between">
        <h3 className="font-serif text-sm font-bold text-white tracking-wide uppercase">
          Selected Items
        </h3>
        <span className="text-xs bg-white/20 text-white rounded-full px-2 py-0.5 font-bold">
          {selectedItems.length}
        </span>
      </div>

      <div className="p-3 border-b border-border space-y-2 bg-secondary/30">
        <div>
          <Label
            htmlFor="event-name"
            className="text-xs text-muted-foreground mb-1"
          >
            Event Name
          </Label>
          <Input
            id="event-name"
            placeholder="e.g. Wedding Reception"
            value={eventName}
            onChange={(e) => onEventNameChange(e.target.value)}
            className="h-8 text-sm border-border/60"
            data-ocid="event.name.input"
          />
        </div>
        <div>
          <Label
            htmlFor="event-date"
            className="text-xs text-muted-foreground mb-1"
          >
            Event Date
          </Label>
          <Input
            id="event-date"
            type="date"
            value={eventDate}
            onChange={(e) => onEventDateChange(e.target.value)}
            className="h-8 text-sm border-border/60"
            data-ocid="event.date.input"
          />
        </div>
      </div>

      <ScrollArea className="flex-1 h-[calc(100vh-460px)] min-h-[200px]">
        {selectedItems.length === 0 ? (
          <div
            className="flex flex-col items-center justify-center h-32 text-muted-foreground text-xs text-center px-4"
            data-ocid="selected.items.empty_state"
          >
            <span className="text-2xl mb-2">✦</span>
            <p>No items selected yet.</p>
            <p>Click items from the menu to add them.</p>
          </div>
        ) : (
          <div className="p-3 space-y-3">
            {Object.entries(groups).map(([subCat, items]) => (
              <div key={subCat}>
                <p className="text-xs font-bold text-gold uppercase tracking-wider mb-1.5">
                  {subCat}
                </p>
                <div className="space-y-1">
                  {items.map((item, idx) => (
                    <div
                      key={item.id}
                      className="flex items-center justify-between gap-2 py-1 px-2 rounded hover:bg-secondary/50 group"
                      data-ocid={`selected.item.${idx + 1}`}
                    >
                      <span className="text-xs text-foreground flex-1 truncate">
                        {item.name}
                      </span>
                      <button
                        type="button"
                        onClick={() => onRemoveItem(item.id)}
                        className="opacity-0 group-hover:opacity-100 transition-opacity text-muted-foreground hover:text-destructive"
                        data-ocid={`selected.delete_button.${idx + 1}`}
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </div>
                  ))}
                </div>
                <Separator className="mt-2" />
              </div>
            ))}
          </div>
        )}
      </ScrollArea>

      <div className="p-3 space-y-2 border-t border-border bg-secondary/20">
        {selectedItems.length > 0 && (
          <Button
            variant="outline"
            size="sm"
            onClick={onClearAll}
            className="w-full text-xs border-destructive/30 text-destructive hover:bg-destructive/10"
            data-ocid="selected.clear_all.button"
          >
            <Trash2 className="h-3.5 w-3.5 mr-1" />
            Clear All
          </Button>
        )}
        <Button
          onClick={handleGenerate}
          className="w-full bg-gold hover:bg-gold/90 text-white font-semibold text-sm"
          data-ocid="pdf.generate.button"
        >
          <FileDown className="h-4 w-4 mr-2" />
          Generate PDF
        </Button>
        <p className="text-[10px] text-center text-muted-foreground">
          A print dialog will open. Save as PDF.
        </p>
      </div>
    </aside>
  );
}
