import "../styles/WeekDays.css"
import '../styles/fonts.css';


export default function WeekDays() {


    function LocalDay({label}) {
        return(
            <div className="dayContainer" >
                <div className="text"  style={{borderRadius: "10px"}}>{label}</div>
            </div>
        )
    }


    let dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']


    function RenderDay({day}) {
        return (
            <>
                <LocalDay label={day}/>
                {day === "Sat" ? <></> : <div className="gap"/>}
            </>
        )
    }

    return(
        <div className="foo-container">
            {dayNames.map((day) => <RenderDay key={day} day={day}/>)}
        </div>
    )
}
    
