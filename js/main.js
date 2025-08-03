const main = document.querySelector("#main");
const qna = document.querySelector("#qna");
const result = document.querySelector("#result");
const endPoint = 12;
// 질문 답 배열
const select = [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ]; 
const resultType = [ 0, 0, 0, 0 ];

// 결과 내기
function calResult(){
    let resultKey = 1;
    if( resultType[0] < 2 ) resultKey += 8;
    if( resultType[1] < 2 ) resultKey += 4;
    if( resultType[2] < 2 ) resultKey += 2;
    if( resultType[3] < 2 ) resultKey += 1;
    console.log('resultKey=' + resultKey);
    return resultKey;
}
function setResult(){
    let point = calResult();
    location.href = "./html/result" + point + '.html';
    // const resultName = document.querySelector('.resultName');
    // resultName.innerHTML = infoList[point].name;

    // var resultImg = document.createElement('img');
    // const imgDiv = document.querySelector('#resultImg');
    // var imgURL = '../img/image' + point + '.png';
    // resultImg.src = imgURL;
    // resultImg.alt = point;
    // resultImg.classList.add('img-fluid');
    // imgDiv.appendChild(resultImg);

    // const resultDesc = document.querySelector('.resultDesc');
    // resultDesc.innerHTML = infoList[point].desc;
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
        if (qIndex === 1 || qIndex === 6 || qIndex === 10 )
        {
            resultType[0] = Number(index) + Number(resultType[0]);
        }
        else if (qIndex === 5 || qIndex === 7 || qIndex === 11 )
        {
            resultType[1] = Number(index) + Number(resultType[1]);
        }
        else if (qIndex === 3 || qIndex === 4 || qIndex === 8 )
        {
            resultType[2] = Number(index) + Number(resultType[2]);
        }
        else
        {
            resultType[3] = Number(index) + Number(resultType[3]);
        }
        
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
