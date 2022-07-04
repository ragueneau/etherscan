import React from 'react';
import Footer from './footer/index';

//const FooterContainer = () => {
export default function FooterContainer() {
    return(
        <Footer>
            <Footer.Wrapper>
                <Footer.Row>
                <Footer.Column>
                    <Footer.Title>About</Footer.Title>
                    <Footer.Link href="#">About</Footer.Link>
                    <Footer.Link href="#">Contact</Footer.Link>
                    <Footer.Link href="#">Terms</Footer.Link>
                </Footer.Column>
                <Footer.Column>
                    <Footer.Title>Resources</Footer.Title>
                    <Footer.Link href="#">Resources</Footer.Link>
                </Footer.Column>
                </Footer.Row>
                <Footer.Row>
                    <Footer.Column>
                        <Footer.Title>Legal</Footer.Title>
                        <Footer.Link href="#">Legal</Footer.Link>
                        <Footer.Link href="#">Privacy</Footer.Link>
                    </Footer.Column>
                </Footer.Row>

            </Footer.Wrapper>
        </Footer>
    );
}
//export default FooterContainer;