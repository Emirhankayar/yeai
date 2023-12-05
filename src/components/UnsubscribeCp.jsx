import { useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import MaterialComponent from "../common/Material";
import { SV_URL } from "../utils/utils";
import { SmallSpinner } from "../common/Spinner";
import Icon from "../common/Icons";
import { Alert } from "@material-tailwind/react";

const UnsubscribePage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const code = new URLSearchParams(location.search).get("code");
  const [selectedOption, setSelectedOption] = useState(null);
  const [buttonState, setButtonState] = useState("initial");
  const [errorMessage, setErrorMessage] = useState(null);

  useEffect(() => {
    const checkCodeExists = async () => {
      try {
        const response = await axios.post(`${SV_URL}/checkCode`, { code });
        if (!response.data.data) {
          navigate("/"); // Redirect to home page if code doesn't exist
        }
      } catch (error) {
        console.error("Error checking code", error);
      }
    };

    checkCodeExists();
  }, [code, navigate]);

  const handleUnsubscribe = async () => {
    if (selectedOption === null) {
      setErrorMessage("Please select an option.");
      setTimeout(() => {
        setErrorMessage(null);
      }, 4000);
      return;
    }
    setErrorMessage(null);
    setButtonState("loading");

    try {
      const unsubscribeResponse = await axios.post(`${SV_URL}/unsubscribe`, {
        code,
      });
      console.log("Unsubscribed successfully", unsubscribeResponse.data);
    } catch (error) {
      console.error("Error unsubscribing", error);
    }

    try {
      const surveyResponse = await axios.post(`${SV_URL}/survey`, {
        answer: selectedOption,
      });
      console.log("Survey submitted successfully", surveyResponse.data);
      setButtonState("success");
      setTimeout(() => {
        navigate("/");
      }, 4000);
    } catch (error) {
      console.error("Error submitting survey", error);
    }
  };

  const checkboxLabels = [
    "I receive too many emails from Yeai.",
    "I am having difficulty receiving or viewing emails from Yeai.",
    "I do not think the content is relevant.",
    "I do not remember subscribing to receive emails from Yeai.",
    "I am no longer interested in Yeai.",
    "None of the above.",
  ];

  return (
    <div className="container flex items-center mx-auto justify-center max-w-lg px-10 mt-40">
      <div className="grid grid-cols-1 place-content-center w-full h-screen container space-y-10">
        <MaterialComponent
          component="Typography"
          variant="h3"
          onClick={handleUnsubscribe}
          className="text-emerald-900"
        >
          You Will Be Missed!
        </MaterialComponent>
        <MaterialComponent
          component="Typography"
          variant="lead"
          onClick={handleUnsubscribe}
          className="pl-2"
        >
          Please take a moment to tell us why you no longer wish to hear from
          us, fill in and submit this form in order to unsubscribe.
        </MaterialComponent>
        <div className="space-y-5">
        {checkboxLabels.map((label, index) => (
          <MaterialComponent
            key={index}
            component="Checkbox"
            color="red"
            label={label}
            checked={selectedOption === label}
            onChange={() => setSelectedOption(label)}
            labelProps={{ className: "text-gray-400" }}
          />
        ))}
        </div>
        <MaterialComponent
          component="Button"
          className="h-10 flex items-center justify-center"
          onClick={handleUnsubscribe}
          disabled={buttonState === "loading" || buttonState === "success"}
        >
          {buttonState === "initial" && "Unsubscribe"}
          {buttonState === "loading" && <SmallSpinner />}
          {buttonState === "success" && (
            <Icon icon="CheckIcon" className="h-5 w-5" />
          )}
        </MaterialComponent>
        <div>
          {(buttonState !== "initial" || errorMessage) && (
            <Alert
              severity={buttonState === "success" ? "success" : "error"}
              color="gray"
              className={`relative w-full rounded-sm ${
                buttonState === "success" ? "text-emerald-900" : "text-red-500"
              }`}
            >
              <MaterialComponent component="Typography">
                {buttonState === "success" &&
                  "Successfully unsubscribed from the newsletter"}
                {errorMessage && errorMessage}
              </MaterialComponent>
            </Alert>
          )}
        </div>
      </div>
    </div>
  );
};

export default UnsubscribePage;
