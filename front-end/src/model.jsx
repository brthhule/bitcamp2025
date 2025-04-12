import axios from 'axios'


export function getDate () {
    axios.get("http://localhost:3000/date", {})
    .then(res => {
        console.log(res.data)
    })
    .catch(error => {
        console.log(error)
    });
}

