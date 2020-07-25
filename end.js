const userName=document.getElementById("userName");
const finalScore = document.getElementById("finalScore");
const saveScore=document.getElementById("saveScore");
const fScore=localStorage.getItem("fScore");
finalScore.innerText=fScore;
const highScore = JSON.parse(localStorage.getItem('highScore'))||[];
console.log(highScore);

saveHighScore= function(e){
  e.preventDefault();
  if(!userName.value) return;
  const score={
    Score: fScore,
    name: userName.value
  };
  highScore.push(score);
  highScore.sort(function(a,b){
    return b.Score-a.Score;
  })
  highScore.splice(3);
  localStorage.setItem('highScore',JSON.stringify(highScore));
  console.log(highScore);
  window.open('index.html',"_self");
}