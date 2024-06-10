"use server";
import axios from "axios";

const github_url = process.env.GITHUB_URL;
const backend_url = process.env.BACKEND_URL;

export async function getRepoFile(repo) {

  repo = {
    username: repo.username,
    repo_name: repo.repo_name,
    file_name: repo.file_name,
    access_token: repo.access_token,
  };

  if(!repo.file_name.includes('.sol')){
    repo.file_name = repo.file_name + '.sol';
  }

  const url = `${github_url}/repos/${repo.username}/${repo.repo_name}/contents/${repo.file_name}`;
  // console.log('here is URL ', url)
  const headers = { };

  if (repo.access_token) {
    headers["Authorization"] = `token ${repo.access_token}`;
  }

  // Request to github
  let config = {
    method: 'get', maxBodyLength: Infinity, url,
    headers
  };
  let response = null;
  try {
    response = await axios.request(config);
    response = await response.data
    
    console.log( 'response from github', response);
    if(!response?.download_url){
      return {
        'status':false,
        'message':'File not found in response!'
      }
    }

    const file_path = response.download_url;
    return await get_report_from_backend(file_path);

  } catch (error) {    
    if (!repo.access_token) {
      return {
        status: false,
        message:
          "Not found! You may have missed access token while trying to get private repository.",
      };
    } else {
      return {
        status: false,
        message: `Not found repository or file! ( ${error.message} )`,
      };
    }
  } 
  
  
}


async function get_report_from_backend(file_path) {

  let config = {
    method: 'post',
    maxBodyLength: Infinity,
    url: backend_url + 'contract_report?file_path='+ file_path
  };

  try {
    let response = await axios.request(config)
    response = await response.data;
    // console.log( 'reponse from backend => ', response)
    return response;
  } catch (error) {
    return {
      'status':false,
      'message': 'Failed to fetch the report. Please check the details and try again.'
    }
  }


}
