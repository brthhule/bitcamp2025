import { Navigate } from "react-router-dom"

export default function HomeScreen() {
    return(
        <>
            <div onClick={<Navigate to="/journal"/>}>
                Hello!
            </div>
            
        </>
    )
}