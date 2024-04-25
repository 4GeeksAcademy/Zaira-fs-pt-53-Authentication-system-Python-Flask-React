const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			token: null,
			message: null,
			demo: [
				{
					title: "FIRST",
					background: "white",
					initial: "white"
				},
				{
					title: "SECOND",
					background: "white",
					initial: "white"
				}
			]
		},
		actions: {
			// Use getActions to call a function within a fuction
			exampleFunction: () => {
				getActions().changeColor(0, "green");
			},

			signup: async (email, password) => {
				try {
					const res = await fetch("https://jubilant-fiesta-v6g7gwq69rj3pp9x-3001.app.github.dev/api/users", {
						
						method: 'POST',
						body: JSON.stringify({
							email: email,
							password: password
						}),
						headers: {
							'Content-Type': 'application/json'
						}
					});

					if (res.status === 200) {
						alert("Registration success!");
						return true;
					} else if (res.status === 401) {
						const errorData = await res.json();
						alert(errorData.msg)
						return false
					};
				} catch (error) {
					console.error("There has been an error:", error);
					return false;
				}
			},

			login: async (email, password) => {
			const opts = {
				method: 'POST', 
				headers: {
					"Content-Type" : "application/json"
				},
				body: JSON.stringify({
					"email": email,
					"password": password
				})
			};

			try{ 
				const resp = await fetch('https://jubilant-fiesta-v6g7gwq69rj3pp9x-3001.app.github.dev/api/token', opts)
				if(resp.status !== 200) {
					alert("there has been an error");
					return false;
				}		
				const data = await response.json();
				console.log("this came from the backend", data);
				sessionStorage.setItem("token", data.access_token);
				setStore({ token : data.access_token })
				return true;
			}
			catch(error){
				console.error("there has been an error loging in")
			}
		},


		getMessage: async () => {
				try{
					// fetching data from the backend
					const resp = await fetch(process.env.BACKEND_URL + "/api/hello")
					const data = await resp.json()
					setStore({ message: data.message })
					// don't forget to return something, that is how the async resolves
					return data;
				}catch(error){
					console.log("Error loading message from backend", error)
				}
			},
			
			changeColor: (index, color) => {
				//get the store
				const store = getStore();

				//we have to loop the entire demo array to look for the respective index
				//and change its color
				const demo = store.demo.map((elm, i) => {
					if (i === index) elm.background = color;
					return elm;
				});

				//reset the global store
				setStore({ demo: demo });
			}
		}
	};
};

export default getState;
