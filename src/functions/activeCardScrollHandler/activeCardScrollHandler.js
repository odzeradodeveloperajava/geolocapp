export const activeCardScroll = (position) => {
    let container = document.getElementById('imageContainer');
    container.scroll({
      top: 0,
      left: position,
      behavior: 'smooth'
    });
    return null
}