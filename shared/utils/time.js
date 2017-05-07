if( typeof module !== 'undefined' ){ var leftPad = require('./leftPad.js'); }

var Time = {
    fromAMPM: function (time){
        var timeSplit = time.split(/:\s/g);
        if( time.toLowerCase().indexOf('am') != -1 ){
            return leftPad(timeSplit[0],2,'0')+':'+leftPad(timeSplit[1],2,'0');
        }
        else if( time.toLowerCase().indexOf('pm') != -1){
            if( parseInt(timeSplit[0],10) == 12 ){
                return leftPad(timeSplit[0],2,'0')+':'+leftPad(timeSplit[1],2,'0');
            }
            else{
                return leftPad(parseInt(timeSplit[0],10)+12,2,'0')+':'+leftPad(timeSplit[1],2,'0');
            }
        }
        else{
            return time.split(/:/g).slice(0,3).map(function (val){
                return leftPad(val,2,'0');
            }).join(':');
        }
    }
};

if( typeof module !== 'undefined' ){ module.exports = Time; }