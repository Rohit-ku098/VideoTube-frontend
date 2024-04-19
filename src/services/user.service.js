import { api } from "./conf";

api.get('/healthcheck').then(res => console.log(res.data))

 const logoutUser = async () => {
   try {
     const res = await api.post("/users/logout");
     if (res.status === 200) {
       return res.data
     }
   } catch (error) {
     console.log(error);
   }
 };

 export {logoutUser}