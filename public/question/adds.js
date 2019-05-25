
var area=document.getElementById("ar");
function adding(){
    var di=document.createElement('div');
    di.className='input-group';
    var inp=document.createElement('input');
    inp.className="input--style-2";
    inp.Name="keyword";
    inp.placeholder="enter keyword";
    di.appendChild(inp);
    area.appendChild(di);
}