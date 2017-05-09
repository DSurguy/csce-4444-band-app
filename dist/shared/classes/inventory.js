function Inventory(json){
    this.itemId = json.itemId || 0;
    this.id = json.id || 0;
    this.size = json.size || 'none';
    this.quantity = json.quantity || 0;
    this.cartQuantity = json.cartQuantity || 0;
}

if( typeof module !== 'undefined' ){ module.exports = Inventory; }