function Inventory(json){
    this.itemId = json.itemId || 0;
    this.size = json.size || '';
    this.color = json.color || '';
    this.quantity = json.quantity || 0;
}

if( typeof module !== 'undefined' ){ module.exports = Inventory; }