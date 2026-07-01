export interface FaqEntry {
  keywords: string[];
  answer: string;
  image?: string;
}

export const FAQ_DATA: FaqEntry[] = [
  {
    keywords: ["ยาหม่องอโรม่า", "ต่างจากยาหม่อง", "ยาหม่องทั่วไป", "อโรม่าคืออะไร"],
    answer:
      "ยาหม่องอโรม่าของ Thara Bliss แตกต่างจากยาหม่องทั่วไปตรงที่เน้นกลิ่นหอมจากน้ำมันหอมระเหยธรรมชาติ เพื่อช่วยผ่อนคลายอารมณ์และจิตใจ ไม่ใช่แค่บรรเทาอาการปวดเมื่อยเท่านั้น เนื้อสัมผัสยังอ่อนโยนกว่า เหมาะกับการใช้ทาตัวหรือดมเพื่อสร้างบรรยากาศผ่อนคลายในชีวิตประจำวันค่ะ 🌿",
  },
  {
    keywords: ["aroma balm คือ", "balm คืออะไร", "บาล์มคืออะไร"],
    answer:
      "Aroma Balm คือบาล์มเนื้อนุ่มผสมน้ำมันหอมระเหย ออกแบบมาให้ทาเพื่อสัมผัสกลิ่นหอมติดตัวไปตลอดวัน ช่วยให้รู้สึกสงบ สดชื่น หรือผ่อนคลายขึ้นอยู่กับกลิ่นที่เลือกค่ะ",
  },
  {
    keywords: ["ราคา", "เท่าไหร่", "กี่บาท", "price"],
    answer:
      "ราคาสินค้าแต่ละกลิ่นแตกต่างกันเล็กน้อยค่ะ สามารถดูราคาที่แน่นอนได้ที่หน้าสินค้าแต่ละชิ้นเลยค่ะ 🌸",
  },
  {
    keywords: ["ส่วนผสม", "ingredient", "มีอะไรบ้าง"],
    answer:
      "ส่วนผสมหลักคือน้ำมันหอมระเหยธรรมชาติผสมเนื้อบาล์มอ่อนโยน รายละเอียดส่วนผสมแบบเต็มดูได้ในหน้าสินค้าแต่ละชิ้นค่ะ",
  },
  {
    keywords: ["วิธีใช้", "วิธีการใช้ผลิตภัณฑ์"],
    answer:
      "หมุนและทาลงผิวเช่น บริเวณข้อมือมือ, คอ, หลังใบหู หรือตามข้อพับเพื่อให้กลิ่นหอมค่อยๆ กระจายตัว",
  },
  {
    keywords: ["ของขวัญ", "ของชำร่วย", "gift"],
    answer:
      "Thara Bliss ยินดีจัดเตรียมสินค้าสำหรับของขวัญหรือของชำร่วยค่ะ ติดต่อทีมงานเพื่อพูดคุยรายละเอียดเพิ่มเติมได้เลย 🎁",
  },
  {
    keywords: ["แพ้ง่าย", "ผิวบอบบาง", "sensitive"],
    answer:
      "ผลิตภัณฑ์เน้นความอ่อนโยน แต่หากมีผิวบอบบางเป็นพิเศษแนะนำให้ทดสอบในปริมาณเล็กน้อยก่อนใช้งานจริงค่ะ",
  },
  {
    keywords: ["ติดต่อ", "สอบถาม", "ไลน์", "line", "contact"],
    answer:
      "หากต้องการสอบถามข้อมูลเพิ่มเติม สามารถติดต่อทีมงานผ่านทางอีเมล tharabliss2025@gmail.com หรือทางเพจ Facebook และ Instagram ของทาง Thara Bliss Official ได้เลยค่ะ",
    image: "/images/contact/qr_code.jpg"
  },
];

const DEFAULT_ANSWER =
  "ขออภัยค่ะ ทีมงานยังไม่มีคำตอบสำหรับคำถามนี้ในระบบ 🙏 กรุณาติดต่อทีม Thara Bliss ผ่านอีเมลหรือ LINE Official เพื่อสอบถามเพิ่มเติมนะคะ";

export function matchFaq(question: string): FaqEntry {
  const normalized = question.toLowerCase().trim();
  for (const entry of FAQ_DATA) {
    if (entry.keywords.some((kw) => normalized.includes(kw.toLowerCase()))) {
      return entry;
    }
  }
  return {keywords: [], answer: DEFAULT_ANSWER};
}

// ── Quick-reply suggestion buttons shown to guide the customer ──
export interface QuickReply {
  label: string;
  triggerText: string; // the text sent as if the user typed it
}

export const QUICK_REPLIES: QuickReply[] = [
  { label: "ยาหม่องอโรม่าคืออะไร", triggerText: "ต่างจากยาหม่อง ยาดม ยังไง" },
  { label: "วิธีใช้", triggerText: "วิธีใช้ยังไง" },
  { label: "ส่วนผสม", triggerText: "มีส่วนผสมอะไรบ้าง" },
];