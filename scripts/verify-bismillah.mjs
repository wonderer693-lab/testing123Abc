import { readFileSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const layoutPath = join(__dirname, "..", "app", "layout.tsx");
const content = readFileSync(layoutPath, "utf-8");

// Check for Surah Al-Fatihah (verses 1-7), Surah Al-Isra (verses 109-111), and additional verses
const hasAlFatihah = content.includes("بِسۡمِ ٱللَّهِ ٱلرَّحۡمَٰنِ ٱلرَّحِيمِ");
const hasAlIsra = content.includes("قُلِ ادۡعُواْ ٱللَّهَ");
const hasAdditional = content.includes("مَّا شَآءَ ٱللَّهُ لَا قُوَّةَ إِلَّا بِٱللَّهِ");

if (!hasAlFatihah || !hasAlIsra || !hasAdditional) {
  console.error("\n\x1b[31mERROR: Sacred text removed from app/layout.tsx!\x1b[0m");
  if (!hasAlFatihah) console.error("\x1b[31m  - Missing: Surah Al-Fatihah (verses 1-7)\x1b[0m");
  if (!hasAlIsra) console.error("\x1b[31m  - Missing: Surah Al-Isra (verses 109-111)\x1b[0m");
  if (!hasAdditional) console.error("\x1b[31m  - Missing: Additional sacred verses\x1b[0m");
  console.error("\x1b[31mThese must ALWAYS remain at the top of app/layout.tsx.\x1b[0m");
  console.error("\x1b[31mBuild aborted.\x1b[0m\n");
  process.exit(1);
}

console.log("\x1b[32m✓ Sacred text verified in app/layout.tsx\x1b[0m");
