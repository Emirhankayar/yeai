import { useState, useContext } from "react";
import MaterialComponent from "../common/Material";
import axios from "axios";
import { CategoryContext } from "../services/CategoryContext";

const SV_URL = import.meta.env.VITE_SV_URL;

function PromoteCp() {
  const categories = useContext(CategoryContext);
  const [email, setEmail] = useState("");
  const [toolTitle, setToolTitle] = useState("");
  const [toolLink, setToolLink] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedPrice, setSelectedPrice] = useState("");
  const [toolDescription, setToolDescription] = useState("");
  const options = [{ label: "Free" }, { label: "Freemium" }, { label: "Paid" }];

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

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
        email: email,
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
    <div className="w-full grid grid-cols-1 place-items-center">
      <div className="w-1/2 space-y-10">
        <MaterialComponent
          htmlFor="email"
          label="Email Adress"
          component="Input"
          type="email"
          id="email"
          name="email"
          value={email}
          onChange={handleEmailChange}
        />
        <MaterialComponent
          htmlFor="toolTitle"
          label="Name of your Tool"
          component="Input"
          type="toolTitle"
          id="toolTitle"
          name="toolTitle"
          value={toolTitle}
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
          label="What can the AI tool do?"
          component="Textarea"
          id="toolDescription"
          name="toolDescription"
          value={toolDescription}
          onChange={handleToolDescriptionChange}
        />
        <MaterialComponent
          htmlFor="submit"
          component="Button"
          id="submit"
          name="submit"
          onClick={handleSubmit}
        >
          Submit
        </MaterialComponent>
      </div>
    </div>
  );
}

export default PromoteCp;
