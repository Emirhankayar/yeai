import PropTypes from 'prop-types';
import Icon from './Icons';
import MaterialComponent from './Material';
import InfiniteScroll from 'react-infinite-scroll-component';

export function SkeletonPost() {
  return (
      <div className="flex flex-col items-stretch animate-pulse bg-gray-900 p-10 rounded-lg">
          <div className="flex-grow space-y-8">
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
      <MaterialComponent component="Typography" variant="h5" color="white" className="font-bold">
        {text}
      </MaterialComponent>
    );
  }
  PgTitle.propTypes = {
    text: PropTypes.string.isRequired,
  };

  export function PgButton({ text }) {
    return (
        <MaterialComponent component="Button" className='flex flex-row gap-2 items-center uppercase h-7'>
        <Icon icon="ArrowUturnLeftIcon" className='h-3 w-3' stroke='white'/>
        {text}
        </MaterialComponent>
    );
  }
  PgButton.propTypes = {
    text: PropTypes.string.isRequired,
  };
  
  export function InfScroll({ dataLength, next, hasMore, loader, children }) {
    return (
      <InfiniteScroll
        dataLength={dataLength}
        next={next}
        hasMore={hasMore}
        loader={loader}
        height={screen.height - 200}
        endMessage={          
        <p className='text-center text-gray-800 text-sm mt-40'>
        <b>Nothing to load more...</b>
        </p>}
        className='hide-scrollbar overflow-x-hidden'
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