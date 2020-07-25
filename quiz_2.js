const Question = document.getElementById("question");
const choices= Array.from(document.getElementsByClassName("choice-text"));
const questionNumber= document.getElementById("questionNumber");
const scoreText= document.getElementById("score");

let questionCount=0;
let score=0;
let availableQuestions=[];

let questions=[];

fetch("questionsCollection.json")
.then(res => {return res.json();})
.then(data => { questions=data; start(); })
.catch(err => {console.error(err);});

let curQuestion={};
let questionIndex;
let MaxQuestions=10;
start=function(){
  questionCount=0;
  score=0;
  availableQuestions=[...questions];
  getNewQuestion();
}

getNewQuestion=function(){
  if(questionCount>=MaxQuestions){
      localStorage.setItem("fScore",score);
      window.open('end.html',"_self");
  }

  questionCount++;
  questionNumber.innerText=questionCount+"/"+MaxQuestions;
  const questionIndex = Math.floor(Math.random()*availableQuestions.length);
  curQuestion=availableQuestions[questionIndex];
  Question.innerText=curQuestion.questionText;
  choices.forEach(choice => {
    const number= choice.dataset['number']; 
    choice.innerText= curQuestion['choice'+ number ];
  } )
  availableQuestions.splice(questionIndex,1);
}


choices.forEach(choice => {

  choice.addEventListener("click",function(e){
    const selectedChoice = e.target;
    const selectedAnswer = selectedChoice.dataset['number'];
    var result="incorrect";
    if(selectedAnswer == curQuestion.answer) result="correct";
    if(result=="correct"){
      score+=10;
      scoreText.innerText=score;
    }  
    selectedChoice.parentElement.classList.remove("hover-effect");
    selectedChoice.parentElement.classList.add(result);

    if(result=="incorrect"){
      choices.forEach(choice=>{
        const number=choice.dataset['number'];

        if(number==curQuestion.answer){
          correctChoice=choice;
          choice.parentElement.classList.add("correct");
          choice.parentElement.classList.remove("hover-effect");
        }

      })
    }

    setTimeout(function(){
      selectedChoice.parentElement.classList.remove(result);
      selectedChoice.parentElement.classList.add("hover-effect");
      if(result=="incorrect"){
        correctChoice.parentElement.classList.remove("correct");
        correctChoice.parentElement.classList.add("hover-effect");
      }
      getNewQuestion();
    },1000);
    
  })
})

