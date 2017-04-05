/* global expect */
var loginService = require('../server/services/loginService.js');

describe('Test Suite', function (){
    it('should do a thing', function (done){
        loginService.checkPassword({
            testPassword: 'test',
            dbSalt: 'potato',
            dbPassword: '7337cff7f385ddfba854',
            userId: 12345
        })
        .then((userId)=>{
            expect(userId).toBe(12345);
            done();
        })
        .catch(console.error);
    });
    it('should do a thing', function (done){
        loginService.checkPassword({
            testPassword: 'test',
            dbSalt: 'anotherSalt',
            dbPassword: '7337cff7f385ddfba854',
            userId: 12345
        })
        .then((userId)=>{
            expect(userId).toBe(false);
            done();
        })
        .catch(console.error);
    });
})