window.addEventListener("load" , function (){

    var config_dt   = {
        enableTime: true,
        dateFormat: "Y-m-d H:i",
        "locale"  : "ja"
    };

    flatpickr("#dt",config_dt);

    setInterval('showClock2()',1000);

    document.getElementById("addbutton1").style.display ="none";

    setInterval('showCountdown()',1000);

    ///for (let i=0;i< $("dead").length  ;i++){
    ///y = content.deadline.Y


});

//イベントハンドラを定義する
$(function (){

    $(".edit_button").on("click", function() {
        modal_open($(this).val());
    });

    var modal           = $('#modal');
    var modalContent    = $('#modal_content');

    //画面外が押されたときの処理
    $(modal).on('click', function(event) {
        if(!($(event.target).closest(modalContent).length)){
            modal_close();
        }
    });

});


function set2fig(num) {
   // 桁数が1桁だったら先頭に0を加えて2桁に調整する
   var ret;
   if( num < 10 ) { ret = "0" + num; }
   else { ret = num; }
   return ret;
}
function showClock2() {
   var nowTime = new Date();
   var nowYear = set2fig( nowTime.getFullYear() );
   var nowMonth = set2fig( nowTime.getMonth() + 1 );
   var nowDate = set2fig( nowTime.getDate() );
   var nowHour = set2fig( nowTime.getHours() );
   var nowMin  = set2fig( nowTime.getMinutes() );
   var nowSec  = set2fig( nowTime.getSeconds() );
   var msg = "現在"+ nowYear + "年" + nowMonth + "月" + nowDate + "日" + nowHour + ":" + nowMin + ":" + nowSec + " です。";
   document.getElementById("RealtimeClockArea2").innerHTML = msg;
}

function modal_open(id){

    $('#modal').show();

    //deadline処理
    var deadline_str    = $("#" + id + "_deadline").text();

    deadline_str        = deadline_str.replace("年","-");
    deadline_str        = deadline_str.replace("月","-");
    deadline_str        = deadline_str.replace("日","");
    deadline_str        = deadline_str.replace("時",":");
    deadline_str        = deadline_str.replace("分","");

    var config_dt   = { 
        defaultDate: deadline_str,
        enableTime: true,
        dateFormat: "Y-m-d H:i",
        "locale"  : "ja"
    };  

    flatpickr('#modal_deadline', config_dt);


    //task処理
    var modal_text  = $("#" + id + "_task").html();
    modal_text      = modal_text.replace(/<br>/mg,"\n");
    $("#modal_task").val(modal_text);


    //id処理
    $("#edit_target_id").val(id)

};
function modal_close(){
    $('#modal').hide();
};


//document.getElementById("addbutton1").style.display ="none";

function addbutton(){
	const addbutton1 = document.getElementById("addbutton1");

	if(addbutton1.style.display=="block"){
		// noneで非表示
		addbutton1.style.display ="none";
	}else{
		// blockで表示
		addbutton1.style.display ="block";
	}
}
/////////////////////////////////////////////////////////////////////////////////////
function set2fig(num) {
   // 数値が1桁だったら2桁の文字列にして返す
   var ret;
   if( num < 10 ) { ret = "0" + num; }
   else { ret = num; }
   return ret;
}
function isNumOrZero(num) {
   // 数値でなかったら0にして返す
   if( isNaN(num) ) { return 0; }
   return num;
}
function showCountdown() {

    //jQueryのオブジェクトを変数に入れる(これでコードが見やすくなる)
    var dt  = $(".deadline_dt");
    for (let i=0;i<dt.length;i++){
        
        var deadline_str    = dt.eq(i).text()

        //値を正規表現で抜き取る
        var year        = String(deadline_str.match(/\d{4}年/)).replace("年","");
        var month       = String(deadline_str.match(/\d{2}月/)).replace("月","");
        var day         = String(deadline_str.match(/\d{2}日/)).replace("日","");
        var hour        = String(deadline_str.match(/\d{2}時/)).replace("時","");
        var minute      = String(deadline_str.match(/\d{2}分/)).replace("分","");

        //現在の日時とスケジュールの締め切りの日時を抜き取る
        var dead_date       = new Date(year + "-" + month + "-" + day + "T" + hour + ":" + minute);
        var now_date        = new Date();

        //計算する。期限切れていたら期限切れと表示。期限内であれば残り時間を表示
        var diff        = dead_date.getTime() - now_date.getTime()
        if (diff < 0){
            dt.eq(i).next().html("この案件は期限切れです");
        }
        else{
            //これを割り算で算出し、Date型にSetして文字列型にしてレンダリング
            var left_day    = String(Math.floor(diff/86400000));
            var left_hour   = String(Math.floor((diff - left_day*86400000)/3600000));
            var left_minute = String(Math.floor((diff - left_day*86400000 - left_hour*3600000)/60000));
            var left_second = String(Math.floor((diff - left_day*86400000 - left_hour*3600000 - left_minute*60000)/1000));

            var left_string = "残り"+ left_day + "日" + left_hour + "時間" + left_minute + "分" + left_second + "秒";

            dt.eq(i).next().html(left_string);
            
        }





    }




}

