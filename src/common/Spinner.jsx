import { Spinner } from "@material-tailwind/react";

export default function CustomSpinner() {
  return (
    <div className="flex items-center justify-center h-screen">
      <Spinner
        component="Spinner"
        color="white"
        className="h-16 w-16 text-gray-900 z-10000"
      />
    </div>
  );
}


export function SmallSpinner() {
  return (
    <div className="flex items-center justify-center">
      <Spinner
      color="black"
        className="h-4 w-4 text-gray-500 z-10000"
      />
    </div>
  );
}
