//reserveApp.js 
//View renderer for System Test Automation Conference 2013 hands on - #STAR.jp @snsk   
//JSHint Assume:Browser jQuery - failed. http://www.jshint.com/

var starHotelView = {

    checkInfo_isErrorRender: function(checkValRes, dateValue) {
        "use strict";
        // field empty check /* could not using jQuery.query plugin, it was confuse return types*/
        if (!starHotel.fieldEmptyCheck("reserve_y", "reserve_m", "reserve_d", "reserve_t", "hc")) {
            $("#errorcheck_result").append("年月日、期間または人数のいずれかが空です<br>");
            return false;
        }
        // normalization with roomcount
        starHotel.normalizationWithZero("single_ns", "single_s", "double_ns", "double_s");

        if (!starHotel.decimalCheck("reserve_y", "reserve_m", "reserve_d", "reserve_t", "hc", "single_ns",
            "single_s", "double_ns", "double_s")) {
            $("#errorcheck_result").append("年月日、期間、人数、部屋数のいずれかの値が半角英数の範囲外です<br>");
            return false;
        }

        // stay term check 
        if (checkValRes["reserve_t"] < 1) {
            $("#errorcheck_result").append("宿泊日数が1日以下です<br>");
            return false;
        }
        //date validation
        if (!isDateValidate(dateValue)) {
            $("#errorcheck_result").append("宿泊日が間違っています<br>");
            return false;
        } else {
            var now = new Date();
            dateValue = new Date(dateValue);
            if (dateValue < now) {
                $("#errorcheck_result").append("宿泊日には、翌日以降の日付を指定してください。<br>");
                return false;
            }
            if (dateValue > now.setDate(now.getDate() + 90)) {
                $("#errorcheck_result").append("宿泊日には、3ヶ月以内のお日にちのみ指定できます。<br>");
                return false;
            }
        }
        // head count check
        if (checkValRes["hc"] < 1) {
            $("#errorcheck_result").append("人数が入力されていません。<br>");
            return false;
        }
        // loom count check
        var roomCount =
            parseInt(checkValRes["single_s"]) + parseInt(checkValRes["single_ns"]) +
            ((parseInt(checkValRes["double_s"]) + parseInt(checkValRes["double_ns"])) * 2);
        if (roomCount != parseInt(checkValRes["hc"])) {
            $("#errorcheck_result").append("部屋数の指定が間違っています。<br>シングルの部屋の宿泊人数は1人、ダブルの部屋の宿泊人数は2人で計算してください。<br>");
            return false;
        }
        // Breakfast check 
        if (!checkValRes["bf_viking"]) {
            $("#errorcheck_result").append("朝食の有無が指定されていません<br>");
            return false;
        }
        return true;
    },

    renderCheckInfo: function(totalBill, dateValue) {
        "use strict";
        //display billing
        $("#billing").append("<h3 id='total'>合計 " + totalBill + "円(税込み)</h3>");
        $("#billing").append("<div style='margin-bottom:10px'>(シングル：1人1泊7000円～、ダブル：1人1泊6000円～、土日は25%アップ) <a href=\"javascript:alert('未実装')\">料金詳細を確認</a></div>");
        dateValue = new Date(dateValue);
        var dateFrom = dateValue.getFullYear() + "年" + (dateValue.getMonth() + 1) + "月" + dateValue.getDate() + "日";
        dateValue.setTime(dateValue.getTime() + checkValRes["reserve_t"] * 24 * 3600 * 1000); //Warning!! dateValue move to N days after.   
        var dateTo = dateValue.getFullYear() + "年" + (dateValue.getMonth() + 1) + "月" + dateValue.getDate() + "日";

        $("#billing").append("<h4 id='term'>" + dateFrom + " 〜 " + dateTo + "  " + checkValRes["reserve_t"] + "泊</h4>");

        //room table
        if (parseInt(checkValRes["single_ns"]) > 0) {
            $("#billing").append("<h4 id='count_single_ns'>" + "シングル(禁煙)" + checkValRes["single_ns"] + "人 = " + parseInt(checkValRes["single_ns"]) * 7000 + "円</h4>");
        }
        if (parseInt(checkValRes["single_s"]) > 0) {
            $("#billing").append("<h4 id='count_single_s'>" + "シングル(喫煙)" + checkValRes["single_s"] + "人 = " + parseInt(checkValRes["single_s"]) * 7000 + "円</h4>");
        }
        if (parseInt(checkValRes["double_ns"]) > 0) {
            $("#billing").append("<h4 id='count_double_ns'>" + "ダブル(禁煙)" + parseInt(checkValRes["double_ns"]) * 2 + "人 = " + parseInt(checkValRes["double_ns"]) * 6000 * 2 + "円</h4>");
        }
        if (parseInt(checkValRes["double_s"]) > 0) {
            $("#billing").append("<h4 id='count_double_s'>" + "ダブル(喫煙)" + parseInt(checkValRes["double_ns"]) * 2 + "人 = " + parseInt(checkValRes["double_s"]) * 6000 * 2 + "円</h4>");
        }
        if (checkValRes["bf_viking"] == "on") {
            $("#billing").append("<h4 id='breakfast'>朝食: あり</h4>");
        } else {
            $("#billing").append("<h4 id='breakfast'>朝食: なし</h4>");
        } if (checkValRes["plan_a"] || checkValRes["plan_b"]) {
            $("#billing").append("<h4 id='plan'>プラン: ");
            if (checkValRes["plan_a"]) $("#plan").append("昼からチェックインプラン ");
            if (checkValRes["plan_b"]) $("#plan").append("お得な観光プラン");
            $("#billing").append("</h4>");
        }

        $("#prev_formdata").val(encodeURIComponent($("#billing").html()));
        console.log($("#billing").html());
        $("#prev_headcount").val(checkValRes["hc"]);

        $("#billing").slideDown("fast");
        $("#reserve_info").slideDown("fast");

        for (var i = 0; parseInt(checkValRes["hc"]) > i; i++) {
            $("#reserve_info").append("お名前 \
                <input id='stay_person_name" + i + "' name='reserve_pname" + i + "' type='text' class='span4' maxlength='50' style='width:100px'> \
                性別\
                <select id='stay_person_sex" + i + "' name='reserve_sex" + i + "' class='span4' style='width:70px'> \
                    <option value='0'></option> \
                    <option value='1'>男性</option> \
                    <option value='2'>女性</option> \
                </select><br>");
        }
        

        $("#reserve_info").append('<hr><div style="margin-bottom:15px;"><a onclick="javascript:alert(\'未実装\');return false;">利用規約を確認</a></div>');
        $("#reserve_info").append('<button id="confirm_and_agree" type="sender" class="btn" style="margin-bottom:20px">利用規約に同意して次へ</button>');
        $("#reserve_info").append('　<button id="disagree" type="sender" class="btn" style="margin-bottom:20px" onclick="javascript:alert(\'未実装\');return false;")>同意しない</button>');

    },

    finalConfirm_isErrorRender: function(checkValRes) {
        "use strict";
        // field empty check /* could not using jQuery.query plugin, it was confuse return types*/
        if (!starHotel.fieldEmptyCheck("reserve_pname", "reserve_zip_pre", "reserve_zip_post", "reserve_phone",
            "reserve_email", "reserve_address")) {
            $("#errorcheck_result").append("代表の方のお名前、郵便番号、住所、またはメールアドレスのいずれかが入力されていません。<br>");
            return false;
        }

        // decimal check.
        var numCheck = /[-]?[0-9]+(¥.[0-9]+)?$/;
        if (!numCheck.test(checkValRes["reserve_zip_pre"]) || !numCheck.test(checkValRes["reserve_zip_post"]) ||
            checkValRes["reserve_phone"] == "") {
            $("#errorcheck_result").append("郵便番号または電話番号のいずれかの値が半角数字の範囲外です<br>");
            return false;
        }
        // decimal and alphabet check.
        var d_a_Check = /[a-zA-Z0-9.@]+$/;
        if (!d_a_Check.test(checkValRes["reserve_email"])) {
            $("#errorcheck_result").append("email欄に不正な文字があります<br>");
            return false;
        }

        // field empty check for all person name.
        for (var i = 0; checkValRes["pv_headcount"] > i; i++) {
            if (checkValRes["reserve_pname" + i] == "") {
                $("#errorcheck_result").append("宿泊される方全員のお名前のいずれかが入力されていません。<br>");
                console.log(checkValRes["reserve_pname" + i]);
                return false;
            }
        }
        return true;
    },

    renderFinalConfirm: function(prevHtml) {
        "use strict";
        prevHtml = prevHtml.replace(/\(シングル.*<a href=.*料金詳細を確認<\/a>/, "");
        $("#billing").append(prevHtml);
        $("#billing").slideDown("fast");

        //display person infomation
        $("#reservation").append("<h3 id='final_pname'>代表の方のお名前: " + checkValRes["reserve_pname"] + "様</h3>");
        $("#reservation").append("<h3 id='final_address'>住所: " + checkValRes["reserve_address"] + "</h3>");
        $("#reservation").append("<h3 id='final_phone'>電話番号: " + checkValRes["reserve_phone"] + "</h3>");
        $("#reservation").append("<h3 id='final_email'>メールアドレス: " + decodeURIComponent(checkValRes["reserve_email"]) + "</h3>");
        var sexSting = "";
        for (var i = 0; checkValRes["pv_headcount"] > i; i++) {
            switch (parseInt(checkValRes["reserve_sex" + i])) {
                case 0:
                    sexSting = "未入力";
                    break;
                case 1:
                    sexSting = "男性";
                    break;
                case 2:
                    sexSting = "女性";
                    break;
                default:
                    sexSting = "未入力";
                    break;
            }
            $("#reservation").append("<h3 id=" + "reserve_pname" + i + ">宿泊される方: " + checkValRes["reserve_pname" + i] + "様 (" + sexSting + ") </h3>");
        }
        $("#reservation").append("<hr>");
        $("#reservation").append('<a href="#goto_thanks" role="button" class="btn" data-toggle="modal">確定</a>');
        $("#reservation").slideDown("fast");

        $('#goto_thanks').modal({
            backdrop: 'static',
            show: false,
        })
    },
}
