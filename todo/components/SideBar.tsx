import React, { useState } from 'react';
import styles from '../styles/sidebar.module.scss';

const SideBar = () => {
    //const [isSideBarOpen, setIsSideBarOpen] = useState(false);

    //const onClickSideBar = () => {
    //    setIsSideBarOpen(!isSideBarOpen);
    //}

    return (
            <div className="SideBar">
                <div className="menu">
                    <a href="/trash">휴지통</a>
                </div>
                <div className="menu">
                    <a href="/done">완료 목록</a>
                </div>
                <div className="menu">
                    <a href="/">홈</a>
                </div>
            </div>
    );
}


export default SideBar;