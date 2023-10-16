import React, { useEffect, useState } from 'react';
import { useLocation, useParams, Link } from 'react-router-dom';
import {
  Card,
  CardBody,
  CardFooter,
  Typography,
  Button,
  Tooltip,
} from "@material-tailwind/react";
import { retrieveRelatedPosts, truncateDescription } from '../utils/utils';

const PostDetailComponent = () => {
  const { categoryName, formattedPostName } = useParams();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const postPrice = searchParams.get('postPrice');
  const postLink = searchParams.get('postLink');
  const postDescription = searchParams.get('postDescription');
  const postTag = searchParams.get('postTag');

  const [relatedTools, setRelatedTools] = useState([]);
  
  useEffect(() => {
    const fetchRelatedToolsData = async () => {
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
  
      let data = await retrieveRelatedPosts(tags, categoryName);
  
      setRelatedTools(data);
    };
  
    fetchRelatedToolsData();
  }, [categoryName]);
  
  
  
  

  return (
    <div className='grid grid-cols-1 place-content-center mx-auto px-5 space-y-40'>


    <div className="container mx-auto grid grid-cols-1 gap-10 place-items-center">
      <Card className="w-80">
        <CardBody>
          <div className="mb-2 flex items-center justify-between">
            <Typography color="blue-gray" className="font-bold">
              {formattedPostName}
            </Typography>
          </div>
          <div className='flex flex-row justify-between gap-4 mb-3'>
            <Tooltip content={postTag}>
              <Button color='blue' size='sm' className='text-sm capitalize'>
                {postTag}
              </Button>
            </Tooltip>
            <Tooltip content={postPrice}>
              <Button
                color={postPrice === 'Free' ? 'green' : postPrice === 'Freemium' ? 'orange' : 'red'}
                size='sm'
                className='text-sm capitalize'
              >
                {postPrice}
              </Button>
            </Tooltip>
          </div>
          <Typography variant="small" color="gray" className="font-normal opacity-75">
            {postDescription}
          </Typography>
        </CardBody>
        <CardFooter className="pt-0">
          <div className="w-4" /> 
          <Link to={postLink} target="_blank" rel="noopener noreferrer" className="flex-grow">
            <Button
              fullWidth={false}
              size='md'
              className="bg-blue-gray-900/10 text-blue-gray-900 shadow-none hover:scale-105 hover:shadow-none focus:scale-105 focus:shadow-none active:scale-100 capitalize w-full"
            >
              Visit
            </Button>
          </Link>
        </CardFooter>
      </Card>
      </div>
      <div className="container mx-auto grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-32 place-items-center">

      {relatedTools.map((tool, index) => (

        <Card className="w-80" key={index}>
          <CardBody>
            <div className="mb-2 flex items-center justify-between">
              <Typography color="blue-gray" className="font-bold">
                {tool.post_title}
              </Typography>
            </div>
            <div className='flex flex-row justify-between items-center gap-4 mb-3'>
              <Tooltip content={tool.post_category}>
                <Button color='blue' size='sm' className='text-sm capitalize'>
                  {tool.post_category}
                </Button>
              </Tooltip>
              <Tooltip content={tool.post_price}>
                <Button
                  color={tool.post_price === 'Free' ? 'green' : tool.post_price === 'Freemium' ? 'orange' : 'red'}
                  size='sm'
                  className='text-sm capitalize'
                >
                  {tool.post_price}
                </Button>
              </Tooltip>
            </div>
            <Typography variant="small" color="gray" className="font-normal opacity-75">
              {truncateDescription(tool.post_description, 150)}
            </Typography>
          </CardBody>
          <CardFooter className="pt-0">
            <div className="w-4" />
            <Link to={tool.post_link} target="_blank" rel="noopener noreferrer" className="flex-grow">
              <Button
                className="bg-blue-gray-900/10 text-blue-gray-900 shadow-none hover:scale-105 hover:shadow-none focus:scale-105 focus:shadow-none active:scale-100 capitalize w-full"
              >
                Visit
              </Button>
            </Link>
          </CardFooter>

        </Card>

      ))}
    </div>
    </div>
  );
};

export default PostDetailComponent;
