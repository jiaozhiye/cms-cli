export default {
  createFilterList: arr => {
    return (function fn(data) {
      return data.map(item => {
        let tmp = {};
        if (Array.isArray(item.children) && item.children.length) {
          tmp.children = fn(item.children);
        }
        // 本地数据字典，没有 ID 字段
        if (!item.id) {
          return { name: item.name, text: item.name, value: item.value, ...tmp };
        }
        // 后台数据，具有 ID 字段
        return { name: item.name, text: item.name, value: item.id, ...tmp };
      });
    })(arr);
  }
};
