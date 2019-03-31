export default {
  createFilterList: arr => {
    return (function fn(data) {
      return data.map(item => {
        let tmp = {};
        if (Array.isArray(item.children) && item.children.length) {
          tmp.children = fn(item.children);
        }
        return { name: item.name, text: item.name, value: item.id, ...tmp };
      });
    })(arr);
  }
};
