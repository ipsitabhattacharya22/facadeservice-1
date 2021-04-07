import React, {Component} from 'react'
console.log("Importing boomerang carbon addons react");
import {UIShell} from '@boomerang/carbon-addons-boomerang-react';
import {boolean } from '@storybook/addon-knobs';
import axios from 'axios';
import './boomerangHeader.scss';
import { Dashboard20 } from '@carbon/icons-react';

class BoomerangHeader extends Component {
    constructor(props) {
        console.log("Inside boomerang constructor");
        super(props);
        this.state = {
            headerConfigData: {},
            userDetail: {},
            baseUrl: 'https://fra6.cloud.boomerangplatform.net/uat/services'
        }
    }

    componentDidMount() {
        let res = this.props.logoutLink ? this.props.logoutLink : '#';
        let baseURL;
        let baseLink = window.location.href;
        if(this.props.baseURL &&  this.props.baseURL !== undefined) {
            baseURL = this.props.baseURL;
        } else if(baseLink.indexOf('rtp4.cloud.boomerangplatform.net/dev/') > -1) {
            baseURL = 'https://rtp4.cloud.boomerangplatform.net/dev/services';
        } else if(baseLink.indexOf('rtp4.cloud.boomerangplatform.net/qa/') > -1) {
            baseURL = 'https://rtp4.cloud.boomerangplatform.net/qa/services';
        } else {
            baseURL = 'https://fra6.cloud.boomerangplatform.net/uat/services';
        }
        this.setState({baseUrl: baseURL});
        console.log('GET LOGOUT LINK --> ', res);
        let headerConfigData = {}
        let userDetail = {}
        let header = {
            navigation: this.props.navigation && this.props.navigation !== undefined ? this.props.navigation : [],
            features: this.props.features && this.props.features !== undefined? this.props.features : {},
            platform: this.props.platform && this.props.platform !== undefined ? this.props.platform : { name: "IBM Boomerang Platform", version: "7.1.0", signOutUrl: res}
        }
        const user = {
            "id": "5cbffa1f6dc91f00015bc3c4",
            "isFirstVisit": false,
            "type": "user",
            "isShowHelp": true,
            "firstLoginDate": 1556085279902,
            "lastLoginDate": 1568807353953,
                "lowerLevelGroupIds": [
                "5ca4524a6008a3000111f58a",
            "5ca47cf16008a3000111f7f3",
            "5ca463cb6008a3000111f728"
            ],
            "pinnedToolIds": [],
                "favoritePackages": [],
                "personalizations": {},
                "notificationSettings": {},
            "status": "active",
            "projects": null,
            "teams": null,
            "hasConsented": true,
            "name":"Welcome User"
        }
        headerConfigData = Object.assign({}, header)
        console.log("Headerconfigdata =" , headerConfigData);
        userDetail = Object.assign({}, user)
        this.setState({
        headerConfigData: headerConfigData,
            userDetail : userDetail
        })

        //Fetch user
        let profileServices = baseURL + '/users/profile';
        let navigationServices = baseURL + '/users/navigation';
        axios.get(profileServices)
        .then((response) => {
            userDetail = Object.assign({}, response.data)
            this.setState({
                userDetail : userDetail
            })
        }).catch((error) => {
        console.log(error);
        });

        //Fetch header configuration details
        axios.get(navigationServices)
        .then((response) => {
            headerConfigData= Object.assign({}, response.data)
            headerConfigData.platform.signOutUrl = res;
            this.setState({
                headerConfigData: headerConfigData,
            })
        }).catch((error) => {
        console.log(error);
        });
    }
    
    render() {
        return(
            <div className="bmrg-header-custom" style={this.props.customHeaderStyle}>
                <div className="bmrg-custom-header-section">
                {
                    this.props.bmrgCustomIcons && this.props.bmrgCustomIcons.length > 0 ? 
                    this.props.bmrgCustomIcons.map((icon, index) => {
                        return (
                            <div className="bmrg-custom-icon" key={index} onClick={(event) => this.props.onIconClick(event, icon.name)} aria-label={icon.ariaLabel}>
                                {icon.icon}
                            </div>
                        )
                    }) : ''
                }
                </div>
                <UIShell
                    style={this.props.customHeaderStyle}
                    baseServiceUrl={this.state.baseUrl}
                    productName={<div><div className="leftfloat" ><div className="ibm-logo-text">IBM <b className="bolder"> {this.props.productName}</b></div><div className="logoDiv"><div className="p0"><div className="divider"></div></div> <div className="ibm-logo"></div>  <div className="toolName">{this.props.headerText}</div></div></div><div className="rightfloat"></div></div>	}
                    headerConfig={this.state.headerConfigData}
                    user={this.state.userDetail}
			    /> 
            </div>
        )
    }
}

export default BoomerangHeader