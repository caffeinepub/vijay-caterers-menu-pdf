import type { MenuItem } from "../data/menuData";

interface Props {
  selectedItems: MenuItem[];
  eventName: string;
  eventDate: string;
}

// Category image map — used only in PDF, not in dashboard
const CATEGORY_IMAGES: Record<string, string> = {
  "Welcome Drinks":
    "https://bhandaryskitchen.com/wp-content/uploads/2025/04/Indian-Welcome-Drinks-Ideas.jpg",
  "Veg Snacks": "https://i.postimg.cc/6684TLfV/Veg-Snacks.jpg",
  "Non Veg Snacks": "https://i.postimg.cc/s1y3crQ4/Non-Veg-Snacks.webp",
  Soups: "https://i.postimg.cc/Yjkt3HGN/Soups.jpg",
  "Live Counters": "https://i.postimg.cc/fJtqS3zY/Chat.jpg",
  Salads: "https://i.postimg.cc/XrK89dTL/Salads.jpg",
  Sweets: "https://i.postimg.cc/tsd5FWLN/Sweets.jpg",
  "Assorted Desserts": "https://i.postimg.cc/dhRBGrz9/Assorted-Desserts.webp",
  "Indian Breads": "https://i.postimg.cc/k2NcWKkN/Indian-Breads.jpg",
  "Kurma Curries": "https://i.postimg.cc/G4bYwN54/Kurma-Curries.webp",
  "Veg Main Course": "https://i.postimg.cc/bZqbcMBs/Veg-main-course.jpg",
  Additionals: "https://i.postimg.cc/K1mLSVH4/Additionals.jpg",
  "Live Counters 2": "https://i.postimg.cc/ppCr8dsW/Fruits.jpg",
  "Non-Veg Main Course": "https://i.postimg.cc/dLwDLCjJ/Non-Veg.jpg",
};

export function PrintTemplate({ selectedItems, eventName, eventDate }: Props) {
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

  return (
    <div
      id="print-template"
      style={{
        display: "none",
        width: "210mm",
        backgroundColor: "#F5F0E8",
        fontFamily: "'Playfair Display', Georgia, serif",
        color: "#2C1810",
        padding: "0",
        margin: "0",
        boxSizing: "border-box",
      }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;0,700;0,800;1,400&display=swap');
        @media print {
          @page { size: A4; margin: 0; }
          body > * { display: none !important; }
          #print-template {
            display: block !important;
            width: 210mm !important;
          }
          .print-page {
            page-break-after: auto;
            min-height: 297mm;
          }
          .course-section {
            page-break-inside: avoid;
          }
        }
        .print-page {
          width: 210mm;
          min-height: 297mm;
          background: #F5F0E8;
          position: relative;
          padding: 16mm 14mm;
          box-sizing: border-box;
        }
        .print-page::before {
          content: '';
          position: absolute;
          top: 6mm; left: 6mm; right: 6mm; bottom: 6mm;
          border: 2.5px solid #C6A24A;
          pointer-events: none;
        }
        .print-page::after {
          content: '';
          position: absolute;
          top: 8.5mm; left: 8.5mm; right: 8.5mm; bottom: 8.5mm;
          border: 1px solid #C6A24A;
          pointer-events: none;
        }
        .corner { position: absolute; color: #C6A24A; font-size: 22px; line-height: 1; }
        .corner-tl { top: 4.5mm; left: 4.5mm; }
        .corner-tr { top: 4.5mm; right: 4.5mm; }
        .corner-bl { bottom: 4.5mm; left: 4.5mm; }
        .corner-br { bottom: 4.5mm; right: 4.5mm; }
        .mid-t  { top: 4.5mm; left: 50%; transform: translateX(-50%); }
        .mid-b  { bottom: 4.5mm; left: 50%; transform: translateX(-50%); }
        .mid-l  { top: 50%; left: 4.5mm; transform: translateY(-50%); }
        .mid-r  { top: 50%; right: 4.5mm; transform: translateY(-50%); }
        .print-header {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 16px;
          padding-bottom: 6mm;
          border-bottom: 1.5px solid #C6A24A;
          margin-bottom: 4mm;
        }
        .print-logo {
          width: 56px; height: 56px;
          border-radius: 50%;
          border: 2px solid #C6A24A;
          object-fit: cover;
        }
        .print-title { text-align: center; }
        .print-title h1 {
          font-family: 'Playfair Display', Georgia, serif;
          font-size: 32px; font-weight: 800;
          color: #8B6914;
          letter-spacing: 3px;
          text-transform: uppercase;
          margin: 0; line-height: 1.1;
        }
        .print-title p {
          font-size: 10px; color: #A07820;
          letter-spacing: 4px; text-transform: uppercase;
          margin: 3px 0 0;
        }
        .star-top { text-align: center; color: #C6A24A; font-size: 20px; margin-bottom: 2mm; }
        .event-info { text-align: center; margin: 3mm 0 5mm; font-size: 13px; color: #6B4F1A; font-style: italic; }
        .course-section {
          margin-bottom: 5mm;
          border-bottom: 1px solid #e8d9b0;
          padding-bottom: 4mm;
          page-break-inside: avoid;
        }
        .course-section-inner {
          display: flex;
          gap: 6mm;
          align-items: flex-start;
        }
        .course-items-col {
          flex: 1;
          min-width: 0;
        }
        .course-image-col {
          flex-shrink: 0;
          width: 52mm;
          display: flex;
          align-items: flex-start;
          justify-content: center;
        }
        .course-image-col img {
          width: 52mm;
          height: 48mm;
          object-fit: cover;
          border-radius: 3mm;
          border: 1.5px solid #C6A24A;
        }
        .course-title {
          font-family: 'Playfair Display', Georgia, serif;
          font-size: 20px; font-weight: 700; color: #8B6914;
          text-transform: uppercase; letter-spacing: 2px;
          border-bottom: 1px solid #C6A24A;
          padding-bottom: 1.5mm; margin-bottom: 3mm;
        }
        .subcategory-block { margin-bottom: 3mm; }
        .subcategory-title {
          font-size: 16px; font-weight: 700; color: #A07820;
          text-transform: uppercase; letter-spacing: 1.5px; margin-bottom: 1.5mm;
        }
        .items-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 2px 8px;
        }
        .menu-item { font-size: 14px; color: #2C1810; font-style: italic; }
        .menu-item::before { content: '✦ '; color: #C6A24A; font-size: 10px; font-style: normal; }
        .print-footer {
          margin-top: 6mm; padding-top: 4mm;
          border-top: 1.5px solid #C6A24A; text-align: center;
        }
        .print-footer p { font-size: 11px; color: #8B6914; letter-spacing: 1px; margin: 1mm 0; }
      `}</style>

      <div className="print-page">
        <span className="corner corner-tl">✦</span>
        <span className="corner corner-tr">✦</span>
        <span className="corner corner-bl">✦</span>
        <span className="corner corner-br">✦</span>
        <span className="corner mid-t">❋</span>
        <span className="corner mid-b">❋</span>
        <span className="corner mid-l">❋</span>
        <span className="corner mid-r">❋</span>

        <div className="star-top">✦ ✦ ✦</div>

        <div className="print-header">
          <img
            src="https://res.cloudinary.com/dnllne8qr/image/upload/v1753611051/WhatsApp_Image_2025-07-26_at_5.02.48_PM_zil48t.png"
            alt="Vijay Caterers"
            className="print-logo"
            crossOrigin="anonymous"
          />
          <div className="print-title">
            <h1>VIJAY CATERERS</h1>
            <p>Premium Catering Services</p>
          </div>
        </div>

        {(eventName || eventDate) && (
          <div className="event-info">
            {eventName && <span>{eventName}</span>}
            {eventName && formattedDate && <span> &nbsp;·&nbsp; </span>}
            {formattedDate && <span>{formattedDate}</span>}
          </div>
        )}

        <div style={{ marginTop: "2mm" }}>
          {Object.entries(grouped).map(([course, subCats]) => {
            const categoryImage = CATEGORY_IMAGES[course];
            return (
              <div className="course-section" key={course}>
                <div className="course-title">{course}</div>
                <div className="course-section-inner">
                  <div className="course-items-col">
                    {Object.entries(subCats).map(([subCat, items]) => (
                      <div className="subcategory-block" key={subCat}>
                        <div className="subcategory-title">{subCat}</div>
                        <div className="items-grid">
                          {items.map((name) => (
                            <span className="menu-item" key={name}>
                              {name}
                            </span>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                  {categoryImage && (
                    <div className="course-image-col">
                      <img
                        src={categoryImage}
                        alt={course}
                        crossOrigin="anonymous"
                      />
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        <div className="print-footer">
          <p>✦ Contact No: 9866937747, 9959500833 ✦</p>
          <p>Instagram: vijaycaterers_</p>
        </div>
      </div>
    </div>
  );
}
