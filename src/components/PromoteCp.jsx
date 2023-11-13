import { useState, useContext } from "react";
import MaterialComponent from "../common/Material";
import axios from "axios";
import { CategoryContext } from "../services/CategoryContext";
import { UserContext } from "../services/UserContext";
import { SV_URL } from "../utils/utils";
import PgTitle from "../common/Title";

function PromoteCp() {
  const user = useContext(UserContext);
  const categories = useContext(CategoryContext);
  const [toolTitle, setToolTitle] = useState("");
  const [toolLink, setToolLink] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedPrice, setSelectedPrice] = useState("");
  const [toolDescription, setToolDescription] = useState("");
  const options = [
    { label: "Free" },
    { label: "Freemium" },
    { label: "Free Trial" },
    { label: "Paid" },
  ];

  const handleToolTitleChange = (event) => {
    setToolTitle(event.target.value);
  };

  const handleToolLinkChange = (event) => {
    setToolLink(event.target.value);
  };

  const handleToolCategoryChange = (category) => {
    setSelectedCategory(category);
  };

  const handleToolPriceChange = (option) => {
    setSelectedPrice(option);
  };

  const handleToolDescriptionChange = (event) => {
    setToolDescription(event.target.value);
  };

  const handleSubmit = () => {
    axios
      .post(`${SV_URL}/send-email`, {
        email: user.email,
        post_title: toolTitle,
        post_link: toolLink,
        post_category: selectedCategory,
        post_price: selectedPrice,
        post_description: toolDescription,
      })
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

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
            value={toolTitle}
            containerProps={{ className: "min-w-[50px]" }}
            onChange={handleToolTitleChange}
          />
          <MaterialComponent
            htmlFor="toolLink"
            label="Link to AI Tool"
            component="Input"
            type="text"
            id="toolLink"
            name="toolLink"
            value={toolLink}
            color="white"
            containerProps={{ className: "min-w-[50px]" }}
            onChange={handleToolLinkChange}
          />
          <MaterialComponent
            component="Select"
            label="Select Category"
            labelProps={{ className: "text-white" }}
            menuProps={{ className: "bg-gray-200" }}
            size="md"
            containerProps={{ className: "min-w-[50px]" }}
            onChange={handleToolCategoryChange}
          >
            {categories.map((category, index) => (
              <MaterialComponent
                key={index}
                component="Option"
                className="bg-transparent gap-2 hover:bg-emerald-600 duration-300 ease-in-out"
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
            size="md"
            containerProps={{ className: "min-w-[50px]" }}
            onChange={handleToolPriceChange}
          >
            {options.map((option, index) => (
              <MaterialComponent
                key={index}
                component="Option"
                className="bg-transparent gap-2 hover:bg-emerald-600 duration-300 ease-in-out"
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
            value={toolDescription}
            containerProps={{ className: "min-w-[50px] text-white" }}
            labelProps={{ className: "text-white" }}
            className="text-white"
            onChange={handleToolDescriptionChange}
          />
          <MaterialComponent
            htmlFor="submit"
            component="Button"
            id="submit"
            name="submit"

            onClick={handleSubmit} 
            fullWidth
          >
            Submit
          </MaterialComponent>
        </div>
      </div>

  );
}

export default PromoteCp;
