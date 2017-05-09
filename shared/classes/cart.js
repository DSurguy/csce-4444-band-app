function Cart(json){
    this.userId = json.userId || 0;
    this.bandId = json.bandId || 0;
    this.itemIds = json.itemIds || [];
    this.inventoryIds = json.inventoryIds || [];
    this.quantities = json.quantities || []
}

if( typeof module !== 'undefined' ){ module.exports = Cart; }