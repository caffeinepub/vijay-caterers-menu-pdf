import { ScrollArea } from "@/components/ui/scroll-area";
import { ChevronDown, ChevronRight } from "lucide-react";
import type { Course } from "../data/menuData";

interface Props {
  menuData: Course[];
  selectedCourse: string | null;
  selectedSubCategory: string | null;
  selectedItems: Set<string>;
  onSelectCourse: (courseName: string) => void;
  onSelectSubCategory: (subName: string) => void;
}

export function MenuSidebar({
  menuData,
  selectedCourse,
  selectedSubCategory,
  selectedItems,
  onSelectCourse,
  onSelectSubCategory,
}: Props) {
  return (
    <aside
      className="bg-card rounded-lg border border-border shadow-xs flex flex-col sticky top-20 max-h-[calc(100vh-90px)] overflow-hidden"
      data-ocid="menu.sidebar.panel"
    >
      <div className="bg-gold px-4 py-3 shrink-0">
        <h3 className="font-serif text-sm font-bold text-white tracking-wide uppercase">
          Menu Categories
        </h3>
      </div>
      <ScrollArea className="flex-1">
        <div className="p-2 pb-8">
          {menuData.map((course) => {
            const isOpen = selectedCourse === course.name;
            const courseSelectedCount = course.subCategories
              .flatMap((s) => s.items)
              .filter((item) => selectedItems.has(item.id)).length;

            return (
              <div key={course.name} className="mb-1">
                <button
                  type="button"
                  onClick={() => onSelectCourse(course.name)}
                  className={`w-full rounded-md transition-colors text-left group border ${
                    isOpen
                      ? "bg-gold/10 border-gold/30"
                      : "hover:bg-secondary border-transparent hover:border-gold/20"
                  }`}
                  data-ocid="menu.course.toggle"
                >
                  <div className="flex items-center justify-between px-3 py-2">
                    <span
                      className={`font-serif text-sm font-semibold transition-colors ${
                        isOpen
                          ? "text-gold"
                          : "text-foreground group-hover:text-gold"
                      }`}
                    >
                      {course.name}
                    </span>
                    <div className="flex items-center gap-2">
                      {courseSelectedCount > 0 && (
                        <span className="text-xs bg-gold text-white rounded-full w-5 h-5 flex items-center justify-center font-bold">
                          {courseSelectedCount}
                        </span>
                      )}
                      {isOpen ? (
                        <ChevronDown className="h-3.5 w-3.5 text-gold" />
                      ) : (
                        <ChevronRight className="h-3.5 w-3.5 text-muted-foreground" />
                      )}
                    </div>
                  </div>
                </button>

                {isOpen && (
                  <div className="ml-2 border-l-2 border-gold/30 pl-2 mt-0.5 pb-1">
                    {course.subCategories.map((sub) => {
                      const subCount = sub.items.filter((i) =>
                        selectedItems.has(i.id),
                      ).length;
                      const isSubSelected = selectedSubCategory === sub.name;

                      return (
                        <button
                          key={sub.name}
                          type="button"
                          onClick={() => onSelectSubCategory(sub.name)}
                          className={`w-full flex items-center justify-between px-3 py-1.5 rounded-md text-xs transition-colors text-left ${
                            isSubSelected
                              ? "bg-gold/20 text-gold font-semibold"
                              : "text-muted-foreground hover:bg-secondary hover:text-foreground"
                          }`}
                          data-ocid="menu.subcategory.toggle"
                        >
                          <span>{sub.name}</span>
                          {subCount > 0 && (
                            <span className="text-xs bg-gold/20 text-gold rounded-full px-1.5 font-semibold">
                              {subCount}
                            </span>
                          )}
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </ScrollArea>
    </aside>
  );
}
