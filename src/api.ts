export const pagination = 15;
export const ACCESS_KEY = `0qZwRSoHlj25mmgXnv2Ztgk4T2EAefFlycQuJZoJFR8`;
export const initModImg = {
    alt_description: "alt",
    urls: {
      regular: "regular",
    },
  };


  import axios from "axios";
  import { Photo } from "./App/App.types";
  
  const instance = axios.create({
    baseURL: "https://api.unsplash.com",
  });
  
  interface ImageSearchResponse {
    total: number;
    total_pages: number;
    results: Photo[];
  }
  
  export const fetchImagesSearch = async (
    query: string,
    numberOfpage: number,
    pagination: number
  ): Promise<ImageSearchResponse> => {
    const response = await instance.get("/search/photos", {
      params: {
        client_id: "1bnOnn5qY0HAwAJR9CN6sX_5D3JT3cSAFzB3seTyYiU",
        query: query,
        orientation: "landscape",
        page: numberOfpage,
        per_page: pagination,
      },
    });
  
    return response.data;
  };