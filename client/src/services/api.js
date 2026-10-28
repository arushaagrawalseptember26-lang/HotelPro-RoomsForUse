import axios from "axios";

// Base API instance
const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:8000",
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor to attach JWT token
API.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
      config.headers["auth-token"] = token;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor for unified error formatting
API.interceptors.response.use(
  (response) => response,
  (error) => {
    const message =
      error.response?.data?.msg ||
      error.response?.data?.message ||
      error.message ||
      "An unexpected error occurred";
    return Promise.reject(new Error(message));
  }
);

// Auth Endpoints
export const authApi = {
  signup: async (userData) => {
    // Call standard endpoint with fallback to /SignUp
    try {
      const res = await API.post("/api/user/SignUp", userData);
      return res.data;
    } catch {
      const res = await API.post("/SignUp", userData);
      return res.data;
    }
  },
  login: async (credentials) => {
    try {
      const res = await API.post("/api/user/Login", credentials);
      return res.data;
    } catch {
      const res = await API.post("/Login", credentials);
      return res.data;
    }
  },
  getProfile: async () => {
    const res = await API.get("/api/user/profile");
    return res.data;
  },
};

// Room Endpoints
export const roomApi = {
  getRooms: async () => {
    try {
      const res = await API.get("/api/rooms/getrooms");
      return res.data;
    } catch {
      const res = await API.get("/getrooms");
      return res.data;
    }
  },
  getRoomById: async (id) => {
    const res = await API.get(`/api/rooms/${id}`);
    return res.data;
  },
  addRoom: async (roomData) => {
    try {
      const res = await API.post("/api/rooms/addroom", roomData);
      return res.data;
    } catch {
      const res = await API.post("/addroom", roomData);
      return res.data;
    }
  },
  deleteRoom: async (id) => {
    const res = await API.delete(`/api/rooms/deleteroom/${id}`);
    return res.data;
  },
};

// Booking Endpoints
export const bookingApi = {
  bookRoom: async (bookingData) => {
    try {
      const res = await API.post("/api/bookings/bookroom", bookingData);
      return res.data;
    } catch {
      const res = await API.post("/bookroom", bookingData);
      return res.data;
    }
  },
  cancelBooking: async (bookingid, roomid) => {
    try {
      const res = await API.post("/api/bookings/cancelbooking", { bookingid, roomid });
      return res.data;
    } catch {
      const res = await API.post("/cancelbooking", { bookingid, roomid });
      return res.data;
    }
  },
  getUserBookings: async (userid) => {
    const res = await API.get(`/api/bookings/mybookings/${userid}`);
    return res.data;
  },
  getAllBookings: async () => {
    const res = await API.get("/api/bookings/allbookings");
    return res.data;
  },
};

// Admin Endpoints
export const adminApi = {
  getAllUsers: async () => {
    const res = await API.get("/api/admin/allusers");
    return res.data;
  },
  getAllBookings: async () => {
    const res = await API.get("/api/admin/allbookings");
    return res.data;
  },
  getStats: async () => {
    const res = await API.get("/api/admin/stats");
    return res.data;
  },
};

export default API;
