import React, { useState } from 'react';
import styled from 'styled-components';
import logo from '../../assets/logo.png'; 
import searchIcon from '../../assets/search.svg'; 
import accountIcon from '../../assets/account.svg'; 
import alertsIcon from '../../assets/alerts.svg'; 
import cartIcon from '../../assets/cart.svg'; 
import { Link } from 'react-router-dom';

function Navbar({ isScrolled }) {
  const [searchText, setSearchText] = useState("");
  const [isFocused, setIsFocused] = useState(false);

  const header = [
    { name: "Home", link: "/Home" },
    { name: "My Courses", link: "/mycourse" },
    { name: "Support", link: "/support" }
  ];

  return (
    <Navbar_container isScrolled={isScrolled}>
      <nav className={`flex ${isScrolled ? "scrolled" : ""}`}>
        <div className="main_div">
          <div className="n_container">
            <div className="logo">
              <img src={logo} alt="logo" />
            </div>
            <ul className="options">
              {header.map(({ name, link }) => (
                <li key={name}>
                  <Link to={link}>{name}</Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="right flex a-center">
            <div className={`search-bar ${isFocused ? "focused" : ""}`}>
              {!isFocused && (
                <img src={searchIcon} alt="search" className="search-icon" />
              )}
              <input
                type="text"
                placeholder="Search"
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
              />
            </div>
            <div className="icons">
              <img src={alertsIcon} alt="alerts" className="icon" />
              <img src={cartIcon} alt="cart" className="icon" />
              <img src={accountIcon} alt="account" className="icon" />
            </div>
          </div>
        </div>
      </nav>
    </Navbar_container>
  );
}

const Navbar_container = styled.div`
  position: relative;
  width: 100vw;

  .main_div {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    margin-left: 10px;
    margin-right: 20px;
  }

  .n_container {
    display: flex;
    align-items: center;
  }

  .logo {
    display: flex;
    height: 2.2rem;
  }

  .options {
    display: flex;
    margin: 0 10px;
    list-style: none;
    a {
      font-size: 1rem;
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
      margin-left: 20px;
      text-decoration: none;
      font-weight: 500;
      color: red;
      display: inline-block;
      transition: transform 0.3s ease-in-out;
    }
    a:hover{
        transform: scale(1.2);
        cursor: pointer;
    }
  }

  .right {
    display: flex;
    align-items: center;

    .search-bar {
      display: flex;
      align-items: center;
      border: 2px solid grey;
      border-radius: 20px;
      padding: 0.2rem 0.8rem;
      background-color: white;
      transition: width 0.3s ease;

      width: 5.5rem;
      cursor: pointer;

      &.focused {
        width: 12rem; 
        cursor: text;
      }

      .search-icon {
        width: 1.2rem;
        height: 1.2rem;
        margin-right: 0.5rem;
      }

      input {
        border: none;
        outline: none;
        background: transparent;
        width: 100%;
        font-size: 1rem;
        transition: width 0.3s ease;

        &::placeholder {
          color: grey;
          opacity: ${({ isFocused }) => (isFocused ? 0 : 1)};
        }
      }
    }

    .icons {
      display: flex;
      gap: 15px;
      margin-left: 1rem;
      .icon {
        height: 2rem;
        width: 2rem;
        cursor: pointer;
      }
    }
  }
`;

export default Navbar;
