function convert(degrees, minutes, seconds, direction) {
    var dd = degrees + (minutes/60) + (seconds/3600);
        if (direction === "S" || direction === "W") {
        dd = dd * -1;
    }
        console.log('po policzeniu to jest ', dd);
        let pp = dd.toFixed(6);
        return pp;
};


export default convert;