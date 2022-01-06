import {useState, useEffect} from 'react'
import { useParams } from 'react-router-dom'
import MasonryLayout from '../../components/MasonryLayout'
import Spinner from '../../components/Spinner'
import { client } from '../../data/client'

const Fleet = ({loading, setLoading}) => {
   const [fleet, setfleet] = useState([])
   const {categoryId} = useParams()

   useEffect(() => {
      const filterQuery = `*[_type == "fleet" && category match '${categoryId}' || title match '${categoryId}*' || about match '${categoryId}*' ]{
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

      setLoading(true)

      if(categoryId){
         client.fetch(filterQuery).then((data) => {
            setfleet(data)
            setLoading(false)
            console.log(data)
         })
      }else{
         client.fetch(allQuery).then((data) => {
            setfleet(data)
            setLoading(false)
            console.log(data)
         })
      }
   }, [categoryId, setLoading])

   if(loading) return <Spinner/>

   console.log(categoryId)
   return (
      <div>
         {
            fleet && <MasonryLayout fleet={fleet}/>
         }
      </div>
   )
}

export default Fleet
