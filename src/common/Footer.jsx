import MaterialComponent from "./Material";

const LOGO = () => (
  <div>
    <MaterialComponent component="Typography"
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
    links: [{ text: <LOGO key="logo" />, 
              url: "/" }, 
            { text: "About", 
              url: "/about" }]
  },
  {
    title: "Resources",
    links: [
      { text: "Newsletter", 
        url: "/newsletter" },
      { text: "Freebies", 
        url: "/tools" },
      { text: "Promote Products", 
        url: "/promote-products" },
    ],
  },
  {
    title: "Help Center",
    links: [
      { text: "Discord",
        url: "/discord" },
      { text: "Reach Us", 
        url: "/contact" },
      { text: "FAQs", 
        url: "/faqs" },
    ],
  },
];

 
const currentYear = new Date().getFullYear();
 
export default function FooterWithSitemap() {
  return (
    <footer className="relative w-full mt-40 border-t-2 border-gray-900">
      <div className="mx-auto w-full max-w-7xl px-8">
        <div className="mx-auto grid w-full grid-cols-1 gap-8 py-12 md:grid-cols-2 lg:grid-cols-4">
          {SITEMAP.map(({ title, links }, key) => (
            <div key={key} className="w-full">
              <MaterialComponent component="Typography"
                variant="small"
                color="white"
                className="mb-4 font-bold uppercase opacity-50"
              >
                {title}
              </MaterialComponent>
              <ul className="space-y-1">
              {links.map((link, key) => (
                <MaterialComponent component="Typography" key={key} as="li" color="white" className="font-normal">
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
          <MaterialComponent component="Typography"
            variant="small"
            className="mb-4 text-center font-normal text-white md:mb-0"
          >
            &copy; {currentYear} <a href="https://yeai.tech/">yeai.tech</a>. All
            Rights Reserved.
          </MaterialComponent>
          <div className="flex gap-4 text-white sm:justify-center">



            
          </div>
        </div>
      </div>
    </footer>
  );
}