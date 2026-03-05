import { GoogleLogin } from "@react-oauth/google";
import axios from "axios";

export default function GoogleLoginAuth() {
    return (
        <GoogleLogin
            onSuccess={(response) => {
                const idToken = response.credential;

                axios.post("http://localhost:8080/api/users/google", { idToken: idToken })
                    .then((response) => {
                        console.log(response);
                        localStorage.setItem("token", response.data.data);
                        window.location.href = "/problems";
                    })

            }}
            onError={() => console.log('Login Failed')}
        />
    )
};