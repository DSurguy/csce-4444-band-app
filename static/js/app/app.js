/* global $ */

function App(){
    this.currentPage = undefined;
    this.pageHistory = [];
}
App.prototype.init = function (initialPageId){
    this.changePage(initialPageId);
};
App.prototype.changePage = function (page, data){
    if( this.currentPage ){
        //store the constructor for the last page
        this.pageHistory.push(this.currentPage.constructor);
        $(this.currentPage.elem).removeClass('active');
    }
    //create a new instance of the next page
    this.currentPage = new page(this);
    $(this.currentPage.elem).addClass('active');
    this.currentPage.init();
};