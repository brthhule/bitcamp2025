export function convertMonthIndex(monthIndex) {
    // Add error handling for bounds
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    return months[monthIndex];
}

export function formatDate(dateObject) {
    const date = dateObject.getDate();
    const year = dateObject.getFullYear();
    const month = (dateObject.getMonth() + 1).toString().padStart(2, '0');
    const formattedDate = `${year}-${month}-${date.toString().padStart(2, '0')}`;
    return formattedDate;
}