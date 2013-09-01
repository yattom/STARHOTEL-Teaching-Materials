module("with_checkValRes", {
    setup: function() {
        checkValRes = {
            "reserve_y": "",
            "reserve_m": "8",
            "reserve_d": "",
            "reserve_t": "1",
            "hc": "5",
            "bf_viking": "on", // real data, until here.
            "test_data_zenkaku_char": "あ",
            "test_data_zenkaku_number": "８",
            "test_data_zenkaku_symbol": "【",
            "test_data_zero": 0,
            "test_data_normalNum": 10,
            "test_data_minusOne": -1,
            "test_data_char": "a",
            "test_data_symbol": "-",
            "test_data_null": null,
            "test_data_nullstring": "",
            "test_data_undefined": undefined,
            "test_data_true": true,
            "test_data_false": false,
        };
    }
});

test("fieldEmptyCheck_normal", function() {
    /*Test Design Not yet.
    valid partition: 
    invalid partition: 
    boundary value:
    */
    deepEqual(starHotel.fieldEmptyCheck("reserve_y"), false);
    deepEqual(starHotel.fieldEmptyCheck("reserve_m"), true);
});

test("normalizationWithZero_normal", function() {
    /*Test Design Not yet.
    valid partition: 
    invalid partition: 
    boundary value:
    */
    starHotel.normalizationWithZero("reserve_y");
    deepEqual(checkValRes["reserve_y"], 0);

    starHotel.normalizationWithZero("reserve_y", "reserve_d");
    deepEqual(checkValRes["reserve_y"], 0);
    deepEqual(checkValRes["reserve_d"], 0);

    starHotel.normalizationWithZero("reserve_y", "reserve_m", "reserve_d");
    deepEqual(checkValRes["reserve_y"], 0);
    deepEqual(checkValRes["reserve_m"], "8");
    deepEqual(checkValRes["reserve_d"], 0);
});

test("decimalCheck", function(){
    /*Test Design without combination.
    valid partition: 0, 10, -1, "1", arg[T, T];
    invalid partition: "a", "あ", "", "１", "-", undefined, true, false, arg[T, F], arg[T, T, F];
    boundary value: N/A, ensure by JS Regexp Engine.
    */
    deepEqual(starHotel.decimalCheck("test_data_zero"), true);
    deepEqual(starHotel.decimalCheck("test_data_normalNum"), true);
    deepEqual(starHotel.decimalCheck("test_data_minusOne"), true);
    deepEqual(starHotel.decimalCheck("test_data_normalNum"), true);
    deepEqual(starHotel.decimalCheck("reserve_m"), true);
    deepEqual(starHotel.decimalCheck("reserve_m", "test_data_zero"), true);

    deepEqual(starHotel.decimalCheck("test_data_char"), false);
    deepEqual(starHotel.decimalCheck("test_data_zenkaku_char"), false);
    deepEqual(starHotel.decimalCheck("test_data_nullstring"), false);
    deepEqual(starHotel.decimalCheck("test_data_zenkaku_number"), false);
    deepEqual(starHotel.decimalCheck("test_data_symbol"), false);
    deepEqual(starHotel.decimalCheck("test_data_undefined"), false);
    deepEqual(starHotel.decimalCheck("test_data_true"), false);
    deepEqual(starHotel.decimalCheck("test_data_false"), false);

    deepEqual(starHotel.decimalCheck("reserve_m", "test_data_char"), false);
    deepEqual(starHotel.decimalCheck("test_data_zero", "reserve_m", "test_data_char"), false);

});

test("calcTotalBilling", function(){
    /*Test Design without combination.
    arg: single_ns, single_s, double_ns, double_s, date, bf_viking, planA, planB.
    valid partition:
        (1)single_ns:1, single_s:0, double_ns:0, double_s:0, date:workday, bf_viking:off, planA:off, planB:off, term:1; => 7000
        (2)single_ns:0, single_s:0, double_ns:1, double_s:0, date:workday, bf_viking:off, planA:off, planB:off, term:1; => 12000
        (3)single_ns:0, single_s:0, double_ns:0, double_s:1, date:workday, bf_viking:off, planA:off, planB:off, term:1; => 12000
        (4)single_ns:1, single_s:1, double_ns:1, double_s:1, date:workday, bf_viking:off, planA:off, planB:off, term:1; => 38000
        (5)single_ns:1, single_s:0, double_ns:0, double_s:0, date:holiday, bf_viking:off, planA:off, planB:off, term:1; => 8750
        (6)single_ns:1, single_s:0, double_ns:0, double_s:0, date:holiday, bf_viking:on, planA:off, planB:off, term:1; => 9750
        (7)single_ns:1, single_s:0, double_ns:0, double_s:0, date:holiday, bf_viking:on, planA:off, planB:on, term:1; => 10750
        (8)single_ns:1, single_s:1, double_ns:1, double_s:1, date:holiday, bf_viking:on, planA:on, planB:on, term:1; => 10750

        (9)single_ns:1, single_s:0, double_ns:0, double_s:0, date:workday, bf_viking:off, planA:off, planB:off, term:2; => 14000
       (10)single_ns:1, single_s:0, double_ns:0, double_s:0, date:workday, bf_viking:on, planA:off, planB:off, term:2; => 16000
       (11)single_ns:1, single_s:0, double_ns:0, double_s:0, date:workday, bf_viking:on, planA:on, planB:off, term:2; => 17000

       (12)single_ns:1, single_s:0, double_ns:0, double_s:0, date:twentyOneDaysAfter, bf_viking:off, planA:off, planB:off, term:1; => 6000
       (13)single_ns:1, single_s:0, double_ns:0, double_s:0, date:nineteenDaysAfter, bf_viking:off, planA:off, planB:off, term:1; => 7000
       (14)single_ns:2, single_s:0, double_ns:0, double_s:0, date:twentyOneDaysAfter, bf_viking:off, planA:off, planB:off, term:1; => 12000
       (15)single_ns:1, single_s:0, double_ns:1, double_s:0, date:twentyOneDaysAfter, bf_viking:off, planA:off, planB:off, term:1; => 16000
       (16)single_ns:1, single_s:0, double_ns:0, double_s:0, date:twentyOneDaysAfter, bf_viking:off, planA:off, planB:off, term:2; => 13000

       //9 days from Satday, The holiday(getDay() => 0 || 6) include 4 times. 601 234 560
       (17)single_ns:1, single_s:0, double_ns:0, double_s:0, date:holiday, bf_viking:off, planA:off, planB:off, term:9; => 8750 + 35000 + 8750 + 8750 + 7000

    invalid partition:
        N/A, ensure by error check until here and it is single & liner processing.
    boundary value:
        N/A, ensure by error check until here and it is single & liner processing. 
    */

    var workday = new Date("2013/8/29");
    if(workday.getDay() == 0 || workday.getDay() == 6){ //if today is holiday, slide 3 days after. #0->3, 6->2   
        workday.setTime(workday.getTime() + 3 * 24 * 3600 * 1000);
        console.log("slide!wk:" + twentyOneDaysAfter);
    }
    var holiday = new Date("2013/8/31");//Satday
    var twentyOneDaysAfter = new Date();
    var nineteenDaysAfter = new Date();

    twentyOneDaysAfter.setTime(twentyOneDaysAfter.getTime() + 21 * 24 * 3600 * 1000);
    if(twentyOneDaysAfter.getDay() == 0 || twentyOneDaysAfter.getDay() == 6){ //if it is holiday, slide 3 days after. #0->3, 6->2   
        twentyOneDaysAfter.setTime(twentyOneDaysAfter.getTime() + 3 * 24 * 3600 * 1000);
        console.log("slide!tw:" + twentyOneDaysAfter);
    }
    nineteenDaysAfter.setTime(nineteenDaysAfter.getTime() + 19 * 24 * 3600 * 1000);
    if(nineteenDaysAfter.getDay() == 0 || nineteenDaysAfter.getDay() == 6){ //if it is holiday, slide -3 days ago. #0->4, 6->3   
        nineteenDaysAfter.setTime(nineteenDaysAfter.getTime() - 3 * 24 * 3600 * 1000);
        console.log("slide!nt:" + nineteenDaysAfter);
    }
    console.log("wk: " + workday);        
    console.log("hl: " + holiday);    
    console.log("tw: " + twentyOneDaysAfter);
    console.log("nt: " + nineteenDaysAfter);

    deepEqual(starHotel.calcTotalBilling(1, 0, 0, 0, workday, "off", "off", "off", 1), 7000, "(1)");
    deepEqual(starHotel.calcTotalBilling(0, 0, 1, 0, workday, "off", "off", "off", 1), 12000, "(2)");
    deepEqual(starHotel.calcTotalBilling(0, 0, 0, 1, workday, "off", "off", "off", 1), 12000, "(3)");
    deepEqual(starHotel.calcTotalBilling(1, 1, 1, 1, workday, "off", "off", "off", 1), 14000 + 12000 + 12000, "(4)");
    deepEqual(starHotel.calcTotalBilling(1, 0, 0, 0, holiday, "off", "off", "off", 1), 7000 * 1.25, "(5)");
    deepEqual(starHotel.calcTotalBilling(1, 0, 0, 0, holiday, "on", "off", "off", 1), 7000 * 1.25 + 1000, "(6)");
    deepEqual(starHotel.calcTotalBilling(1, 0, 0, 0, holiday, "on", "on", "off", 1), 7000 * 1.25 + 1000 + 1000, "(7)");
    deepEqual(starHotel.calcTotalBilling(1, 1, 1, 1, holiday, "on", "on", "on", 1), (8750 * 2) + (7500 * 4) + (1000 * 6) + (2000 * 6), "(8)");

    deepEqual(starHotel.calcTotalBilling(1, 0, 0, 0, workday, "off", "off", "off", 2), 14000, "(9)");
    deepEqual(starHotel.calcTotalBilling(1, 0, 0, 0, workday, "on", "off", "off", 2), 16000, "(10)");
    deepEqual(starHotel.calcTotalBilling(1, 0, 0, 0, workday, "on", "on", "off", 2), 17000, "(11)");

    deepEqual(starHotel.calcTotalBilling(1, 0, 0, 0, twentyOneDaysAfter, "off", "off", "off", 1), 6000, "(12)");
    deepEqual(starHotel.calcTotalBilling(1, 0, 0, 0, nineteenDaysAfter, "off", "off", "off", 1), 7000, "(13)");
    deepEqual(starHotel.calcTotalBilling(2, 0, 0, 0, twentyOneDaysAfter, "off", "off", "off", 1), 12000, "(14)");
    deepEqual(starHotel.calcTotalBilling(1, 0, 1, 0, twentyOneDaysAfter, "off", "off", "off", 1), 16000, "(15)");
    deepEqual(starHotel.calcTotalBilling(1, 0, 0, 0, twentyOneDaysAfter, "off", "off", "off", 2), 13000, "(16)");

    deepEqual(starHotel.calcTotalBilling(1, 0, 0, 0, holiday, "off", "off", "off", 9), 7000 * 5 + 8750 * 4, "(17)");
});


