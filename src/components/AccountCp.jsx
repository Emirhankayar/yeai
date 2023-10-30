import { Typography, Card, CardBody, IconButton, Tooltip, Checkbox, Button } from "@material-tailwind/react";
import { icons } from "../common/content";

export default function Account() {

  return (
    <div className="container px-10 mt-20">
      <Typography variant="h1" color="white">Account</Typography>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mt-10">

        <div className="gap-10 ">

          <div className="grid grid-cols-1 gap-10">
            <Typography variant="h3" textGradient color="green">Bookmarks</Typography>


            <Card color="gray" className="h-36">
              <CardBody></CardBody>
            </Card>
            <Card color="gray" className="h-36">
              <CardBody></CardBody>
            </Card>
          </div>

        </div>

        <div>

          <div className="grid grid-cols-1 gap-10 ">

            <div className="flex flex-row justify-between">
              <Typography variant="h3" textGradient color="green">Uploads</Typography>
              <div className="flex flex-row gap-8">

                <Typography variant="small" className="flex flex-row items-center">
                  <Checkbox color="green" className="h-4 w-4 rounded-full" />
                  Select All
                </Typography>
                <Tooltip content="Upload">
                  <IconButton color="gray" variant="gradient" className="rounded-full"><icons.FolderPlusIcon className="h-5 w-5" strokeWidth={1} /></IconButton>
                </Tooltip>
                <Tooltip content="Remove">
                  <IconButton color="red" variant="gradient" className="rounded-full"><icons.FolderMinusIcon className="h-5 w-5" strokeWidth={1} /></IconButton>
                </Tooltip>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-10">

              <Card color="transparent" className="h-36 border-2 border-dashed border-gray-800 grid-cols-1 place-content-center justify-content-center">
                <div className="flex flex-col items-center space-y-5">

                  <icons.InboxArrowDownIcon color="gray" className="h-9 w-9 mt-12" />
                  <div className="flex flex-row place-items-center">
                    <div>

                      <Typography variant="small" className="text-left">Drag the file or<Button className="rounded-full !bg-none !border-none !shadow-none px-2">Browse Files</Button></Typography>
                    </div>
                  </div>
                </div>
              </Card>


              <Card color="gray" className="h-36">
                <CardBody>
                  <Checkbox color="green" className="rounded-full"/>
                </CardBody>
              </Card>
              <Card color="gray" className="h-36">
                <CardBody>
                  <Checkbox color="green" className="rounded-full"/>
                </CardBody>
              </Card>
            </div>



          </div>



        </div>
      </div>
    </div>
  );
}
