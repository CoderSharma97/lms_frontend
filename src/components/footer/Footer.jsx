import React from 'react'
import { AiFillFacebook } from "react-icons/ai";
import { AiOutlineTwitter } from "react-icons/ai";
import { AiOutlineInstagram } from "react-icons/ai";

import "./footer.css";

const Footer = () => {
  return (
    <footer>
        <div className="footer-content">
            <p>
                &copy; 2024 Your E learning platform . All rights are reserved. <br/> made with ❤️ <a href=''>Himanshu sharma</a>
            </p>
            <div className="social-links">
                <a href=""><AiFillFacebook /></a>
                <a href=""><AiOutlineTwitter /></a>
                <a href=""><AiOutlineInstagram /></a>
                <a href=""></a>
            </div>
        </div>
    </footer>
  )
}

export default Footer