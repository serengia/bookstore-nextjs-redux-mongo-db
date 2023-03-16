import React, { useState } from "react";

import { BsShieldLock } from "react-icons/bs";
import Navbar from "./Navbar";
import s from "./Header.module.scss";
import Link from "next/link";
import { useRouter } from "next/router";
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";

function Header() {
  const router = useRouter();
  const [showPopper, setShowPopper] = useState(false);
  const { data: session, status } = useSession();
  const buttonClickHandler = () => {
    router.push("/login");
  };

  console.log("MY SESSION>", session);
  console.log("status>", status);

  const signOutHandler = () => {
    signOut({ redirect: false });
  };

  return (
    <header className={s["header"]}>
      <div className={`${s["header-container"]} row`}>
        <Link href="/" className={s["logo"]}>
          Buklist.com
        </Link>
        <Navbar />
        <div className={s["actions"]}>
          {status === "unauthenticated" && (
            <button className={s["auth-button"]} onClick={buttonClickHandler}>
              <BsShieldLock className={s["icon"]} />
              <span> SignIn/Register</span>
            </button>
          )}

          {status === "authenticated" && (
            <div
              onMouseEnter={() => setShowPopper(true)}
              onMouseLeave={() => setShowPopper(false)}
              className={s["avatar-box"]}
            >
              <span className={s["name"]}> {session.user.name}</span>
              <div className={s["avatar"]}>
                <Image
                  src={"/img/users/user-placeholder.png"}
                  className={s["avatar-image"]}
                  width={30}
                  height={30}
                  alt={session.user.name}
                />
              </div>
              {showPopper && (
                <div className={s["popper"]}>
                  <p>Popper</p>
                  <button onClick={signOutHandler} className={s["logout-btn"]}>
                    Logout
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

export default Header;
