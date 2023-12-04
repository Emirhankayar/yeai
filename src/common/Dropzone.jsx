import { useReducer } from "react";
import { useDropzone } from "react-dropzone";
import MaterialComponent from "./Material";
import { Alert } from "@material-tailwind/react";
import Icon from "./Icons";
import PropTypes from 'prop-types';

const initialState = {
  message: "",
  severity: "info",
  imageSrc: null,
};

function reducer(state, action) {
  switch (action.type) {
    case "SET_MESSAGE":
      return { ...state, message: action.payload };
    case "SET_SEVERITY":
      return { ...state, severity: action.payload };
    case "SET_IMAGE_SRC":
      return { ...state, imageSrc: action.payload };
    default:
      throw new Error();
  }
}

MyDropzone.propTypes = {
  onImageUpload: PropTypes.func.isRequired,
};

export default function MyDropzone({ onImageUpload }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop: (acceptedFiles) => {
      const file = acceptedFiles[0]; // Only process the first file
      if (file.type !== "image/png") {
        dispatch({
          type: "SET_MESSAGE",
          payload: "Only 'png' files are allowed",
        });
        dispatch({ type: "SET_SEVERITY", payload: "error" });
        return;
      }

      const reader = new FileReader();
      reader.onload = () => {
        const image = new Image();
        image.src = reader.result;
        image.onload = function () {
          if (
            this.width > 60 ||
            this.height > 60 ||
            this.width < 20 ||
            this.height < 20
          ) {
            dispatch({
              type: "SET_MESSAGE",
              payload: "Image must be between 20x20 and 60x60 pixels",
            });
            dispatch({ type: "SET_SEVERITY", payload: "error" });
          } else {
            onImageUpload(reader.result);
            dispatch({
              type: "SET_MESSAGE",
              payload: "File uploaded successfully",
            });
            dispatch({ type: "SET_SEVERITY", payload: "success" });
            dispatch({ type: "SET_IMAGE_SRC", payload: reader.result }); // Set the image URL
          }
        };
      };
      reader.readAsDataURL(file);
    },
  });

  return (
    <div>
      <div
        {...getRootProps()}
        className="flex items-center justify-center w-full h-40 border-2 border-dashed border-gray-700 rounded-md"
      >
        <input {...getInputProps()} />
        {isDragActive ? (
          <MaterialComponent component="Typography">
            Drop the files here...
          </MaterialComponent>
        ) : (
          <div className="text-center flex flex-col items-center gap-4">
            {state.imageSrc === null && (
              <MaterialComponent
                component="Typography"
                className="text-gray-600 mt-4 h-14"
              >
                Drop image file or
              </MaterialComponent>
            )}
            {state.imageSrc && (
              <img
                src={state.imageSrc}
                alt="Uploaded"
                className="mt-4 w-14 h-14"
              />
            )}
            <MaterialComponent
              component="Button"
              variant="outlined"
              color={state.imageSrc === null ? "gray" : "green"}
              className="!border-none focus:!outline-none focus:border-none focus:!accent-none capitalize"
            >
              Select file
            </MaterialComponent>
          </div>
        )}
      </div>
      <MaterialComponent
        component="Typography"
        variant="small"
        className="text-gray-500 mt-3 flex flex-row items-center gap-2 text-[12px]"
      >
        <Icon icon="InformationCircleIcon" className="w-4 h-4" />
        Image must be between 20x20 and 60x60 pixels, in png format.
      </MaterialComponent>
      <Alert
        color={state.severity}
        className={`mt-6 ${state.message === "" ? "hidden" : ""}`}
      >
        <MaterialComponent
          component="Typography"
          color={state.severity === "success" ? "green" : "red"}
        >
          {state.message}
        </MaterialComponent>
      </Alert>
    </div>
  );
}
