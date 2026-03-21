import { GoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { useRef, useState, useEffect } from "react";

export default function GoogleLoginAuth() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [buttonWidth, setButtonWidth] = useState(400);

  useEffect(() => {
    const updateWidth = () => {
      if (containerRef.current) {
        setButtonWidth(Math.min(containerRef.current.offsetWidth, 400));
      }
    };

    updateWidth();
    window.addEventListener("resize", updateWidth);
    return () => window.removeEventListener("resize", updateWidth);
  }, []);

  return (
    <div ref={containerRef} className="w-full flex justify-center items-center">
      <GoogleLogin
        width={buttonWidth}
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
