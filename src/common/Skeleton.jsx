import PropTypes from 'prop-types';
import { icons } from './content';
import { Typography, Button } from "@material-tailwind/react";

export function SkeletonPost() {
    return (
        <div className="container mx-auto animate-pulse bg-gray-900 p-10 rounded-lg">


            <div className="space-y-8">
                <div className="bg-gray-300 rounded-full h-2 w-28"></div>
                <div className="space-y-5">
                    <div className="bg-gray-300 rounded-full h-2 w-full"></div>
                    <div className="bg-gray-300 rounded-full h-2 w-4/5"></div>
                    <div className="bg-gray-300 rounded-full h-2 w-2/5"></div>
                </div>
                <div className="flex flex-row items-start gap-4">
                <div className="bg-gray-300 rounded-md h-7 w-28"></div>
                <div className="bg-gray-300 rounded-md h-7 w-28"></div>

                </div>
            </div>
        </div>
    );
}
export function SkeletonCategory() {
    return (
        <div className="container mx-auto mx-auto animate-pulse bg-gray-900 p-8 rounded-lg">


            <div className="space-y-10 flex flex-col items-center">
                <div className="bg-gray-300 rounded-full h-4 w-20"></div>

                    <div className="bg-gray-300 rounded-md  h-8 w-28"></div>

            </div>
        </div>
    );
}

export function PgTitle({ text }) {
    return (
      <Typography variant="h4" color="white" className="font-bold capitalize">
        {text}
      </Typography>
    );
  }
  PgTitle.propTypes = {
    text: PropTypes.string.isRequired,
  };

  export function PgButton({ text }) {
    return (
        <Button className='flex flex-row gap-2 items-center uppercase h-7'>
        <icons.ArrowUturnLeftIcon className='h-3 w-3' stroke='white'/>
        {text}
        </Button>
    );
  }
  PgButton.propTypes = {
    text: PropTypes.string.isRequired,
  };

  import InfiniteScroll from 'react-infinite-scroll-component';
  
  export function InfScroll({ dataLength, next, hasMore, loader, children }) {
    return (
      <InfiniteScroll
        dataLength={dataLength}
        next={next}
        hasMore={hasMore}
        scrollThreshold={0.6}
        loader={loader}
      >
        {children}
      </InfiniteScroll>
    );
  }
  InfScroll.propTypes = {
    dataLength: PropTypes.number.isRequired,
    next: PropTypes.func.isRequired,
    hasMore: PropTypes.bool.isRequired,
    loader: PropTypes.element.isRequired,
    children: PropTypes.node.isRequired,
  };
  

export default { SkeletonPost, SkeletonCategory, PgTitle, PgButton, InfScroll}