export default {
  createFilterList: arr => {
    return (function fn(data) {
      return data.map(item => {
        let list = {};
        if (Array.isArray(item.children) && item.children.length) {
          list.children = fn(item.children);
        }
        // 本地数据字典，没有 ID 字段
        return {
          name: item.name,
          text: item.name,
          value: !item.id ? item.value : item.id,
          ...list
        };
      });
    })(arr);
  }
};
