/**
 * Buying guides. Written to be evidence-conscious and general — they explain
 * labels and common questions rather than promise outcomes. Have a qualified
 * nutrition professional review before publishing.
 */

export type GuideBlock = { type: "p"; text: string } | { type: "h"; text: string } | { type: "list"; items: string[] };

export type Guide = {
  slug: string;
  title: string;
  excerpt: string;
  image: string;
  alt: string;
  published: string;
  readMinutes: number;
  relatedCategory?: string;
  body: GuideBlock[];
};

export const guides: Guide[] = [
  {
    slug: "whey-protein-understanding-the-label",
    title: "Whey Protein: Understanding the Label",
    excerpt: "Concentrate, isolate, serving size and protein per scoop — what the numbers on a whey tub actually tell you.",
    image: "1579722820308-d74e571900a9",
    alt: "Woman measuring a scoop of protein powder in a bright kitchen",
    published: "2026-09-18",
    readMinutes: 6,
    relatedCategory: "protein",
    body: [
      { type: "p", text: "Whey protein comes from milk. During cheese-making, milk separates into curds and liquid whey; that whey is filtered and dried into the powder you see on the shelf. Two products can both say \"whey\" on the front and still be quite different, so the back of the pack is where to look." },
      { type: "h", text: "Concentrate vs isolate" },
      { type: "p", text: "Whey protein concentrate typically contains a little more fat and lactose. Whey protein isolate is filtered further, so it usually carries more protein per gram of powder and less lactose. Neither is inherently \"better\" — isolate tends to cost more, and some people who are sensitive to lactose find it easier to tolerate." },
      { type: "h", text: "Protein per serving vs per 100 g" },
      { type: "p", text: "Serving sizes vary between brands — 30 g, 33 g, 35 g scoops are all common. To compare two products fairly, look at the per-100 g column, or divide protein per serving by the serving weight. A 24 g protein serving from a 33 g scoop is about 73% protein; 27 g from a 32 g scoop is about 84%." },
      { type: "h", text: "What else to check" },
      { type: "list", items: [
        "The full ingredient list, in descending order by weight",
        "Allergen statements — whey always contains milk, and many products also mention soy lecithin",
        "Sweeteners and added sugar per serving",
        "Number of servings per container, so you can work out cost per serving",
        "Batch number, manufacturing date and best-before date",
      ] },
      { type: "p", text: "Most people can meet their protein needs from food. A protein powder is simply a convenient way to add protein to your day; it works alongside, not instead of, a varied diet. If you have a kidney condition or other medical concerns, speak to your doctor before increasing protein intake." },
    ],
  },
  {
    slug: "creatine-common-questions-answered",
    title: "Creatine: Common Questions Answered",
    excerpt: "Monohydrate, loading phases, timing and water — straightforward answers to the questions we hear most.",
    image: "1517963879433-6ad2b056d712",
    alt: "Lifter's hands and feet set at a loaded barbell on a gym floor",
    published: "2026-08-29",
    readMinutes: 5,
    relatedCategory: "creatine",
    body: [
      { type: "p", text: "Creatine is a compound your body makes and also gets from foods like meat and fish. It's one of the most studied sports supplements, and research has generally focused on short, high-intensity efforts such as lifting and sprinting. Results vary from person to person." },
      { type: "h", text: "Which form should I choose?" },
      { type: "p", text: "Creatine monohydrate is the form used in the large majority of research. Other forms exist, but they're usually more expensive without clear evidence of an advantage. Micronised monohydrate is simply ground finer, so it mixes more easily." },
      { type: "h", text: "Do I need a loading phase?" },
      { type: "p", text: "Some people take a higher amount for the first week to saturate muscle stores faster; others take a steady daily amount from the start. Both approaches reach similar levels over a few weeks. Always follow the directions printed on the label of the product you buy." },
      { type: "h", text: "When should I take it?" },
      { type: "p", text: "Consistency matters more than timing for most people. Many find it easiest to mix into a post-workout shake or take it at the same time every day." },
      { type: "h", text: "Anything to be careful about?" },
      { type: "list", items: [
        "Drink adequate water through the day",
        "Some people notice a small change in scale weight early on, often from water held in muscle",
        "If you have a kidney condition, or take regular medication, speak to a doctor first",
        "Creatine is not recommended for children or during pregnancy",
      ] },
    ],
  },
  {
    slug: "how-to-read-a-supplement-facts-panel",
    title: "How to Read a Supplement Facts Panel",
    excerpt: "Serving size, % daily values, proprietary blends and the small print — a field guide to the back of the pack.",
    image: "1583454110551-21f2fa2afe61",
    alt: "Close-up of a hand selecting a dumbbell from a rack",
    published: "2026-08-04",
    readMinutes: 7,
    body: [
      { type: "p", text: "The nutrition or supplement facts panel is the most honest part of any product. Marketing lives on the front of the pack; the facts live on the back. Here's how to read it in under a minute." },
      { type: "h", text: "Start with the serving size" },
      { type: "p", text: "Every number on the panel is tied to the serving size. Check whether a \"serving\" is one scoop, two scoops, or several capsules — it changes how many servings you really get per container." },
      { type: "h", text: "Look for fully disclosed doses" },
      { type: "p", text: "A fully disclosed label lists the exact amount of each active ingredient. A \"proprietary blend\" shows only the total weight of a mix, so you can't tell how much of each ingredient you're getting. For stimulants like caffeine, always know the exact amount per serving." },
      { type: "h", text: "Check the regulatory details" },
      { type: "list", items: [
        "In India, food supplements should carry an FSSAI licence number",
        "Look for the manufacturer or marketer's name and address",
        "Batch/lot number, manufacturing date and best-before date",
        "Veg/non-veg symbol",
        "Allergen declarations and advisory warnings",
      ] },
      { type: "h", text: "Read the warnings" },
      { type: "p", text: "Warnings tell you who shouldn't use the product, maximum daily intake and interactions to watch for. If something on the panel isn't clear, ask the brand — or ask us, and we'll find out." },
    ],
  },
  {
    slug: "understanding-protein-servings",
    title: "Understanding Protein Servings",
    excerpt: "How protein targets are usually expressed, and how a shake fits into a day of normal meals.",
    image: "1490645935967-10de6ba17061",
    alt: "Plate of eggs, avocado, greens and tomatoes",
    published: "2026-07-15",
    readMinutes: 4,
    relatedCategory: "protein",
    body: [
      { type: "p", text: "Protein recommendations are usually given in grams per kilogram of body weight per day. Needs vary with age, activity level, training goals and health status, so the right amount for you is best discussed with a registered dietitian or doctor." },
      { type: "h", text: "Food first" },
      { type: "p", text: "Dal, paneer, curd, eggs, chicken, fish, soy and legumes all contribute protein. Spreading protein across meals is a practical approach for many people." },
      { type: "h", text: "Where a shake fits" },
      { type: "p", text: "A protein shake is a convenient top-up when a meal falls short or you're short on time. One serving typically provides 20–27 g of protein — compare that with the label of the product you choose." },
      { type: "list", items: [
        "Note the protein per serving on the label",
        "Account for the milk you mix it with (around 3 g protein per 100 ml)",
        "Don't exceed the daily servings on the label",
      ] },
    ],
  },
  {
    slug: "choosing-supplements-based-on-your-needs",
    title: "Choosing Supplements Based on Your Needs",
    excerpt: "A calm, practical way to decide what (if anything) belongs in your routine — and what to skip.",
    image: "1434682881908-b43d0467b798",
    alt: "Athlete's back and shoulders in soft gym lighting",
    published: "2026-06-30",
    readMinutes: 6,
    body: [
      { type: "p", text: "Supplements are optional. Sleep, regular training and a varied diet do the heavy lifting. Supplements can fill specific gaps or make a routine more convenient — the trick is knowing which gap you're filling." },
      { type: "h", text: "Ask three questions" },
      { type: "list", items: [
        "What specific gap am I trying to fill? (e.g. protein at breakfast, vitamin D in winter)",
        "Does the label clearly show what's in it and how much?",
        "Is it appropriate for me — my age, health conditions and medications?",
      ] },
      { type: "h", text: "Talk to a professional" },
      { type: "p", text: "If you're pregnant, breastfeeding, under 18, managing a medical condition or taking medication, speak to a doctor before adding any supplement. A blood test can also show whether you're actually low in nutrients like vitamin D or B12." },
      { type: "h", text: "Be wary of big promises" },
      { type: "p", text: "No supplement guarantees muscle gain, fat loss or a medical outcome. Be cautious of products that claim otherwise, hide doses behind proprietary blends, or lack a licence number and batch details." },
    ],
  },
];

export const getGuide = (slug: string) => guides.find((g) => g.slug === slug);
