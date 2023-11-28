import { useState } from "react";
import MaterialComponent from "../common/Material";
import axios from "axios";
import { useAuth } from "../services/AuthContext";
import { SV_URL } from "../utils/utils";
import PgTitle from "../common/Title";
import { SmallSpinner } from "../common/Spinner";
import { useCategories } from "../hooks/useCategories";

function PromoteCp() {
  const { user } = useAuth();
  const { categories, isLoading } = useCategories();
  const [formValues, setFormValues] = useState({
    toolTitle: "",
    toolLink: "",
    selectedCategory: "",
    selectedPrice: "",
    toolDescription: "",
  });
  const [loading, setLoading] = useState(false);
  const options = [
    { label: "Free" },
    { label: "Freemium" },
    { label: "Free Trial" },
    { label: "Paid" },
  ];

  const handleInputChange = (event, name) => {
    if (event.target) { // This is an Input component
      setFormValues({
        ...formValues,
        [event.target.name]: event.target.value,
      });
    } else { // This is a Select component
      setFormValues({
        ...formValues,
        [name]: event,
      });
    }
  };

  const handleSubmit = () => {
    setLoading(true); // Set loading to true at the start
    axios
      .post(`${SV_URL}/send-email`, {
        user_id: user.id,
        email: user.email,
        post_title: formValues.toolTitle,
        post_link: formValues.toolLink,
        post_category: formValues.selectedCategory,
        post_price: formValues.selectedPrice,
        post_description: formValues.toolDescription,
      })
      .then((response) => {
        console.log(response.data);
        setLoading(false); // Set loading to false once the request is complete
      })
      .catch((error) => {
        console.error(error);
        setLoading(false); // Also set loading to false if there's an error
      });
  };

  if (isLoading) {
    return(<div>Loading...</div>)
  }


  return (

      <div className="container grid place-items-center mx-auto max-w-lg px-10">

        <div className="grid place-items-start w-full mb-10">
        
          <PgTitle text={"Promote Your AI Tool"} />
        </div>
        <div className="space-y-10 w-full">
          <MaterialComponent
            htmlFor="toolTitle"
            label="Name of Tool"
            component="Input"
            type="toolTitle"
            id="toolTitle"
            color="white"
            name="toolTitle"
            value={formValues.toolTitle}
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
            value={formValues.toolLink}
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
            onChange={(value) => handleInputChange(value, 'selectedCategory')}
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
            onChange={(value) => handleInputChange(value, 'selectedPrice')}
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
          <MaterialComponent
            htmlFor="toolDescription"
            placeholder="What can the AI tool do?"
            rows="6"
            component="Textarea"
            id="toolDescription"
            variant="static"
            name="toolDescription"
            value={formValues.toolDescription}
            containerProps={{ className: "min-w-[50px] text-white" }}
            labelProps={{ className: "text-white" }}
            className="text-white"
            onChange={handleInputChange}
          />

<MaterialComponent
  htmlFor="submit"
  component="Button"
  id="submit"
  name="submit"
  onClick={handleSubmit} 
  fullWidth
  disabled={loading}
>
  {loading ? <SmallSpinner /> : "Submit"}
</MaterialComponent>
        </div>
      </div>

  );
}

export default PromoteCp;
