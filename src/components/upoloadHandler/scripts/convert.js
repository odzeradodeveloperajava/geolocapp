

function convert(degrees, minutes, seconds, direction) {
    var dd = degrees + (minutes/60) + (seconds/3600);
        if (direction === "S" || direction === "W") {
        dd = dd * -1;
    }
        return dd;
};


export default convert;