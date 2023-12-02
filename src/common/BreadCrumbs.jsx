import { Breadcrumbs } from "@material-tailwind/react";
import Icon from "./Icons";
import { useLocation } from "react-router-dom";
import { formatCategoryName } from "../utils/categoryUtils";
export default function Breadcrumb() {
  const location = useLocation();
  const pathnames = location.pathname.split("/").filter((x) => x);

  // Parse the query string
  const params = new URLSearchParams(location.search);
  const category = params.get('category');

  // If a category is provided, add it to the pathnames array
  if (category) {
    pathnames.push(category);
  }

  return (


    <Breadcrumbs separator={<Icon icon="ChevronRightIcon" className="h-4 w-4 text-gray-500" strokeWidth={1.5}/>} fullWidth className="origin-left bg-gray-900 rounded-md shadow-xl border border-gray-800 scale-75 sm:transform-none md:transform-none lg:transform-none">
      <a href="/" className="opacity-60 text-emerald-900 hover:font-bold hover:opacity-100 duration-300">
        Home
      </a>
      {pathnames.map((value, index) => {
        const isLast = index === pathnames.length - 1;
        const to = `/${pathnames.slice(0, index + 1).join("/")}`;

        return isLast ? (
          <a key={to} className="opacity-100 text-emerald-900 font-bold">
            {formatCategoryName(value)}
          </a>
        ) : (
          <a key={to} href={to} className="opacity-60 text-emerald-900 hover:opacity-100 hover:font-bold duration-300">
            {formatCategoryName(value)}
          </a>
        );
      })}
    </Breadcrumbs>

  );
}