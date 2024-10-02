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


export async function loginWithRole(loginData, role) {
  let apiUrl = apiUrls["loginWithRole"];
  let authData = await postFormDataApiCall(apiUrl + "/" + role, loginData)
    .then((apiresponse) =>
      apiresponse.status === 200 ? apiresponse.json() : null
    )
    .then((login) => {
        sessionStorage.setItem('token', login.access_token)
        sessionStorage.setItem('userData', JSON.stringify(login.user));
        sessionStorage.setItem("appState", "dashboard");
        sessionStorage.setItem("dashboardState", "dashboard");
        sessionStorage.setItem("user", login.user.username);
        sessionStorage.setItem("role", login.user.userrole);
        sessionStorage.getItem("role").toUpperCase() === "ADMIN" ? "" : sessionStorage.setItem("user_id", login.user.id)
        sessionStorage.setItem("modelConfigStep", "step1");
      return login;
    })
    .catch((error) => {
      return error.response;
    });
  return authData;
}


// export async function to call postFormDataApiCall(endpoint, reqBody) {
  export async function signup(request) {
    let apiUrl = apiUrls["signup"];
    let apiResponse = await postApiCallA(apiUrl, request)
    if(apiResponse.data.status === 200)
      return apiResponse.data;
    else if(apiResponse.data.status === 404)
    {
      return apiResponse.data;
    }
    else
      return {message: "Something went wrong try again"}
  }

export async function getUsers() {
  let apiUrl = apiUrls["user"];
  let result = await getApiCall(apiUrl).then((apiresponse) => {
    if (apiresponse.status === 200) {
      return apiresponse.json();
    } else {
      apiresponse.json().then((data) => {
        return data;
      });
    }
  });
  return result;
}

export async function getUserById(id) {
  let apiUrl = apiUrls["user"];
  let result = await getApiCall(`${apiUrl}/${id}`).then((apiresponse) => {
    if (apiresponse.status === 200) {
      return apiresponse.json();
    } else {
      apiresponse.json().then((data) => {
        return data;
      });
    }
  });
  return result;
}

export async function uploadDocument(
  fileData,
  params,
  plantname,
  unitname,
  shelfname
) {
  let apiUrl = apiUrls["fileUploadv1"];
  if (plantname == "" || unitname == "") {
    plantname = sessionStorage.getItem("plant");
    unitname = sessionStorage.getItem("unit");
  }
  let responseData = await postFileApiCall(
    `${apiUrl}/?filename=${params.filename.split("\\").pop()}&filetype=${
      params.filetype
    }&plant_id=${plantname}&unit_id=${unitname}&shelf_id=${shelfname}
    `,
    fileData
  );
  return responseData;
}

export async function userContext(requestBody) {
  let apiUrl = apiUrls["usercontext"];
  let responseData = await postApiCall(
    `${apiUrl}/`,
    JSON.stringify(requestBody)
  ).then((apiresponse) => {
    return apiresponse;
  });
  return responseData;
}

export async function logout(loginData) {
  let apiUrl = apiUrls["logout"];
  let authData = await getApiCall(apiUrl)
    .then((apiresponse) =>
      apiresponse.status === 200 ? apiresponse.json() : null
    )
    .then((login) => {
      sessionStorage.setItem("token", login.access_token);
      sessionStorage.setItem("user", login.user.username);
      sessionStorage.setItem("role", login.user.userrole);
      sessionStorage.setItem("appState", "dashboard");
      sessionStorage.setItem("dashboardState", "selectunit");
    })
    .catch((error) => {
      //failure or error
      return error.response;
    });
  return authData;
}

export async function getUsersAll() {
  let apiUrl = apiUrls["usersall"];
  let result = await getApiCall(apiUrl)
  .then((apiresponse) => {
    if (apiresponse.status === 200) {
      return apiresponse.json()
    } else {
      return apiresponse.json()
    }
  })
  .catch((error) => {
    //failure or error
    return error.response;
  });
return result;
}

export async function getRolesAll() {
  let apiUrl = apiUrls["rolesall"];
  let result = await getApiCall(apiUrl)
  .then((apiresponse) => {
    if (apiresponse.status === 200) {
      return apiresponse.json()
    } else {
      return apiresponse.json()
    }
  })
  .catch((error) => {
    //failure or error
    return error.response;
  });
return result;
}


export async function getActiveRolesAll() {
  let apiUrl = apiUrls["getActiveRoles"];
  let result = await getApiCall(apiUrl)
  .then((apiresponse) => {
    if (apiresponse.status === 200) {
      return apiresponse.json()
    } else {
      return apiresponse.json()
    }
  })
  .catch((error) => {
    //failure or error
    return error.response;
  });
return result;
}

export async function createUser(request) {
  let apiUrl = apiUrls["createuser"];
  let apiresponse = await postApiCall(apiUrl, request)
  return apiresponse;
}

export async function updateUser(id, request) {
  let apiUrl = apiUrls["updateuser"];
  let responseData = await putApiCall(`${apiUrl}/${id}`, request);
  return responseData;
}

export async function searchUserByNameOrMbno(name,mobile_no) {
  let apiUrl = apiUrls["searchUser"];
  let result = await getApiCall(`${apiUrl}?username=${name}&mobile_no=${mobile_no}`)
    .then((apiresponse) => {
      if (apiresponse.status === 200) {
                return apiresponse.json()
      }
    })
    .catch((error) => {
      //failure or error
      return error.response;
    });
  return result;
}

export async function getComplaints() {
  let apiUrl = apiUrls["viewComplaints"];
  let result = await getApiCall(apiUrl)
    .then((apiresponse) => {
      if (apiresponse.status === 200) {
                return apiresponse.json()
      }
    })
    .catch((error) => {
      //failure or error
      return error.response;
    });
  return result;
}

export async function searchLoginDetails(request) {
  let apiUrl = apiUrls["searchLoginDetails"];
  let apiresponse = await postApiCall(apiUrl, request)
  return apiresponse;
}

export async function createComplaint(request) {
  let apiUrl = apiUrls["addComplaint"];
  let apiresponse = await postApiCall(apiUrl, request)
  return apiresponse;
}

export async function updateComplaint(id, request) {
  let apiUrl = apiUrls["updateComplaint"];
  let responseData = await putApiCall(`${apiUrl}/${id}`, request);
  return responseData;
}

export async function getDealerByType(type,value) {
  let apiUrl = apiUrls["getDealerByType"];
  let result = await getApiCall(`${apiUrl}/${type}/${value}`)
    .then((apiresponse) => {
      return apiresponse
    })
    .catch((error) => {
      //failure or error
      return error.response;
    });
  return result;
}

export async function getDealers(page, pageSize) {
  let apiUrl = apiUrls["getDealerAll"];
  let result = await getApiCall(`${apiUrl}?page_count=${page}&page_size=${pageSize}`)
    .then((apiresponse) => {
      if (apiresponse.status === 200) {
                return apiresponse.json()
      }
    })
    .catch((error) => {
      //failure or error
      return error.response;
    });
  return result;
}

export async function createDealer(request) {
  let apiUrl = apiUrls["createDealer"];
  let apiresponse = await postApiCall(apiUrl, request)
  return apiresponse;
}

export async function updateDealer(id, request) {
  let apiUrl = apiUrls["updateDealer"];
  let responseData = await putApiCall(`${apiUrl}/${id}`, request);
  return responseData;
}

export async function deleteDealer(id) {
  let apiUrl = apiUrls["deleteDealer"];
  let responseData = await deleteApiCall(`${apiUrl}/${id}`);
  return responseData;
}

export async function getDealer(dealer_id, mobile_no) {
  let apiUrl = apiUrls["getDealer"];
  let result = await getApiCall(`${apiUrl}?dealer_id=${dealer_id}&mobile_no=${mobile_no}`)
    .then((apiresponse) => {
      if (apiresponse.status === 200) {
        return apiresponse.json()
      }else{
        return apiresponse.json()
      }
    })
    .catch((error) => {
      //failure or error
      return error.response;
    });
  return result;
}

export async function uploadDealer(fileData){
  let apiUrl = apiUrls["uploadDealer"];
  let responceData = await postFileApiCall(`${apiUrl}`,fileData);
  return responceData;
  }

export async function getProducts() {
  let apiUrl = apiUrls["viewProduct"];
  let result = await getApiCall(apiUrl)
    .then((apiresponse) => {
      if (apiresponse.status === 200) {
                return apiresponse.json()
      }
    })
    .catch((error) => {
      //failure or error
      return error.response;
    });
  return result;
}

export async function createProduct(request) {
  let apiUrl = apiUrls["addProduct"];
  let apiresponse = await postApiCall(apiUrl, request)
  return apiresponse;
}

export async function updateProduct(id, request) {
  let apiUrl = apiUrls["updateProduct"];
  let responseData = await putApiCall(`${apiUrl}/${id}`, request);
  return responseData;
}

export async function deleteProduct(id) {
  let apiUrl = apiUrls["deleteProduct"];
  let responseData = await deleteApiCall(`${apiUrl}/${id}`);
  return responseData;
}

export async function getProduct(name) {
  let apiUrl = apiUrls["searchProduct"];
  let result = await getApiCall(`${apiUrl}/${name}`)
    .then((apiresponse) => {
      if (apiresponse.status === 200) {
        return apiresponse.json()
      }else{
        return apiresponse.json()
      }
    })
    .catch((error) => {
      //failure or error
      return error.response;
    });
  return result;
}

// category_subcategory section

export async function getCategory() {
  let apiUrl = apiUrls["viewCategory"];
  let result = await getApiCall(apiUrl)
    .then((apiresponse) => {
      if (apiresponse?.status === 200) {
        return apiresponse.json()
      } else {
        return apiresponse?.json()
      }
    })
    .catch((error) => {
      //failure or error
      return error
    });
  return result;
}

export async function createCategory(request) {
  let apiUrl = apiUrls["addCategory"];
  let apiresponse = await postApiCall(apiUrl, request)
  return apiresponse;
}

export async function updateCategory(id, request) {
  let apiUrl = apiUrls["updateCategory"];
  let responseData = await putApiCall(`${apiUrl}/${id}`, request);
  return responseData;
}

export async function deleteCategory(id) {
  let apiUrl = apiUrls["deleteCategory"];
  let responseData = await deleteApiCall(`${apiUrl}/${id}`);
  return responseData;
}

export async function getCategoryByname(name) {
  let apiUrl = apiUrls["searchCategory"];
  let result = await getApiCall(`${apiUrl}/${name}`)
    .then((apiresponse) => {
      if (apiresponse.status === 200) {
          return apiresponse.json()
      }else{
        return apiresponse.json()
      }
    })
    .catch((error) => {
      //failure or error
      return error.response;
    });
  return result;
}


// Subcategory 

export async function getSubcategories() {
  let apiUrl = apiUrls["viewSubcategory"];
  let result = await getApiCall(apiUrl)
    .then((apiresponse) => {
      if (apiresponse.status === 200) {
                return apiresponse.json()
      }
    })
    .catch((error) => {
      //failure or error
      return error.response;
    });
  return result;
}

export async function createSubcategory(request) {
  let apiUrl = apiUrls["addSubcategory"];
  let apiresponse = await postApiCall(apiUrl, request)
  return apiresponse;
}

export async function updateSubcategory(id, request) {
  let apiUrl = apiUrls["updateSubcategory"];
  let responseData = await putApiCall(`${apiUrl}/${id}`, request);
  return responseData;
}

export async function deleteSubcategory(id) {
  let apiUrl = apiUrls["deleteSubcategory"];
  let responseData = await deleteApiCall(`${apiUrl}/${id}`);
  return responseData;
}

export async function getSubcategoryByname(name) {
  let apiUrl = apiUrls["searchSubcategory"];
  let result = await getApiCall(`${apiUrl}/${name}`)
    .then((apiresponse) => {
      if (apiresponse.status === 200) {
          return apiresponse.json()
      }else{
        return apiresponse.json()
      }
    })
    .catch((error) => {
      //failure or error
      return error.response;
    });
  return result;
}

// level section

export async function getLevels() {
  let apiUrl = apiUrls["viewLevels"];
  let result = await getApiCall(apiUrl)
    .then((apiresponse) => {
      if (apiresponse?.status === 200) {
        return apiresponse.json()
      } else {
        return apiresponse?.json()
      }
    })
    .catch((error) => {
      //failure or error
      return error
    });
  return result;
}

export async function createLevel(request) {
  let apiUrl = apiUrls["addLevel"];
  let apiresponse = await postApiCall(apiUrl, request)
  return apiresponse;
}

export async function updateLevel(id, request) {
  let apiUrl = apiUrls["updateLevel"];
  let responseData = await putApiCall(`${apiUrl}/${id}`, request);
  return responseData;
}

export async function deleteLevel(id) {
  let apiUrl = apiUrls["deleteLevel"];
  let responseData = await deleteApiCall(`${apiUrl}/${id}`);
  return responseData;
}

export async function getLevelByname(name) {
  let apiUrl = apiUrls["searchLevel"];
  let result = await getApiCall(`${apiUrl}/${name}`)
    .then((apiresponse) => {
      if (apiresponse.status === 200) {
        return apiresponse.json()
      }else{
        return apiresponse.json()
      }
    })
    .catch((error) => {
      //failure or error
      return error.response;
    });
  return result;
}

// WScale machine section

export async function getWScaleMachines() {
  let apiUrl = apiUrls["viewWScaleMachine"];
  let result = await getApiCall(apiUrl)
    .then((apiresponse) => {
      if (apiresponse.status === 200) {
                return apiresponse.json()
      }
    })
    .catch((error) => {
      //failure or error
      return error.response;
    });
  return result;
}

export async function createWScaleMachine(request) {
  let apiUrl = apiUrls["addWScaleMachine"];
  let apiresponse = await postApiCall(apiUrl, request)
  return apiresponse;
}

export async function updateWScaleMachine(id, request) {
  let apiUrl = apiUrls["updateWScaleMachine"];
  let responseData = await putApiCall(`${apiUrl}/${id}`, request);
  return responseData;
}

export async function deleteWScaleMachine(id) {
  let apiUrl = apiUrls["deleteWScaleMachine"];
  let responseData = await deleteApiCall(`${apiUrl}/${id}`);
  return responseData;
}

export async function getWScaleMachine(id) {
  let apiUrl = apiUrls["searchWScaleMachine"];
  let result = await getApiCall(`${apiUrl}/${id}`)
    .then((apiresponse) => {
      if (apiresponse.status === 200) {
        return apiresponse.json()
      }else{
        return apiresponse.json()
      }
    })
    .catch((error) => {
      //failure or error
      return error.response;
    });
  return result;
}

// WScale machine section

export async function getIrisMachines() {
  let apiUrl = apiUrls["viewIrisMachine"];
  let result = await getApiCall(apiUrl)
    .then((apiresponse) => {
      if (apiresponse.status === 200) {
                return apiresponse.json()
      }
    })
    .catch((error) => {
      //failure or error
      return error.response;
    });
  return result;
}

export async function createIrisMachine(request) {
  let apiUrl = apiUrls["addIrisMachine"];
  let apiresponse = await postApiCall(apiUrl, request)
  return apiresponse;
}

export async function updateIrisMachine(id, request) {
  let apiUrl = apiUrls["updateIrisMachine"];
  let responseData = await putApiCall(`${apiUrl}/${id}`, request);
  return responseData;
}

export async function deleteIrisMachine(id) {
  let apiUrl = apiUrls["deleteIrisMachine"];
  let responseData = await deleteApiCall(`${apiUrl}/${id}`);
  return responseData;
}

export async function getIrisMachine(id) {
  let apiUrl = apiUrls["searchIrisMachine"];
  let result = await getApiCall(`${apiUrl}/${id}`)
    .then((apiresponse) => {
      if (apiresponse.status === 200) {
        return apiresponse.json()
      }else{
        return apiresponse.json()
      }
    })
    .catch((error) => {
      //failure or error
      return error.response;
    });
  return result;
}

export async function getRoles() {
  let apiUrl = apiUrls["viewRoles"];
  let result = await getApiCall(apiUrl)
    .then((apiresponse) => {
      if (apiresponse.status === 200) {
                return apiresponse.json()
      }
    })
    .catch((error) => {
      //failure or error
      return error.response;
    });
  return result;
}

export async function createRole(request) {
  let apiUrl = apiUrls["addRole"];
  let apiresponse = await postApiCall(apiUrl, request)
  return apiresponse;
}

export async function updateRole(id, request) {
  let apiUrl = apiUrls["updateRole"];
  let responseData = await putApiCall(`${apiUrl}/${id}`, request);
  return responseData;
}

export async function getRoleByName(name) {
  let apiUrl = apiUrls["searchRole"];
  let result = await getApiCall(`${apiUrl}/${name}`)
    .then((apiresponse) => {
      if (apiresponse.status === 200) {
        return apiresponse.json()
      }else{
        return apiresponse.json()
      }
    })
    .catch((error) => {
      //failure or error
      return error.response;
    });
  return result;
}

export async function getUsersList() {
  let apiUrl = apiUrls["viewUsers"];
  let result = await getApiCall(apiUrl)
    .then((apiresponse) => {
      if (apiresponse.status === 200) {
                return apiresponse.json()
      }
    })
    .catch((error) => {
      //failure or error
      return error.response;
    });
  return result;
}


export async function getActions() {
  let apiUrl = apiUrls["viewActions"];
  let result = await getApiCall(apiUrl)
    .then((apiresponse) => {
      if (apiresponse.status === 200) {
                return apiresponse.json()
      }
    })
    .catch((error) => {
      //failure or error
      return error.response;
    });
  return result;
}

export async function createAction(request) {
  let apiUrl = apiUrls["addAction"];
  let apiresponse = await postApiCall(apiUrl, request)
  return apiresponse;
}

export async function updateAction(id, request) {
  let apiUrl = apiUrls["updateAction"];
  let responseData = await putApiCall(`${apiUrl}/${id}`, request);
  return responseData;
}

export async function deleteAction(id) {
  let apiUrl = apiUrls["deleteAction"];
  let responseData = await deleteApiCall(`${apiUrl}/${id}`);
  return responseData;
}

export async function getActionByName(name) {
  let apiUrl = apiUrls["searchAction"];
  let result = await getApiCall(`${apiUrl}/${name}`)
    .then((apiresponse) => {
      if (apiresponse.status === 200) {
        return apiresponse.json()
      }else{
        return apiresponse.json()
      }
    })
    .catch((error) => {
      //failure or error
      return error.response;
    });
  return result;
}

// Screen methods

export async function getScreens() {
  let apiUrl = apiUrls["viewScreens"];
  let result = await getApiCall(apiUrl)
    .then((apiresponse) => {
      if (apiresponse.status === 200) {
                return apiresponse.json()
      }
    })
    .catch((error) => {
      //failure or error
      return error.response;
    });
  return result;
}

export async function createScreen(request) {
  let apiUrl = apiUrls["addScreen"];
  let apiresponse = await postApiCall(apiUrl, request)
  return apiresponse;
}

export async function updateScreen(id, request) {
  let apiUrl = apiUrls["updateScreen"];
  let responseData = await putApiCall(`${apiUrl}/${id}`, request);
  return responseData;
}

export async function deleteScreen(id) {
  let apiUrl = apiUrls["deleteScreen"];
  let responseData = await deleteApiCall(`${apiUrl}/${id}`);
  return responseData;
}

export async function getScreenByName(name) {
  let apiUrl = apiUrls["searchScreen"];
  let result = await getApiCall(`${apiUrl}/${name}`)
    .then((apiresponse) => {
      if (apiresponse.status === 200) {
        return apiresponse.json()
      }else{
        return apiresponse.json()
      }
    })
    .catch((error) => {
      //failure or error
      return error.response;
    });
  return result;
}

export async function setPermission(request) {
  let apiUrl = apiUrls["setpermission"];
  let responseData = await postApiCall(apiUrl, request);
  return responseData;
}

export async function getPermissionByRole(role_id) {
  let apiUrl = apiUrls["getpermission"];
  let responseData = await getApiCall(`${apiUrl}/${role_id}`).then(
    (apiresponse) => {
      if (apiresponse.status === 200) {
        return apiresponse.json();
      } 
      else if (apiresponse.status === 404) {
        return apiresponse.json();
      }
      else {
        apiresponse.json().then((data) => {
          return data;
        });
      }
    }
  );
  return responseData;
}

export async function getActiveScreens() {
  let apiUrl = apiUrls["screenactive"];
  let responseData = await getApiCall(apiUrl).then(
    (apiresponse) => {
      if (apiresponse.status === 200) {
        return apiresponse.json();
      } 
      else if (apiresponse.status === 404) {
        return apiresponse.json();
      }
      else {
        apiresponse.json().then((data) => {
          return data;
        });
      }
    }
  );
  return responseData;
}

export async function getActiveActions() {
  let apiUrl = apiUrls["actionactive"];
  let responseData = await getApiCall(apiUrl).then(
    (apiresponse) => {
      if (apiresponse.status === 200) {
        return apiresponse.json();
      } 
      else if (apiresponse.status === 404) {
        return apiresponse.json();
      }
      else {
        apiresponse.json().then((data) => {
          return data;
        });
      }
    }
  );
  return responseData;
}

export async function getApiKeys() {
  let apiUrl = apiUrls["getapikeyall"];

  let responseData = await getApiCall(`${apiUrl}`).then(
    (apiresponse) => {
      if (apiresponse.status === 200) {
        return apiresponse.json();
      } 
      else if (apiresponse.status === 404) {
        return apiresponse.json();
      }
      else {
        apiresponse.json().then((data) => {
          return data;
        });
      }
    }
  );
  return responseData;
}

export async function createApiKey(request) {
  let apiUrl = apiUrls["pdsmoduleapikey"];
  let apiresponse = await postApiCall(apiUrl, request)
  return apiresponse;
}

export async function updataApikey(id, request) {
  let apiUrl = apiUrls["updateapikey"];
  let responseData = await putApiCall(`${apiUrl}/${id}`, request);
  return responseData;
}

export async function deleteApikey(id) {
  let apiUrl = apiUrls["deleteapikey"];
  let responseData = await deleteApiCall(`${apiUrl}/${id}`);
  return responseData;
}

export async function getProductModel() {
  let apiUrl = apiUrls["getProductModel"];

  let responseData = await getApiCall(`${apiUrl}`).then(
    (apiresponse) => {
      if (apiresponse.status === 200) {
        return apiresponse.json();
      } 
      else if (apiresponse.status === 404) {
        return apiresponse.json();
      }
      else {
        apiresponse.json().then((data) => {
          return data;
        });
      }
    }
  );
  return responseData;
}

export async function getUserLoginDetails(request) {
  let apiUrl = apiUrls["userLoginDetails"];
  let apiresponse = await postApiCall(apiUrl, request)
  return apiresponse;
}

export async function createProductModel(request) {
  let apiUrl = apiUrls["createProductModel"];
  let apiresponse = await postApiCall(apiUrl, request)
  return apiresponse;
}

export async function updateProductModel(id, request) {
  let apiUrl = apiUrls["updateProductModel"];
  let responseData = await putApiCall(`${apiUrl}/${id}`, request);
  return responseData;
}

export async function deleteProductModel(id) {
  let apiUrl = apiUrls["deleteProductModel"];
  let responseData = await deleteApiCall(`${apiUrl}/${id}`);
  return responseData;
}

export async function getProductModelName(name) {
  let apiUrl = apiUrls["searchModelByName"];
  let result = await getApiCall(`${apiUrl}/${name}`)
    .then((apiresponse) => {
      if (apiresponse.status === 200) {
        return apiresponse.json()
      }else{
        return apiresponse.json()
      }
    })
    .catch((error) => {
      //failure or error
      return error.response;
    });
  return result;
}

export async function changePassword(id, request) {
  let apiUrl = apiUrls["changepasswordcreate"];
  let responseData = await putApiCall(`${apiUrl}/${id}`, request);
  return responseData;
}

export async function usersChangePassword(id, request) {
  let apiUrl = apiUrls["usersChangePassword"];
  let responseData = await putApiCall(`${apiUrl}/${id}`, request);
  return responseData;
}

export async function getCallHistory() {
  let apiUrl = apiUrls["callHistory"];
  let responseData = await getApiCall(`${apiUrl}`).then(
    (apiresponse) => {
      if (apiresponse.status === 200) {
        return apiresponse.json();
      }
      else if (apiresponse.status === 404) {
        return apiresponse.json();
      }
      else {
        apiresponse.json().then((data) => {
          return data;
        });
      }
    }
  );
  return responseData;
}



export async function getZoneMaster() {
  let apiUrl = apiUrls["zoneMaster"];

  let responseData = await getApiCall(`${apiUrl}`).then(
    (apiresponse) => {
      if (apiresponse.status === 200) {
        return apiresponse.json();
      } 
      else if (apiresponse.status === 404) {
        return apiresponse.json();
      }
      else {
        apiresponse.json().then((data) => {
          return data;
        });
      }
    }
  );
  return responseData;
}

export async function getZoneGroupMaster() {
  let apiUrl = apiUrls["zoneGroupMaster"];

  let responseData = await getApiCall(`${apiUrl}`).then(
    (apiresponse) => {
      if (apiresponse.status === 200) {
        return apiresponse.json();
      } 
      else if (apiresponse.status === 404) {
        return apiresponse.json();
      }
      else {
        apiresponse.json().then((data) => {
          return data;
        });
      }
    }
  );
  return responseData;
}

export async function getCaseType() {
  let apiUrl = apiUrls["caseType"];

  let responseData = await getApiCall(`${apiUrl}`).then(
    (apiresponse) => {
      if (apiresponse.status === 200) {
        return apiresponse.json();
      }
      else if (apiresponse.status === 404) {
        return apiresponse.json();
      }
      else {
        apiresponse.json().then((data) => {
          return data;
        });
      }
    }
  );
  return responseData;
}

export async function getChannel() {
  let apiUrl = apiUrls["channel"];

  let responseData = await getApiCall(`${apiUrl}`).then(
    (apiresponse) => {
      if (apiresponse.status === 200) {
        return apiresponse.json();
      } 
      else if (apiresponse.status === 404) {
        return apiresponse.json();
      }
      else {
        apiresponse.json().then((data) => {
          return data;
        });
      }
    }
  );
  return responseData;
}

export async function getAuthenticationChannel() {
  let apiUrl = apiUrls["authenticationChannel"];

  let responseData = await getApiCall(`${apiUrl}`).then(
    (apiresponse) => {
      if (apiresponse.status === 200) {
        return apiresponse.json();
      } 
      else if (apiresponse.status === 404) {
        return apiresponse.json();
      }
      else {
        apiresponse.json().then((data) => {
          return data;
        });
      }
    }
  );
  return responseData;
}

// District methods

export async function getDistricts() {
  let apiUrl = apiUrls["getDistricts"];
  let result = await getApiCall(apiUrl)
    .then((apiresponse) => {
      if (apiresponse.status === 200) {
                return apiresponse.json()
      }
    })
    .catch((error) => {
      //failure or error
      return error.response;
    });
  return result;
}

// getListOfDistricts
export async function getListOfDistricts() {
  let apiUrl = apiUrls["getListOfDistricts"];
  let result = await getApiCall(apiUrl)
    .then((apiresponse) => {
      if (apiresponse.status === 200) {
            return apiresponse.json()
      }
    })
    .catch((error) => {
      //failure or error
      return error.response;
    });
  return result;
}

export async function getDistrictsForSubdivision(subDivisionId) {
  let apiUrl = apiUrls["getDistrictsForSubDivision"];
  let result = await getApiCall(`${apiUrl}?subdivisionid=${subDivisionId}`)
    .then((apiresponse) => {
      if (apiresponse.status === 200) {
                return apiresponse.json()
      }
    })
    .catch((error) => {
      //failure or error
      return error.response;
    });
  return result;
}

export async function createDistrict(request) {
  let apiUrl = apiUrls["createDistrict"];
  let apiresponse = await postApiCall(apiUrl, request)
  return apiresponse;
}

export async function updateDistrict(id, request) {
  let apiUrl = apiUrls["updateDistrict"];
  let responseData = await putApiCall(`${apiUrl}/${id}`, request);
  return responseData;
}

export async function deleteDistrict(id) {
  let apiUrl = apiUrls["deleteDistrict"];
  let responseData = await deleteApiCall(`${apiUrl}/${id}`);
  return responseData;
}

export async function getDistrictByName(name) {
  let apiUrl = apiUrls["searchDistrictByName"];
  let result = await getApiCall(`${apiUrl}/${name}`)
    .then((apiresponse) => {
      if (apiresponse.status === 200) {
        return apiresponse.json()
      }else{
        return apiresponse.json()
      }
    })
    .catch((error) => {
      //failure or error
      return error.response;
    });
  return result;
}

// Block methods

export async function getBlocks() {
  let apiUrl = apiUrls["getBlocks"];
  let result = await getApiCall(apiUrl)
    .then((apiresponse) => {
      if (apiresponse.status === 200) {
                return apiresponse.json()
      }
    })
    .catch((error) => {
      //failure or error
      return error.response;
    });
  return result;
}

export async function getListOfBlocks(page, pageSize) {
  let apiUrl = apiUrls["getListOfBlocks"];
  let result = await getApiCall(`${apiUrl}?page_count=${page}&page_size=${pageSize}`)
    .then((apiresponse) => {
      if (apiresponse.status === 200) {
                return apiresponse.json()
      }
    })
    .catch((error) => {
      //failure or error
      return error.response;
    });
  return result;
}

export async function getBlocksForDistrict(districtId) {
  let apiUrl = apiUrls["getBlocksForDistrict"];
  let result = await getApiCall(`${apiUrl}?districtid=${districtId}`)
    .then((apiresponse) => {
      if (apiresponse.status === 200) {
                return apiresponse.json()
      }
    })
    .catch((error) => {
      //failure or error
      return error.response;
    });
  return result;
}

export async function createBlock(request) {
  let apiUrl = apiUrls["createBlock"];
  let apiresponse = await postApiCall(apiUrl, request)
  return apiresponse;
}

export async function updateBlock(id, request) {
  let apiUrl = apiUrls["updateBlock"];
  let responseData = await putApiCall(`${apiUrl}/${id}`, request);
  return responseData;
}

export async function deleteBlock(id) {
  let apiUrl = apiUrls["deleteBlock"];
  let responseData = await deleteApiCall(`${apiUrl}/${id}`);
  return responseData;
}

export async function getBlockByName(name) {
  let apiUrl = apiUrls["searchBlockByName"];
  let result = await getApiCall(`${apiUrl}/${name}`)
    .then((apiresponse) => {
      if (apiresponse.status === 200) {
        return apiresponse.json()
      }else{
        return apiresponse.json()
      }
    })
    .catch((error) => {
      //failure or error
      return error.response;
    });
  return result;
}

// Subdivision/panchayat methods

export async function getSubdivisions() {
  let apiUrl = apiUrls["getSubdivisions"];
  let result = await getApiCall(apiUrl)
    .then((apiresponse) => {
      if (apiresponse.status === 200) {
                return apiresponse.json()
      }
    })
    .catch((error) => {
      //failure or error
      return error.response;
    });
  return result;
}

export async function createSubdivision(request) {
  let apiUrl = apiUrls["createSubdivision"];
  let apiresponse = await postApiCall(apiUrl, request)
  return apiresponse;
}

export async function updateSubdivision(id, request) {
  let apiUrl = apiUrls["updateSubdivision"];
  let responseData = await putApiCall(`${apiUrl}/${id}`, request);
  return responseData;
}

export async function deleteSubdivision(id) {
  let apiUrl = apiUrls["deleteSubdivision"];
  let responseData = await deleteApiCall(`${apiUrl}/${id}`);
  return responseData;
}

export async function getSubdivisionByName(name) {
  let apiUrl = apiUrls["searchSubdivisionByName"];
  let result = await getApiCall(`${apiUrl}/${name}`)
    .then((apiresponse) => {
      if (apiresponse.status === 200) {
        return apiresponse.json()
      }else{
        return apiresponse.json()
      }
    })
    .catch((error) => {
      //failure or error
      return error.response;
    });
  return result;
}

// POS Machine

export async function getPOSMachines() {
  let apiUrl = apiUrls["viewPOSMachine"];
  let result = await getApiCall(apiUrl)
    .then((apiresponse) => {
      if (apiresponse.status === 200) {
                return apiresponse.json()
      }
    })
    .catch((error) => {
      //failure or error
      return error.response;
    });
  return result;
}

export async function createPOSMachine(request) {
  let apiUrl = apiUrls["addWPOSMachine"];
  let apiresponse = await postApiCall(apiUrl, request)
  return apiresponse;
}

export async function updatePOSMachine(id, request) {
  let apiUrl = apiUrls["updatePOSMachine"];
  let responseData = await putApiCall(`${apiUrl}/${id}`, request);
  return responseData;
}

export async function deletePOSMachine(id) {
  let apiUrl = apiUrls["deletePOSMachine"];
  let responseData = await deleteApiCall(`${apiUrl}/${id}`);
  return responseData;
}

export async function getPOSMachineById(id) {
  let apiUrl = apiUrls["searchPOSMachine"];
  let result = await getApiCall(`${apiUrl}/${id}`)
    .then((apiresponse) => {
      if (apiresponse.status === 200) {
        return apiresponse.json()
      }else{
        return apiresponse.json()
      }
    })
    .catch((error) => {
      //failure or error
      return error.response;
    });
  return result;
}

// Vendor methods

export async function getVendors() {
  let apiUrl = apiUrls["getVendors"];
  let result = await getApiCall(apiUrl)
    .then((apiresponse) => {
      if (apiresponse.status === 200) {
                return apiresponse.json()
      }
    })
    .catch((error) => {
      //failure or error
      return error.response;
    });
  return result;
}

export async function createVendor(request) {
  let apiUrl = apiUrls["createVendor"];
  let apiresponse = await postApiCall(apiUrl, request)
  return apiresponse;
}

export async function updateVendor(id, request) {
  let apiUrl = apiUrls["updateVendor"];
  let responseData = await putApiCall(`${apiUrl}/${id}`, request);
  return responseData;
}

export async function deleteVendor(id) {
  let apiUrl = apiUrls["deleteVendor"];
  let responseData = await deleteApiCall(`${apiUrl}/${id}`);
  return responseData;
}

export async function getVendorByname(name) {
  let apiUrl = apiUrls["searchVendorByName"];
  let result = await getApiCall(`${apiUrl}/${name}`)
    .then((apiresponse) => {
      if (apiresponse.status === 200) {
          return apiresponse.json()
      }else{
        return apiresponse.json()
      }
    })
    .catch((error) => {
      //failure or error
      return error.response;
    });
  return result;
}


export async function searchAndViewComplaints(requestBody, role) {
  role = sessionStorage.getItem("role");
  let apiUrl = apiUrls["searchAndView"];
  let apiresponse = await postApiCall(`${apiUrl}/${role}`, requestBody)
  return apiresponse;
}

// getComplaintsStatistics
export async function getComplaintsStatistics(requestBody, role) {
  role = sessionStorage.getItem("role");
  let apiUrl = apiUrls["getComplaintsStatistics"];
  let apiresponse = await postApiCall(`${apiUrl}/${role}`, requestBody)
  return apiresponse;
}

export async function searchComplaints(sla_datetime, requestBody) {
  let apiUrl = apiUrls["searchComplaints"];
  if (sla_datetime)
    apiUrl = `${apiUrl}?sla_datetime=${sla_datetime}`
  let apiresponse = await postApiCall(apiUrl, requestBody)
  return apiresponse;
}

export async function searchSLAComplaints(sla_datetime, requestBody, role) {
  let apiUrl = apiUrls["searchSLAComplaints"];
  if (sla_datetime)
    apiUrl = `${apiUrl}/${role}?sla_datetime=${sla_datetime}`
  let apiresponse = await postApiCall(apiUrl, requestBody)
  return apiresponse;
}

// getSLAComplaintsStatistics
export async function getSLAComplaintsStatistics(sla_datetime, requestBody, role) {
  let apiUrl = apiUrls["getSLAComplaintsStatistics"];
  if (sla_datetime)
    apiUrl = `${apiUrl}/${role}?sla_datetime=${sla_datetime}`
  let apiresponse = await postApiCall(apiUrl, requestBody)
  return apiresponse;
}

// getPeriodicStatistics
export async function getReportPeriodicStatistics(slaDateFrom, slaDateTo, reportInterval, requestBody, role) {
  let apiUrl = apiUrls["reportPeriodicStatistics"];
  apiUrl = `${apiUrl}/${role}?from_created_date=${slaDateFrom}&to_created_date=${slaDateTo}&report_interval=${reportInterval}`
  let apiresponse = await postApiCall(apiUrl, requestBody)
  return apiresponse;
}

// getPeriodicSLARepot
export async function getSLAReportBlockWise(slaDateFrom, slaDateTo, role) {
  let apiUrl = apiUrls["SLAReportBlockWise"];
  apiUrl = `${apiUrl}/${role}?start_date=${slaDateFrom}&end_date=${slaDateTo}`
  let apiResponse = await postApiCall(apiUrl, {})
  return apiResponse;
}

// getPeriodicSLARepot
export async function getSLAReportDistrictWise(slaDateFrom, slaDateTo, role) {
  let apiUrl = apiUrls["SLAReportDistrictWise"];
  apiUrl = `${apiUrl}/${role}?start_date=${slaDateFrom}&end_date=${slaDateTo}`
  let apiResponse = await postApiCall(apiUrl, {})
  return apiResponse;
}

// getPeriodicSLARepot
export async function getSLAReportDivisionWise(slaDateFrom, slaDateTo, role) {
  let apiUrl = apiUrls["SLAReportDivisionWise"];
  apiUrl = `${apiUrl}/${role}?start_date=${slaDateFrom}&end_date=${slaDateTo}`
  let apiResponse = await postApiCall(apiUrl, {})
  return apiResponse;
}

// getPeriodicSLARepot
export async function getAgeOfTicketReport(slaDateFrom, slaDateTo, role) {
  let apiUrl = apiUrls["AgeOfTicketReport"];
  apiUrl = `${apiUrl}/${role}?start_date=${slaDateFrom}&end_date=${slaDateTo}`
  let apiResponse = await postApiCall(apiUrl, {})
  return apiResponse;
}

// Assigned to methods
export async function getAssignedTo() {
  let apiUrl = apiUrls["viewAssignedTo"];
  let result = await getApiCall(apiUrl)
    .then((apiresponse) => {
      if (apiresponse.status === 200) {
        return apiresponse.json()
      }
    })
    .catch((error) => {
      //failure or error
      return error.response;
    });
  return result;
}

export async function createAssignedTo(request) {
  let apiUrl = apiUrls["addAssignedTo"];
  let apiresponse = await postApiCall(apiUrl, request)
  return apiresponse;
}

export async function updateAssignedTo(id, request) {
  let apiUrl = apiUrls["updateAssignedTo"];
  let responseData = await putApiCall(`${apiUrl}/${id}`, request);
  return responseData;
}

export async function deleteAssignedTo(id) {
  let apiUrl = apiUrls["deleteAssignedTo"];
  let responseData = await deleteApiCall(`${apiUrl}/${id}`);
  return responseData;
}

export async function searchAssignedTo(name) {
  let apiUrl = apiUrls["searchAssignedTo"];
  let result = await getApiCall(`${apiUrl}/${name}`)
    .then((apiresponse) => {
      if (apiresponse.status === 200) {
        return apiresponse.json()
      }else if (apiresponse.status === 404) {
        return apiresponse.json()
      }
    })
    .catch((error) => {
      //failure or error
      return error.response;
    });
  return result;
}


export async function getActiveVendors() {
  let apiUrl = apiUrls["getActiveVendor"];
  let result = await getApiCall(apiUrl)
    .then((apiresponse) => {
      if (apiresponse.status === 200) {
        return apiresponse.json()
      }
    })
    .catch((error) => {
      //failure or error
      return error.response;
    });
  return result;
}
export async function getActiveSubdivision() {
  let apiUrl = apiUrls["getActiveSubdivision"];
  let result = await getApiCall(apiUrl)
    .then((apiresponse) => {
      if (apiresponse.status === 200) {
        return apiresponse.json()
      }
    })
    .catch((error) => {
      //failure or error
      return error.response;
    });
  return result;
}
export async function getActiveBlock() {
  let apiUrl = apiUrls["getActiveBlock"];
  let result = await getApiCall(apiUrl)
    .then((apiresponse) => {
      if (apiresponse.status === 200) {
        return apiresponse.json()
      }
    })
    .catch((error) => {
      //failure or error
      return error.response;
    });
  return result;
}
export async function getActiveDistrict() {
  let apiUrl = apiUrls["getActiveDistrict"];
  let result = await getApiCall(apiUrl)
    .then((apiresponse) => {
      if (apiresponse.status === 200) {
        return apiresponse.json()
      }
    })
    .catch((error) => {
      //failure or error
      return error.response;
    });
  return result;
}
export async function getActiveProductModel() {
  let apiUrl = apiUrls["getActiveProductModel"];
  let result = await getApiCall(apiUrl)
    .then((apiresponse) => {
      if (apiresponse.status === 200) {
        return apiresponse.json()
      }
    })
    .catch((error) => {
      //failure or error
      return error.response;
    });
  return result;
}
export async function getActiveRole() {
  let apiUrl = apiUrls["getActiveRole"];
  let result = await getApiCall(apiUrl)
    .then((apiresponse) => {
      if (apiresponse.status === 200) {
                return apiresponse.json()
      }
    })
    .catch((error) => {
      //failure or error
      return error.response;
    });
  return result;
}
export async function getActivePOSMachine() {
  let apiUrl = apiUrls["getActivePOSMachine"];
  let result = await getApiCall(apiUrl)
    .then((apiresponse) => {
      if (apiresponse.status === 200) {
                return apiresponse.json()
      }
    })
    .catch((error) => {
      //failure or error
      return error.response;
    });
  return result;
}
export async function getActiveIrisMachine() {
  let apiUrl = apiUrls["getActiveIrisMachine"];
  let result = await getApiCall(apiUrl)
    .then((apiresponse) => {
      if (apiresponse.status === 200) {
                return apiresponse.json()
      }
    })
    .catch((error) => {
      //failure or error
      return error.response;
    });
  return result;
}
export async function getActiveWScaleMachine() {
  let apiUrl = apiUrls["getActiveWScaleMachine"];
  let result = await getApiCall(apiUrl)
    .then((apiresponse) => {
      if (apiresponse.status === 200) {
                return apiresponse.json()
      }
    })
    .catch((error) => {
      //failure or error
      return error.response;
    });
  return result;
}
export async function getActiveAssignedTo() {
  let apiUrl = apiUrls["getActiveAssignedTo"];
  let result = await getApiCall(apiUrl)
    .then((apiresponse) => {
      if (apiresponse.status === 200) {
                return apiresponse.json()
      }
    })
    .catch((error) => {
      //failure or error
      return error.response;
    });
  return result;
}

// get_assigned_to_by_level_id
export async function getAssignedToByParams(levelId, componentName) {
  let apiUrl = apiUrls["getAssignedToByParams"];
  let result = await getApiCall(`${apiUrl}/${levelId}/${componentName}`)
    .then((apiresponse) => {
      if (apiresponse.status === 200) {
                return apiresponse.json()
      }
    })
    .catch((error) => {
      //failure or error
      return error.response;
    });
  return result;
}
export async function getActiveLevel() {
  let apiUrl = apiUrls["getActiveLevel"];
  let result = await getApiCall(apiUrl)
    .then((apiresponse) => {
      if (apiresponse.status === 200) {
                return apiresponse.json()
      }
    })
    .catch((error) => {
      //failure or error
      return error.response;
    });
  return result;
}
export async function getActiveSubcategory() {
  let apiUrl = apiUrls["getActiveSubcategory"];
  let result = await getApiCall(apiUrl)
    .then((apiresponse) => {
      if (apiresponse.status === 200) {
                return apiresponse.json()
      }
    })
    .catch((error) => {
      //failure or error
      return error.response;
    });
  return result;
}
export async function getActiveCategory() {
  let apiUrl = apiUrls["getActiveCategory"];
  let result = await getApiCall(apiUrl)
    .then((apiresponse) => {
      if (apiresponse.status === 200) {
                return apiresponse.json()
      }
    })
    .catch((error) => {
      //failure or error
      return error.response;
    });
  return result;
}
export async function getActiveProduct() {
  let apiUrl = apiUrls["getActiveProduct"];
  let result = await getApiCall(apiUrl)
    .then((apiresponse) => {
      if (apiresponse.status === 200) {
                return apiresponse.json()
      }
    })
    .catch((error) => {
      //failure or error
      return error.response;
    });
  return result;
}
export async function getActiveUser() {
  let apiUrl = apiUrls["getActiveUser"];
  let result = await getApiCall(apiUrl)
    .then((apiresponse) => {
      if (apiresponse.status === 200) {
                return apiresponse.json()
      }
    })
    .catch((error) => {
      //failure or error
      return error.response;
    });
  return result;
}

export async function deleteUser(id) {
  let apiUrl = apiUrls["deleteUser"];
  let responseData = await deleteApiCall(`${apiUrl}/${id}`);
  return responseData;
}

export async function deleteUserRole(id) {
  let apiUrl = apiUrls["deleteRole"];
  let responseData = await deleteApiCall(`${apiUrl}/${id}`);
  return responseData;
}

export async function getLevelDataById(id) {
  let apiUrl = apiUrls["getLevelData"];
  let result = await getApiCall(`${apiUrl}/${id}`)
    .then((apiresponse) => {
      if (apiresponse.status === 200) {
                return apiresponse.json()
      }
    })
    .catch((error) => {
      //failure or error
      return error.response;
    });
  return result;
}

export async function uploadDistrict(fileData){
  let apiUrl = apiUrls["uploadDistrict"];
  let responceData = await postFileApiCall(`${apiUrl}`,fileData);
  return responceData;
  }

export async function uploadSubdivision(fileData){
let apiUrl = apiUrls["uploadSubdivision"];
let responceData = await postFileApiCall(`${apiUrl}`,fileData);
return responceData;
}

export async function uploadBlock(fileData){
let apiUrl = apiUrls["uploadBlock"];
let responceData = await postFileApiCall(`${apiUrl}`,fileData);
return responceData;
}

export async function uploadVendor(fileData){
let apiUrl = apiUrls["uploadVendor"];
let responceData = await postFileApiCall(`${apiUrl}`,fileData);
return responceData;
}

export async function uploadPOSMachine(fileData){
let apiUrl = apiUrls["uploadPOSMachine"];
let responceData = await postFileApiCall(`${apiUrl}`,fileData);
return responceData;
}

export async function uploadIrisMachine(fileData){
let apiUrl = apiUrls["uploadIrisMachine"];
let responceData = await postFileApiCall(`${apiUrl}`,fileData);
return responceData;
}

export async function uploadWScaleMachine(fileData){
let apiUrl = apiUrls["uploadWScaleMachine"];
let responceData = await postFileApiCall(`${apiUrl}`,fileData);
return responceData;
}

export async function uploadAssignedTo(fileData){
let apiUrl = apiUrls["uploadAssignedTo"];
let responceData = await postFileApiCall(`${apiUrl}`,fileData);
return responceData;
}

export async function uploadLevel(fileData){
  let apiUrl = apiUrls["uploadLevel"];
  let responceData = await postFileApiCall(`${apiUrl}`,fileData);
  return responceData;
  }

export async function getComplaintSummary(requestBody, role) {
  let apiUrl = apiUrls["viewSummary"];
  let apiresponse = await postApiCall(`${apiUrl}/${role}`, requestBody)
  return apiresponse;
}

export async function uploadUsers(fileData){
  let apiUrl = apiUrls["uploadUsers"];
  let responceData = await postFileApiCall(`${apiUrl}`,fileData);
  return responceData;
  }

  export async function getDealerTicketHistory(type,value, role) {
    let apiUrl = apiUrls["getDealerTicketHistory"];
    let result = await getApiCall(`${apiUrl}/${type}/${value}/${role}`)
      .then((apiresponse) => {
        if (apiresponse.status === 200) {
            return apiresponse.json()
        }
      })
      .catch((error) => {
        //failure or error
        return error.response;
      });
    return result;
  }


  export async function escalateTickets(){
    let apiUrl = apiUrls["escalateTickets"];
    let responceData = await postFileApiCall(`${apiUrl}`,{});
    return responceData;
  }

  export async function getAgentEngagementStatus(request) {
    let apiUrl = apiUrls["agentEngagementStatus"];
    let apiresponse = await postApiCall(apiUrl, request)
    return apiresponse;
  }

  // State methods

export async function getStates() {
  let apiUrl = apiUrls["getStates"];
  let result = await getApiCall(apiUrl)
    .then((apiresponse) => {
      if (apiresponse.status === 200) {
                return apiresponse.json()
      }
    })
    .catch((error) => {
      //failure or error
      return error.response;
    });
  return result;
}

export async function getActiveStates() {
  let apiUrl = apiUrls["getActiveState"];
  let result = await getApiCall(apiUrl)
    .then((apiresponse) => {
      if (apiresponse.status === 200) {
                return apiresponse.json()
      }
    })
    .catch((error) => {
      //failure or error
      return error.response;
    });
  return result;
}

export async function createState(request) {
  let apiUrl = apiUrls["createState"];
  let apiresponse = await postApiCall(apiUrl, request)
  return apiresponse;
}

export async function updateState(id, request) {
  let apiUrl = apiUrls["updateState"];
  let responseData = await putApiCall(`${apiUrl}/${id}`, request);
  return responseData;
}

export async function deleteState(id) {
  let apiUrl = apiUrls["deleteState"];
  let responseData = await deleteApiCall(`${apiUrl}/${id}`);
  return responseData;
}

export async function getStateByName(name) {
  let apiUrl = apiUrls["searchStateByName"];
  let result = await getApiCall(`${apiUrl}/${name}`)
    .then((apiresponse) => {
      if (apiresponse.status === 200) {
          return apiresponse.json()
      }else{
        return apiresponse.json()
      }
    })
    .catch((error) => {
      //failure or error
      return error.response;
    });
  return result;
}

export async function getApp() {
  let apiUrl = apiUrls["app"];

  let responseData = await getApiCall(`${apiUrl}`).then(
    (apiresponse) => {
      if (apiresponse.status === 200) {
        return apiresponse.json();
      } 
      else if (apiresponse.status === 404) {
        return apiresponse.json();
      }
      else {
        apiresponse.json().then((data) => {
          return data;
        });
      }
    }
  );
  return responseData;
}

export async function initiateCall(request) {
  let apiUrl = apiUrls["initiateCall"];
  let apiresponse = await postApiCall(apiUrl, request)
  return apiresponse;
}

// Integration

export async function getIntegrations() {
  let apiUrl = apiUrls["getIntegrations"];
  let result = await getApiCall(apiUrl)
    .then((apiresponse) => {
      if (apiresponse.status === 200) {
                return apiresponse.json()
      }
    })
    .catch((error) => {
      //failure or error
      return error.response;
    });
  return result;
}

export async function createIntegrations(request) {
  let apiUrl = apiUrls["createIntegrations"];
  let apiresponse = await postApiCall(apiUrl, request)
  return apiresponse;
}

export async function updateIntegrations(id, request) {
  let apiUrl = apiUrls["updateIntegrations"];
  let responseData = await putApiCall(`${apiUrl}/${id}`, request);
  return responseData;
}

export async function deleteIntegrations(id) {
  let apiUrl = apiUrls["deleteIntegrations"];
  let responseData = await deleteApiCall(`${apiUrl}/${id}`);
  return responseData;
}

export async function uploadAttachment(fileData){
  let apiUrl = apiUrls["uploadAttachment"];
  let responceData = await postFileApiCall(`${apiUrl}`,fileData);
  return responceData;
  }

  export async function getAttachment(ticket_number) {
    let apiUrl = apiUrls["getAttachment"];
    let result = await getApiCall(`${apiUrl}?ticket_number=${ticket_number}`)
      .then((apiresponse) => {
        // if (apiresponse.status === 200) {
            return apiresponse.json()
        // }
      })
      .catch((error) => {
        //failure or error
        return error.response;
      });
    return result;
  }

  export async function generateOtp(request) {
    let apiUrl = apiUrls["generateOtp"];
    let apiresponse = await postApiCallWithoutToken(apiUrl, request)
    return apiresponse;
  }

  export async function verifyOtp(request) {
    let apiUrl = apiUrls["verifyOtp"];
    let apiresponse = await postApiCallWithoutToken(apiUrl, request)
    return apiresponse;
  }

  export async function getProjectMaster() {
    let apiUrl = apiUrls["projectMaster"];
  
    let responseData = await getApiCall(`${apiUrl}`).then(
      (apiresponse) => {
        if (apiresponse.status === 200) {
          return apiresponse.json();
        } 
        else if (apiresponse.status === 404) {
          return apiresponse.json();
        }
        else {
          apiresponse.json().then((data) => {
            return data;
          });
        }
      }
    );
    return responseData;
  }

  export async function getStatusMaster() {
    let apiUrl = apiUrls["statusMaster"];
  
    let responseData = await getApiCall(`${apiUrl}`).then(
      (apiresponse) => {
        if (apiresponse.status === 200) {
          return apiresponse.json();
        } 
        else if (apiresponse.status === 404) {
          return apiresponse.json();
        }
        else {
          apiresponse.json().then((data) => {
            return data;
          });
        }
      }
    );
    return responseData;
  }

  export async function getReportIntervalMaster() {
    let apiUrl = apiUrls["reportIntervalMaster"];
  
    let responseData = await getApiCall(`${apiUrl}`).then(
      (apiresponse) => {
        if (apiresponse.status === 200) {
          return apiresponse.json();
        } 
        else if (apiresponse.status === 404) {
          return apiresponse.json();
        }
        else {
          apiresponse.json().then((data) => {
            return data;
          });
        }
      }
    );
    return responseData;
  }

  export async function getTokenTypeMaster() {
    let apiUrl = apiUrls["tokenTypeMaster"];
  
    let responseData = await getApiCall(`${apiUrl}`).then(
      (apiresponse) => {
        if (apiresponse.status === 200) {
          return apiresponse.json();
        } 
        else if (apiresponse.status === 404) {
          return apiresponse.json();
        }
        else {
          apiresponse.json().then((data) => {
            return data;
          });
        }
      }
    );
    return responseData;
  }

  export async function forgotPassword(request) {
    let apiUrl = apiUrls["forgotPassword"];
    let responseData = await putApiCallWithoutToken(apiUrl, request);
    return responseData;
  }

  export async function getDependencyMaster() {
    let apiUrl = apiUrls["dependencyMaster"];
  
    let responseData = await getApiCall(`${apiUrl}`).then(
      (apiresponse) => {
        if (apiresponse.status === 200) {
          return apiresponse.json();
        } 
        else if (apiresponse.status === 404) {
          return apiresponse.json();
        }
        else {
          apiresponse.json().then((data) => {
            return data;
          });
        }
      }
    );
    return responseData;
  }

  