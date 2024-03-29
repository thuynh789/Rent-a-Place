import React, { useState, useEffect, useRef } from "react";
import { useDispatch } from 'react-redux';
import * as sessionActions from '../../store/session';
import OpenModalMenuItem from './OpenModalMenuItem';
import LoginFormModal from '../LoginFormModal';
import SignupFormModal from '../SignupFormModal';
import DemoUser from "../DemoUser";
import AddSpotModal from "../AddSpotModal";
import "./Navigation.css";

function ProfileButton({ user }) {
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);
  const ulRef = useRef();

  const openMenu = () => {
    if (showMenu) return;
    setShowMenu(true);
  };

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = (e) => {
      if (!ulRef.current.contains(e.target)) {
        setShowMenu(false);
      }
    };

    document.addEventListener('click', closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  const closeMenu = () => setShowMenu(false);

  const logout = (e) => {
    e.preventDefault();
    dispatch(sessionActions.logout());
    closeMenu();
  };

  const ulClassName = "profile-dropdown" + (showMenu ? "" : "");

  return (
    <>
      <div>

      <button className='profile-button' onClick={openMenu}>
        <div className="icons">
        <i className="fas fa-bars"/>
        <i className="fas fa-user-circle"/>
        </div>
      </button>

      </div>

      { showMenu ?

<ul className={ulClassName} ref={ulRef}>
{user ? (
  <div className="dropdown-items">
    <div className="user-info">
      <li>{user.username}</li>
      <li>{user.firstName} {user.lastName}</li>
      <li>{user.email}</li>
    </div>
    <div className="create-spot-form">
        <OpenModalMenuItem
          itemText="Create new listing"
          onItemClick={closeMenu}
          modalComponent={<AddSpotModal />}
      />
    </div>
    <div className="logout" onClick={logout}>
      Log Out
    </div>
  </div>
) : (
  <div className="more-dropdown">
    <OpenModalMenuItem
      itemText="Log In"
      onItemClick={closeMenu}
      modalComponent={<LoginFormModal />}
    />
    <OpenModalMenuItem
      itemText="Sign Up"
      onItemClick={closeMenu}
      modalComponent={<SignupFormModal />}
    />
    <div className="demo-user">
      <DemoUser/>
    </div>
  </div>
)}
</ul>
     : null }


      {/* <ul className={ulClassName} ref={ulRef}>
        {user ? (
          <>
            <li>{user.username}</li>
            <li>{user.firstName} {user.lastName}</li>
            <li>{user.email}</li>
            <div className="create-spot-form">
              <button>
                <OpenModalMenuItem
                  itemText="Create a new listing"
                  onItemClick={closeMenu}
                  modalComponent={<AddSpotModal />}
              />
              </button>
            </div>
            <li>
              <button onClick={logout}>Log Out</button>
            </li>
          </>
        ) : (
          <>
            <OpenModalMenuItem
              itemText="Log In"
              onItemClick={closeMenu}
              modalComponent={<LoginFormModal />}
            />
            <OpenModalMenuItem
              itemText="Sign Up"
              onItemClick={closeMenu}
              modalComponent={<SignupFormModal />}
            />
            <button className="demo-user">
              <DemoUser/>
            </button>

          </>
        )}
      </ul> */}


    </>
  );
}

export default ProfileButton;
