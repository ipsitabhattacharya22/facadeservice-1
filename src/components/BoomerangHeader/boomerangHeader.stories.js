import React, { useState } from 'react'
import BoomerangHeader from './index.js'
import { withKnobs, text } from '@storybook/addon-knobs'
import { Dashboard16, Dashboard24, Notification24 } from '@carbon/icons-react'
export default { title: 'IAW App Header', decorators: [withKnobs]}


export const boomerangHeader = (props) => {
  const [headerConfig, setHeaderConfig] = useState({});
  const [userDetail, setUserDetail] = useState({});

  const customHeaderStyle = {
      backgroundColor: "#ffffff",
      color: "#171717"
  }

  const componentDidMount = () => {
    console.log("This is the custom header");
  }

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
  ]

  const onIconClick = (e, iconName) => {
    console.log("Clicked icon = ", iconName);
    if(iconName === 'Dashboard') {
      console.log("Dashboard clicked");
    }
  }

  return <BoomerangHeader customHeaderStyle={customHeaderStyle} componentDidMount={componentDidMount} productName="Corpus Curator" headerConfig={headerConfig} userDetail={userDetail} bmrgCustomIcons={bmrgCustomIcons} onIconClick={onIconClick}/>
}
