import React, { useEffect } from "react";
import bg from "./assets/bg.jpg";

export const Winner = () => {
  useEffect(() => {
    if (!localStorage.getItem("winner")) {
      window.location.href = "/";
    }
  }, []);
  return (
    <div
      style={{ backgroundImage: `url(${bg})` }}
      className={`bg-cover font-[Inter] bg-center min-h-screen`}
    >
      {localStorage.getItem("winner") && (
        <div>
          <h1 className="font-bold font-[Orbitron] py-10 text-amber-500 text-center text-2xl">
            Congratulations you have won this shit ass game of this shit ass
            freshers party!
          </h1>
          <div className="bg-white/20 border py-10 text-white border-amber-600 backdrop-blur-3xl max-w-[600px] w-[90%] p-4 mx-auto rounded-lg shadow-md flex flex-col gap-4">
            <h1 className="text-center font-bold">
              DM{" "}
              <a className="text-amber-600" href="https://www.instagram.com/krish._.negi">
                @krish._.negi
              </a>{" "}
              with screenshot to claim your shit ass prize! <br/>
              Also thank Mukal Markanda 🤑
            </h1>
          </div>
        </div>
      )}
    </div>
  );
};
