const List=document.getElementById('List');
const highScore=JSON.parse(localStorage.getItem('highScore'));
for(var i=0;i<highScore.length;++i){
 var lNode= document.createElement("li");
  lNode.classList.add("listItem");
  var tNode=document.createTextNode(highScore[i].name+" - "+highScore[i].Score);
  lNode.appendChild(tNode);
  List.appendChild(lNode);
}
