function convert(degrees, minutes, seconds, direction) {
    let convertedLat = degrees + (minutes/60) + (seconds/3600);
        if (direction === "S" || direction === "W") {
            convertedLat = convertedLat * -1;
        
    }
        return convertedLat;
};


export default convert;