import {
  ChevronDownIcon,
  UserCircleIcon,
  Bars3Icon,
  XMarkIcon,
  Square3Stack3DIcon,
  QuestionMarkCircleIcon,
  ChatBubbleOvalLeftIcon,
  RocketLaunchIcon,
  CpuChipIcon,
  ViewfinderCircleIcon,
  GiftIcon,
  ComputerDesktopIcon,
  LanguageIcon,
  PaintBrushIcon,
  BookmarkIcon,
  BookmarkSlashIcon,
  EyeIcon,
  InformationCircleIcon,
  MagnifyingGlassIcon,
  TagIcon,
  CheckCircleIcon,
  SparklesIcon,
} from "@heroicons/react/24/outline";

const content = [
  {
    title: "What are the AI Tools?",
    description_0: "AI tools refer to a wide range of applications and programs that leverage artificial intelligence techniques to perform specific tasks.",
    description_1: "These tools utilize machine learning, natural language processing, and various other AI technologies to automate processes, make predictions, and generate insights. From chatbots and virtual assistants to advanced data analysis platforms.",
    description_2: "AI tools have revolutionized numerous industries, making complex tasks more efficient and accessible.",
  },
  {
    title: "What are the Usage Purposes?",
    description_0: "The usage of AI tools spans across various sectors, including but not limited to healthcare, finance, marketing, and customer service.",
    description_1: "In healthcare, AI tools assist in diagnosing diseases, analyzing medical images, and even developing personalized treatment plans. Financial institutions utilize AI for fraud detection, risk assessment, and algorithmic trading. Marketing professionals employ AI for customer segmentation, targeted advertising, and sentiment analysis.",
    description_2: "Additionally, customer service departments integrate AI-powered chatbots and virtual assistants to enhance user experiences and streamline support processes.",
  },
];
const content_head = [
  {
    title: "1. yeAI",
    description_0: "yeAI is your go-to destination for discovering popular AI tools, carefully categorized and meticulously organized for your convenience.",
    description_1: "Our platform offers a comprehensive repository of the most sought-after AI solutions, ranging from beginner-friendly applications to cutting-edge enterprise-level software. Whether you are a seasoned AI enthusiast or an entrepreneur looking to integrate AI capabilities into your business, yeAI provides a curated collection of tools, accompanied by detailed descriptions, user reviews, and comprehensive guides.",
    description_2: "With our user-friendly interface and insightful recommendations, navigating the dynamic world of AI has never been more effortless. Explore yeAI and unlock the transformative power of artificial intelligence today.",
    description_3: "Free",
  },
];

const category_items = [
  {
    color: "orange",
    icon: CpuChipIcon,
    title: "Machine Learning",
    description: "Tools for model building and deployment.",
    link: "/categories/machine-learning",
  },
  {
    color: "green",
    icon: ComputerDesktopIcon,
    title: "Computer Vision",
    description: "Interpretation of the visual world.",
    link: "/categories/computer-vision",
  },
  {
    color: "blue",
    icon: LanguageIcon,
    title: "NLP",
    description: "Natural Language Processing tools.",
    link: "/categories/nlp",
  },
  {
    color: "blue-gray",
    icon: PaintBrushIcon,
    title: "AI-Art Tools",
    description: "Tailored user experiences.",
    link: "/categories/ai-art-tools",

  },
  {
    color: "purple",
    icon: RocketLaunchIcon,
    title: "AI-Enabled Analytics",
    description: "Advanced data-driven insights.",
    link: "/categories/ai-enabled-analytics",
  },
  {
    color: "cyan",
    icon: ChatBubbleOvalLeftIcon,
    title: "AI-Powered Chatbots",
    description: "Virtual conversational assistants.",
    link: "/categories/ai-powered-chatbots",

  },
  {
    color: "pink",
    icon: GiftIcon,
    title: "Open Source",
    description: "List of all open-source tools, it's all free.",
    link: "/categories/open-source",

  },
  {
    color: "teal",
    icon: ViewfinderCircleIcon,
    title: "All Categories",
    description: "See everything listed.",
    link: "/categories",
  },
];
const colors = {
  blue: "bg-blue-50 text-blue-500",
  orange: "bg-orange-50 text-orange-500",
  green: "bg-green-50 text-green-500",
  "blue-gray": "bg-blue-gray-50 text-blue-gray-500",
  purple: "bg-purple-50 text-purple-500",
  teal: "bg-teal-50 text-teal-500",
  cyan: "bg-cyan-50 text-cyan-500",
  pink: "bg-pink-50 text-pink-500",
};
const icons = {
  ChevronDownIcon,
  UserCircleIcon,
  Bars3Icon,
  XMarkIcon,
  Square3Stack3DIcon,
  QuestionMarkCircleIcon,
  SparklesIcon,
  // up navbar
  BookmarkIcon,
  BookmarkSlashIcon,
  EyeIcon,
  InformationCircleIcon,
  MagnifyingGlassIcon,
  TagIcon,
  CheckCircleIcon,

}

export { content, content_head, category_items, colors, icons }
