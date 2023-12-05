import MaterialComponent from "../common/Material";

export default function HeroCp() {
  return (
    <div className="container px-10 grid grid-cols-1 place-items-center h-screen">
      <div className="space-y-5 text-center">
        <MaterialComponent
          component="Typography"
          variant="h1"
          color="inherit"
          className="flex flex-row items-center justify-center gap-2 font-oxanium font-extrabold lg:text-5xl animate-slide-in-down"
        >
          yeai
          <span className="bg-gradient-to-r from-emerald-700 via-emerald-800 to-emerald-900 inline-block text-transparent bg-clip-text animate-shiftlarge">
            .tech
          </span>
        </MaterialComponent>

        <MaterialComponent
          component="Typography"
          variant="h1"
          color="gray"
          textGradient
          className="font-oxanium font-bold animate-slide-in-up-late"
        >
          Discover the Best AI Tools
        </MaterialComponent>
        <MaterialComponent
          component="Typography"
          variant="h2"
          color="gray"
          textGradient
          className="font-oxanium font-bold animate-slide-in-up"
        >
          Or&nbsp;
          <a href="/sign-in">
            <span className="bg-gradient-to-r from-emerald-700 via-emerald-800 to-emerald-900 inline-block text-transparent bg-clip-text">
              Promote Yours
            </span>
          </a>
        </MaterialComponent>
      </div>
    </div>
  );
}
