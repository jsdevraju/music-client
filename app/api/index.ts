import axios from "axios";
import { apiEndPoint } from "../utils";

export const getUsers = async (token: string) => {
  try {
    const { data } = await axios.get(`${apiEndPoint}/admin/users`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    return data?.user;
  } catch (error: any) {
    return error.message;
  }
};

export const getArtists = async (token: string) => {
  try {
    const { data } = await axios.get(`${apiEndPoint}/artist/getAllArtist`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    return data?.artist;
  } catch (error: any) {
    return error.message;
  }
};

export const getSongs = async (token: string) => {
  try {
    const { data } = await axios.get(`${apiEndPoint}/song/getAllSong`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    return data?.song;
  } catch (error: any) {
    return error.message;
  }
};

export const getAlbums = async (token: string) => {
  try {
    const { data } = await axios.get(`${apiEndPoint}/album/getAllAlbum`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    return data?.album;
  } catch (error: any) {
    return error.message;
  }
};

export const saveNewSong = async (token: string, fromData: any) => {
  try {
    const { data } = await axios.post(`${apiEndPoint}/song/create`, fromData, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    return data?.song;
  } catch (error: any) {
    return error.message;
  }
};

export const saveNewArtist = async (token: string, artistData: any) => {
  try {
    const { data } = await axios.post(
      `${apiEndPoint}/artist/create`,
      artistData,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return data?.artist;
  } catch (error: any) {
    return error.message;
  }
};

export const saveNewAlbum = async (token: string, fromData: any) => {
  try {
    const { data } = await axios.post(
      `${apiEndPoint}/album/create-album`,
        fromData,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return data?.album;
  } catch (error: any) {
    return error.message;
  }
};

