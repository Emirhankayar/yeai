import { useState } from 'react';
import MaterialComponent from '../common/Material';
import axios from 'axios';

const SV_URL = import.meta.env.VITE_SV_URL

function PromoteCp() {
    const [email, setEmail] = useState('');
    const [toolTitle, setToolTitle] = useState('');
    const [toolLink, setToolLink] = useState('');
    const [toolCategory, setToolCategory] = useState('');
    const [toolPrice, setToolPrice] = useState('');
    const [toolDescription, setToolDescription] = useState('');

    const handleEmailChange = (event) => {
        setEmail(event.target.value);
    };
    
    const handleToolTitleChange = (event) => {
        setToolTitle(event.target.value);
    };

    const handleToolLinkChange = (event) => {
        setToolLink(event.target.value);
    };

    
    const handleToolCategoryChange = (event) => {
        setToolCategory(event.target.value);
    };
    
    const handleToolPriceChange = (event) => {
        setToolPrice(event.target.value);
    };

    const handleToolDescriptionChange = (event) => {
        setToolDescription(event.target.value);
    };

    const handleSubmit = () => {
        axios.post(`${SV_URL}/send-email`, {
            email: email,
            post_title: toolTitle,
            post_link: toolLink,
            post_category: toolCategory,
            post_price: toolPrice,
            post_description: toolDescription,
        })
        .then(response => {
            console.log(response.data);
        })
        .catch(error => {
            console.error(error);
        });
    };

    return (
        <div className="w-full grid grid-cols-1 place-items-center">
            <div className='w-1/2 space-y-10'>
            <MaterialComponent htmlFor="email" label="Email Adress" component="Input" type="email" id="email" name="email" value={email} onChange={handleEmailChange} />
            <MaterialComponent htmlFor="toolTitle" label="Name of your Tool" component="Input" type="toolTitle" id="toolTitle" name="toolTitle" value={toolTitle} onChange={handleToolTitleChange} />
            <MaterialComponent htmlFor="toolLink" label="Link to AI Tool" component="Input" type="text" id="toolLink" name="toolLink" value={toolLink} onChange={handleToolLinkChange} />
            <MaterialComponent htmlFor="toolCategory" label="Category of AI Tool" component="Input" type="text" id="toolCategory" name="toolCategory" value={toolCategory} onChange={handleToolCategoryChange} />
            <MaterialComponent htmlFor="toolPrice" label="Pricing of Your Tool (Free, Freemium, Paid)" component="Input" type="text" id="toolPrice" name="toolPrice" value={toolPrice} onChange={handleToolPriceChange} />
            <MaterialComponent htmlFor="toolDescription" label="What can the AI tool do?" component="Textarea" id="toolDescription" name="toolDescription" value={toolDescription} onChange={handleToolDescriptionChange} />
            <MaterialComponent htmlFor="submit" component="Button" id="submit" name="submit" onClick={handleSubmit}>Submit</MaterialComponent>
            </div>
        </div>
    );
}

export default PromoteCp;