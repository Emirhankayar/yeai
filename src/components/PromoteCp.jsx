import { useReducer } from "react";
import MaterialComponent from "../common/Material";
import axios from "axios";
import { useAuth } from "../services/AuthContext";
import { SV_URL } from "../utils/utils";
import PgTitle from "../common/Title";
import { SmallSpinner } from "../common/Spinner";
import { useCategories } from "../hooks/useCategories";
import Breadcrumb from "../common/BreadCrumbs";
import MyDropzone from "../common/Dropzone";
import { Alert } from "@material-tailwind/react";
import { Helmet } from "react-helmet";


const initialState = {
  toolImage: "",
  toolTitle: "",
  toolLink: "",
  selectedCategory: "",
  selectedPrice: "",
  toolDescription: "",
  descriptionLength: 0,
  loading: false,
  errorMessage: "",
};

function reducer(state, action) {
  switch (action.type) {
    case "SET_FORM_VALUES":
      return { ...state, ...action.payload };
    case "SET_LOADING":
      return { ...state, loading: action.payload };

    case "SET_ERROR_MESSAGE":
      return { ...state, errorMessage: action.payload };
    default:
      throw new Error();
  }
}

function PromoteCp() {
  const { user } = useAuth();
  const { categories, isLoading } = useCategories('categories');
  const [state, dispatch] = useReducer(reducer, initialState);
  const options = [
    { label: "Free" },
    { label: "Freemium" },
    { label: "Free Trial" },
    { label: "Paid" },
  ];

  const handleInputChange = (event, name) => {
    if (name === "toolDescription") {
      // This is the Textarea component
      if (event.target.value.length <= 500) {
        dispatch({
          type: "SET_FORM_VALUES",
          payload: { 
            toolDescription: event.target.value, 
            descriptionLength: event.target.value.length 
          },
        });
      }
    } else {
      if (event.target) {
        // This is an Input component
        dispatch({
          type: "SET_FORM_VALUES",
          payload: { [event.target.name]: event.target.value },
        });
      } else {
        // This is a Select component
        dispatch({ type: "SET_FORM_VALUES", payload: { [name]: event } });
      }
    }
  };

  const handleSubmit = () => {
    // Check if all fields are filled
    if (
      !state.toolImage ||
      !state.toolTitle ||
      !state.toolLink ||
      !state.selectedCategory ||
      !state.selectedPrice ||
      !state.toolDescription
    ) {
      // If any field is not filled, set an error message in the state
      dispatch({
        type: "SET_ERROR_MESSAGE",
        payload: "All fields are required, please fill in all fields.",
      });
      setTimeout(() => {
        dispatch({ type: "SET_ERROR_MESSAGE", payload: "" });
      }, 4000);
      
      
      return; // Stop the function execution
    }
    if (state.toolDescription.length < 150 || state.toolDescription.length > 500) {
      // If it's not, set an error message in the state
      dispatch({
        type: "SET_ERROR_MESSAGE",
        payload: "Description must be between 150 and 500 characters.",
      });
      setTimeout(() => {
        dispatch({ type: "SET_ERROR_MESSAGE", payload: "" });
      }, 4000);
      return; // Stop the function execution
    }
  
  
    // If all fields are filled, proceed with the form submission
    dispatch({ type: "SET_LOADING", payload: true });
    axios
      .post(`${SV_URL}/send-email`, {
        user_id: user.id,
        email: user.email,
        post_title: state.toolTitle,
        post_link: state.toolLink,
        post_category: state.selectedCategory,
        post_price: state.selectedPrice,
        post_description: state.toolDescription,
        post_image: state.toolImage,
      })
      .then((response) => {
        console.log(response.data);
        dispatch({ type: "SET_LOADING", payload: false }); // Set loading to false once the request is complete
      })
      .catch((error) => {
        console.error(error);
        dispatch({ type: "SET_LOADING", payload: false }); // Also set loading to false if there's an error
      });
  };

  if (isLoading) {
    return <div></div>;
  }

  return (
    <div className="container grid place-items-center mx-auto max-w-lg px-10">
            <Helmet>
        <title>{`Promote`}</title>
        <meta
          name="description"
          content={`Promote page for user`}
        />
        <meta name="robots" content="index, follow" />
        <meta name="googlebot" content="index, follow" />
        <meta name="bingbot" content="index, follow" />
        <meta name="duckduckbot" content="index, follow" />
        <meta name="baiduspider" content="index, follow" />
        <meta name="yandex" content="index, follow" />
        <meta
          name="keywords"
          content={`AI posts, AI highlight, AI promote ,Free ,Promote,Promote tool ,News, AI news, AI, Artificial Intelligence, What's new, Latest news, news, Technology, Artificial Intelligence News, Artificial Intelligence tools, yeai, yeai tech, Promote, user`}
        />
        <link
          rel="canonical"
          href={`https://yeai.tech${location.pathname}`}
        />

        <meta
          property="og:title"
          content={`Promote your post`}
        />
        <meta
          property="og:description"
          content={`Promote your post`}
        />
        <meta property="og:type" content="website" />
        <meta
          property="og:url"
          content={`https://yeai.tech${location.pathname}`}
        />
        <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-6235278469584977"
     crossOrigin="anonymous"></script>
      </Helmet>
            {state.errorMessage && (
        <Alert severity="error" color="red" className="fixed bottom-0 w-full rounded-none z-50">
          <MaterialComponent component="Typography">

          {state.errorMessage}
          </MaterialComponent>
          </Alert>
      )}
      <div className="grid place-items-start w-full mb-10">
        <PgTitle text={"Promote Your AI Tool"} />
        <div className="mt-10 mb-4">
          <Breadcrumb />
        </div>
      </div>
      <div className="space-y-10 w-full">
        <MyDropzone
          onImageUpload={(image) =>
            dispatch({ type: "SET_FORM_VALUES", payload: { toolImage: image } })
          }
        />

        <MaterialComponent
          htmlFor="toolTitle"
          label="Name of Tool"
          component="Input"
          type="toolTitle"
          id="toolTitle"
          color="white"
          name="toolTitle"
          value={state.toolTitle}
          containerProps={{ className: "min-w-[50px]" }}
          onChange={handleInputChange}
        />
        <MaterialComponent
          htmlFor="toolLink"
          label="Link to AI Tool"
          component="Input"
          type="text"
          id="toolLink"
          name="toolLink"
          value={state.toolLink}
          color="white"
          containerProps={{ className: "min-w-[50px]" }}
          onChange={handleInputChange}
        />
        <MaterialComponent
          component="Select"
          label="Select Category"
          labelProps={{ className: "!text-white" }}
          menuProps={{ className: "!bg-gray-300 text-gray-900" }}
          size="md"
          containerProps={{ className: "min-w-[50px]" }}
          className="text-white"
          onChange={(value) => handleInputChange(value, "selectedCategory")}
        >
          {categories.map((category, index) => (
            <MaterialComponent
              key={index}
              component="Option"
              className="gap-2 bg-transparent hover:!bg-emerald-600 duration-300 ease-in-out active:!bg-emerald-700"
              value={category.original}
            >
              <div className="flex gap-2 items-center">
                {category.modifiedName}
              </div>
            </MaterialComponent>
          ))}
        </MaterialComponent>

        <MaterialComponent
          htmlFor="toolPrice"
          label="Pricing of Your Tool"
          component="Select"
          type="text"
          id="toolPrice"
          name="toolPrice"
          labelProps={{ className: "text-white" }}
          menuProps={{ className: "bg-gray-200" }}
          className="text-white"
          size="md"
          containerProps={{ className: "min-w-[50px]" }}
          onChange={(value) => handleInputChange(value, "selectedPrice")}
        >
          {options.map((option, index) => (
            <MaterialComponent
              key={index}
              component="Option"
              className="gap-2 bg-transparent hover:!bg-emerald-600 duration-300 ease-in-out active:!bg-emerald-700"
              value={option.label}
            >
              <div className="flex gap-2 items-center">{option.label}</div>
            </MaterialComponent>
          ))}
        </MaterialComponent>
<div className="relative">

        <MaterialComponent
  htmlFor="toolDescription"
  placeholder="What can the AI tool do?"
  rows="6"
  component="Textarea"
  id="toolDescription"
  variant="static"
  name="toolDescription"
  value={state.toolDescription}
  containerProps={{ className: "min-w-[50px] text-white" }}
  labelProps={{ className: "text-white" }}
  className="text-white"
  onChange={(event) => handleInputChange(event, "toolDescription")} // Pass both event and name
/>
<div className="absolute bottom-0 right-0 mb-4">{state.descriptionLength}/500</div>
  </div>

        <MaterialComponent
          htmlFor="submit"
          component="Button"
          id="submit"
          name="submit"
          onClick={handleSubmit}
          fullWidth
          disabled={state.loading}
          className="h-10"
        >
          {state.loading ? <SmallSpinner /> : "Submit"}
        </MaterialComponent>
      </div>
    </div>
  );
}

export default PromoteCp;
