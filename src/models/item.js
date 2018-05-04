class Item {
  constructor(id, headline, content = null, creator = null) {
    this.id = id;
    this.headline = headline;
    this.content = content;
    this.creator = creator;
  }
}

export default Item;
