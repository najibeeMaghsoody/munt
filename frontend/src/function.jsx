import axios from "axios";

const API_URL = "http://127.0.0.1:8000/api";

export const register = async (data) => {
  try {
    const response = await axios.post(
      `${API_URL}/register`,
      {
        name: data.name,
        email: data.email,
        password: data.password,
        password_confirmation: data.password_confirmation,
      },
      { withCredentials: true }
    );

    const token = response.data.token;
    if (token) {
      localStorage.setItem("token", token);
    }

    console.log("Gebruiker geregistreerd:", response.data);
    return response.data;
  } catch (error) {
    console.error(
      "Fout bij registratie:",
      error.response?.data || error.message
    );
    throw error;
  }
};

export const login = async (data) => {
  try {
    const response = await axios.post(
      `${API_URL}/login`,
      {
        email: data.email,
        password: data.password,
      },
      { withCredentials: true }
    );

    const token = response.data.token;
    if (token) {
      localStorage.setItem("token", token);
    }

    console.log("Gebruiker login succesvol:", response.data);
    return response.data;
  } catch (error) {
    console.error("Fout bij login:", error.response?.data || error.message);
    throw error;
  }
};

export const getToken = () => {
  return localStorage.getItem("token");
};

export const logout = () => {
  localStorage.removeItem("token");
};
