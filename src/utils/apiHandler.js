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

  createComment(equipmentId, commentData) {
    return this.api.post(`/equipments/${equipmentId}/comments`, commentData);
  }

  searchEquipmentsByPostalCode(searchPostalCode) {
    return this.api.get(`/equipments?postalCode=${searchPostalCode}`);
  }

  getCommentsForEquipment(equipmentId) {
    return this.api.get(`/equipments/${equipmentId}/comments`);
  }
  deleteComment(commentId) {
    return this.api.delete(`/comments/${commentId}`);
  }

  updateComment(commentId, updatedCommentData) {
    return this.api.put(`/comments/${commentId}`, updatedCommentData);
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
