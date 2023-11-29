// components/SideNav.js
"use client";

import React, { useState } from "react";
import Image from "next/image";
import styles from "../styles/SideNav.module.css";

import "../styles/SideNav.module.css"; // Import the CSS file here
import logo from "../gamehuntlogo2.svg";

const SideNav = () => {
  return (
    <div>
      <Image src={logo} width={200} height={200} alt="logo" />
      <nav>
        <ul>
          <a href="./init" className={styles.link}>
            <li>
              <div className={"home-icon"}>
                <div className={"roof"}>
                  <div className={"roof-edge"}></div>
                </div>
                <div className={"front"}></div>
              </div>
            </li>
          </a>
          <a href="./signin" rel="noopener noreferrer">
            <h2></h2>

            <li>
              <div className={"about-icon"}>
                <div className={"head"}>
                  <div className={"eyes"}></div>
                  <div className={"beard"}></div>
                </div>
              </div>
            </li>
          </a>
          <a
            href="./profile"
            className={styles.card}
            target="_blank"
            rel="noopener noreferrer"
          >
            <li>
              <div className={"work-icon"}>
                <div className={"paper"}></div>
                <div className={"lines"}></div>
                <div className={"lines"}></div>
                <div className={"lines"}></div>
              </div>
            </li>
          </a>
          <li>
            <div className={"mail-icon"}>
              <div className={"mail-base"}>
                <div className={"mail-top"}></div>
              </div>
            </div>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default SideNav;
