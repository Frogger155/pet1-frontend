import { createContext } from "react";

export const CurrentUserContext = createContext(
    {
        "username": "Anonymous",    
        "user_id": -1,
        "is_anon_user": true
    }
)