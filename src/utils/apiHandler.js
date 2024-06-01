import axios from "axios";
import { API_BASE_URL } from "../consts";

class ApiHandler {
  constructor() {
    this.api = axios.create({
      baseURL: API_BASE_URL,
    });

    this.api.interceptors.request.use(
      (config) => {
        const authToken = localStorage.getItem("authToken");

        if (authToken) {
          config.headers.Authorization = `Bearer ${authToken}`;
        }

        return config;
      },
      (err) => {
        return Promise.reject(err);
      }
    );
  }

  getAllEquipments(page) {
    return this.api.get(`/equipments?page=${page}`);
  }

  getEquipementDetails(equipmentId) {
    return this.api.get(`/equipments/${equipmentId}`);
  }

  createJournal(journalData) {
    return this.api.post("/journals", journalData);
  }
  createComment(/*equipmentId,*/ commentData) {
    return this.api.post(
      `/equipments/6656fd89cd1462cbb55380ee/comments`,
      commentData
    );
  }

  /*
  createComment(commentData) {
    return this.api.post(`/equipments/${equipmentId}/comments`);
  }
  */

  login(creadentials) {
    return this.api.post("/users/login", creadentials);
  }

  signup(data) {
    return this.api.post("/users/signup", data);
  }

  getUser() {
    return this.api.get("/users/me");
  }
}

const apiHandler = new ApiHandler();

export default apiHandler;
