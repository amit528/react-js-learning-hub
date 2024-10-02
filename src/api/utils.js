import axios from "axios";

//Get Method - call by passing endpoint, end point can have query params as well
const getApiCall = async (endpoint) => {
  // var userData = sessionStorage.getItem("userData")? JSON.parse(sessionStorage.getItem("userData")) : null; 
  var token = sessionStorage.getItem("token")
  // while (!token) {
  //   userData = sessionStorage.getItem("userData")? JSON.parse(sessionStorage.getItem("userData")) : null; 
  //   token = userData?.access_token? userData.access_token : JSON.parse(sessionStorage.getItem("token")); 
  // }
    return await fetch(endpoint, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization' : "Bearer " + token
        },
      data: {},
    })
    .then(function (res) {
      //success
      return res.json()
    }).then((data) => {
      return data;
    })
    .catch(function (error) {
      //failure or error
      return error.response;
    });
};

const getApiCallA = async (endpoint) => {
  const axios = require('axios');
  // let data = JSON.stringify({
  //   "id": 212121,
  //   "name": "MONOSJ",
  //   "mobile_number": "311"
  // });
  let config = {
    method: 'get',
    maxBodyLength: Infinity,
    url: endpoint,
    headers: {
      'Content-Type': 'application/json'
    },
  };
  let response = await axios.request(config)
  return response;

  // .then((response) => {
  //   //console.log(JSON.stringify(response.data));
  // })
  // .catch((error) => {
  //   //console.log(error);
  // });
}

//Get Method for File/Blob - call by passing endpoint, end point can have query params as well
const getFileApiCall = async (endpoint) => {
  var userData = JSON.parse(sessionStorage.getItem("userData")); 
  var token = userData.access_token
  return await fetch(endpoint, {
    headers: {
      'Content-Type': 'application/json',
      'Authorization' : "Bearer " + token
      },
    data: {},
  })
  .then(function (res) {
    //success
    return res.blob();
  })
  .catch(function (error) {
    //failure or error
    return error.response;
  });
};

//Post Method - - call by passing endpoint and request body
const postApiCallA = async (endpoint, request) => {  
  //console.log('reqbody', request);
  let data = JSON.stringify(request);

  const axios = require('axios');
  let config = {
    method: 'post',
    maxBodyLength: Infinity,
    url: endpoint,
    headers: {
      'Content-Type': 'application/json'
    },
    data : data
  };
  let response = await axios.request(config);
  return response;
  // .then((response) => {
  //   // console.log(JSON.stringify(response.data));
  //   //console.log(response.data);
  //   if(response.data.status === 200)
  //     return response.data;
  // })
  // .catch((error) => {
  //   //console.log(error);
  // });
}

//Post Method - - call by passing endpoint and request body
const putApiCallA = async (endpoint, request) => {  
  //console.log('reqbody', request);
  let data = JSON.stringify(request);

  const axios = require('axios');
  let config = {
    method: 'put',
    maxBodyLength: Infinity,
    url: endpoint,
    headers: {
      'Content-Type': 'application/json'
    },
    data : data
  };
  let response = await axios.request(config);
  return response;
  // .then((response) => {
  //   // console.log(JSON.stringify(response.data));
  //   //console.log(response.data);
  //   if(response.data.status === 200)
  //     return response.data;
  // })
  // .catch((error) => {
  //   //console.log(error);
  // });
}

//Post Method - - call by passing endpoint and request body
const postApiCall = async (endpoint, request) => {
  //console.log('reqbody', request);
  var token = sessionStorage.getItem("token")
  let reqbody = JSON.stringify(request)
  let result = await fetch(endpoint, {
          // mode: 'no-cors',
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
              'Authorization': "Bearer " + token,
              "Allow-Origin": "*",
          },
          body: reqbody,
      }).then(apiresponse => {
          return apiresponse.json();
      }).then(data => {
        return data
      })
      .catch(error => {
          //failure or error
          return error.response;
      });
  // console.log(result)
  return result;
}

//Post Method - - call by passing endpoint and request body
const postApiCallWithoutToken = async (endpoint, request) => {
  console.log('reqbody', request);
  let reqbody = JSON.stringify(request)
  console.log(reqbody);
  let result = await fetch(endpoint, {
          // mode: 'no-cors',
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
              "Allow-Origin": "*",
          },
          body: reqbody,
      }).then(apiresponse => {
          return apiresponse.json();
      }).then(data => {
        if(data.payload){
          return decryptData(data.payload);
        }
        return data
      })
      .catch(error => {
          //failure or error
          return error.response;
      });
  // console.log(result)
  return result;
}

//Put Method
const putApiCall = async (endpoint, request) => {
  let reqbody = JSON.stringify(request)
  var token = sessionStorage.getItem("token")
  //  //console.log(token)
  let result = await axios
        .put(endpoint, 
        reqbody,
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization' : "Bearer " + token,
            'Access-Control-Allow-Origin': '*'
            },        
            data: {}
        },
    )
    .then((res) => {
      if(res.status === 200)
      {
        return res.json()
      }
      if(res.status === 202)
      {
        return res
      }
      else
      {
        // console.log("error")
        res.json()
        .then(error =>
            {
              return error;
            }
          )
      }
    })
    .catch((error) => {
      //failure or error
      return error.response;
    });
    return result;
};

const putApiCallWithoutToken = async (endpoint, request) => {
  let reqbody = JSON.stringify(request)
  let result = await axios
        .put(endpoint, 
        reqbody,
        {
          headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
            },        
            data: {}
        },
    )
    .then((res) => {
      if(res.status === 200)
      {
        return res.json()
      }
      if(res.status === 202)
      {
        return res
      }
      else
      {
        // console.log("error")
        res.json()
        .then(error =>
            {
              return error;
            }
          )
      }
    })
    .catch((error) => {
      //failure or error
      return error.response;
    });
    return result;
};

//Post FormData Method
const postFormDataApiCall = async (endpoint, request) => {
  // console.log(request)
  let headersList = {
    "Accept": "*/*",
  }
  let result = await fetch(endpoint, {
        method: "POST",
        body: request,
        headers: headersList
      }
    )
  return result;
}



//Post FormData Method and also with parameters
const postFileApiCall = async (endpoint, request) => {
  // console.log(request)
  var token = sessionStorage.getItem("token")
  let headersList = {
    'Accept': 'application/json',
    // 'Content-Type': 'multipart/form-data',
    'Authorization' : "Bearer " + token,
  }
  let result = await fetch(endpoint, {
        method: "POST",
        body: request,
        headers: headersList
      }
    )
    .then((res) => {
      if(res.status === 200)
      {
        // console.log("success")
        // console.log(res)
        //// console.log(apiresponse.json().then())
        return res.json()
      }
      if(res.status === 202)
      {
        // console.log("updated")
        // console.log(res)
        //// console.log(apiresponse.json().then())
        return res
      }
      else
      {
        // console.log("error")
        return res.json()
      }
    })
    .catch((error) => {
      //failure or error
      return error.response;
    });
  return result;
}


const deleteApiCallA = async (endpoint, data) => {
  const axios = require('axios');

let config = {
  method: 'delete',
  maxBodyLength: Infinity,
  url: endpoint,
  headers: {
    'Content-Type': 'application/json'
  },
  data: data
};
let response = axios.request(config);
return response;
// .then((response) => {
//   //console.log(JSON.stringify(response.data));
// })
// .catch((error) => {
//   //console.log(error);
// });
}
//Delete Method


const deleteApiCall = async (endpoint) => {
  
  let token = sessionStorage.getItem("token")
  return await axios
    .delete(endpoint, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization' : "Bearer " + token,
        'Access-Control-Allow-Origin': '*'
        },
      data: {},
    })
    .then((res) => {
      //success
      return res;
    })
    .catch((error) => {
      //failure or error
      return error.response;
    });
};


const postApiCallFile = async (endpoint, reqBody) => {
  var userData = JSON.parse(sessionStorage.getItem("userData")); 
  var token = userData.access_token
  return await axios
    .post(endpoint, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization' : "Bearer " + token,
        'Access-Control-Allow-Origin': '*'
        },
      responseType: 'blob',
      data: {},
    })
    .then((res) => {
      //success
      return res;
    })
    .catch((error) => {
      //failure or error
      return error.response;
    });
};



export {
  
  getApiCall,
  postApiCall,
  putApiCall,
  deleteApiCall,
  postApiCallFile,
  postFormDataApiCall,
  postFileApiCall,
  getFileApiCall,
  postApiCallA,
  getApiCallA,
  deleteApiCallA,
  putApiCallA,
  postApiCallWithoutToken,
  putApiCallWithoutToken
  // deleteApiCallUser
};