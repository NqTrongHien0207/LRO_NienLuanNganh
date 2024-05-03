// import { API_URL } from "./index.js";
// export const API_URL = "http://localhost:8080";
// const API_URL = "https://api-lro.onrender.com";
export const API_URL = process.env.REACT_APP_API_KEY;

console.log(API_URL);
// console.log(API_URL);
// // ROUTER NOT AUTH MIDDLEWARES
// export const LOGIN = `${API_URL}/api/login`;
// export const REGISTER = `${API_URL}/api/register`;

export const FIND_ONE_DOC = `${API_URL}/api/findonedoc`;
export const FIND_ONE_ART = `${API_URL}/api/findoneart`;

export const PAGE_DOCS = `${API_URL}/api/pagedocs`;
export const PAGE_ARTS = `${API_URL}/api/pagearts`;

export const DOCS_HIGHT = `${API_URL}/api/docshight`;
export const ART_HIGHT = `${API_URL}/api/arthight`;

export const LOGIN = `${API_URL}/api/login`;
export const REGISTER = `${API_URL}/api/register`;
