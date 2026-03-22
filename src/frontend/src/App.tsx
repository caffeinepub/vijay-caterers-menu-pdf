import { Toaster } from "@/components/ui/sonner";
import { useState } from "react";
import { MenuItemsList } from "./components/MenuItemsList";
import { MenuSidebar } from "./components/MenuSidebar";
import { SelectedPanel } from "./components/SelectedPanel";
import { type MenuItem, menuData } from "./data/menuData";

// SVG corner ornaments matching the Canva template
const cornerSvgTL = `<svg xmlns="http://www.w3.org/2000/svg" width="72" height="72" viewBox="0 0 72 72">
  <polyline points="72,6 6,6 6,72" stroke="#C9A24A" stroke-width="2" fill="none"/>
  <polyline points="72,11 11,11 11,72" stroke="#C9A24A" stroke-width="1" fill="none"/>
  <path d="M72,17 L19,17 Q17,17 17,19 L17,72" stroke="#C9A24A" stroke-width="1" fill="none" stroke-linecap="round"/>
  <text x="2" y="5" font-size="9" fill="#C9A24A" font-family="serif">✦</text>
</svg>`;

const cornerSvgTR = `<svg xmlns="http://www.w3.org/2000/svg" width="72" height="72" viewBox="0 0 72 72">
  <polyline points="0,6 66,6 66,72" stroke="#C9A24A" stroke-width="2" fill="none"/>
  <polyline points="0,11 61,11 61,72" stroke="#C9A24A" stroke-width="1" fill="none"/>
  <path d="M0,17 L53,17 Q55,17 55,19 L55,72" stroke="#C9A24A" stroke-width="1" fill="none" stroke-linecap="round"/>
  <text x="59" y="5" font-size="9" fill="#C9A24A" font-family="serif">✦</text>
</svg>`;

const cornerSvgBL = `<svg xmlns="http://www.w3.org/2000/svg" width="72" height="72" viewBox="0 0 72 72">
  <polyline points="72,66 6,66 6,0" stroke="#C9A24A" stroke-width="2" fill="none"/>
  <polyline points="72,61 11,61 11,0" stroke="#C9A24A" stroke-width="1" fill="none"/>
  <path d="M72,55 L19,55 Q17,55 17,53 L17,0" stroke="#C9A24A" stroke-width="1" fill="none" stroke-linecap="round"/>
  <text x="2" y="72" font-size="9" fill="#C9A24A" font-family="serif">✦</text>
</svg>`;

const cornerSvgBR = `<svg xmlns="http://www.w3.org/2000/svg" width="72" height="72" viewBox="0 0 72 72">
  <polyline points="0,66 66,66 66,0" stroke="#C9A24A" stroke-width="2" fill="none"/>
  <polyline points="0,61 61,61 61,0" stroke="#C9A24A" stroke-width="1" fill="none"/>
  <path d="M0,55 L53,55 Q55,55 55,53 L55,0" stroke="#C9A24A" stroke-width="1" fill="none" stroke-linecap="round"/>
  <text x="59" y="72" font-size="9" fill="#C9A24A" font-family="serif">✦</text>
</svg>`;

const _centerTopOrnament = `<svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 40 40">
  <line x1="20" y1="2" x2="20" y2="38" stroke="#C9A24A" stroke-width="1"/>
  <line x1="2" y1="20" x2="38" y2="20" stroke="#C9A24A" stroke-width="1"/>
  <line x1="7" y1="7" x2="33" y2="33" stroke="#C9A24A" stroke-width="0.8"/>
  <line x1="33" y1="7" x2="7" y2="33" stroke="#C9A24A" stroke-width="0.8"/>
  <circle cx="20" cy="20" r="3" fill="#C9A24A"/>
  <circle cx="20" cy="4" r="1.5" fill="#C9A24A"/>
  <circle cx="20" cy="36" r="1.5" fill="#C9A24A"/>
  <circle cx="4" cy="20" r="1.5" fill="#C9A24A"/>
  <circle cx="36" cy="20" r="1.5" fill="#C9A24A"/>
</svg>`;

const footerOrnament = `<svg xmlns="http://www.w3.org/2000/svg" width="120" height="16" viewBox="0 0 120 16">
  <line x1="0" y1="8" x2="45" y2="8" stroke="#C9A24A" stroke-width="0.8"/>
  <polygon points="55,8 58,4 61,8 58,12" fill="#C9A24A"/>
  <polygon points="59,8 62,4 65,8 62,12" fill="#C9A24A"/>
  <line x1="75" y1="8" x2="120" y2="8" stroke="#C9A24A" stroke-width="0.8"/>
</svg>`;

function toDataUri(svg: string): string {
  return `data:image/svg+xml;base64,${btoa(unescape(encodeURIComponent(svg)))}`;
}

function buildPrintHtml(
  selectedItems: MenuItem[],
  eventName: string,
  eventDate: string,
): string {
  const grouped: Record<string, Record<string, string[]>> = {};
  for (const item of selectedItems) {
    if (!grouped[item.course]) grouped[item.course] = {};
    if (!grouped[item.course][item.subCategory])
      grouped[item.course][item.subCategory] = [];
    grouped[item.course][item.subCategory].push(item.name);
  }

  const formattedDate = eventDate
    ? new Date(`${eventDate}T00:00:00`).toLocaleDateString("en-IN", {
        day: "2-digit",
        month: "long",
        year: "numeric",
      })
    : "";

  const coursesHtml = Object.entries(grouped)
    .map(
      ([course, subCats]) => `
    <div class="course-section">
      <div class="course-title">${course}</div>
      ${Object.entries(subCats)
        .map(
          ([subCat, items]) => `
          <div class="subcategory-block">
            <div class="subcategory-title">${subCat}</div>
            <div class="items-list">
              ${items.map((name) => `<div class="menu-item"><span class="item-bullet">✦</span>${name}</div>`).join("")}
            </div>
          </div>
        `,
        )
        .join("")}
    </div>
  `,
    )
    .join("");

  const eventInfoHtml =
    eventName || formattedDate
      ? `<div class="event-info">&mdash;&nbsp;${eventName}${eventName && formattedDate ? "&nbsp;&nbsp;|&nbsp;&nbsp;" : ""}${formattedDate}&nbsp;&mdash;</div>`
      : "";

  const cornerTLUri = toDataUri(cornerSvgTL);
  const cornerTRUri = toDataUri(cornerSvgTR);
  const cornerBLUri = toDataUri(cornerSvgBL);
  const cornerBRUri = toDataUri(cornerSvgBR);
  const footOrnUri = toDataUri(footerOrnament);

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <title>Vijay Caterers Menu</title>
  <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,700;0,900;1,400&display=swap" rel="stylesheet" />
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; }
    @page { size: A4; margin: 0; }
    html, body {
      width: 210mm;
      background: #F6F0E6;
      font-family: 'Playfair Display', Georgia, serif;
      color: #111111;
      -webkit-print-color-adjust: exact;
      print-color-adjust: exact;
    }
    /* Fixed triple border frames — repeat on every printed page */
    .border-outer {
      position: fixed; top: 5mm; left: 5mm; right: 5mm; bottom: 5mm;
      border: 3px solid #C6A24A; pointer-events: none; z-index: 999;
    }
    .border-middle {
      position: fixed; top: 8mm; left: 8mm; right: 8mm; bottom: 8mm;
      border: 1.5px solid #C6A24A; pointer-events: none; z-index: 999;
    }
    .border-inner {
      position: fixed; top: 10mm; left: 10mm; right: 10mm; bottom: 10mm;
      border: 0.5px solid #C6A24A; pointer-events: none; z-index: 999;
    }
    /* Fixed corners — repeat on every page */
    .corner-img { position: fixed; width: 72px; height: 72px; z-index: 1000; }
    .corner-tl { top: 3mm; left: 3mm; }
    .corner-tr { top: 3mm; right: 3mm; }
    .corner-bl { bottom: 3mm; left: 3mm; }
    .corner-br { bottom: 3mm; right: 3mm; }

    /* --- TABLE-BASED REPEATING HEADER/FOOTER --- */
    table.page-table {
      width: 100%;
      border-collapse: collapse;
      table-layout: fixed;
    }
    /* thead repeats on every page natively in all browsers */
    table.page-table thead tr td,
    table.page-table tfoot tr td {
      padding: 0;
    }
    .header-block {
      background: #F6F0E6;
      padding: 14mm 16mm 4mm 16mm;
    }
    .print-header {
      display: flex;
      align-items: center;
      justify-content: center;
      position: relative;
      padding-bottom: 4mm;
      border-bottom: 1.5px solid #C9A24A;
    }
    .print-logo-wrap {
      position: absolute; left: 0;
      display: flex; flex-direction: column; align-items: center; gap: 3px;
    }
    .print-logo {
      width: 46px; height: 46px; border-radius: 50%;
      border: 1.5px solid #C9A24A; object-fit: cover;
    }
    .print-logo-name {
      font-size: 7px; font-weight: 700; color: #7A2A2A;
      letter-spacing: 1.5px; text-transform: uppercase;
      text-align: center; line-height: 1.2;
    }
    .print-title { text-align: center; flex: 1; }
    .print-title h1 {
      font-size: 32px; font-weight: 900; color: #111111;
      letter-spacing: 5px; text-transform: uppercase; line-height: 1;
    }
    .print-title .subtitle {
      font-size: 8px; color: #C9A24A; letter-spacing: 5px;
      text-transform: uppercase; margin-top: 3px;
    }
    .event-info {
      text-align: center; margin-top: 3mm;
      font-size: 12px; color: #6B4F1A; font-style: italic; letter-spacing: 0.5px;
    }
    /* Content area */
    .content-block {
      padding: 6mm 16mm 0mm 16mm;
      background: #F6F0E6;
    }
    .footer-block {
      background: #F6F0E6;
      padding: 3mm 16mm 14mm 16mm;
      border-top: 1.5px solid #C9A24A;
      text-align: center;
    }
    .footer-contact {
      font-size: 11px; font-weight: 600; color: #7A5A1F; letter-spacing: 0.8px; margin-bottom: 2px;
    }
    .footer-instagram {
      font-size: 10px; color: #7A5A1F; letter-spacing: 0.5px; margin-bottom: 2px;
    }
    .footer-orn { display: block; margin: 3px auto 0; width: 120px; height: 16px; }
    /* Watermark */
    .watermark {
      position: fixed; bottom: 30mm; right: 14mm;
      width: 100px; height: 100px; opacity: 0.06; pointer-events: none;
    }
    /* Menu content */
    .course-section { margin-bottom: 5mm; border-bottom: 1px solid #e8d9b0; padding-bottom: 4mm; }
    .course-title {
      font-size: 14px; font-weight: 700; color: #8B5E14;
      text-transform: uppercase; letter-spacing: 3px;
      border-bottom: 1px solid #C9A24A; padding-bottom: 1mm; margin-bottom: 2.5mm;
    }
    .subcategory-block { margin-bottom: 3mm; }
    .subcategory-title {
      font-size: 11px; font-weight: 700; color: #9E7020;
      text-transform: uppercase; letter-spacing: 1.5px; margin-bottom: 2mm;
    }
    .items-list {
      display: grid; grid-template-columns: repeat(3, 1fr); gap: 3px 8px;
    }
    .menu-item {
      font-size: 13px; color: #2C1810; font-style: italic; line-height: 1.5; padding: 1px 0;
    }
    .item-bullet { color: #C9A24A; font-size: 8px; font-style: normal; margin-right: 3px; vertical-align: middle; }
    @media print {
      .course-section { page-break-inside: avoid; }
    }
  </style>
</head>
<body>
  <!-- Triple borders: repeat on every page via position:fixed -->
  <div class="border-outer"></div>
  <div class="border-middle"></div>
  <div class="border-inner"></div>
  <!-- Corner ornaments: repeat on every page -->
  <img class="corner-img corner-tl" src="${cornerTLUri}" alt="" />
  <img class="corner-img corner-tr" src="${cornerTRUri}" alt="" />
  <img class="corner-img corner-bl" src="${cornerBLUri}" alt="" />
  <img class="corner-img corner-br" src="${cornerBRUri}" alt="" />
  <!-- Mandala watermark -->
  <svg class="watermark" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" fill="#8B6914">
    <circle cx="50" cy="50" r="45" fill="none" stroke="#8B6914" stroke-width="1"/>
    <circle cx="50" cy="50" r="35" fill="none" stroke="#8B6914" stroke-width="0.8"/>
    <circle cx="50" cy="50" r="25" fill="none" stroke="#8B6914" stroke-width="0.6"/>
    <line x1="50" y1="5" x2="50" y2="95" stroke="#8B6914" stroke-width="0.5"/>
    <line x1="5" y1="50" x2="95" y2="50" stroke="#8B6914" stroke-width="0.5"/>
    <line x1="18" y1="18" x2="82" y2="82" stroke="#8B6914" stroke-width="0.5"/>
    <line x1="82" y1="18" x2="18" y2="82" stroke="#8B6914" stroke-width="0.5"/>
  </svg>

  <!-- TABLE: thead repeats header, tfoot repeats footer, on every printed page -->
  <table class="page-table">
    <thead>
      <tr>
        <td>
          <div class="header-block">
            <div class="print-header">
              <div class="print-logo-wrap">
                <img
                  src="https://res.cloudinary.com/dnllne8qr/image/upload/v1753611051/WhatsApp_Image_2025-07-26_at_5.02.48_PM_zil48t.png"
                  alt="VC" class="print-logo" crossorigin="anonymous"
                />
                <div class="print-logo-name">VIJAY<br/>CATERERS</div>
              </div>
              <div class="print-title">
                <h1>VIJAY CATERERS</h1>
                <div class="subtitle">Premium Catering Services</div>
              </div>
            </div>
            ${eventInfoHtml}
          </div>
        </td>
      </tr>
    </thead>
    <tfoot>
      <tr>
        <td>
          <div class="footer-block">
            <div class="footer-contact">Contact No: 9866937747, 9959500833</div>
            <div class="footer-instagram">Instagram: vijaycaterers_</div>
            <img class="footer-orn" src="${footOrnUri}" alt="" />
          </div>
        </td>
      </tr>
    </tfoot>
    <tbody>
      <tr>
        <td>
          <div class="content-block">
            ${coursesHtml}
          </div>
        </td>
      </tr>
    </tbody>
  </table>

  <script>
    window.addEventListener('load', function() {
      setTimeout(function() { window.print(); }, 600);
      window.onafterprint = function() { window.close(); };
    });
  <\/script>
</body>
</html>`;
}

export default function App() {
  const [selectedCourse, setSelectedCourse] = useState<string | null>(
    () => menuData[0]?.name ?? null,
  );
  const [selectedSubCategory, setSelectedSubCategory] = useState<string | null>(
    null,
  );
  const [selectedItems, setSelectedItems] = useState<Set<string>>(new Set());
  const [customItems, setCustomItems] = useState<MenuItem[]>([]);
  const [eventName, setEventName] = useState("");
  const [eventDate, setEventDate] = useState("");

  const allMenuItems: MenuItem[] = menuData.flatMap((c) =>
    c.subCategories.flatMap((s) => s.items),
  );

  const allItems = [...allMenuItems, ...customItems];

  function handleSelectCourse(courseName: string) {
    setSelectedCourse(courseName);
    setSelectedSubCategory(null);
  }

  function handleSelectSubCategory(subName: string) {
    setSelectedSubCategory((prev) => (prev === subName ? null : subName));
  }

  function toggleItem(id: string) {
    setSelectedItems((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }

  function toggleAll(ids: string[], select: boolean) {
    setSelectedItems((prev) => {
      const next = new Set(prev);
      for (const id of ids) {
        if (select) next.add(id);
        else next.delete(id);
      }
      return next;
    });
  }

  function clearAll() {
    setSelectedItems(new Set());
  }

  function addCustomItem(name: string) {
    const id = `custom-${Date.now()}-${Math.random().toString(36).slice(2)}`;
    const item: MenuItem = {
      id,
      name,
      subCategory: "Custom Items",
      course: "Special Additions",
    };
    setCustomItems((prev) => [...prev, item]);
    setSelectedItems((prev) => new Set([...prev, id]));
  }

  const selectedItemObjects = allItems.filter((item) =>
    selectedItems.has(item.id),
  );

  function handlePrint() {
    const html = buildPrintHtml(selectedItemObjects, eventName, eventDate);
    const printWindow = window.open("", "_blank");
    if (printWindow) {
      printWindow.document.write(html);
      printWindow.document.close();
    }
  }

  return (
    <div className="min-h-screen flex flex-col bg-background">
      {/* Header */}
      <header className="bg-navy text-white sticky top-0 z-50 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img
              src="https://res.cloudinary.com/dnllne8qr/image/upload/v1753611051/WhatsApp_Image_2025-07-26_at_5.02.48_PM_zil48t.png"
              alt="Vijay Caterers Logo"
              className="h-11 w-11 rounded-full object-cover border-2 border-gold"
            />
            <div>
              <h1 className="font-serif text-xl font-bold text-gold leading-tight">
                Vijay Caterers
              </h1>
              <p className="text-xs text-gold-light opacity-80">
                Premium Catering Services
              </p>
            </div>
          </div>
          <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
            <a
              href="https://vijay-caterers.onrender.com"
              target="_blank"
              rel="noreferrer"
              className="text-gold-light hover:text-gold transition-colors"
            >
              Home
            </a>
            <span className="text-gold font-semibold">Menu Generator</span>
            <a
              href="https://vijay-caterers.onrender.com"
              target="_blank"
              rel="noreferrer"
              className="text-gold-light hover:text-gold transition-colors"
            >
              Contact
            </a>
          </nav>
        </div>
      </header>

      {/* Hero */}
      <div className="bg-gradient-to-b from-[oklch(0.16_0.03_250)] to-[oklch(0.22_0.03_250)] py-10 text-center">
        <div className="text-gold text-3xl mb-2">✦</div>
        <h2 className="font-serif text-3xl md:text-4xl font-bold text-gold mb-2">
          Design Your Custom Branded Menu PDF
        </h2>
        <p className="text-gold-light opacity-70 text-sm">
          Search items · Add to menu · Download as PDF
        </p>
      </div>

      {/* Main 3-column layout */}
      <main className="flex-1 max-w-7xl mx-auto w-full px-4 py-6 grid grid-cols-1 md:grid-cols-[260px_1fr_300px] gap-4">
        <MenuSidebar
          menuData={menuData}
          selectedCourse={selectedCourse}
          selectedSubCategory={selectedSubCategory}
          selectedItems={selectedItems}
          onSelectCourse={handleSelectCourse}
          onSelectSubCategory={handleSelectSubCategory}
        />

        <MenuItemsList
          allItems={allItems}
          selectedItems={selectedItems}
          onToggleItem={toggleItem}
          onToggleAll={toggleAll}
          onAddCustomItem={addCustomItem}
          courseName={selectedCourse ?? ""}
          subCategoryName={selectedSubCategory}
        />

        <SelectedPanel
          selectedItems={selectedItemObjects}
          eventName={eventName}
          eventDate={eventDate}
          onEventNameChange={setEventName}
          onEventDateChange={setEventDate}
          onClearAll={clearAll}
          onRemoveItem={(id) => toggleItem(id)}
          onGeneratePdf={handlePrint}
        />
      </main>

      {/* Footer */}
      <footer className="bg-navy text-center py-6 mt-8">
        <p className="text-gold text-sm font-serif">
          Contact: 9866937747, 9959500833 &nbsp;|&nbsp; Instagram:
          @vijaycaterers_
        </p>
        <p className="text-gold-light opacity-50 text-xs mt-2">
          © {new Date().getFullYear()}. Built with ❤ using{" "}
          <a
            href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(typeof window !== "undefined" ? window.location.hostname : "")}`}
            className="underline hover:text-gold"
            target="_blank"
            rel="noreferrer"
          >
            caffeine.ai
          </a>
        </p>
      </footer>

      <Toaster />
    </div>
  );
}
