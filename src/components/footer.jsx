import React from 'react';
function FooterDc() {

    return(
        <React.Fragment>
            <footer>
            {/* <hr /> */}
                <div className="container-footer">
                    <div className="footer text-center text-white">
                        
                            {/* <strong>Distribution Center</strong> */}
                            <p className="spaced-paragraph">Distribution Center</p>
                            {/* <strong>Copyright &copy; 2024</strong> All rights reserved. */}
                            <p className="spaced-paragraph">Copyright &copy; 2024 All rights reserved.</p>
                            <strong>v 1.2</strong>
                            <p className="spaced-paragraph"></p>
                        
                    </div>
                </div>
            </footer>
        </React.Fragment>
    )
}

export default FooterDc;