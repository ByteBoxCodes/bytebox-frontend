import { GoogleLogin } from "@react-oauth/google";
import axios from "axios";

export default function GoogleLoginAuth() {
  return (
    <div className="w-full flex justify-center items-center">
      <GoogleLogin
        width={400}
        onSuccess={(response) => {
          const idToken = response.credential;

          axios
            .post("https://api.byteboxcodes.com/api/users/google", {
              idToken: idToken,
            })
            .then((response) => {
              console.log(response);
              localStorage.setItem("token", response.data.data);
              window.location.href = "/problems";
            });
        }}
        onError={() => console.log("Login Failed")}
      />
    </div>
  );
}
