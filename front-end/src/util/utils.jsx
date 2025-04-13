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

    // Format date for display (from<ctrl3348>-MM-DD to MM/DD/YYYY)
export function formatDisplayDate (dateString) {
    if (!dateString) return '';
    const parts = dateString.split('-');
    if (parts.length !== 3) return dateString;
    return `${parts[1]}/${parts[2]}/${parts[0]}`;
};

export const serverAddress = "http://localhost:3000";