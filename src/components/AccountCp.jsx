import Icon from "../common/Icons";
import MaterialComponent from "../common/Material";

export default function Account() {
  return (
    <div className="container px-10 mt-20">
      <MaterialComponent component="Typography" variant="h1" color="white">Account</MaterialComponent>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mt-10">

        <div className="gap-10 ">
          <div className="grid grid-cols-1 gap-10">
            <MaterialComponent component="Typography" variant="h3" textGradient color="green">Bookmarks</MaterialComponent>

            <MaterialComponent component="Card" color="gray" className="h-36">
              <MaterialComponent component="CardBody"></MaterialComponent>
            </MaterialComponent>
            <MaterialComponent component="Card" color="gray" className="h-36">
              <MaterialComponent component="CardBody"></MaterialComponent>
            </MaterialComponent>
          </div>
        </div>

        <div>
          <div className="grid grid-cols-1 gap-10 ">
            <div className="flex flex-row justify-between">
              <MaterialComponent component="Typography" variant="h3" textGradient color="green">Uploads</MaterialComponent>
              <div className="flex flex-row gap-8">
                <MaterialComponent component="Typography" variant="small" className="flex flex-row items-center">
                  <MaterialComponent component="Checkbox" color="green" className="h-4 w-4 rounded-full" />
                  Select All
                </MaterialComponent>
                <MaterialComponent component="Tooltip" content="Upload">
                  <MaterialComponent component="IconButton" color="gray" variant="gradient" className="rounded-full">
                    <Icon icon="FolderPlusIcon" className="h-5 w-5" strokeWidth={1} />
                  </MaterialComponent>
                </MaterialComponent>
                <MaterialComponent component="Tooltip" content="Remove">
                  <MaterialComponent component="IconButton" color="red" variant="gradient" className="rounded-full">
                    <Icon icon="FolderMinusIcon" className="h-5 w-5" strokeWidth={1} />
                  </MaterialComponent>
                </MaterialComponent>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-10">
              <MaterialComponent component="Card" color="transparent" className="h-36 border-2 border-dashed border-gray-800 grid-cols-1 place-content-center justify-content-center">
                <div className="flex flex-col items-center space-y-5">
                  <Icon icon="InboxArrowDownIcon" color="gray" className="h-9 w-9 mt-12" />
                  <div className="flex flex-row place-items-center">
                    <div>
                      <MaterialComponent component="Typography" variant="small" className="text-left">
                        Drag the file or
                        <MaterialComponent component="Button" className="rounded-full !bg-none !border-none !shadow-none px-2">Browse Files</MaterialComponent>
                      </MaterialComponent>
                    </div>
                  </div>
                </div>
              </MaterialComponent>

              <MaterialComponent component="Card" color="gray" className="h-36">
                <MaterialComponent component="CardBody">
                  <MaterialComponent component="Checkbox" color="green" className="rounded-full"/>
                </MaterialComponent>
              </MaterialComponent>
              <MaterialComponent component="Card" color="gray" className="h-36">
                <MaterialComponent component="CardBody">
                  <MaterialComponent component="Checkbox" color="green" className="rounded-full"/>
                </MaterialComponent>
              </MaterialComponent>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}