const API = ""; 

export const signin = user => {
	return fetch(`${API}/signin`, {
		method: "POST",
		headers: {
			Accept: "application/json",
			"Content-Type": "application/json"
		},
		body: JSON.stringify(user)
	})
		.then(response => response.json())
		.catch(err => console.log(err));
};

export const isAuthenticated = () => {
	// if (typeof window === "undefined") {
	// 	console.log("not authenticated");
	// 	return false;
	// }
	// if (localStorage.getItem("jwt")) {
	// 	return JSON.parse(localStorage.getItem("jwt"));
	// } else {
	// 	return false;
	// }
    return false;
};