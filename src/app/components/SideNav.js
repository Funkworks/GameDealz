// components/SideNav.js
"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { ImCool } from "react-icons/im";
import styles from "../styles/SideNav.module.css"
import "../styles/SideNav.module.css"; // Import the CSS file here
import supabase from "@/lib/supabase";

const SideNav = () => {

  const [user, setUser] = useState(null);

  // This useEffect() runs at the beginning of page render because of the [] at the end
  useEffect(() => {
    UserLoggedIn();
  }, []);

  const UserLoggedIn = async () => {
    try{
      const { data: { user } } = await supabase.auth.getUser()
      setUser(user)
    } catch (e) {
      console.log("User not signed in")
      console.log(e)
    }
  }

  return (
    <div className={styles.signIn}>
      <nav>
        <ul>
          <Link href={user ? "../profile" : "../signin"} rel="noopener noreferrer">
            <li>
              <div className={styles.signIn} >
                {user ? <p>Profile</p> : <p>Sign in</p>}
                <ImCool style={{height: 75, width: 75}}/>
              </div>
            </li>
          </Link>

        </ul>
      </nav>
    </div>
  );
};

export default SideNav;
