import React from "react";
import { useMsal } from "@azure/msal-react";
import Button from "react-bootstrap/Button";

/**
 * Renders a sign-out button with redirect
 */
export const SignOutButton = () => {
    const { instance } = useMsal();

    const handleLogout = () => {
        instance.logoutRedirect({
            postLogoutRedirectUri: "http://localhost:3000/",
        });
    };

    return (
        <Button variant="custom" className="ml-auto custom-button" onClick={handleLogout}>
            Salir
        </Button>
    );
};
