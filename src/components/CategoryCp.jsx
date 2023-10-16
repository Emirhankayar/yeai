import React from 'react';
import { category_items, colors } from '../common/content';
import {
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    Typography,
    Button,
  } from "@material-tailwind/react";
import { Link } from 'react-router-dom';

export default function CategoryCp() {
    const renderItems = category_items.map(({ icon, title, description, color, link }, key) => {
        // Convert title to a format suitable for the URL
        const formattedTitle = title.toLowerCase().replace(/\s+/g, '-');
        const updatedLink = `/categories/${formattedTitle}`;

        return (
            <Card className="w-80" key={key}>
              <CardHeader shadow={true} floated={false} className={`h-52 flex items-center justify-center ${colors[color]}`}>
                {React.createElement(icon, { strokeWidth: 2, className: "h-1/2 w-1/2 object-cover object-center" })}
              </CardHeader>
              <CardBody>
                <div className="mb-2 flex items-center justify-between">
                  <Typography color="blue-gray" className="font-medium">
                    {title}
                  </Typography>
                </div>
                <Typography variant="small" color="gray" className="font-normal opacity-75">
                  {description}
                </Typography>
              </CardBody>
              <CardFooter className="pt-0">
                <Link to={updatedLink}>
                  <Button
                    ripple={false}
                    fullWidth={true}
                    className="bg-blue-gray-900/10 text-blue-gray-900 shadow-none hover:scale-105 hover:shadow-none focus:scale-105 focus:shadow-none active:scale-100 capitalize"
                  >
                    View
                  </Button>
                </Link>
              </CardFooter>
            </Card>
        );
    });
    
    return (
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 place-items-center">
        {renderItems.slice(0, -1)}
      </div>
    );
}
