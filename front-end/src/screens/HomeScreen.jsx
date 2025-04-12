import { Navigate } from "react-router-dom"
import { useNavigate } from 'react-router-dom';


export default function HomeScreen() {
    const navigate = useNavigate();

    return(
        <>
            <div onClick={() => navigate('/journal')}>Hello</div>
        </>
    )
}