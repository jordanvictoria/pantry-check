export const getItems = () => {
    return fetch("http://localhost:8000/items", {
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
        "Authorization": `Token ${localStorage.getItem("pantry_token")}`
      }
    }).then((res) => res.json());
  };

  export const getItemById = (id) => {
    return fetch(`http://localhost:8000/items/${id}`, {
      headers: {
        "Authorization": `Token ${localStorage.getItem("pantry_token")}`
      }
    }).then((res) => res.json());
  };


  export const getCategories = () => {
    return fetch("http://localhost:8000/categories", {
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
        "Authorization": `Token ${localStorage.getItem("pantry_token")}`
      }
    }).then((res) => res.json());
  };

  export const getItemsBySearch = (searchTerm) => {
    return fetch(`http://localhost:8000/items?search=${searchTerm}`, {
      headers: {
        "Authorization": `Token ${localStorage.getItem("pantry_token")}`
      }
    }).then(res => res.json())
  }


  export const addItem = (newItem) => {
    return fetch("http://localhost:8000/items", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Token ${localStorage.getItem("pantry_token")}`
      },
      body: JSON.stringify(newItem)
    })
  };
  
  export const editItem = (newItem) => {
    return fetch(`http://localhost:8000/items/${newItem.id}`, {
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
    return fetch(`http://localhost:8000/items/${itemId}`, {
      method: "DELETE",
      headers: {
        "Authorization": `Token ${localStorage.getItem("pantry_token")}`
      }
    })
}