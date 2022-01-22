const initialState = {
    bottomGalleryItems:
    [
        {cameraBrand: "samsung",
        cameraModel: "SM-G950F",
        cardId: "20180822_132025.jpg",
        community: "Tarnowskie Góry",
        country: "Poland",
        date: "2018-08-22",
        fnumber: "1.7",
        fullImageUrl: "https://upload.wikimedia.org/wikipedia/commons/7/78/006_Piekary_Slaskie%2C_Poland.jpg",
        imageUrl: "https://upload.wikimedia.org/wikipedia/commons/7/78/006_Piekary_Slaskie%2C_Poland.jpg",
        iso: "40",
        lat: "50.43277777777777",
        lon: "18.853055555555557",
        photoSize: "4032 x 3024",
        province: "Silesian Voivodeship",
        shutter: "1/1006",
        size: "7612873",
        time: "13:20:25",
        town: "Bobrowniki Śląskie – Piekary Rudne"}
    ]
}

const rootReducer = (state = initialState, action) => {
    const {bottomGalleryItems} = state
    return {bottomGalleryItems}
};

export default rootReducer