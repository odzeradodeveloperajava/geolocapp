const deleteItemHandler = () => {
    let array = this.state.items;
    const index = array.findIndex((object) => object.cardId === e);
    array.splice(index, 1);
    //console.log(e);
    this.setState({ items: array });
    this.setState({ activeCard: 0 });
    let container = document.getElementById('imageContainer');
    container.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });



    return null
}

export default deleteItemHandler
