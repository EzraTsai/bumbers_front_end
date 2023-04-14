import React from "react";
import { Link } from "react-router-dom";

function Home() {
    return (

        <Link to="/signup">
            <button variant="outlined">
                Sign up
            </button>
        </Link>
    )
}


export default Home;