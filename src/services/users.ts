import { callIApi } from "../helpers/api";
import type { IResponseUsers, IUserDetail, IUserRepo } from "../types/users";

const getUsers = async (username: string, page: number) => {
  const response = await callIApi.get<IResponseUsers>(`/search/users?q=${username}&per_page=5&page=${page}`);
  return response.data;
};
const getUserDetail = async (username: string) => {
  const response = await callIApi.get<IUserDetail>(`/users/${username}`);
  return response.data;
}
const getUserRepos = async (username: string) => {
  const response = await callIApi.get<IUserRepo[]>(`/users/${username}/repos`);
  return response.data;
};

export const UserServices = {
  getUsers: {
    key: "get-users",
    call: getUsers
  },
  getUserDetail: {
    key: "get-user-detail",
    call: getUserDetail
  },
  getUserRepos: {
    key: "get-user-repos",
    call: getUserRepos
  }
}