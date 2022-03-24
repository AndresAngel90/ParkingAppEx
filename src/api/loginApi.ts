import Axios from "axios";

const url = "http://localhost:3000";

function login(userEmail: string, userPass: string): Promise<any> {
    return Axios.post(`${url}/login`, {
        email: userEmail,
        password: userPass,
    })
        .then((response) => response.data)
        .catch((error) => {
            throw new Error(error.response.data);
        });
}

export default login;