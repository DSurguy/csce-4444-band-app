function leftPad(str, leng, pad){
    var newStr = str;
    while(newStr.length < leng){
        newStr = pad + newStr;
    }
    return newStr;
}

if( typeof module !== 'undefined' ){ module.exports = leftPad; }