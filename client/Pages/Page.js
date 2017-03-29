/** Inheritable Classes **/
function Page(app, elem, ctrlConstructor, viewConstructor){
    this.app = app;
    this.elem = elem;
    this.ctrl = new ctrlConstructor(this);
    this.view = new viewConstructor(this);
}
Page.prototype.init = function (){
    this.ctrl.init();
};

function PageCtrl(page){
    this.page = page;
}
PageCtrl.prototype.init = function (){
    this.page.view.init();
};

function PageView(page){
    this.page = page;
}
PageView.prototype.init = function (){};