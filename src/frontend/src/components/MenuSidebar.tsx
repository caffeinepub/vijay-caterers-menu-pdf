import { ScrollArea } from "@/components/ui/scroll-area";
import { ChevronDown, ChevronRight } from "lucide-react";
import { useState } from "react";
import type { Course } from "../data/menuData";

const COURSE_IMAGES: Record<string, string> = {
  Snacks: "/assets/generated/category-snacks.dim_120x80.jpg",
  "Main Veg Course": "/assets/generated/category-veg.dim_120x80.jpg",
  "Main Non-Veg Course": "/assets/generated/category-nonveg.dim_120x80.jpg",
  "Counter 1": "/assets/generated/category-counter.dim_120x80.jpg",
};

interface Props {
  menuData: Course[];
  selectedSubCategory: { course: string; subCategory: string } | null;
  selectedItems: Set<string>;
  onSelect: (val: { course: string; subCategory: string }) => void;
}

export function MenuSidebar({
  menuData,
  selectedSubCategory,
  selectedItems,
  onSelect,
}: Props) {
  const [openCourses, setOpenCourses] = useState<Set<string>>(
    () => new Set([menuData[0]?.name]),
  );

  function toggleCourse(name: string) {
    setOpenCourses((prev) => {
      const next = new Set(prev);
      if (next.has(name)) next.delete(name);
      else next.add(name);
      return next;
    });
  }

  return (
    <aside
      className="bg-card rounded-lg border border-border shadow-xs overflow-hidden flex flex-col"
      data-ocid="menu.sidebar.panel"
    >
      <div className="bg-gold px-4 py-3">
        <h3 className="font-serif text-sm font-bold text-white tracking-wide uppercase">
          Menu Categories
        </h3>
      </div>
      <ScrollArea className="flex-1 h-[calc(100vh-280px)] min-h-[400px]">
        <div className="p-2">
          {menuData.map((course) => {
            const isOpen = openCourses.has(course.name);
            const courseSelectedCount = course.subCategories
              .flatMap((s) => s.items)
              .filter((item) => selectedItems.has(item.id)).length;
            const courseImg = COURSE_IMAGES[course.name];

            return (
              <div key={course.name} className="mb-1">
                <button
                  type="button"
                  onClick={() => toggleCourse(course.name)}
                  className="w-full rounded-md hover:bg-secondary transition-colors text-left group overflow-hidden border border-transparent hover:border-gold/20"
                  data-ocid="menu.course.toggle"
                >
                  {courseImg && (
                    <div className="relative w-full h-16 overflow-hidden">
                      <img
                        src={courseImg}
                        alt={course.name}
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
                      <div className="absolute bottom-0 left-0 right-0 px-3 pb-1.5 flex items-center justify-between">
                        <span className="font-serif text-sm font-bold text-white drop-shadow">
                          {course.name}
                        </span>
                        <div className="flex items-center gap-1.5">
                          {courseSelectedCount > 0 && (
                            <span className="text-xs bg-gold text-white rounded-full w-5 h-5 flex items-center justify-center font-bold">
                              {courseSelectedCount}
                            </span>
                          )}
                          {isOpen ? (
                            <ChevronDown className="h-3.5 w-3.5 text-white/80" />
                          ) : (
                            <ChevronRight className="h-3.5 w-3.5 text-white/80" />
                          )}
                        </div>
                      </div>
                    </div>
                  )}
                  {!courseImg && (
                    <div className="flex items-center justify-between px-3 py-2">
                      <span className="font-serif text-sm font-semibold text-foreground group-hover:text-gold transition-colors">
                        {course.name}
                      </span>
                      <div className="flex items-center gap-2">
                        {courseSelectedCount > 0 && (
                          <span className="text-xs bg-gold text-white rounded-full w-5 h-5 flex items-center justify-center font-bold">
                            {courseSelectedCount}
                          </span>
                        )}
                        {isOpen ? (
                          <ChevronDown className="h-3.5 w-3.5 text-muted-foreground" />
                        ) : (
                          <ChevronRight className="h-3.5 w-3.5 text-muted-foreground" />
                        )}
                      </div>
                    </div>
                  )}
                </button>

                {isOpen && (
                  <div className="ml-2 border-l-2 border-border pl-2 mt-0.5">
                    {course.subCategories.map((sub) => {
                      const isActive =
                        selectedSubCategory?.course === course.name &&
                        selectedSubCategory?.subCategory === sub.name;
                      const subCount = sub.items.filter((i) =>
                        selectedItems.has(i.id),
                      ).length;

                      return (
                        <button
                          type="button"
                          key={sub.name}
                          onClick={() =>
                            onSelect({
                              course: course.name,
                              subCategory: sub.name,
                            })
                          }
                          className={`w-full flex items-center justify-between px-3 py-1.5 rounded-md text-left transition-colors text-xs ${
                            isActive
                              ? "bg-gold/10 text-gold font-semibold border border-gold/30"
                              : "hover:bg-secondary text-muted-foreground hover:text-foreground"
                          }`}
                          data-ocid="menu.subcategory.link"
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
