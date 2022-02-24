import { Project } from './Project';

const baseUrl = 'http://localhost:4000';
const url = `${baseUrl}/projects`;

/**
 ok - honesty. I don't totally get all of this....
 yes: error codes to error string.

 yes: checkstatus. If its good, return it. if not, tell the console.

yes: parseJSON : ronseal, just typecheck the argument & call.json 

sort of: delay. not used a promise in this way before(new), and not really used to returning 
functions from a function call. Although, as a .then callback, it sort of makes sense
just needs getting used to.

yes (ish): projectAPI, all understood, although I wouldn't have known (by a long way) how to do this on the fly myself.
 */

function translateStatusToErrorMessage(status: number) {
    switch (status) {
      case 401:
        return 'Please login again.';
      case 403:
        return 'You do not have permission to view the project(s).';
      default:
        return 'There was an error retrieving the project(s). Please try again.';
    }
  }

function checkStatus(response: any) {
if (response.ok) {
    return response;
} else {
    const httpErrorInfo = {
    status: response.status,
    statusText: response.statusText,
    url: response.url,
    };
    console.log(`log server http error: ${JSON.stringify(httpErrorInfo)}`);
  
     let errorMessage = translateStatusToErrorMessage(httpErrorInfo.status);
     throw new Error(errorMessage);
    }
}

function parseJSON(response: Response) {
    return response.json();
  }
/*
function delay(ms: number) {
  return function (x: any): Promise<any> {
    return new Promise((resolve) => setTimeout(() => resolve(x), ms));
  };
}
*/

const projectAPI = {

    get(page = 1, limit = 20) {
      return fetch(`${url}?_page=${page}&_limit=${limit}&_sort=name`)
        .then(checkStatus)
        .then(parseJSON)
        .catch((error: TypeError) => {
          console.log('log client error ' + error);
          throw new Error(
            'There was an error retrieving the projects. Please try again.'
          );
        });
    },
    find(id: number) {
      return fetch(`${url}/${id}`)
      .then(checkStatus)
      .then(parseJSON);
    },

    put(project: Project) {
      return fetch(`${url}/${project.id}`, {
        method: 'PUT',
        body: JSON.stringify(project),
        headers: {
          'Content-Type' : 'application/json'
        }
      })
      .then(checkStatus)
      .then(parseJSON)
      .catch((error: TypeError) => {
        console.log('log client error ' + error);
        throw new Error(
          'There was an error updating the project. Please try again.'
        );
      });
    }
  };

  export { projectAPI}