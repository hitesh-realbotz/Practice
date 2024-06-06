export const getFormattedDateTime = (inputDate = new Date()) => {

    let currentDate;

    if (inputDate instanceof Date && !isNaN(inputDate)) {
        currentDate = inputDate;
    } else {
        currentDate = new Date();
    }

    // Get date components
    let year = currentDate.getFullYear();
    let month = String(currentDate.getMonth() + 1).padStart(2, '0'); // Adding 1 because month is zero-based
    let date = String(currentDate.getDate()).padStart(2, '0');

    // Get time components
    let hours = String(currentDate.getHours()).padStart(2, '0');
    let minutes = String(currentDate.getMinutes()).padStart(2, '0');
    let seconds = String(currentDate.getSeconds()).padStart(2, '0');

    // Determine if it's AM or PM
    let amOrPm = hours >= 12 ? 'PM' : 'AM';

    // Convert hours to 12-hour format
    hours = hours % 12;
    hours = hours ? hours : 12; // If hours is 0, then set it to 12

    // Combine date and time strings
    let formattedDateTime = `${year}-${month}-${date} ${hours}:${minutes}:${seconds} ${amOrPm}`;
    return formattedDateTime;
}