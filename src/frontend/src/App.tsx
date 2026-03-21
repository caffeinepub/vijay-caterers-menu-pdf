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

const centerTopOrnament = `<svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 40 40">
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

// Course image map — keys match course names in menuData
const COURSE_IMAGE_PATHS: Record<string, string> = {
  Snacks: "/assets/generated/category-snacks.dim_120x80.jpg",
  "Main Veg Course": "/assets/generated/category-veg.dim_120x80.jpg",
  "Main Non-Veg Course": "/assets/generated/category-nonveg.dim_120x80.jpg",
  "Counter 1": "/assets/generated/category-counter.dim_120x80.jpg",
};

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

  // Use absolute URLs so images load correctly in the popup window
  const origin = window.location.origin;

  const coursesHtml = Object.entries(grouped)
    .map(([course, subCats]) => {
      const imgPath = COURSE_IMAGE_PATHS[course];
      const imgHtml = imgPath
        ? `<div class="course-img-wrap">
            <img class="course-img" src="${origin}${imgPath}" alt="${course}" crossorigin="anonymous" />
            <div class="course-img-overlay">
              <span class="course-img-label">${course}</span>
            </div>
          </div>`
        : "";

      return `
    <div class="course-section">
      ${imgHtml}
      <div class="course-title">${course}</div>
      ${Object.entries(subCats)
        .map(
          ([subCat, items]) => `
        <div class="subcategory-block">
          <div class="subcategory-title">${subCat}</div>
          <div class="items-grid">
            ${items.map((name) => `<span class="menu-item">${name}</span>`).join("")}
          </div>
        </div>
      `,
        )
        .join("")}
    </div>
  `;
    })
    .join("");

  const eventInfoHtml =
    eventName || formattedDate
      ? `<div class="event-info">&mdash;&nbsp;${eventName}${eventName && formattedDate ? "&nbsp;&nbsp;|&nbsp;&nbsp;" : ""}${formattedDate}&nbsp;&mdash;</div>`
      : "";

  const cornerTLUri = toDataUri(cornerSvgTL);
  const cornerTRUri = toDataUri(cornerSvgTR);
  const cornerBLUri = toDataUri(cornerSvgBL);
  const cornerBRUri = toDataUri(cornerSvgBR);
  const topOrnUri = toDataUri(centerTopOrnament);
  const footOrnUri = toDataUri(footerOrnament);

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Vijay Caterers Menu</title>
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,700;0,900;1,400&family=IM+Fell+English:ital@0;1&display=swap" rel="stylesheet" />
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; }
    @page { size: A4; margin: 0; }
    body {
      width: 210mm;
      min-height: 297mm;
      background: #F6F0E6;
      font-family: 'Playfair Display', Georgia, serif;
      color: #111111;
      -webkit-print-color-adjust: exact;
      print-color-adjust: exact;
    }
    .print-page {
      width: 210mm;
      min-height: 297mm;
      background: #F6F0E6;
      position: relative;
      padding: 20mm 18mm 18mm;
      overflow: hidden;
    }

    /* Art Deco corner ornaments */
    .corner-img {
      position: absolute;
      width: 72px;
      height: 72px;
    }
    .corner-tl { top: 8mm; left: 8mm; }
    .corner-tr { top: 8mm; right: 8mm; }
    .corner-bl { bottom: 8mm; left: 8mm; }
    .corner-br { bottom: 8mm; right: 8mm; }

    /* Faint watermark mandala in bottom-right */
    .watermark {
      position: absolute;
      bottom: 14mm;
      right: 14mm;
      width: 120px;
      height: 120px;
      opacity: 0.07;
      pointer-events: none;
    }

    /* Top center ornament */
    .top-center-orn {
      display: block;
      margin: 0 auto 5mm;
      width: 36px;
      height: 36px;
    }

    /* Header: logo left + title centered */
    .print-header {
      display: flex;
      align-items: center;
      justify-content: center;
      position: relative;
      padding-bottom: 5mm;
      border-bottom: 1px solid #C9A24A;
      margin-bottom: 5mm;
    }
    .print-logo-wrap {
      position: absolute;
      left: 0;
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 3px;
    }
    .print-logo {
      width: 54px;
      height: 54px;
      border-radius: 50%;
      border: 1.5px solid #C9A24A;
      object-fit: cover;
    }
    .print-logo-name {
      font-family: 'Playfair Display', serif;
      font-size: 7.5px;
      font-weight: 700;
      color: #7A2A2A;
      letter-spacing: 1.5px;
      text-transform: uppercase;
      text-align: center;
      line-height: 1.2;
    }
    .print-title {
      text-align: center;
      flex: 1;
    }
    .print-title h1 {
      font-family: 'Playfair Display', Georgia, serif;
      font-size: 38px;
      font-weight: 900;
      color: #111111;
      letter-spacing: 5px;
      text-transform: uppercase;
      line-height: 1;
    }
    .print-title .subtitle {
      font-size: 9px;
      color: #C9A24A;
      letter-spacing: 5px;
      text-transform: uppercase;
      margin-top: 4px;
    }

    /* Event info */
    .event-info {
      text-align: center;
      margin: 2mm 0 5mm;
      font-size: 13px;
      color: #6B4F1A;
      font-style: italic;
      letter-spacing: 0.5px;
    }

    /* Course image banner */
    .course-img-wrap {
      position: relative;
      width: 100%;
      height: 52px;
      overflow: hidden;
      border-radius: 3px;
      margin-bottom: 2mm;
      border: 1px solid #C9A24A;
    }
    .course-img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      display: block;
    }
    .course-img-overlay {
      position: absolute;
      inset: 0;
      background: linear-gradient(to right, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0.15) 60%, rgba(0,0,0,0.05) 100%);
      display: flex;
      align-items: center;
      padding-left: 10px;
    }
    .course-img-label {
      font-family: 'Playfair Display', Georgia, serif;
      font-size: 13px;
      font-weight: 700;
      color: #fff;
      text-transform: uppercase;
      letter-spacing: 2.5px;
      text-shadow: 0 1px 3px rgba(0,0,0,0.6);
    }

    /* Menu content */
    .course-section { margin-bottom: 5mm; }
    .course-title {
      font-family: 'Playfair Display', Georgia, serif;
      font-size: 14px;
      font-weight: 700;
      color: #8B5E14;
      text-transform: uppercase;
      letter-spacing: 3px;
      border-bottom: 1px solid #C9A24A;
      padding-bottom: 1mm;
      margin-bottom: 2.5mm;
      display: none;
    }
    .subcategory-block { margin-bottom: 2.5mm; }
    .subcategory-title {
      font-size: 11px;
      font-weight: 700;
      color: #9E7020;
      text-transform: uppercase;
      letter-spacing: 1.5px;
      margin-bottom: 1.5mm;
    }
    .items-grid {
      display: flex;
      flex-wrap: wrap;
      gap: 2px 18px;
    }
    .menu-item {
      font-size: 12px;
      color: #2C1810;
      font-style: italic;
      white-space: nowrap;
    }
    .menu-item::before {
      content: '✦ ';
      color: #C9A24A;
      font-size: 7px;
      font-style: normal;
    }

    /* Footer */
    .print-footer {
      margin-top: 6mm;
      padding-top: 4mm;
      border-top: 1px solid #C9A24A;
      text-align: center;
    }
    .footer-contact {
      font-family: 'Playfair Display', serif;
      font-size: 11px;
      font-weight: 600;
      color: #7A5A1F;
      letter-spacing: 0.8px;
      margin-bottom: 2px;
    }
    .footer-instagram {
      font-family: 'Playfair Display', serif;
      font-size: 10px;
      font-weight: 400;
      color: #7A5A1F;
      letter-spacing: 0.5px;
      margin-bottom: 4px;
    }
    .footer-orn {
      display: block;
      margin: 3px auto 0;
      width: 120px;
      height: 16px;
    }
  </style>
</head>
<body>
  <div class="print-page">

    <!-- Art Deco corner ornaments -->
    <img class="corner-img corner-tl" src="${cornerTLUri}" alt="" />
    <img class="corner-img corner-tr" src="${cornerTRUri}" alt="" />
    <img class="corner-img corner-bl" src="${cornerBLUri}" alt="" />
    <img class="corner-img corner-br" src="${cornerBRUri}" alt="" />

    <!-- Watermark mandala (faint, bottom-right) -->
    <svg class="watermark" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" fill="#8B6914">
      <circle cx="50" cy="50" r="45" fill="none" stroke="#8B6914" stroke-width="1"/>
      <circle cx="50" cy="50" r="35" fill="none" stroke="#8B6914" stroke-width="0.8"/>
      <circle cx="50" cy="50" r="25" fill="none" stroke="#8B6914" stroke-width="0.6"/>
      <line x1="50" y1="5" x2="50" y2="95" stroke="#8B6914" stroke-width="0.5"/>
      <line x1="5" y1="50" x2="95" y2="50" stroke="#8B6914" stroke-width="0.5"/>
      <line x1="18" y1="18" x2="82" y2="82" stroke="#8B6914" stroke-width="0.5"/>
      <line x1="82" y1="18" x2="18" y2="82" stroke="#8B6914" stroke-width="0.5"/>
      <polygon points="50,5 53,47 50,50 47,47" fill="#8B6914"/>
      <polygon points="50,95 53,53 50,50 47,53" fill="#8B6914"/>
      <polygon points="5,50 47,47 50,50 47,53" fill="#8B6914"/>
      <polygon points="95,50 53,47 50,50 53,53" fill="#8B6914"/>
    </svg>

    <!-- Top center ornament -->
    <img class="top-center-orn" src="${topOrnUri}" alt="" />

    <!-- Header: logo left + large title centered -->
    <div class="print-header">
      <div class="print-logo-wrap">
        <img
          src="https://res.cloudinary.com/dnllne8qr/image/upload/v1753611051/WhatsApp_Image_2025-07-26_at_5.02.48_PM_zil48t.png"
          alt="VC"
          class="print-logo"
          crossorigin="anonymous"
        />
        <div class="print-logo-name">VIJAY<br/>CATERERS</div>
      </div>
      <div class="print-title">
        <h1>VIJAY CATERERS</h1>
        <div class="subtitle">Premium Catering Services</div>
      </div>
    </div>

    ${eventInfoHtml}

    <!-- Menu content -->
    <div>
      ${coursesHtml}
    </div>

    <!-- Footer -->
    <div class="print-footer">
      <div class="footer-contact">Contact No: 9866937747, 9959500833</div>
      <div class="footer-instagram">Instagram: vijaycaterers_</div>
      <img class="footer-orn" src="${footOrnUri}" alt="" />
    </div>
  </div>
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
  const [selectedSubCategory, setSelectedSubCategory] = useState<{
    course: string;
    subCategory: string;
  } | null>(() => ({
    course: menuData[0].name,
    subCategory: menuData[0].subCategories[0].name,
  }));
  const [selectedItems, setSelectedItems] = useState<Set<string>>(new Set());
  const [eventName, setEventName] = useState("");
  const [eventDate, setEventDate] = useState("");

  const allItems: MenuItem[] = menuData.flatMap((c) =>
    c.subCategories.flatMap((s) => s.items),
  );

  const currentItems: MenuItem[] = selectedSubCategory
    ? (menuData
        .find((c) => c.name === selectedSubCategory.course)
        ?.subCategories.find((s) => s.name === selectedSubCategory.subCategory)
        ?.items ?? [])
    : [];

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
              data-ocid="nav.home.link"
            >
              Home
            </a>
            <span
              className="text-gold font-semibold"
              data-ocid="nav.generator.link"
            >
              Menu Generator
            </span>
            <a
              href="https://vijay-caterers.onrender.com"
              target="_blank"
              rel="noreferrer"
              className="text-gold-light hover:text-gold transition-colors"
              data-ocid="nav.contact.link"
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
          Select items from our menu · Preview your layout · Download as PDF
        </p>
      </div>

      {/* Main 3-column layout */}
      <main className="flex-1 max-w-7xl mx-auto w-full px-4 py-6 grid grid-cols-1 md:grid-cols-[260px_1fr_300px] gap-4">
        <MenuSidebar
          menuData={menuData}
          selectedSubCategory={selectedSubCategory}
          selectedItems={selectedItems}
          onSelect={setSelectedSubCategory}
        />

        <MenuItemsList
          items={currentItems}
          selectedItems={selectedItems}
          onToggleItem={toggleItem}
          onToggleAll={toggleAll}
          subCategoryName={selectedSubCategory?.subCategory ?? ""}
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
