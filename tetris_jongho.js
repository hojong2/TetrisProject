//전역변수
// const blockArray = [
//     [[2,0],[2,1],[2,2],[2,3]]
//     [[2,2],[1,2],[1,1],[0,1]],
//     [[1,1],[1,0],[0,2],[0,1]],
//     [[2,1],[1,1],[1,2],[0,2]],
//     [[1,2],[1,1],[0,1],[0,0]],
//     [[1,2],[1,1],[0,2],[0,1]],
//     [[2,0],[1,1],[1,0],[0,0]],
//     [[1,1],[0,2],[0,1],[0,0]],
//     [[2,2],[1,2],[1,1],[0,2]],
//     [[1,2],[1,1],[1,0],[0,1]],
//     [[3,1],[2,1],[1,1],[0,1]],
//     [[1,3],[1,2],[1,1],[1,0]],
//     [[2,2],[2,1],[1,1],[0,1]],
//     [[1,0],[0,2],[0,1],[0,0]],
//     [[2,2],[1,2],[0,2],[0,1]],
//     [[1,2],[1,1],[1,0],[0,2]],
//     [[2,2],[2,1],[1,2],[0,2]],
//     [[2,2],[2,1],[2,0],[1,0]],
//     [[2,1],[1,1],[0,1],[0,2]],
//     [[1,2],[0,2],[0,1],[0,0]]
// ];

const blockArray = [
    [[2,2],[1,2],[1,1],[0,1]],
    [[1,1],[1,0],[0,2],[0,1]],
    [[2,1],[1,1],[1,2],[0,2]],
    [[1,2],[1,1],[0,1],[0,0]],
    [[1,2],[1,1],[0,2],[0,1]],
    [[2,0],[1,1],[1,0],[0,0]],
    [[1,1],[0,2],[0,1],[0,0]],
    [[2,2],[1,2],[1,1],[0,2]],
    [[1,2],[1,1],[1,0],[0,1]],
    [[3,1],[2,1],[1,1],[0,1]],
    [[1,3],[1,2],[1,1],[1,0]],
    [[2,2],[2,1],[1,1],[0,1]],
    [[1,0],[0,2],[0,1],[0,0]],
    [[2,2],[1,2],[0,2],[0,1]],
    [[1,2],[1,1],[1,0],[0,2]],
    [[2,2],[2,1],[1,2],[0,2]],
    [[2,2],[2,1],[2,0],[1,0]],
    [[2,1],[1,1],[0,1],[0,2]],
    [[1,2],[0,2],[0,1],[0,0]]
];

let nextBlock = parseInt(Math.random() * blockArray.length); //도형 모양 랜덤으로 생성
let currentBlock = nextBlock; //제일 처음 도형이 어떤것인지 알려주는 것 초기화
let blockPoint = [1, 1]; //도형위치가 게임테이블 어디에 있는지 알려주는 배열 
let createPoint = [1, parseInt(22 / 2) - 2]; //게임테이블에 어디서 도형을 만들지 보여주는 배열(default 1 9에서 만듬)
let blockCell = []; //currentShape초기화 하기위해 만든 것
let time = 0;
let score = 0;
let shapeRotateMap = [1,0,3,2,4,6,7,8,5,10,9,12,13,14,11,16,17,18,15];

//게임테이블 그리기
function setTable() {
    let table = "<table id=\"gametable\">";
    for (let i = 0; i < 30; i++) {
        table += "<tr>";
        for (let j = 0; j < 20; j++) {
            if (j === 0 || j === 19 || i === 0 || i === 29) {
                0
                table += `<td style="background:#16293f; width:16px; height:16px" id="${String(i)} ${String(j)}"></td>`;  //아이디 값을 배열 형태로 지정

            } else {
                table += `<td style="background:black; width:16px; height:16px" id="${String(i)} ${String(j)}"></td>`;
            }
        }
        table += "</tr>";
    }
    table += "</table>";

    document.write(table);
}
//한줄이 꽉참 감지
function checkLine(){
    let check=0;
    for(var i=1; i<29; i++){
        for(var j=1; j<19; j++){
            if(document.getElementById(`${i} ${j}`).style.background == 'tomato'){
                check+=1;
            }
            // console.log(check);
        }
        if(check==18){
            lineClear(i);
        }
        check=0;
    }
}

//한줄이 꽉차면 한줄 삭제
function lineClear(line){
    //[28,1-18]
    for(var i=1; i<19; i++){
        document.getElementById(`${line} ${i}`).style.background = 'black';
    }
    score+=100;
    lineDown(line);

}

//윗줄 내리기
function lineDown(line){
    console.log(line);
    for(i=line; i>5; i--){
        for(var j=1; j<19; j++){
            let before=document.getElementById(`${(i-1)} ${j}`).style.background;
            console.log(before);
            document.getElementById(`${i} ${j}`).style.background = before;
        }
    }
}

//스코어 관리
function scoreManager(){
    document.getElementById("score").textContent = score;
}

// 게임테이블 좌표 반환
function gebi(y, x) {
    let $td = document.getElementById(y + " " + x);
    return $td;
}


document.onkeydown = keyDownEventHandler;

function keyDownEventHandler(e) {
    switch (e.keyCode) {

        case 37: setTimeout("moveLR(-1)", 0);
            moveleft = true;
            break;

        case 39: setTimeout("moveLR(1)", 0);
            moveright = true;
            break;
            
            case 32: setTimeout("moveFS(1)", 0);
            movefast = true;
            break;
            
            case 13: setTimeout("rotateShape()", 0);
            console.log('enter 입력')
            break;

    }
}



document.onkeyup = keyUpEventHandler;
function keyUpEventHandler(e) {
    switch (e.keyCode) {
        case 37: moveleft = false;
            break;
        case 39: moveright = false;
            break;
        case 32: movefast = false;
            break;
    }
}


function moveLR(delta) {
    resetBlock(-delta);
    for (let h = 0; h < blockCell.length; h++) { // blockcell의 length란 4로 블록 각각의 td 위치를 의미함 
        blockCell[h][1] += delta;
    }
    if(delta>0){
        blockPoint[1]++;
    }else{
        blockPoint[1]--;
    }
    showShape();

}


function moveFS(delta) {
    if(!isCanMove()){
        resetBlock(-delta);
        for (let h = 0; h < blockCell.length; h++) {
            blockCell[h][0] += delta;
        }
        showShape();
    }

} 

function rotateShape(){
    resetBlock();
    console.log('here');
    blockCell=[];
    currentBlock = shapeRotateMap[currentBlock];
    var rotatedShape = blockArray[currentBlock];
    for(var i=0;i<4;i++){
        var sy = blockPoint[0] + rotatedShape[i][0];
        var sx = blockPoint[1] + rotatedShape[i][1];
        console.log(blockPoint[0],blockPoint[1]);
        blockCell.push([sy,sx]);
    }
    console.log('here3');
    showShape();
    console.log('here4');
}


//게임 테이블 도형 초기화

function resetBlock(delta) {
    for (let i = 0; i < blockCell.length; i++) {
        let el = gebi(blockCell[i][0], blockCell[i][1] - delta);
        el.style.background = 'black';
    }
}


function resetBlock() {
    for (let i = 0; i < blockCell.length; i++) {
        let el = gebi(blockCell[i][0], blockCell[i][1]);
        el.style.background = 'black';
    }
}


function showShape() {
    for (let i = 0; i < blockCell.length; i++) {
        let el = gebi(blockCell[i][0], blockCell[i][1]);
        el.style.background = 'tomato';
    }
}

//시작
function init() {
    currentBlock = '';
    console.log('init실행');
    displaycurrentBlock();
    displayNextBlock();
    // move();
    downblock();
    checkLine();
    scoreManager();
    // setTimeout(() => {
    //     init()
    // }, 3000);
}


//다음 도형 보여주기
function displayNextBlock() {
    resetNextBlock();
    nextBlock = parseInt(Math.random() * blockArray.length);
    let block = blockArray[nextBlock];
    for (let i = 0; i < 4; i++) {
        let y = block[i][0];
        let x = block[i][1];
        document.getElementById(String(y) + String(x)).style.background = 'tomato';
    }
}
//내려가기
function moveDown() {
    resetBlock();
    for (let a = 0; a < blockCell.length; a++) {
        blockCell[a][0]++;
    }
    console.log(blockPoint)
    blockPoint[0]++;
    showShape();
}


//현재 도형 그리기
function displaycurrentBlock() {
    currentBlock = [];
    resetBlock();
    blockPoint[0] = createPoint[0];
    blockPoint[1] = createPoint[1];
    currentBlock = nextBlock;
    let block = blockArray[currentBlock];
    displayNextBlock();
    for (let i = 0; i < block.length; i++) {
        let sy = blockPoint[0] + block[i][0];
        let sx = blockPoint[1] + block[i][1];
        let el = gebi(parseInt(sy), parseInt(sx));
        el.style.background = 'tomato';
        blockCell.push([sy, sx]);
    }
}


//다음 도형 초기화
function resetNextBlock() {
    for (let i = 0; i < 4; i++)
        for (let j = 0; j < 4; j++)
            document.getElementById(String(i) + String(j)).style.background = "rgb(14,31,49)";
}

//
function isCanMove(){
    let isTouch=false;
    let mine=[];
    for(let h=0;h<blockCell.length;h++){ // blockcell의 length란 4로 블록 각각의 td 위치를 의미함 
        let currentBlock = gebi(blockCell[h][0],blockCell[h][1]); //현재 블록의 위치 td값
        mine.push(currentBlock);
        let nextLine = gebi(blockCell[h][0]+1,blockCell[h][1]); //그좌표의 바로밑 td값
        // console.log('mine td',h,mine[h]);
        // console.log('next line td' ,nextLine);
        
        if((nextLine!==mine[0]) && (nextLine!==mine[1]) && (nextLine!==mine[2]) && (nextLine!==mine[3])){ //다음블럭이  내블럭이 아니고
            if( nextLine.style.background !=='black'){ //다음블럭이 존재할때
                // console.log('멈춤');
            isTouch=true; //멈춤
            } 
        }
    }
    return isTouch;
}


function downblock() {
    let i = 0;
    let nextLine;
    let isTouch = false;
    console.log(nextLine);
    let it = setInterval(() => {
        if (i++ < 28) {
            if (isCanMove()) {
                console.log('멈춤');
                i += 100; return;
            }
            moveDown();
            
        } else {
            clearInterval(it);
            blockCell = [];
            init();
        }
    }, 100);
}
(function () {
    setTable();
    init();
})();