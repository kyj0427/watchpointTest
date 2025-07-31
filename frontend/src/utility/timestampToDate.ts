export function timestampToDate(milliseconds: number): string {
    // Add the milliseconds to the current date
    const futureTimestamp = Date.now() + milliseconds;

    // Convert to a Date object
    const futureDate = new Date(futureTimestamp);

    // Correct the types of the options object
    const options: Intl.DateTimeFormatOptions = {
        day: '2-digit',
        month: 'short',
        year: 'numeric'
    };

    // Return the formatted date
    return futureDate.toLocaleDateString('en-GB', options); // 'en-GB' for date format "22 Dec 2025"
}

