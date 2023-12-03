// components/SideNav.js
"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ImCool } from "react-icons/im";
import styles from "../styles/SideNav.module.css";
import "../styles/SideNav.module.css"; // Import the CSS file here
import logo from "../gamehuntlogo2.svg";

const SideNav = () => {
  return (
    <div>
      <Link a href="./init" className={styles.link}>
        <Image src={logo} width={200} height={200} alt="logo" />
      </Link>

      <nav>
        <ul>
          <Link a href="./signin" rel="noopener noreferrer">
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
