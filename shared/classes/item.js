function Item(json) {
    this.id = json.id || 0;
    this.name = json.name || '';
    this.type = json.type || '';
    this.color = json.color || '';
    this.description = json.description || '';
    this.imagePath = json.imagePath || '';
    this.imageFile = json.imageFile || undefined;
    this.price = json.price || 0;
    this.inventory = json.inventory || undefined;
}

if( typeof module !== 'undefined' ){ module.exports = Item; }