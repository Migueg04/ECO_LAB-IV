import { makeRequest } from "../app.js";

export default function renderScreen1() {
  const app = document.getElementById("app");
  app.innerHTML = `
      <div id="screen1">
        <h2>Laboratorio de Supa</h2>
        
        <div class="sections-container">
          <div class="section">
            <h3>Productos</h3>
            <div class="button-grid">
              <button id="get-all-products">Todos los productos</button>
              <button id="get-cheap-products">Productos baratos de menos de 50</button>
              <button id="get-electronics">Electrónicos de más de 30</button>
              <button id="get-page1">Página 1 de paginación</button>
              <button id="get-page2">Página 2 de paginación</button>
            </div>
          </div>

          <div class="section">
            <h3>Usuarios</h3>
            <div class="button-grid">
              <button id="get-users-basic">Usuarios básicos</button>
              <button id="get-all-users">Todos los usuarios</button>
              <button id="get-user1-products">Productos del usuario 1</button>
            </div>
          </div>

          <div class="section">
            <h3>Órdenes y Posts</h3>
            <div class="button-grid">
              <button id="get-orders">Todas las órdenes</button>
              <button id="search-tutorial-posts">Buscar posts "tutorial"</button>
            </div>
          </div>
        </div>

        <div id="results" class="results"></div>
    </div>
      `;

  // Event listeners para productos
  document
    .getElementById("get-all-products")
    .addEventListener("click", getAllProducts);
  document
    .getElementById("get-cheap-products")
    .addEventListener("click", getCheapProducts);
  document
    .getElementById("get-electronics")
    .addEventListener("click", getElectronicsProducts);
  document
    .getElementById("get-page1")
    .addEventListener("click", () => getProductsPage(1));
  document
    .getElementById("get-page2")
    .addEventListener("click", () => getProductsPage(2));

  // Event listeners para usuarios
  document
    .getElementById("get-users-basic")
    .addEventListener("click", getUsersBasic);
  document
    .getElementById("get-all-users")
    .addEventListener("click", getAllUsers);
  document
    .getElementById("get-user1-products")
    .addEventListener("click", () => getUserProducts(1));

  // Event listeners para órdenes y posts
  document.getElementById("get-orders").addEventListener("click", getOrders);
  document
    .getElementById("search-tutorial-posts")
    .addEventListener("click", searchTutorialPosts);

  function displayResults(title, data) {
    const resultsDiv = document.getElementById("results");

    // Si los datos son un array, crear cards para cada elemento
    if (Array.isArray(data)) {
      const cardsHTML = data
        .map((item, index) => {
          return createCard(item, index);
        })
        .join("");

      resultsDiv.innerHTML = `
        <h4>${title}</h4>
        <div class="cards-container">
          ${cardsHTML}
        </div>
      `;
    } else {
      // Si es un objeto único, crear una card
      resultsDiv.innerHTML = `
        <h4>${title}</h4>
        <div class="cards-container">
          ${createCard(data, 0)}
        </div>
      `;
    }
  }

  function createCard(item, index) {
    const fields = Object.entries(item)
      .map(([key, value]) => {
        const displayValue =
          typeof value === "object" ? JSON.stringify(value, null, 2) : value;
        return `
        <div class="card-field">
          <span class="card-field-label">${formatFieldName(key)}</span>
          <div class="card-field-value">${displayValue}</div>
        </div>
      `;
      })
      .join("");

    return `
      <div class="card">
        <div class="card-header">${getCardTitle(item, index)}</div>
        <div class="card-content">
          ${fields}
        </div>
      </div>
    `;
  }

  function formatFieldName(fieldName) {
    // Convertir nombres de campos a formato legible
    const fieldMap = {
      id: "ID",
      name: "Nombre",
      price: "Precio",
      category: "Categoría",
      description: "Descripción",
      username: "Usuario",
      email: "Email",
      title: "Título",
      content: "Contenido",
      created_at: "Fecha de Creación",
      updated_at: "Fecha de Actualización",
      user_id: "ID de Usuario",
      product_id: "ID de Producto",
      order_id: "ID de Orden",
      quantity: "Cantidad",
      total: "Total",
      status: "Estado",
    };

    return (
      fieldMap[fieldName] ||
      fieldName.charAt(0).toUpperCase() + fieldName.slice(1)
    );
  }

  function getCardTitle(item, index) {
    // Determinar el título de la card basado en el contenido
    if (item.name) return item.name;
    if (item.title) return item.title;
    if (item.username) return item.username;
    if (item.id) return `Elemento #${item.id}`;
    return `Item #${index + 1}`;
  }

  // Funciones para productos
  async function getAllProducts() {
    try {
      const response = await makeRequest("/products", "GET");
      displayResults("Todos los productos", response);
      console.log("Todos los productos:", response);
    } catch (error) {
      console.error("Error:", error);
    }
  }

  async function getCheapProducts() {
    try {
      const response = await makeRequest("/products/cheap", "GET");
      displayResults("Productos baratos (precio < 50)", response);
      console.log("Productos baratos:", response);
    } catch (error) {
      console.error("Error:", error);
    }
  }

  async function getElectronicsProducts() {
    try {
      const response = await makeRequest("/products/electronics", "GET");
      displayResults("Productos electrónicos (precio > 30)", response);
      console.log("Productos electrónicos:", response);
    } catch (error) {
      console.error("Error:", error);
    }
  }

  async function getProductsPage(page) {
    try {
      const response = await makeRequest(`/products/page/${page}`, "GET");
      displayResults(`Productos página ${page}`, response);
      console.log(`Productos página ${page}:`, response);
    } catch (error) {
      console.error("Error:", error);
    }
  }

  // Funciones para usuarios
  async function getUsersBasic() {
    try {
      const response = await makeRequest("/users/basic", "GET");
      displayResults("Usuarios básicos (username y email)", response);
      console.log("Usuarios básicos:", response);
    } catch (error) {
      console.error("Error:", error);
    }
  }

  async function getAllUsers() {
    try {
      const response = await makeRequest("/users", "GET");
      displayResults("Todos los usuarios", response);
      console.log("Todos los usuarios:", response);
    } catch (error) {
      console.error("Error:", error);
    }
  }

  async function getUserProducts(userId) {
    try {
      const response = await makeRequest(`/users/${userId}/products`, "GET");
      displayResults(`Productos del usuario ${userId}`, response);
      console.log(`Productos del usuario ${userId}:`, response);
    } catch (error) {
      console.error("Error:", error);
    }
  }

  // Funciones para órdenes y posts
  async function getOrders() {
    try {
      const response = await makeRequest("/orders", "GET");
      displayResults("Todas las órdenes (ordenadas por fecha desc)", response);
      console.log("Todas las órdenes:", response);
    } catch (error) {
      console.error("Error:", error);
    }
  }

  async function searchTutorialPosts() {
    try {
      const response = await makeRequest("/posts/search?title=tutorial", "GET");
      displayResults('Posts que contienen "tutorial"', response);
      console.log('Posts "tutorial":', response);
    } catch (error) {
      console.error("Error:", error);
    }
  }
}
