/* global Page */
/* global PageView */
/* global PageCtrl */
/* global $ */

/** Main Page **/
function LoginPage(app, data){
    Page.call(this, app, $('#loginPage')[0], LoginCtrl, LoginView);
}
LoginPage.prototype = Object.create(Page.prototype);
LoginPage.prototype.constructor = LoginPage;

function LoginCtrl(page){
    PageCtrl.call(this, page);
}
LoginCtrl.prototype = Object.create(PageCtrl.prototype);
LoginCtrl.prototype.constructor = LoginCtrl;

function LoginView(page){
    PageView.call(this, page);
}
LoginView.prototype = Object.create(PageView.prototype);
LoginView.prototype.constructor = LoginView;
LoginView.prototype.init = function (){
    var page = this.page;
};