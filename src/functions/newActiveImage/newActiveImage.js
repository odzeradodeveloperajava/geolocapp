const newActiveImage = (e, state) => {
    let array = state.bottomGalleryItems;
    const index = array.findIndex((object) => object.cardId === e);
    return  [state.bottomGalleryItems[index]]
}

export default newActiveImage;
