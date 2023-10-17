// sub category parent of the posts
import React, { useEffect, useState } from 'react';
import { retrieveDataFromSupabase, truncateDescription, updatePostView } from '../utils/utils';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { icons } from '../common/content';

import {
  Card,
  CardBody,
  CardFooter,
  Typography,
  Button,
  Tooltip,
  IconButton,
} from "@material-tailwind/react";

export default function PostChatCp() {
  const [tools, setTools] = useState([]);
  const { categoryName } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchToolsData = async () => {
      let tags = [];

      if (categoryName === 'machine-learning') {
        tags = ["AI Detection", "Low-code/No-code", "3D"];
      } else if (categoryName === 'computer-vision') {
        tags = ['Image Editing', "Image Scanning"];
      } else if (categoryName === 'nlp') {
        tags = ['Copywriting', 'Paraphraser', 'Prompt Guides', 'Speech To Text', 'Summarizer', 'Text To Speech', 'General Writing', 'Translation'];
      } else if (categoryName === 'ai-art-tools') {
        tags = ['Generative Art', 'Design Assistant', 'Logo Generator', 'Storyteller', 'Video Generator', 'YouTube', 'For Fun', 'Gaming'];
      } else if (categoryName === 'ai-enabled-analytics') {
        tags = ['Developer Tools', 'Finance', 'Research', 'Sales', 'Search Engine', 'Spreadsheets', 'Presentations', 'Marketing', 'Productivity', 'Real Estate', 'Self Improvement'];
      } else if (categoryName === 'ai-powered-chatbots') {
        tags = ['Chat', 'Customer Support', 'Email Assistant', 'Human Resources', 'Legal Assistant', 'SEO', 'Social Media Assistant', 'Startup Tools'];
      } else if (categoryName === 'open-source') {
        tags = ["Free", "Freemium"];
      }

      const data = await retrieveDataFromSupabase(tags, categoryName);
      setTools(data);
    };

    fetchToolsData();
  }, [categoryName]);

  const handleReadMore = async (id, post_view, post_title) => {
    const updatedPostView = post_view;
    await updatePostView(id, updatedPostView); // Update the post_view value for the current post
  
    navigate(
      `/categories/${encodeURIComponent(categoryName)}/${encodeURIComponent(
        post_title.toLowerCase().replace(/\s+/g, '-')
      )}?id=${id}`
    );
  };
  
  
  const renderItems =

    tools.map(({ id, post_title, post_description, post_category, post_link, post_price, post_view }, key) => (
      <Card className="w-80" key={key}>
        <CardBody>
          <div className="mb-4 flex items-center justify-between">
            <Tooltip content={post_view}>
            <Typography color="blue-gray" className="font-bold">
              {post_title}
            </Typography>
            </Tooltip>

            <Tooltip content='Save the post.'>
            <IconButton variant='gradient' color='gray' className='cursor-pointer'>
              {icons.BookmarkIcon && <icons.BookmarkIcon className="h-6 w-6" fill='transparent'/>}
            </IconButton>
            </Tooltip>


          </div>
          <div className='flex flex-row justify-between gap-4 mb-3'>
            <Tooltip content={post_category}>
              <Button color='blue' size='sm' className='text-sm capitalize'>
                {post_category}
              </Button>
            </Tooltip>
            <Tooltip content={post_price}>
              <Button
                color={post_price === 'Free' ? 'green' : post_price === 'Freemium' ? 'orange' : 'red'}
                size='sm'
                className='text-sm capitalize'
              >
                {post_price}
              </Button>
            </Tooltip>
          </div>
          <Typography variant="small" color="gray" className="font-normal opacity-75">
            {truncateDescription(post_description, 150)}
          </Typography>
        </CardBody>
        <CardFooter className="pt-0 flex items-center w-full">
        <Link
            onClick={() => handleReadMore(id, post_view, post_title)}
            key={id}
            className="flex-grow"
          >
            <Button className="bg-blue-gray-900/10 text-blue-gray-900 shadow-none hover:scale-105 hover:shadow-none focus:scale-105 focus:shadow-none active:scale-100 capitalize w-full">
              Read
            </Button>
          </Link>


          <div className="w-4" />
          <Link to={post_link} target="_blank" rel="noopener noreferrer" className="flex-grow">
            <Button
              className="bg-blue-gray-900/10 text-blue-gray-900 shadow-none hover:scale-105 hover:shadow-none focus:scale-105 focus:shadow-none active:scale-100 capitalize w-full"
            >
              Visit
            </Button>
          </Link>
        </CardFooter>

      </Card>
    ));

  return (

    <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 place-items-center">
      {renderItems}

    </div>
  );
}
