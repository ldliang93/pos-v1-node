const datbase = require('../main/datbase.js');
module.exports = function printInventory(inputs,allItems) {
    let barcodes = getBarcodeItems(inputs);
    let cartItems = getCartItems(barcodes, allItems);
    let bill =  getBillList(cartItems);
    return bill;
};

function getBarcodeItems(inputs){
  var barcodes = {};
  inputs.map(input => {
    if(barcodes[input]){
      barcodes[input]++;
    }else if (input.indexOf('-') !== -1) {
      barcodes[input.split("-")[0]] = Number(input.split("-")[1]);
    }else{
      barcodes[input] = 1;
    }
  });
  return barcodes;
}

function getCartItems(barcodes, allItems){
  let cartItems = allItems.filter(item => barcodes[item.barcode] ? item.num = Number(barcodes[item.barcode]) : "");
  cartItems.filter(item => item.prom = Math.floor(barcodes[item.barcode] /3 ));
  return cartItems;
}

function getBillList(cartItems){
  let billList = '***<没钱赚商店>购物清单***';
  let delimiter = '----------------------' + '\n' + '挥泪赠送商品：';
  let totalPrice = 0,save = 0;
  cartItems.forEach(item => {
      let itemTotalPrice = (item.num - item.prom) * item.price;
      totalPrice += itemTotalPrice;
      billList += '\n' + '名称：' + item.name + '，数量：' + item.num + item.unit + '，单价：' + item.price.toFixed(2) + '(元)，小计：' + itemTotalPrice.toFixed(2) + '(元)';

      if (item.prom > 0) {
          delimiter += '\n' + '名称：' + item.name + '，数量：' + item.prom + item.unit;
          save += item.prom * item.price;
      }
  });
  billList += '\n' + delimiter + '\n' + '----------------------' + '\n' + '总计：' + totalPrice.toFixed(2) + '(元)' + '\n' + '节省：' + save.toFixed(2) + '(元)' + '\n' + '**********************';
  console.log(billList);
}
