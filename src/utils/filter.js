export default {
  createFilterList: arr => {
    return arr.map(item => ({ text: item.name, value: item.value }));
  }
};
