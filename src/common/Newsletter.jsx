import MaterialComponent from "./Material";
import Icon from "./Icons";
import { useReducer, useState } from "react";
import axios from "axios";
import { SV_URL } from "../utils/utils";
import { SmallSpinner } from "../common/Spinner";
import { Alert } from "@material-tailwind/react";

const formReducer = (state, event) => {
  return {
    ...state,
    [event.name]: event.value,
  };
};

const initialFormData = {
  email: "",
};

const LOGO = () => (
  <div>
    <MaterialComponent
      component="Typography"
      variant="h5"
      className="cursor-pointer inline-block font-oxanium text-gray-300 font-extrabold"
    >
      yeai
      <span className="bg-gradient-to-r from-emerald-600 via-emerald-700 to-emerald-900 inline-block text-transparent bg-clip-text hover:animate-shift">
        .tech
      </span>
    </MaterialComponent>
  </div>
);

export default function Newsletter() {
  const [formData, setFormData] = useReducer(formReducer, initialFormData);
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccessful, setIsSuccessful] = useState(false);
  const [error, setError] = useState(false);

  const handleChange = (event) => {
    setFormData({
      name: event.target.name,
      value: event.target.value,
    });
  };

  const handleSubmit = async (event) => {
    setIsLoading(true);
    event.preventDefault();
  
    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setError("Invalid email format");
      setIsLoading(false);
      setTimeout(() => setError(null), 4000); // Clear the error after 4 seconds
      return;
    }
  
    try {
      const response = await axios.post(`${SV_URL}/newsletter`, formData);
      setIsSuccessful(true);
      console.log("Form submitted successfully", response.data);
  
      // Reset the form data to the initial state
      setFormData({ name: "email", value: "" });
  
      // Clear any previous error
      setError(null);
  
      // Clear success message after 4 seconds
      setTimeout(() => setIsSuccessful(false), 4000);
    } catch (error) {
      console.error("Error submitting form", error);
      setIsSuccessful(false);
  
      // Set the error message
      setError(error.response.data.error);
      setTimeout(() => setError(null), 4000); 
    }
  
    setIsLoading(false);
  };

  return (
    <>
      <MaterialComponent
        component="Card"
        color="transparent"
        className="w-full items-center flex border border-gray-800 border-x-0 border-b-0 rounded-none py-20 bg-opacity-40"
      >
        <MaterialComponent
          component="CardBody"
          className="flex flex-col items-center justify-center space-y-5"
        >
          <LOGO />
          <MaterialComponent
            component="Typography"
            variant="h3"
            className="text-emerald-900"
          >
            Sign up to our email Newsletter
          </MaterialComponent>
          <MaterialComponent component="Typography" variant="small" className="text-gray-400">
            By signing up to our email newsletter you can stay up to date with
            the latest news and updates from us.
          </MaterialComponent>
        </MaterialComponent>
        <MaterialComponent
          component="CardFooter"
          className="flex flex-row w-full items-center justify-center"
        >
          <div className="mx-auto container max-w-sm">
            <MaterialComponent
              htmlFor="email"
              type="email"
              name="email"
              value={formData.email || ""}
              onChange={handleChange}
              component="Input"
              label="example@email.com"
              icon={
                isLoading ? (
                  <SmallSpinner /> // Replace this with your actual loading spinner component
                ) : isSuccessful ? (
                  <Icon icon="CheckIcon" className="w-5 h-5 text-emerald-900" /> // Replace this with your actual success icon component
                ) : (
                  <Icon
                    icon="PaperAirplaneIcon"
                    className="text-white hover:text-emerald-900 duration-300 hover:-rotate-90 cursor-pointer"
                    onClick={handleSubmit}
                  />
                )
              }
              labelProps={{ className: "!text-gray-400" }}
              containerProps={{ className: "!text-gray-200 min-w-[50px]" }}
              className="text-gray-200"
            ></MaterialComponent>

            {(isSuccessful || error) && (
              <Alert
                severity={isSuccessful ? "success" : "error"}
                color="gray"
                className={`relative mt-5 w-full rounded-sm ${
                  isSuccessful ? "text-emerald-900" : "text-red-500"
                }`}
              >
                <MaterialComponent component="Typography">
                  {isSuccessful
                    ? "Successfully subscribed to the newsletter"
                    : error}
                </MaterialComponent>
              </Alert>
            )}
          </div>
        </MaterialComponent>
      </MaterialComponent>
    </>
  );
}
