import { Spinner } from "@material-tailwind/react";

export default function CustomSpinner() {
  return (
    <div className="flex items-center justify-center h-screen">
      <Spinner color='white' className="h-16 w-16 text-gray-900" />
    </div>
  );
}
