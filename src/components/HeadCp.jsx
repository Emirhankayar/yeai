import React from 'react';
import { Typography } from '@material-tailwind/react';
import { content, content_head } from '../common/content';

export default function HeadCp() {

  return (
    <div className="container mx-auto">
      <div className='space-y-20 max-w-3xl mx-auto px-10'>

        <Typography variant="h2" color="blue" textGradient={true} className="text-start">
          Let's Discover
        </Typography>

        {content.map((item, index) => (
  <div key={index}>
    <Typography
      variant="h3"
      color="lime"
      textGradient={true}
      className="pb-5"
    >
      {item.title}
    </Typography>

    <div className="space-y-5">
      <Typography key={`desc_0_${index}`} variant="paragraph" color="inherit" className="text-left">
        {item.description_0}
      </Typography>
      <Typography key={`desc_1_${index}`} variant="paragraph" color="inherit" className="text-left">
        {item.description_1}
      </Typography>
      <Typography key={`desc_2_${index}`} variant="paragraph" color="inherit" className="text-left">
        {item.description_2}
      </Typography>
    </div>
  </div>
))}

{content_head.map((item, index) => (
  <div key={index}>
    <Typography
      variant="h3"
      color="lime"
      textGradient={true}
      className="pb-5"
    >
      {item.title}
    </Typography>

    <div className="space-y-5">
      <Typography key={`desc_0_${index}`} variant="paragraph" color="inherit" className="text-left">
        {item.description_0}
      </Typography>
      <Typography key={`desc_1_${index}`} variant="paragraph" color="inherit" className="text-left">
        {item.description_1}
      </Typography>
      <Typography key={`desc_2_${index}`} variant="paragraph" color="inherit" className="text-left">
        {item.description_2}
      </Typography>
      <Typography key={`desc_3_${index}`} variant="paragraph" color="inherit" className="text-left">
        {item.description_3}
      </Typography>
    </div>
  </div>
))}

      </div>
    </div>
  );
}
