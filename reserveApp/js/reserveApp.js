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
    calcTotalBilling: function(single_ns, single_s, double_ns, double_s, date, bf_viking, planA, planB, term) {
        "use strict";
        var roomBill = ((single_ns + single_s) * 7000) + ((double_ns + double_s) * 6000 * 2);
        var basicPrice = roomBill * term; //basic price

        date = new Date(date);
        var dayCounter = date.getDay(); //scan holiday within term days.
        for (var i = 0; term > i; i++) {
            if (dayCounter === 0 || dayCounter === 6) {
                basicPrice += (single_ns + single_s) * 1750;
                basicPrice += (double_ns * 2 + double_s * 2) * 1500;
            }
            dayCounter++;
            if (dayCounter > 6) {
                dayCounter = 0;
            }
        }
        var holidayPriceBill = basicPrice; //calc holiday price s:+1750, d:+1500;
        var totalBill = holidayPriceBill;
        var headCount = (single_ns + single_s + double_ns * 2 + double_s * 2);

        if (bf_viking === "on") {
            totalBill = holidayPriceBill + (1000 * term * headCount);
        } //bf_viking

        var now = new Date(); //If the 1st day is after 20days from today, 1000yen off each one person.
        if (date.getTime() > now.getTime() + 19 * 24 * 3600 * 1000) {
            totalBill = totalBill - (1000 * headCount);
        }

        if (planA === "on") {
            totalBill += (1000 * headCount);
        }
        if (planB === "on") {
            totalBill += (1000 * headCount);
        }
        return totalBill;
    },
};

window.starHotel = starHotel;
