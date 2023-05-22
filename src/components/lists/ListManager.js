export const getLists = () => {
    return fetch("http://localhost:8000/lists", {
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
        "Authorization": `Token ${localStorage.getItem("pantry_token")}`
      }
    }).then((res) => res.json());
  };


  export const getUsers = () => {
    return fetch("http://localhost:8000/pantryusers", {
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
        "Authorization": `Token ${localStorage.getItem("pantry_token")}`
      }
    }).then((res) => res.json());
  };

  export const addList = (newList) => {
    return fetch("http://localhost:8000/lists", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Token ${localStorage.getItem("pantry_token")}`
      },
      body: JSON.stringify(newList)
    })
  };

  export const editList = (newList) => {
    return fetch(`http://localhost:8000/lists/${newList.id}`, {
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
    return fetch(`http://localhost:8000/lists/${listId}`, {
      method: "DELETE",
      headers: {
        "Authorization": `Token ${localStorage.getItem("pantry_token")}`
      }
    })
}

export const getCategories = () => {
  return fetch("http://localhost:8000/categories", {
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json",
      "Authorization": `Token ${localStorage.getItem("pantry_token")}`
    }
  }).then((res) => res.json());
};

export const getListById = (id) => {
  return fetch(`http://localhost:8000/lists/${id}`, {
    headers: {
      "Authorization": `Token ${localStorage.getItem("pantry_token")}`
    }
  }).then((res) => res.json());
};


export const getItemsByList = (listId) => {
  return fetch(`http://localhost:8000/listitems?listId=${listId}`, {
    headers: {
      "Authorization": `Token ${localStorage.getItem("pantry_token")}`
    }
  }).then(res => res.json())
}

export const getListItems = () => {
  return fetch("http://localhost:8000/listitems", {
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json",
      "Authorization": `Token ${localStorage.getItem("pantry_token")}`
    }
  }).then((res) => res.json());
};

export const deleteListItem = (listItemId) => {
  return fetch(`http://localhost:8000/listitems/${listItemId}`, {
    method: "DELETE",
    headers: {
      "Authorization": `Token ${localStorage.getItem("pantry_token")}`
    }
  })
}

export const getItemsByHttpString = (httpString) => {
  return fetch(`http://localhost:8000/listitems?${httpString}`, {
    headers: {
      "Authorization": `Token ${localStorage.getItem("pantry_token")}`
    }
  }).then((res) => res.json());
}


