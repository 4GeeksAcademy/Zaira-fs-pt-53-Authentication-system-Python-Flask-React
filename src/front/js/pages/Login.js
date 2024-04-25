import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";
import rigoImageUrl from "../../img/rigo-baby.jpg";
import "../../styles/home.css";
import { useNavigate} from 'react-router-dom';

export const Login = () => {
	const { store, actions } = useContext(Context);
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const navigate = useNavigate();

	const token = sessionStorage.getItem("token");
	console.log("this is your token", token);

	const handleClick = async () => {
		await actions.login(email, password);
			navigate("/");
		
	};
	
	const handleLogout = () => {
        sessionStorage.removeItem("token");
        // Additional logout actions can be added here if necessary
        navigate("/login"); // Redirect to the login page after logout
    };

	return (
		<div className="text-center mt-5">
			<h1>Login</h1>
				{token && token!="" && token!=undefined ? (
					<div>
						<p>You are logged in with this token: {token}</p>
						<button onClick={handleLogout}>Logout</button>
                	</div>
				 ) :(
					<div>
					<input type="test" placeholder="email" value={email} onChange={(e) => setEmail(e.target.value)} />
					<input type="password" placeholder="password" value={password} onChange={(e) => setPassword(e.target.value)} />
					<button onClick={handleClick}> Login </button>
			</div>
			)}
		</div> 
	);
};
