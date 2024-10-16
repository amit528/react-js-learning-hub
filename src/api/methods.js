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

export async function createPost(request) {
  let apiUrl = apiUrls["post"];
  let apiresponse = await postApiCall(apiUrl, request)
  return apiresponse;
}
  