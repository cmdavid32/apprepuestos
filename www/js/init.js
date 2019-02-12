exceptions=["index.html",'registro.html','login.html'];


if(!userget() && !inArray(page_name(),exceptions)){

  location.href="index.html";
}

var months=["Ene","Feb","Mar","Abr","May","Jun","Jul","Ago","Sep","Oct","Nov","Dic"];
var monthsFull=["Enero","Febrero","Marzo","Abril","Mayo","Junio","Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre"];
var daysWeek=["Domingo","Lunes","Martes","Miercoles","Jueves","Viernes","Sabado"];


function createRequestObject() {
  var obj;
  var browser = navigator.appName;
  if (browser == "Microsoft Internet Explorer") {
    obj = new ActiveXObject("Microsoft.XMLHTTP");
  } else {
    obj = new XMLHttpRequest();
  }
  return obj;
}

function sendReq(req) {   
  var http = createRequestObject();
  http.open('get', req,false);
  http.onreadystatechange = handleResponse;
  http.send(null);
}

function handleResponse(http) {    
  http=http.target;
  if (http.readyState == 4) {
    var response = http.responseText;

    document.write(response);
  }

}
function load_view(view) {
  sendReq(view);
}
function page_name() {
  var a = window.location.href,
  b = a.lastIndexOf("/");
  return a.substr(b + 1);
}
function userget () {
  if(localStorage.getItem("APP_USER")==undefined ){
    return false;
  }
  return eval('(' + localStorage.getItem("APP_USER") + ')');
}

function receptorget(){
  if(localStorage.getItem("receptor")==undefined ){
    return false;
  }
  return eval('(' + localStorage.getItem("receptor") + ')');
}

function inArray(needle, haystack) {
  var length = haystack.length;
  for(var i = 0; i < length; i++) {
    if(haystack[i] == needle) return true;
  }
  return false;
}
function run_in_app(){
  if (document.location.protocol == 'file:'){
    return true;
  }
  return false;
}

function logout(){
  localStorage.removeItem("APP_USER");
  location.href="index.html";
}
var QueryString = function () {
  // This function is anonymous, is executed immediately and 
  // the return value is assigned to QueryString!
  var query_string = {};
  var query = window.location.search.substring(1);
  var vars = query.split("&");
  for (var i=0;i<vars.length;i++) {
    var pair = vars[i].split("=");
        // If first entry with this name
        if (typeof query_string[pair[0]] === "undefined") {
          query_string[pair[0]] = decodeURIComponent(pair[1]);
        // If second entry with this name
      } else if (typeof query_string[pair[0]] === "string") {
        var arr = [ query_string[pair[0]],decodeURIComponent(pair[1]) ];
        query_string[pair[0]] = arr;
        // If third or later entry with this name
      } else {
        query_string[pair[0]].push(decodeURIComponent(pair[1]));
      }
    }
    return query_string;
  }();