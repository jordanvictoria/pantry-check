export const getLists = () => {
    return fetch("https://oyster-app-qj9m4.ondigitalocean.app/lists", {
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
        "Authorization": `Token ${localStorage.getItem("pantry_token")}`
      }
    }).then((res) => res.json());
  };
  

export const getItems = () => {
    return fetch("https://oyster-app-qj9m4.ondigitalocean.app/items", {
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
        "Authorization": `Token ${localStorage.getItem("pantry_token")}`
      }
    }).then((res) => res.json());
  };


  export const getUsers = () => {
    return fetch("https://oyster-app-qj9m4.ondigitalocean.app/pantryusers", {
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
        "Authorization": `Token ${localStorage.getItem("pantry_token")}`
      }
    }).then((res) => res.json());
  };

  export const addList = (newList) => {
    return fetch("https://oyster-app-qj9m4.ondigitalocean.app/lists", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Token ${localStorage.getItem("pantry_token")}`
      },
      body: JSON.stringify(newList)
    })
  };

  export const editList = (newList) => {
    return fetch(`https://oyster-app-qj9m4.ondigitalocean.app/lists/${newList.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
        "Authorization": `Token ${localStorage.getItem("pantry_token")}`
      },
      body: JSON.stringify(newList)
    })
  }
  
  export const deleteList = (listId) => {
    return fetch(`https://oyster-app-qj9m4.ondigitalocean.app/lists/${listId}`, {
      method: "DELETE",
      headers: {
        "Authorization": `Token ${localStorage.getItem("pantry_token")}`
      }
    })
}

export const getCategories = () => {
  return fetch("https://oyster-app-qj9m4.ondigitalocean.app/categories", {
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json",
      "Authorization": `Token ${localStorage.getItem("pantry_token")}`
    }
  }).then((res) => res.json());
};

export const getListById = (id) => {
  return fetch(`https://oyster-app-qj9m4.ondigitalocean.app/lists/${id}`, {
    headers: {
      "Authorization": `Token ${localStorage.getItem("pantry_token")}`
    }
  }).then((res) => res.json());
};


export const getItemsByList = (listId) => {
  return fetch(`https://oyster-app-qj9m4.ondigitalocean.app/listitems?listId=${listId}`, {
    headers: {
      "Authorization": `Token ${localStorage.getItem("pantry_token")}`
    }
  }).then(res => res.json())
}

export const getListItems = () => {
  return fetch("https://oyster-app-qj9m4.ondigitalocean.app/listitems", {
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json",
      "Authorization": `Token ${localStorage.getItem("pantry_token")}`
    }
  }).then((res) => res.json());
};

export const deleteListItem = (listItemId) => {
  return fetch(`https://oyster-app-qj9m4.ondigitalocean.app/listitems/${listItemId}`, {
    method: "DELETE",
    headers: {
      "Authorization": `Token ${localStorage.getItem("pantry_token")}`
    }
  })
}

export const getItemsByHttpString = (httpString) => {
  return fetch(`https://oyster-app-qj9m4.ondigitalocean.app/listitems?${httpString}`, {
    headers: {
      "Authorization": `Token ${localStorage.getItem("pantry_token")}`
    }
  }).then((res) => res.json());
}


