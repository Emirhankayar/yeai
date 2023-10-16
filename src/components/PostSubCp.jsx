// PostDetailComponent.js
import React from 'react';
import { useLocation, useParams, Link } from 'react-router-dom';
import {
  Card,
  CardBody,
  CardFooter,
  Typography,
  Button,
  Tooltip,
} from "@material-tailwind/react";

const PostDetailComponent = () => {
  const { categoryName, formattedPostName } = useParams();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const postPrice = searchParams.get('postPrice');
  const postLink = searchParams.get('postLink');
  const postDescription = searchParams.get('postDescription');



  return (
    <div className="container mx-auto grid grid-cols-1 gap-10 place-items-center px-10">
      <Card className="max-w-3xl">
        <CardBody>
          <div className="mb-2 flex items-center justify-between">
            <Typography color="blue-gray" className="font-bold">
              {formattedPostName}
            </Typography>
          </div>
          <div className='flex flex-row justify-between gap-4 mb-3'>
            <Tooltip content={categoryName}>
              <Button color='blue' size='sm' className='text-sm capitalize'>
                {categoryName}
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
  );
};

export default PostDetailComponent;
