const newActiveImage = (e, state) => {
    let array = state.bottomGalleryItems;
    const index = array.findIndex((object) => object.cardId === e);
    window.scrollTo({ top: 0, behavior: 'smooth' });
    return  [state.bottomGalleryItems[index]]
}

export default newActiveImage;
