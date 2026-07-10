// ── Scent Matcher Quiz ──────────────────────────────────────────────
// Shared between help-center/page.tsx and ChatbotWidget.tsx

export interface ScentResult {
  name: string;
  mood: string;
  color: string;
  accent: string;
  description: string;
  best: string;
}

export const SCENT_GUIDE: ScentResult[] = [
  {
    name: "Thara Mist 🌿",
    mood: "Calm",
    color: "#EAF3EC",
    accent: "#0F6E56",
    description:
      "กลิ่นอ่อนโยนที่โอบล้อมความรู้สึกช่วยให้จิตใจสงบ ผ่อนคลายและปล่อยวางจากความวุ่นวายระหว่างวัน",
    best: "ทำงานพักผ่อน · เวลาที่อยากอยู่กับตัวเอง",
  },
  {
    name: "Poised Pear & Freesia ✨",
    mood: "Elegant",
    color: "#FBF5DD",
    accent: "#8B6F2E",
    description:
      "ความหอมละมุนของลูกแพร์และดอกไม้ขาวให้ความรู้สึกสุภาพ นุ่มลึก และมีเสน่ห์อย่างเป็นธรรมชาติ",
    best: "ทำงาน · พบปะผู้คน · โอกาสพิเศษ",
  },
  {
    name: "Aqua No.1 💧",
    mood: "Fresh",
    color: "#E6F1FB",
    accent: "#185FA5",
    description:
      "กลิ่นสะอาด สดชื่น โปร่งเบาปลุกความรู้สึกกระปรี้กระเปร่า ให้วันธรรมดาดูสดใสขึ้นทันที",
    best: "เช้า · ออกกำลังกาย · วันสบายๆ",
  },
];

export interface QuizOption {
  text: string;
  value: "calm" | "elegant" | "fresh";
}

export interface QuizQuestion {
  id: number;
  question: string;
  options: QuizOption[];
}

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 1,
    question: "ความรู้สึกที่คุณต้องการเติมเต็มในขณะนี้คืออะไร?",
    options: [
      { text: "ความสงบ ผ่อนคลายร่างกายและจิตใจจากความเหนื่อยล้า 🌿", value: "calm" },
      { text: "ความกระปรี้กระเปร่า สดชื่น ปลุกพลังให้พร้อมลุยต่อ 💧", value: "fresh" },
      { text: "ความผ่อนคลายที่หรูหรา อบอุ่น มีสมาธิและเสน่ห์ ✨", value: "elegant" },
    ],
  },
  {
    id: 2,
    question: "หากเลือกสถานที่พักผ่อนในฝันตอนนี้ได้ คุณอยากไปที่ไหนมากที่สุด?",
    options: [
      { text: "กระท่อมไม้กลางป่าฝนที่เงียบสงบ ได้ยินเสียงสายลมและใบไม้พลิ้วไหว 🌲", value: "calm" },
      { text: "ริมชายหาดเช้าวันอาทิตย์ที่มีลมทะเลพัดผ่าน สดชื่น โปร่งสบาย 🌊", value: "fresh" },
      { text: "จิบน้ำชาในสวนดอกไม้เมืองหนาวที่เต็มไปด้วยดอกไม้ผลิบาน 🌸", value: "elegant" },
    ],
  },
  {
    id: 3,
    question: "ช่วงเวลาที่คุณวางแผนจะใช้กลิ่นหอมนี้บ่อยที่สุดคือช่วงไหน?",
    options: [
      { text: "ก่อนนอน หรือระหว่างทำสมาธิ/พักผ่อนเงียบๆ ในห้องส่วนตัว 🌙", value: "calm" },
      { text: "เช้าวันทำงาน หรือเวลาที่ต้องการสมาธิและพลังกระตุ้นสมอง ☀️", value: "fresh" },
      { text: "ระหว่างวันทำงาน ออกไปพบปะผู้คน หรือดินเนอร์ตอนเย็น 🕯️", value: "elegant" },
    ],
  },
];

/** Tally answers and return the best-matched scent. */
export function scoredToScent(answers: Array<"calm" | "elegant" | "fresh">): ScentResult {
  const counts = { calm: 0, elegant: 0, fresh: 0 };
  answers.forEach((ans) => { counts[ans]++; });

  if (counts.elegant > counts.calm && counts.elegant >= counts.fresh) {
    return SCENT_GUIDE[1]; // Poised Pear & Freesia
  } else if (counts.fresh > counts.calm && counts.fresh > counts.elegant) {
    return SCENT_GUIDE[2]; // Aqua No.1
  }
  return SCENT_GUIDE[0]; // Thara Mist (default / calm)
}
