import React from "react";
import './Sidebar.css'
import HomeIcon from '@material-ui/icons/Home';
import SidebarOption from "./SidebarOption";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faYoutube,
  faFacebook,
  faTwitter,
  faInstagram,
} from "@fortawesome/free-brands-svg-icons";

function Sidebar() {
    return (
      <div className="sidebar">
        <SidebarOption active Icon={HomeIcon} text="Home" />
        <div class="social-container">
          <a href="https://www.youtube.com" className="youtube_social">
            <FontAwesomeIcon icon={faYoutube} size="2x" />
          </a>
          <a href="https://www.facebook.com" className="facebook_social">
            <FontAwesomeIcon icon={faFacebook} size="2x" />
          </a>
          <a href="https://www.twitter.com" className="twitter_social">
            <FontAwesomeIcon icon={faTwitter} size="2x" />
          </a>
          <a href="https://www.instagram.com" className="instagram_social">
            <FontAwesomeIcon icon={faInstagram} size="2x" />
          </a>
        </div>
      </div>
    );
}

export default Sidebar;

