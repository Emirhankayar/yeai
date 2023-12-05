// 404Page.jsx
import MaterialComponent from "./Material";
const NotFoundPage = () => {
  return (
    <div className="h-screen w-full flex flex-col items-center justify-center space-y-2">
    <MaterialComponent variant="h3" color="red" component="Typography">404 Not Found.</MaterialComponent>
    <MaterialComponent variant="lead" component="Typography">The page youre looking for does not exist.</MaterialComponent>
    <MaterialComponent variant="lead" component="Typography">Try again or you can navigate to the home page.</MaterialComponent>
    <div>
        <a href="/">
    <MaterialComponent component="Button" className="mt-5">Home</MaterialComponent>
        </a>
    </div>
    
    </div>
  );
};

export default NotFoundPage;