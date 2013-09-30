//reserveApp.js 
//Billing calculation at hotel and utils for System Test Automation Conference 2013 hands on - #STAR.jp @snsk   
//JSHint Assume:Browser http://www.jshint.com/

var getUrlVars = function() {
    "use strict";
    var vars = {};
    var param = location.search.substring(1).split('&');
    for (var i = 0; i < param.length; i++) {
        var keySearch = param[i].search(/=/);
        var key = '';
        if (keySearch !== -1) {
            key = param[i].slice(0, keySearch);
        }
        var val = param[i].slice(param[i].indexOf('=', 0) + 1);
        if (key !== '') {
            vars[key] = decodeURI(val);
        }
    }
    return vars;
};

// field empty check /* could not using jQuery.query plugin, it was confuse return types*/
var checkValRes = getUrlVars();
var starHotel = {

    fieldEmptyCheck: function() {
        "use strict";
        for (var i = 0; i < arguments.length; i++) {
            if (checkValRes[arguments[i]] === "") {
                return false;
            }
        }
        return true;
    },
    normalizationWithZero: function() {
        "use strict";
        for (var i = 0; i < arguments.length; i++) {
            if (checkValRes[arguments[i]] === "" || checkValRes[arguments[i]] === "+") {
                checkValRes[arguments[i]] = 0;
            }
        }
    },
    decimalCheck: function() {
        "use strict";
        var numCheck = /[-]?[0-9]+(¥.[0-9]+)?$/;
        for (var i = 0; i < arguments.length; i++) {
            if (!numCheck.test(checkValRes[arguments[i]])) {
                return false;
            }
        }
        return true;
    },
    calcTotalBilling: function(date, bf, planA, planB, term, hc) {
        "use strict";
        var roomBill = 7000;
        var basicPrice = roomBill * term * hc; //basic price

        console.log(date, bf, planA, planB, term, hc);
        console.log("basic",basicPrice);

        date = new Date(date);
        var dayCounter = date.getDay(); //scan holiday within term days.
        for (var i = 0; term > i; i++) {
            if (dayCounter === 0 || dayCounter === 6) {
                basicPrice += term * 1750;
            }
            dayCounter++;
            if (dayCounter > 6) {
                dayCounter = 0;
            }
        }
        var holidayPriceBill = basicPrice; //calc holiday price s:+1750, d:+1500;
        console.log("holidayPriceBill",holidayPriceBill);
        var totalBill = holidayPriceBill;

        if (bf === "on") {
            totalBill = holidayPriceBill + (1000 * term * hc);
        } //bf

        var now = new Date(); //If the 1st day is after 20days from today, 1000yen off each one person.
        if (date.getTime() > now.getTime() + 19 * 24 * 3600 * 1000) {
            totalBill = totalBill - (1000 * hc);
        }

        if (planA === "on") {
            totalBill += (1000 * hc);
        }
        if (planB === "on") {
            totalBill += (1000 * hc);
        }
        console.log("total",totalBill);
        return totalBill;
    },
};

window.starHotel = starHotel;
