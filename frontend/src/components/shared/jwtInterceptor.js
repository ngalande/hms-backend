import axios from "axios";
     
const jwtInterceoptor = axios.create({});

jwtInterceoptor.interceptors.request.use(
    // async (config) => {
    //     let tokensData = JSON.parse(localStorage.getItem("tokens"));
    //     config.headers = config.headers ?? {};
    //     // console.log(tokensData)
    //     // Now config.headers can be safely used
    //     if(tokensData){
    //       config.headers.Authorization = tokensData.token

    //     }
    
    //     return config;
    //   },
      (error) => error
)


// jwtInterceoptor.interceptors.request.use((config) => {
//   let tokensData = JSON.parse(localStorage.getItem("tokens"));
// //   console.log(tokensData)
//     // config.headers.Authorization.setAuthorization(`bearer ${tokensData.token}`)
//   config.headers.common["Authorization"] = tokensData.token;
//   return config;
// });
export default jwtInterceoptor;