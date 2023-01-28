import AdminNavbar from "./Navbars/AdminNavbar";
import {Container} from "reactstrap";
import AdminFooter from "./Footers/AdminFooter";
import React, {useEffect, useRef} from "react";
import {useLocation} from "react-router-dom";

const Page = (props) => {
    const mainContent = useRef(null)
    const location = useLocation()

    useEffect(() => {
        document.documentElement.scrollTop = 0
        document.scrollingElement.scrollTop = 0
        mainContent.current.scrollTop = 0
    }, [location])

    return (
        <div className="main-content" ref={mainContent}>
            {
                !props.hideNavbar && <>
                    <AdminNavbar
                        {...props}
                        brandText={'Yelp'}
                    />
                    <div style={{width: 77, height: 67}}/>
                </>
            }
            {props.children}
            {
                !props.hideFooter && <Container fluid>
                    <AdminFooter/>
                </Container>
            }
        </div>
    )
}

export default Page