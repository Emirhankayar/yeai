import MaterialComponent from "./Material";
import Newsletter from "./Newsletter";

const LOGO = () => (
  <div>
    <MaterialComponent
      component="Typography"
      variant="h5"
      className="cursor-pointer inline-block font-oxanium font-extrabold"
    >
      yeai
      <span className="bg-gradient-to-r from-emerald-600 via-emerald-700 to-emerald-900 inline-block text-transparent bg-clip-text hover:animate-shift">
        .tech
      </span>
    </MaterialComponent>
  </div>
);

const SITEMAP = [
  {
    title: "Company",
    links: [
      { text: <LOGO key="logo" />, url: "/" },
    ],
  },
  {
    title: "Tools",
    links: [
      { text: "AI assistant", url: "/tools?category=ai-assistant" },
      { text: "Content Creation", url: "/tools?category=content-creation" },
      { text: "Education", url: "/tools?category=education" },
      { text: "Entertainment", url: "/tools?category=entertainment" },
      { text: "Fashion", url: "/tools?category=fashion" },
      { text: "Finance and Business", url: "/tools?category=finance-and-business" },
      { text: "Health", url: "/tools?category=health" },
      { text: "Human Resources", url: "/tools?category=human-resources" },
      { text: "Misc", url: "/tools?category=misc" },
      { text: "Music", url: "/tools?category=music" },
      { text: "Productivity", url: "/tools?category=productivity" },
    ],
  },
  {
    title: "News",
    links: [
      { text: "AI Careers", url: "/news?category=ai-careers" },
      { text: "AI Society", url: "/news?category=ai-society" },
      { text: "Business", url: "/news?category=business" },
      { text: "Culture", url: "/news?category=culture" },
      { text: "Hardware", url: "/news?category=hardware" },
      { text: "Research", url: "/news?category=research" },
      { text: "Science", url: "/news?category=science" },
    ],
  },
  {
    title: "Promote",
    links: [
      { text: "Promote Tool", url: "/promote" },
    ],
  },
];

const currentYear = new Date().getFullYear();

export default function FooterWithSitemap() {
  return (
    <>
    <div className="mt-40">

    <Newsletter />
    </div>
    <footer className="relative w-full border-t-2 border-gray-900">
      <div className="mx-auto w-full max-w-7xl px-8">
        <div className="mx-auto grid w-full grid-cols-1 gap-8 py-12 md:grid-cols-2 lg:grid-cols-4">
          {SITEMAP.map(({ title, links }, key) => (
            <div key={key} className="w-full">
              <MaterialComponent
                component="Typography"
                variant="small"
                color="white"
                className="mb-4 font-bold uppercase opacity-50"
              >
                {title}
              </MaterialComponent>
              <ul className="space-y-1">
                {links.map((link, key) => (
                  <MaterialComponent
                    component="Typography"
                    key={key}
                    as="li"
                    color="white"
                    className="font-normal"
                  >
                    <a
                      href={link.url}
                      className="inline-block py-1 pr-2 transition-transform hover:scale-105"
                    >
                      {link.text}
                    </a>
                  </MaterialComponent>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="flex w-full flex-col items-center justify-center border-t border-gray-900 py-4 md:flex-row md:justify-between">
          <MaterialComponent
            component="Typography"
            variant="small"
            className="mb-4 text-center font-normal text-white md:mb-0"
          >
            &copy; {currentYear} <a href="https://yeai.tech/">yeai.tech</a>. All
            Rights Reserved.
          </MaterialComponent>
          <div className="flex gap-4 text-white sm:justify-center"></div>
        </div>
      </div>
    </footer>
    </>
  );
}
