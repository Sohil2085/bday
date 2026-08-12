// ============================================================
// 🎂 BIRTHDAY WEBSITE CONTENT
// ============================================================
// Edit this file to customize all text, photos, and captions.
// You do NOT need to modify any component files.
// ============================================================

// ----------------------------------------------------------
// JOURNEY MILESTONES
// Shown in the vertical timeline section.
// ----------------------------------------------------------
export const journeyMilestones = [
  {
    year: "1976",
    title: "The Beginning",
    description: "The beginning of a beautiful journey.",
  },
  {
    year: "Growing Up",
    title: "Dreams & Adventures",
    description:
      "Dreams, friendships, challenges and countless memories that shaped who you are.",
  },
  {
    year: "Family",
    title: "A New Chapter",
    description:
      "The chapter where you became someone's husband, someone's father, and the heart of a family.",
  },
  {
    year: "Today",
    title: "50 Years of Love",
    description: "50 years of experiences, lessons, laughter and love.",
  },
  {
    year: "Now",
    title: "The Best Is Yet to Come",
    description: "And the best chapters are still ahead.",
  },
];

// ----------------------------------------------------------
// PHOTO MEMORIES
// Replace images in /public/photos/ with your own.
// Filenames: memory-01.JPG, memory-02.JPG, etc.
// ----------------------------------------------------------
export const memories = [
  {
    image: "/photos/memory-01.jpeg",
    caption: "Where the story began.",
    rotation: -3,
    style: "full" as const,
  },
  {
    image: "/photos/memory-02.jpeg",
    caption: "A moment worth remembering.",
    rotation: 2,
    style: "polaroid" as const,
  },
  // {
  //   image: "/photos/memory-03.jpeg",
  //   caption: "The smiles that became memories.",
  //   rotation: -1.5,
  //   style: "full" as const,
  // },
  {
    image: "/photos/memory-04.jpeg",
    caption: "Family. Always.",
    rotation: 3,
    style: "overlap" as const,
  },
  {
    image: "/photos/memory-05.jpeg",
    caption: "Little moments, big love.",
    rotation: -2,
    style: "full" as const,
  },
  {
    image: "/photos/memory-06.jpeg",
    caption: "Together is our favourite place.",
    rotation: 1.5,
    style: "polaroid" as const,
  },
  {
    image: "/photos/memory-07.jpeg",
    caption: "Some memories never fade.",
    rotation: -2.5,
    style: "overlap" as const,
  },
  {
    image: "/photos/memory-08.jpeg",
    caption: "Forever grateful.",
    rotation: 2,
    style: "polaroid" as const,
  },
  // {
  //   image: "/photos/memory-09.jpeg",
  //   caption: "Through thick and thin.",
  //   rotation: -2,
  //   style: "full" as const,
  // },
  // {
  //   image: "/photos/memory-10.jpeg",
  //   caption: "A bond like no other.",
  //   rotation: 3,
  //   style: "overlap" as const,
  // },
  // {
  //   image: "/photos/memory-11.jpeg",
  //   caption: "The foundation of our family.",
  //   rotation: -1,
  //   style: "polaroid" as const,
  // },
  // {
  //   image: "/photos/memory-12.jpeg",
  //   caption: "Here's to you, Papa.",
  //   rotation: 2.5,
  //   style: "overlap" as const,
  // },
];

// ----------------------------------------------------------
// GUJARATI MESSAGE
// The emotional Gujarati section.
// ----------------------------------------------------------
export const gujaratiMessage = {
  greeting: "પપ્પા,",
  lines: [
    "તમે અમારા માટે માત્ર પપ્પા નથી...",
    "તમે અમારા પરિવારની તાકાત છો.",
  ],
  closing: "તમારી સાથેની દરેક ક્ષણ અમારે માટે ખાસ છે. ❤️",
};

// ----------------------------------------------------------
// PERSONAL LETTER
// The emotional message section.
// Replace with your own heartfelt words.
// ----------------------------------------------------------
export const personalLetter = {
  title: "પપ્પા, કેટલીક વાતો અમે ક્યારેય પૂરતી કહી શકતા નથી...",
  lines: [
    "તમે ચૂપચાપ કરેલી દરેક કુરબાની માટે આભાર.",
    "તમે શીખવેલા દરેક પાઠ માટે આભાર.",
    "દરેક વખત જ્યારે તમે અમારી પાસે ઊભા રહ્યા, એના માટે આભાર.",
    "અમે કદાચ દરરોજ ન કહીએ,",
    "પણ તમે અમારી જિંદગીની સૌથી મોટી ખુશી છો.",
  ],
  closing: "જન્મદિવસની ખૂબ ખૂબ શુભકામનાઓ, પપ્પા.",
  signature: "ખૂબ બધા પ્રેમ સાથે ❤️",
};

// ----------------------------------------------------------
// AUDIO
// Place your audio file at /public/music/memory.mp3
// ----------------------------------------------------------
export const audioConfig = {
  src: "/music/memory.mp3",
  label: "Play our memory",
};

// ----------------------------------------------------------
// HERO / OPENING TEXT
// The cinematic intro sequence.
// ----------------------------------------------------------
export const openingSequence = {
  line1: "A little surprise...",
  line2: "for someone very special.",
  number: "50",
  revealLines: [
    "Years of memories.",
    "Years of love.",
    "Years of being Dad.",
  ],
  greeting: "Happy 50th Birthday, Papa ❤️",
  scrollPrompt: "Begin the journey",
};

// ----------------------------------------------------------
// FINAL SURPRISE
// The celebratory ending.
// ----------------------------------------------------------
export const finalSurprise = {
  teaser: "One Last Surprise 🎁",
  buttonText: "Open your surprise",
  line1: "HAPPY 50TH",
  line2: "BIRTHDAY, PAPA ❤️",
  followUp: "Here's to the next 50.",
  closing: "We love you.",
};
