const Question = document.getElementById("question");
const choices= Array.from(document.getElementsByClassName("choice-text"));
const questionNumber= document.getElementById("questionNumber");
const scoreText= document.getElementById("score");

let questionCount=0;
let score=0;
let availableQuestions=[];

let questions=[];

let curQuestion={};
let questionIndex;
let MaxQuestions=10;
start=function(){
  questionCount=0;
  score=0;
  availableQuestions=[
    {
      questionText: "Which is a linear data structure?",
      choice1: "Tree",
      choice2: "Array",
      choice3: "BST",
      choice4: "Graph",
      answer: 2
    },
    {
      questionText: "Which is efficient in array?",
      choice1: "Insertion",
      choice2: "Deletion",
      choice3: "Access to elements",
      choice4: "All of the Above",
      answer: 3
    },
    {
      questionText: "Which type of data structure is a stack?",
      choice1: "Last In First Out",
      choice2: "First In First Out",
      choice3: "Last In Last Out",
      choice4: "None of the Above",
      answer: 1
    },
    {
      questionText: "A stack is to implemented only with queues. How many minimum number of queues are needed?",
      choice1: "1",
      choice2: "2",
      choice3: "3",
      choice4: "4",
      answer: 2
    },
    {
      questionText: "What is the maximum number of nodes in a binary tree at level x? Consider level of root to be 1",
      choice1: "2^i",
      choice2: "2^(i-1)",
      choice3: "2^(i+1)",
      choice4: "None of above",
      answer: 2
    },
    {
      questionText: "Which is the most efficient sorting algorithm with respect to time complexity?",
      choice1: "Merge Sort",
      choice2: "Insertion Sort",
      choice3: "Selection Sort",
      choice4: "None of above",
      answer: 1
    },
    {
      questionText: "Which of the following algorithms is not a Greedy algorithm?",
      choice1: "Kruskal Algorithm",
      choice2: "Dijkstra's shortest path algorithm",
      choice3: "Prim's algorithm",
      choice4: "All above algorithms are greedy algorithms",
      answer: 4
    },
    {
      questionText: "What is time complexity to obtain maximum element in a max-heap of N integers?",
      choice1: "O(N)",
      choice2: "O(log(N))",
      choice3: "O(N^2)",
      choice4: "O(1)",
      answer: 4
    },
    {
      questionText: "Which traversal of BST is always in sorted order?",
      choice1: "Level Order traversal",
      choice2: "Preorder traversal",
      choice3: "Inorder traversal",
      choice4: "Postorder traversal",
      answer: 3
    },
    {
      questionText:"Given the value of a node, what is the time required to delete the node from a linked list where N is total number of nodes?",
      choice1: "O(1)",
      choice2: "O(N)",
      choice3: "O(log(N))",
      choice4: "None of the above",
      answer: 2
    }
  ];
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

start();
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

