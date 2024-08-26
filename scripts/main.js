//var aI=document.getElementsByClassName("TIME");
var hour=document.getElementById("hr");
var minute=document.getElementById("min");
var second=document.getElementById("sec");

var count=0;
var begin=null;

//let reload = prompt("設定時間？")

hour.textContent="00";
minute.textContent="00";
second.textContent="00";

function timer(){
  count--;
  console.log(count);
  settime();
  if (count==0){
    timesout();
  }
}

function settime(){
  let sec_temp = parseInt(count%60);
  let min_temp = parseInt((count/60)%60);
  let hr_temp = parseInt(count/60/60);
  if (hr_temp<10){
    hour.textContent="0"+hr_temp;
  }
  else{
    hour.textContent=hr_temp;
  }
  if (min_temp<10){
    min.textContent="0"+min_temp;
  }
  else{
    min.textContent=min_temp;
  }
  if (sec_temp<10){
    sec.textContent="0"+sec_temp;
  }
  else{
    sec.textContent=sec_temp;
  }
}

function addtime(temp){
  count+=temp;
  settime();
}

function timesout(){
  settime();
  clearInterval(begin);
  begin=null;
  setTimeout(()=>{
    alert("Time's out!");
  },1000);
}

document.querySelector("#start").onclick = function(){
  if (begin==null){
    begin=setInterval(timer,1000);
  }
}
document.querySelector("#stop").onclick = function(){
  clearInterval(begin);
  begin=null;
}
document.querySelector("#reset").onclick = function(){
  //alert("Y");
  clearInterval(begin);
  begin=null;
  count=0;
  settime();
  saving_reset();
}


//describes,add_time,erase_time
var describes=["學測複習講義","多鄰國"];
var gsat_btn = document.querySelector("#GSAT_button");
var duolingo_btn = document.querySelector("#duolingo_button");
var addtime_btn = document.querySelector("#add_time_button");
var deltime_btn = document.querySelector("#del_time_button");

function gsat(){
  let str="";
  let temp=document.getElementById("GSAT_input").value;
  event.preventDefault();
  if ((temp!=null)&&(temp!="")&&(temp!=0)){
    str=temp;
    temp=parseInt(str*5*60);
    saving(describes[0],(temp/60));
    addtime(temp);
  }
  else{
    alert("頁數>0！");
  }
}
gsat_btn.addEventListener("click",gsat);

function duo(){
  let str="";
  let temp=document.getElementById("duolingo_input").value;
  event.preventDefault();
  if ((temp!=null)&&(temp!="")&&(temp!=0)){
    str=temp;
    temp=parseInt((str/100)*60);
    saving(describes[1],(temp/60));
    addtime(temp);
  }
  else{
    alert("XP>0！");
  }
}
duolingo_btn.addEventListener("click",duo);

function addother(){
  let temp_des=document.getElementById("add_describe_input").value;
  if ((temp_des==null)||(temp_des=="")){
    temp_des=string_space_add;
  }
  let str="";
  let temp=document.getElementById("add_time_input").value;
  event.preventDefault();
  if ((temp!=null)&&(temp!="")&&(temp!=0)){
    str=temp;
    temp=parseInt(str*60);
    saving(temp_des,(temp/60));
    addtime(temp);
  }
  else{
    alert("時間不得為空！");
  }
}
addtime_btn.addEventListener("click",addother);

function delother(){
  let temp_des=document.getElementById("del_describe_input").value;
  if ((temp_des==null)||(temp_des=="")){
    temp_des=string_space_del;
  }
  let str="";
  let temp=document.getElementById("del_time_input").value;
  event.preventDefault();
  if ((temp!=null)&&(temp!="")&&(temp!=0)){
    str=temp;
    temp=parseInt(str*60);
    saving(temp_des,((count>=temp)?(-temp/60):(-count/60)));
    addtime((count>=temp)?(-temp):(-count));
  }
  else{
    alert("時間不得為空！");
  }
}
deltime_btn.addEventListener("click",delother);


var his = ["none","none","none","none","none"];
//alert(his[0]);
var colors = ["black","black","black","black","black"];

function set_value(){
  var A=document.getElementById("A");
  A.textContent=his[0];
  A.style.color = colors[0];
  var B=document.getElementById("B");
  B.textContent=his[1];
  B.style.color = colors[1];
  var C=document.getElementById("C");
  C.textContent=his[2];
  C.style.color = colors[2];
  var D=document.getElementById("D");
  D.textContent=his[3];
  D.style.color = colors[3];
  var E=document.getElementById("E");
  E.textContent=his[4];
  E.style.color = colors[4];
}

function saving(des,val){
  if (val!=0){
    his.pop();
    colors.pop();
    if (val<0){
      colors.unshift("rgb(189, 0, 44)")
      his.unshift(des+" -"+(-val)+"分鐘");
    }
    else{
      colors.unshift("rgb(0, 168, 70)");
      his.unshift(des+" +"+val+"分鐘");
    }
    set_value();
  }
}

function saving_reset(){
  his.pop();
  colors.pop();
  colors.unshift("black");
  his.unshift("重設 時間=0");
  set_value();
}

var string_space_add = "只是想加時間";
var string_space_del = "只是想減時間";

set_value();
