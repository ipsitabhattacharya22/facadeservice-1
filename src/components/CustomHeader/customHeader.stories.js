import React, { useEffect, useState } from 'react'
import CustomHeader from './index.js'
import { withKnobs, text } from '@storybook/addon-knobs'
import {Search20, Notification20, User20, Dashboard24, Notification24} from '@carbon/icons-react';
export default { title: 'IAW App Header', decorators: [withKnobs]}


export const customHeader = (props) => {
  const [headerConfig, setHeaderConfig] = useState({});
  const [userDetail, setUserDetail] = useState({});
  const [environment, setEnvironment] = useState('development');
  const [headerPanel, setHeaderPanel] = useState(
    {
      expanded: false,
      properties: {
        height: "max-content",
        paddingBottom: "1rem",
        paddingTop: "1rem"
      },
      links: [
        {name: 'Ipsita Bhattacharyya', path: ''},
        {name: 'Logout', path: '#'}
      ]
    }
  );
  
  const customHeaderStyle = {
    backgroundColor: "#ffffff",
    color: "#171717"
  }

  const onIconClick = (e, iconName) => {
    console.log("Clicked icon = ", iconName);
    if(iconName === 'User') {
      let header = {...headerPanel};
      header.expanded = !header.expanded;
      setHeaderPanel(header);
    }
  }

  const onSwitcherItemClick = (e, linkName) => {
    console.log("Clicked link = ", linkName);
  }

  const headerIcons = [
    {
      icon: <Notification20/>,
      ariaLabel: "Notification",
      name: "Notification"
    },
    {
      icon: <User20/>,
      ariaLabel: "User",
      name: "User"
    }
  ];

  const bmrgCustomIcons = [
    {
      icon: <Dashboard24/>,
      ariaLabel: "Dashboard",
      name: "Dashboard"
    },
    {
      icon: <Notification24/>,
      ariaLabel: "Notification",
      name: "Notification"
    }
  ];

  const logoutLink = window.location.href;

  useEffect(() => {
    console.log("environment before = ", environment);
    setTimeout(() => {
      setEnvironment('boomerang');
    }, 1000);
  })

  return <CustomHeader customHeaderStyle={customHeaderStyle} productName="Corpus Curator" headerConfig={headerConfig} userDetail={userDetail} headertxt="Agent Assist" environment={environment} logoutLink={logoutLink} headerIcons={headerIcons} 
  onIconClick={onIconClick} logoLink="#" 
  headerPanel={headerPanel}
  onSwitcherItemClick={onSwitcherItemClick} bmrgCustomIcons={bmrgCustomIcons}/>
}
