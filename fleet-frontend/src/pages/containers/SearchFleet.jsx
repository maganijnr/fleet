import React, { useEffect, useState } from 'react'
import MasonryLayout from '../../components/MasonryLayout';
import Spinner from '../../components/Spinner';
import { client } from '../../data/client';

const SearchFleet = ({searchItem, setSearchItem}) => {
   const [fleets, setFleets] = useState();
   const [loading, setLoading] = useState(false);

   useEffect(() => {
      
      if(searchItem !== ""){
         setLoading(true);

         const searchQuery = `*[_type == 'fleet' && category match '${searchItem.toLowerCase()}*' || title match '${searchItem.toLowerCase()}*' || about match '${searchItem.toLowerCase()}*']{
            image{
               asset->{
                  url
               }
            },
            _id,
            destination,
            postedBy->{
               _id,
               userName,
               image
            },
            save[]{
               _key,
               postedBy->{
                  _id,
                  userName,
                  image
               },
            },
         }`

         client
            .fetch(searchQuery)
            .then(data => {
               setFleets(data)
               setLoading(false)
            })
      } else {
         const allQuery = `*[_type == "fleet"] | order(_createdAt desc){
            image{
               asset -> {
                  url,
               }
            },
            title,
            about,
            destination,
            _id,
            postedBy -> {
               _id,
               userName,
               image
            },
            save[]{
               _key,
               postedBy -> {
                  _id,
                  userName,
                  image
               },
            }
         }`

         client
            .fetch(allQuery)
            .then(data => {
               setFleets(data)
               setLoading(false)
            })
      }
   }, [searchItem])

   return (
      <div>
         {loading && <Spinner message="Searching pins" />}
         {fleets?.length !== 0 && <MasonryLayout fleet={fleets} />}
         {fleets?.length === 0 && searchItem !== '' && !loading && (
         <div className="mt-10 text-center text-xl text-secColor">No Pins Found!</div>
         )}
      </div>
   );
}

export default SearchFleet
