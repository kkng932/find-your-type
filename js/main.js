const main = document.querySelector("#main");
const qna = document.querySelector("#qna");
const result = document.querySelector("#result");
const endPoint = 7;
// 질문 답 배열
const select = [ 0, 0, 0, 0, 0, 0, 0]; 
resultType = 0;

// 결과 내기
function calResult(){
    let resultKey = 0;
    if (resultType <= -5) resultKey = 1;
    else if (resultType <= -1) resultKey = 2;
    else if (resultType <= 3) resultKey = 3;
    else resultKey = 4;
    console.log('resultKey=' + resultKey);
    return resultKey;
}
function setResult(){
    let point = calResult();
    location.href = "./html/result" + point + '.html';
}

// 질문 끝
function goResult(){
    qna.style.WebkitAnimation = "fadeOut 1s";
    qna.style.animation = "fadeOut 1s";
    setTimeout(() => {
        result.style.WebkitAnimation = "fadeIn 1s";
        result.style.animation = "fadeIn 1s";
        setTimeout(() => {
            qna.style.display = "none";
            result.style.display = "block";
        },450)});
        // console.log(select);
        console.log(resultType);
        setResult();
}

function addAnswer(answerText, qIndex, index){
    var a = document.querySelector('.aBox');
    var answer = document.createElement('button');

    answer.classList.add('answerList');
    answer.classList.add('my-3');
    answer.classList.add('py-3');
    answer.classList.add('mx-auto');
    a.appendChild(answer);
    answer.innerHTML = answerText;

    answer.addEventListener("click", function(){
        var children = document.querySelectorAll('.answerList');
        for(let i = 0; i < children.length; i++)
        {
            children[i].disabled = true;
            children[i].style.display = 'none';
        }
        select[qIndex] = Number(index) + Number(select[qIndex]);
        // 대답 결과 알고리즘
        if (qIndex === 2 || qIndex === 5)
        {
            if (Number(index) == 0)
                resultType--;
            else
                resultType++;
        }
        else 
        {
            if (Number(index) == 0)
                resultType++;
            else
                resultType--;
        }
        console.log(resultType);
        goNext(++qIndex);
    }, false);
}

// 질문 대답 버튼
function goNext(qIndex){
    if(qIndex === endPoint){
        goResult();
        return; 
    }
    var q = document.querySelector('.qBox');
    q.innerHTML = qnaList[qIndex].q;
    for(let i in qnaList[qIndex].a){
        addAnswer(qnaList[qIndex].a[i].answer, qIndex, i);
    }
    var status = document.querySelector('.statusBar');
    
    status.style.width = (100/endPoint) * (qIndex) + '%';
}



// 시작하기 버튼
function begin(){

    main.style.WebkitAnimation = "fadeOut 1s";
    main.style.animation = "fadeOut 1s";
    setTimeout(() => {
        qna.style.WebkitAnimation = "fadeIn 1s";
        qna.style.animation = "fadeIn 1s";
        setTimeout(() => {
            main.style.display = "none";
            qna.style.display = "block";
        },450)
        let qIndex = 0;
        goNext(qIndex);
    },450);
    

    
}
