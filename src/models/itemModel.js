class ItemModel {
  constructor(title) {
    this.title = title;
    this.parent = null;
    this._children = [];
  }

  get children() {
    return this._children;
  }

  set children(v) {
    for (const item of v) {
      item.parent = this;
    }
    this._children = v;
  }

  // { css: [{key1: [{key2: [key3]}]}] }
  static parse(data) {
    function dispatch(data) {
      if (typeof data === 'string') {
        return new ItemModel(data);
      }
      if (typeof data === 'object') {
        const key = Reflect.ownKeys(data)[0];
        const model = new ItemModel(key);
        const children = [];
        data[key].forEach((item) => {
          children.push(dispatch(item));
        });
        model.children = children;
        return model;
      }
    }
    return dispatch(data);
  }
}

export default ItemModel;
