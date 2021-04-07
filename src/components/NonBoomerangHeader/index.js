import React, {Component} from 'react'
import {
    Header,
    HeaderName,
    HeaderGlobalBar,
    HeaderGlobalAction,
    HeaderPanel,
    Switcher, SwitcherDivider, SwitcherItem
  } from 'carbon-components-react/es/components/UIShell';
import './nonBoomerangHeader.scss';

class BoomerangHeader extends Component {
    constructor(props) {
	    super(props);
    }

    componentDidMount() {
        console.log("Rendering non boomerang header");
        console.log("header props = ", this.props.headerIcons);
    }
    
    render() {
        return(
            <div class="non-bmrg-header" style={this.props.customHeaderStyle}>
                <Header aria-label="header">
                    <HeaderName href={this.props.logoLink} prefix="IBM">
                    {this.props.productName}
                    </HeaderName>
                    <HeaderGlobalBar>
                    {
                        this.props.headerIcons ? 
                        this.props.headerIcons.map((icon, index) => {
                            return (
                                <HeaderGlobalAction key={index} onClick={(event) => this.props.onIconClick(event, icon.name)} aria-label={icon.ariaLabel}>
                                    {icon.icon}
                                </HeaderGlobalAction>
                            )
                        })
                        : ''
                    }
                    </HeaderGlobalBar>
                    <HeaderPanel aria-label="Header Panel" expanded={this.props.headerPanel.expanded} style={this.props.headerPanel.properties}>
                        <Switcher aria-label="Switcher Container">
                            {this.props.headerPanel.links.length > 0? 
                            this.props.headerPanel.links.map((link,index) => {
                                if(link.path !== '') {
                                    return (
                                        <div className="headerpanel-switcher">
                                            <SwitcherItem aria-label={link.name} href={link.path}>
                                                {link.name}
                                            </SwitcherItem>
                                            <SwitcherDivider/>
                                        </div>
                                    )
                                } else {
                                    return (
                                        <div className="headerpanel-switcher">
                                            <SwitcherItem aria-label={link.name} onClick={(event) => this.props.onSwitcherItemClick(event, link.name)}>
                                                {link.name}
                                            </SwitcherItem>
                                            <SwitcherDivider/>
                                        </div>
                                    )
                                }
                                }) : ''
                            }
                        </Switcher>
                    </HeaderPanel>
                </Header>
            </div>
        )
    }
}

export default BoomerangHeader