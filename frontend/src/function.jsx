import axios from "axios";

const API_URL = "http://127.0.0.1:8000/api";
// User Register and Login and Logout Function
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

export const logout = async () => {
  const token = getToken();

  try {
    await axios.post(
      `${API_URL}/logout`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true,
      }
    );
  } catch (error) {
    console.error(
      "Fout bij server-side logout:",
      error.response?.data || error.message
    );
  } finally {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  }
};
// categories functions
export const getCategories = async () => {
  try {
    const token = getToken();
    if (!token) {
      throw new Error("Geen token gevonden");
    }

    const response = await axios.get(`${API_URL}/categories`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (error) {
    console.error("Fout bij ophalen categorieën:", error);
    throw error;
  }
};

export const addCategory = async (name, icon) => {
  try {
    const token = getToken();
    if (!token) {
      throw new Error("Geen token gevonden");
    }

    const response = await axios.post(
      `${API_URL}/add-category`,
      { name, icon },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ name, icon }),
      }
    );

    return response.data;
  } catch (error) {
    console.error("Fout bij toevoegen categorie:", error);
    throw error;
  }
};

// add budget function
export const addBudget = async ({
  name,
  budget,
  start_date,
  end_date,
  recurrence,
}) => {
  try {
    const token = getToken();
    if (!token) {
      throw new Error("Geen token gevonden");
    }

    const response = await axios.post(
      `${API_URL}/budgets`,
      {
        name,
        budget,
        start_date,
        end_date,
        recurrence,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Fout bij toevoegen budget:", error);
    throw error;
  }
};

export const getBudgets = async () => {
  const token = getToken();
  const response = await axios.get(`${API_URL}/budgets`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

export const updateBudget = async (budgetId, budgetData) => {
  const token = getToken();
  const response = await axios.put(
    `${API_URL}/budgets/${budgetId}`,
    budgetData,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.data;
};

export const deleteBudget = async (budgetId) => {
  const token = getToken();
  const response = await axios.delete(`${API_URL}/budgets/${budgetId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};
