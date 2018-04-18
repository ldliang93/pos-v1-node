module.exports = function main() {
    var items = loadAllItems();
    const promotions = loadPromotions();
    var selectedItems = selectionString2Obj(selectedItems);
    const cartItems = selectedIds2CartItems(selectedItems);
};

function selectionString2Obj(selectedItems){
  var seleItems = [];
  let temp;
  var count = 0;
  temp = selectedItems[0];
    selectedItems.map((item) => {
      if (temp === selectedItems[i]) {
          count++;
      }
      if ((temp != selectedItems[i]) || (i === selectedItems.length - 1)) {
              seleItems.push({
                  key: temp,
                  count: count
              });
              temp = selectedItems[i];
              var count = 1;
      }
      if (selectedItems[i].length > 10) {
              temp = selectedItems[i].substring(0, 10);
              count = selectedItems[i].substring(11);
              count = parseInt(count);
              seleItems.push({
                  key: temp,
                  count: count
              })
          }
    });
    return seleItems = [];
}

function selectedIds2CartItems(selectedItems){
  let cartItems = [];
  selectedItems.map((seleInfo) => {
    const barcode = seleInfo.substring(0,10);
    const item = getItemById(barcode);
    let cartItem = {
      name : item.name,
      number : number,
      unit : item.unit,
      price : item.price,
      totalPrice : item.price * number,
      barcode : barcode
    }
    cartItems.push(cartItem)
  });
  return cartItems;
}
