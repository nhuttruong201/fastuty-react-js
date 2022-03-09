const formatDateTime = (datetime) => {
    var year = datetime.getFullYear(),
        month = datetime.getMonth() + 1, // months are zero indexed
        day = datetime.getDate(),
        hour = datetime.getHours(),
        minute = datetime.getMinutes(),
        second = datetime.getSeconds(),
        hourFormatted = hour % 12 || 12, // hour returned in 24 hour format
        minuteFormatted = minute < 10 ? "0" + minute : minute,
        morning = hour < 12 ? "AM" : "PM";

    return `${day}/${month}/${year} ${hourFormatted}:${minuteFormatted} ${morning}`;
};

export default formatDateTime;
