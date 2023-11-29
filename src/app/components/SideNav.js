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
              <div class="home-icon">
                <div class="roof">
                  <div class="roof-edge"></div>
                </div>
                <div class="front"></div>
              </div>
            </li>
          </a>
          <a href="./signin" rel="noopener noreferrer">
            <h2></h2>

            <li>
              <div class="about-icon">
                <div class="head">
                  <div class="eyes"></div>
                  <div class="beard"></div>
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
              <div class="work-icon">
                <div class="paper"></div>
                <div class="lines"></div>
                <div class="lines"></div>
                <div class="lines"></div>
              </div>
            </li>
          </a>
          <li>
            <div class="mail-icon">
              <div class="mail-base">
                <div class="mail-top"></div>
              </div>
            </div>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default SideNav;
