export const getUserQuery = userInfo => {
   const query = `*[_type == "user" && _id ${userInfo?.googleId}]`

   return query
}

export const searchFleetQuery = searchItem => {
   const query = `*[_type == "fleet" && title match '${searchItem}*' || about match '${searchItem}*']{
      title,
      about, 
      destination, 
      image{
         asset -> {
            url
         }
      },
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

   return query
}