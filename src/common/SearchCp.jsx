import { Input, Spinner } from "@material-tailwind/react";
import { icons } from './content';

export function SearchBarCategories() {
  
  return (
    <div className="w-full">
      <Input label="Search category" color="white" icon={<icons.MagnifyingGlassIcon className="h-4 w-4" stroke="white"/>} />
    </div>
  );
}

export function SearchBarPosts() {
  return (
    <div className="w-full">
      <Input label="Search post" color="white" icon={<icons.MagnifyingGlassIcon className="h-4 w-4" stroke="white"/>} />
    </div>
  );
}



export default function SmallSpinner() {
  return (
    <div className="flex items-center justify-center">
      <Spinner color='white' className="h-8 w-8 text-gray-900" />
    </div>
  );
}
