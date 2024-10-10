import { apiUrls } from "./urls";
import {
  getApiCall,
  postApiCall,
  postFormDataApiCall,
  putApiCall,
  postFileApiCall,
  deleteApiCall,
  postApiCallA,
  postApiCallWithoutToken,
  putApiCallWithoutToken
} from "./utils";

// export async function to call postFormDataApiCall(endpoint, reqBody) {
export async function login(request) {
  let apiUrl = apiUrls["login"];
  let apiResponse = await postFormDataApiCall(apiUrl, request)
  .then((res) => res.status === 200 ?  res.json():null)
  .then((data) =>{
    sessionStorage.setItem('token', data.access_token)
    sessionStorage.setItem('userData', JSON.stringify(data.user));
    sessionStorage.setItem("dashboardState", "dashboard");
    sessionStorage.setItem("user", data.user.username);
    sessionStorage.setItem("role", data.user.userrole);
    sessionStorage.getItem("role").toUpperCase() === "ADMIN" ? "" : sessionStorage.setItem("user_id", data.user.id)
    sessionStorage.setItem("modelConfigStep", "step1");
    return data
  }).catch(err => {
    return err.response
  }) 
  return apiResponse
}
  