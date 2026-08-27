import keyboardImage from "@/assets/keyboard.avif";
import drumImage from "@/assets/drum.webp";
import microphoneImage from "@/assets/microphone-against-black-background-peter-dazeley.jpg";
import violinImage from "@/assets/violin.jpg";
import classicalGuitarImage from "@/assets/classical.jpg";
import fluteImage from "@/assets/flute.avif";
import acousticGuitarImage from "@/assets/acoustic.avif";
import dholakImage from "@/assets/dholak.png";
import tablaImage from "@/assets/tabla.png";
import ukuleleImage from "@/assets/ukelel.jpg";

export type Course = {
  slug: string;
  name: string;
  tagline: string;
  description: string;
  highlights: string[];
  emoji: string;
  image?: string;
  fee?: number;
};

export const DEFAULT_FEE = 1500;

export const COURSES: Course[] = [
  { slug: "guitar", name: "Guitar", emoji: "🎸", image: acousticGuitarImage,
    tagline: "Acoustic • Electric • Bass",
    description: "From your first chord to soaring solos — master rhythm, lead and fingerstyle guitar with structured lessons and live jam sessions.",
    highlights: ["Beginner to advanced tracks", "Acoustic & electric", "Music theory + ear training", "Live recital every term"] },
  { slug: "classical-guitar", name: "Classical Guitar", emoji: "🎸", image: classicalGuitarImage,
    tagline: "Technique • Repertoire • Expression",
    description: "Build strong foundations in fingerstyle technique, classical repertoire and expressive playing with guided practice and performance coaching.",
    highlights: ["Classical technique", "Fingerstyle foundations", "Repertoire study", "Performance readiness"],
    fee: 2000 },
  { slug: "drums", name: "Drums", emoji: "🥁", image: drumImage,
    tagline: "Groove • Rudiments • Performance",
    description: "Build rock-solid timing and explosive grooves. Learn rock, jazz, funk and Bollywood styles on a full acoustic & electronic kit.",
    highlights: ["Rudiments & coordination", "Genre-based grooves", "Live drumming sessions", "Performance training"],
    fee: 3500 },
  { slug: "keyboard", name: "Keyboard / Piano", emoji: "🎹", image: keyboardImage,
    tagline: "Classical • Bollywood • Western",
    description: "Develop two-hand independence, chord voicings and improvisation across classical, film and contemporary styles.",
    highlights: ["Sight reading", "Chord theory & scales", "Film & devotional repertoire", "Trinity / ABRSM prep"] },
  { slug: "violin", name: "Violin", emoji: "🎻", image: violinImage,
    tagline: "Indian Classical • Western",
    description: "Refine bowing, intonation and expressive playing in Carnatic, Hindustani and Western traditions.",
    highlights: ["Posture & bow control", "Raga & scale work", "Solo & ensemble", "Exam preparation"],
    fee: 2500 },
  { slug: "flute", name: "Flute", emoji: "🪈", image: fluteImage,
    tagline: "Bansuri • Western Flute",
    description: "Discover breath control, tone and melody on the Indian Bansuri or Western concert flute.",
    highlights: ["Breath techniques", "Raga improvisation", "Notation reading", "Stage performance"],
    fee: 2000 },
  { slug: "ukulele", name: "Ukulele", emoji: "🎶", image: ukuleleImage,
    tagline: "Fun • Fast • Portable",
    description: "Start strumming and singing along in your very first class. Perfect for kids, beginners and quick learners.",
    highlights: ["Easy chord shapes", "Strumming patterns", "Sing & play", "Beginner friendly"] },
  { slug: "singing-indian", name: "Indian Singing", emoji: "🎤", image: microphoneImage,
    tagline: "Hindustani • Bollywood • Devotional",
    description: "Voice culture, sargam, raga gayan and Bollywood/devotional repertoire under classically trained mentors.",
    highlights: ["Voice modulation", "Raga & taal", "Playback singing", "Stage confidence"] },
  { slug: "singing-western", name: "Western Singing", emoji: "🎙️", image: microphoneImage,
    tagline: "Pop • Rock • Musical Theatre",
    description: "Develop range, pitch, harmony and microphone technique for pop, rock, R&B and musical theatre.",
    highlights: ["Vocal warm-ups", "Harmony & pitch", "Mic technique", "Genre repertoire"] },
  { slug: "dholak", name: "Dholak", emoji: "🪘", image: dholakImage,
    tagline: "Folk • Devotional • Bollywood",
    description: "Master classic dholak strokes, theka and folk patterns used in weddings, kirtans and Bollywood numbers.",
    highlights: ["Hand strokes & theka", "Folk & bhajan rhythms", "Accompaniment skills", "Live performance"] },
  { slug: "tabla", name: "Tabla", emoji: "🥁", image: tablaImage,
    tagline: "Hindustani Classical Percussion",
    description: "Authentic tabla training in bols, taals and improvisation rooted in Hindustani classical tradition.",
    highlights: ["Bol & taal vocabulary", "Solo & accompaniment", "Theory & notation", "Performance grading"] },
];

export const FEE = DEFAULT_FEE;
