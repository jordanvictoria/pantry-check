export const getItems = () => {
    return fetch("https://oyster-app-qj9m4.ondigitalocean.app/items", {
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
        "Authorization": `Token ${localStorage.getItem("pantry_token")}`
      }
    }).then((res) => res.json());
  };

  export const getItemById = (id) => {
    return fetch(`https://oyster-app-qj9m4.ondigitalocean.app/items/${id}`, {
      headers: {
        "Authorization": `Token ${localStorage.getItem("pantry_token")}`
      }
    }).then((res) => res.json());
  };


  export const getCategories = () => {
    return fetch("https://oyster-app-qj9m4.ondigitalocean.app/categories", {
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
        "Authorization": `Token ${localStorage.getItem("pantry_token")}`
      }
    }).then((res) => res.json());
  };

  export const getItemsBySearch = (searchTerm) => {
    return fetch(`https://oyster-app-qj9m4.ondigitalocean.app/items?search=${searchTerm}`, {
      headers: {
        "Authorization": `Token ${localStorage.getItem("pantry_token")}`
      }
    }).then(res => res.json())
  }


  export const addItem = (newItem) => {
    return fetch("https://oyster-app-qj9m4.ondigitalocean.app/items", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Token ${localStorage.getItem("pantry_token")}`
      },
      body: JSON.stringify(newItem)
    })
  };
  
  export const editItem = (newItem) => {
    return fetch(`https://oyster-app-qj9m4.ondigitalocean.app/items/${newItem.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
        "Authorization": `Token ${localStorage.getItem("pantry_token")}`
      },
      body: JSON.stringify(newItem)
    })
  }
  
  export const deleteItem = (itemId) => {
    return fetch(`https://oyster-app-qj9m4.ondigitalocean.app/items/${itemId}`, {
      method: "DELETE",
      headers: {
        "Authorization": `Token ${localStorage.getItem("pantry_token")}`
      }
    })
}