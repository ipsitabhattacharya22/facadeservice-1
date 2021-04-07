import React, { useState } from 'react'
import NonBoomerangHeader from './index.js'
import { withKnobs, text } from '@storybook/addon-knobs'
import {Search20, Notification20, User20} from '@carbon/icons-react';
export default { title: 'IAW App Header', decorators: [withKnobs]}


export const nonBoomerangHeader = (props) => {
  const [headerConfig, setHeaderConfig] = useState({});
  const [userDetail, setUserDetail] = useState({});
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

  return <NonBoomerangHeader 
    customHeaderStyle={customHeaderStyle} 
    headerIcons={headerIcons} 
    onIconClick={onIconClick} 
    productName="Corpus Curator"
    logoLink="#" 
    headerPanel={headerPanel}
    onSwitcherItemClick={onSwitcherItemClick}
  />
}
