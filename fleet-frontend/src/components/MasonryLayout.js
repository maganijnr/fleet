import Masonry from 'react-masonry-css'
import FleetCard from './FleetCard';
const MasonryLayout = ({fleet}) => {

   const breakpointColumnsObj = {
      default: 4,
      3000: 6,
      2000: 5,
      1200: 4,
      1000: 3,
      700: 2,
      500: 1
   };

   return (
      <Masonry
         breakpointCols={breakpointColumnsObj}
         className='flex animate-slide-fwd'
      >
         {fleet?.map(post => (
            <FleetCard key={post.title} post={post}/>
         ))}
      </Masonry>
   )
}

export default MasonryLayout
