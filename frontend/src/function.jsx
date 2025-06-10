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
  const token = localStorage.getItem("token");
  const res = await fetch("http://localhost:8000/api/logout", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`, // <- belangrijk!
    },
  });

  if (!res.ok) {
    throw new Error("Logout mislukt");
  }

  localStorage.removeItem("token");
};
// CATEGORIES FUNCTIONALITEIT
export const getCategories = async () => {
  const token = getToken();
  try {
    const response = await axios.get(`${API_URL}/categories`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error(
      "Fout bij ophalen van categorieën:",
      error.response?.data || error.message
    );
    throw error;
  }
};

// ✅ Voeg één categorie toe
export const addCategory = async (name, file_id = null) => {
  const token = getToken();
  try {
    const response = await axios.post(
      `${API_URL}/categories`,
      { name, file_id },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error(
      "Fout bij toevoegen categorie:",
      error.response?.data || error.message
    );
    throw error;
  }
};

// ✅ Haal één specifieke categorie op
export const getCategory = async (id) => {
  const token = getToken();
  try {
    const response = await axios.get(`${API_URL}/categories/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error(
      "Fout bij ophalen categorie:",
      error.response?.data || error.message
    );
    throw error;
  }
};

// ✅ Werk een bestaande categorie bij
export const updateCategory = async (id, updatedData) => {
  const token = getToken();
  try {
    const response = await axios.put(
      `${API_URL}/categories/${id}`,
      updatedData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error(
      "Fout bij bijwerken categorie:",
      error.response?.data || error.message
    );
    throw error;
  }
};

// ✅ Verwijder een categorie
// function.js
export async function deleteCategory(categoryId, token) {
  const response = await fetch(
    `http://127.0.0.1:8000/api/categories/${categoryId}`,
    {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`, // indien nodig
        Accept: "application/json",
      },
    }
  );

  if (!response.ok) {
    throw new Error("Verwijderen mislukt");
  }

  return await response.json();
}

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
export const charts = async (budgetId) => {
  const token = getToken();
  const response = await axios.get(`${API_URL}/budgets/${budgetId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};
export const getCharts = async () => {
  const token = getToken();
  try {
    const response = await axios.get(`http://localhost:8000/api/charts`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Fout bij ophalen van charts:", error.response?.data || error.message);
    throw error;
  }
};
