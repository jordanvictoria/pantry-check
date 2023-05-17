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