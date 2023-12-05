// components/SideNav.js
"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { ImCool } from "react-icons/im";
import styles from "../styles/SideNav.module.css";
import "../styles/SideNav.module.css"; // Import the CSS file here
import logo from "../gamehuntlogo2.svg";
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
      console.log(user)
    } catch (e) {
      console.log("User not signed in")
      console.log(e)
    }
  }

  return (
    <div>
      <Link href="./" className={styles.link}>
        <Image src={logo} width={200} height={200} alt="logo" />
      </Link>

      <nav>
        <ul>
          <Link href={user ? "../profile" : "../signin"} rel="noopener noreferrer">
            <h2></h2>

            <li>
              <div className={"profile-icon"} >
                <ImCool/>
              </div>
            </li>
          </Link>

        </ul>
      </nav>
    </div>
  );
};

export default SideNav;
