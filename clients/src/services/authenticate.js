const API = "http://localhost:5000"; 

export const signin = user => {
	return fetch(`${API}/signin`, {
		method: "POST",
		headers: {
			Accept: "application/json",
			"Content-Type": "application/json"
		},
		body: JSON.stringify(user)
	})
		.then(response=>response.json())
		// .then(response =>{
		// 	if (!response.ok) {
        //         throw new Error(`${response.message}`);
        //     }
		// 	return response;
		// })
		.catch(err => err);
};

export const signup = (user) =>{
	return fetch(`${API}/signup`,{
		method: "POST",
		headers: {
			Accept: "application/json",
			"Content-Type": "application/json"
		},
		body: JSON.stringify(user)
	})
	.then(response => response.json())
	.catch(err => console.log(err));
}

export const authenticate = (data) => {
	if (typeof window !== "undefined") {
		localStorage.setItem("jwt", JSON.stringify(data));
	}
};

export const isAuthenticated = () => {
	if (typeof window === "undefined") {
		console.log("not authenticated");
		return false;
	}
	if (localStorage.getItem("jwt")) {
		return JSON.parse(localStorage.getItem("jwt"));
	} else {
		return false;
	}
};

export const signout = next => {
	if (typeof window !== "undefined") {
		localStorage.removeItem("jwt");
		next();
		return fetch(`${API / signout}`, {
			method: "GET"
		})
			.then(res => console.log("Signout success"))
			.catch(err => console.log(err));
	}
};