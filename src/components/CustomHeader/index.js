import React,{Component, Suspense, lazy} from 'react'
import NonBoomerangHeader from '../NonBoomerangHeader/index';

class CustomHeader extends Component {
    constructor(props) {
        super(props);
        this.state = {
            environment:'development'
        }
    }

    componentDidUpdate(prevProps){
        console.log("prevprops= ", prevProps);
        if(prevProps.environment !== this.props.environment){
            this.setState({          
                environment: this.props.environment
            });
        }
    }

    renderDynamicHeader() {
        console.log('inside renderDynamicHeader library');
        let {project, headerText, productName, customHeaderStyle, logoutLink, onSwitcherItemClick, headerPanel, onIconClick, logoLink, headerIcons, navigation, baseURL, features, platform, bmrgCustomIcons} = this.props;
        let {environment} = this.state;
        if(environment !== 'boomerang' && environment !== 'production' && environment !== undefined) {
            console.log("inside non boomerang if block");
            return <NonBoomerangHeader headertxt={headerText} selectedProject={project} productName={productName} customHeaderStyle={customHeaderStyle} logoutLink={logoutLink} onSwitcherItemClick={onSwitcherItemClick} onSwitcherItemClick={onSwitcherItemClick} headerPanel={headerPanel} onIconClick={onIconClick} logoLink={logoLink} headerIcons={headerIcons}/>
        } else {
            console.log("trying to lazy load boomerang file");
            const BoomerangHeader = lazy(() => import("../BoomerangHeader/index"));
            console.log("successfully imported boomerang file");
            console.log(BoomerangHeader);
            return (
                <Suspense fallback={<NonBoomerangHeader headertxt={headerText} selectedProject={project} productName={productName} customHeaderStyle={customHeaderStyle} logoutLink={logoutLink} onSwitcherItemClick={onSwitcherItemClick} onSwitcherItemClick={onSwitcherItemClick} headerPanel={headerPanel} onIconClick={onIconClick} logoLink={logoLink} headerIcons={headerIcons}/>}>
                  <BoomerangHeader headertxt={headerText} selectedProject={project} productName={productName} customHeaderStyle={customHeaderStyle} logoutLink={logoutLink} navigation={navigation ? navigation : undefined} baseURL={baseURL? baseURL : undefined} features={features? features : undefined} platform={platform ? platform : undefined} bmrgCustomIcons={bmrgCustomIcons} onIconClick={onIconClick}/>
                </Suspense>
            );
        }
    }

    render() {
        let headerComponent = this.renderDynamicHeader();
        return(
            <div>
                {headerComponent}
            </div>
        )
    }
}

export default CustomHeader
