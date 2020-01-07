const squares=document.querySelectorAll('.square');

const newPlayer = (name,mark)=>{
    return{name,mark}
};

const player1= newPlayer('Player1','X');
const player2= newPlayer('Player2','O');
const winComb=[[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]];

const gameBoard= (()=>{
    let gBoard=new Array(9);
    let turn=0;
    gBoard.fill('',0,9);
    
    const display= ()=>{
        for(let i in gBoard){
            let el = document.createTextNode(`${gBoard[i]}`);
            squares[i].appendChild(el);
        }
    };

    const getTurn= ()=> turn;

    const getMarkIndexes= (mark)=> gBoard.reduce(function(a, e, i) { 
        if (e === mark)
            a.push(i);
        return a;
    }, []);

    const playerTurn=()=>{
        turn= (turn ==0)? 1: 0;
    };

    function updateElement(i,n){ //update gBoard
        gBoard[i]=n;
        console.log(gBoard);
    };
    let checker = (arr, target) => target.every(v => arr.includes(v));

    const getWinner= ()=>{
        let x= getMarkIndexes("X");
        let o= getMarkIndexes("O");
        for(let i in winComb) {
            if(checker(x,winComb[i])){
                return "Player1";    
            }else if(checker(o,winComb[i])){
                return "Player2";
            }
        }
        return false
    }

    return{
        display,
        updateElement,
        playerTurn,
        getTurn,
        getWinner
    }
})();


const domManage = (()=>{

    function clickBox(){ //function called when clicking box
        let box= this;
        if(box.textContent==""){
            if(gameBoard.getTurn()==0){
                box.textContent=player1.mark;
            }else if(gameBoard.getTurn()==1){
                box.textContent=player2.mark;
            }
            gameBoard.playerTurn();
            let index= box.getAttribute('data-id');
            gameBoard.updateElement(index,box.textContent);
        }else {return}
    }

    const addEventClick= ()=>{
        squares.forEach((box)=>{
            box.addEventListener('click',clickBox)
        })
    };
    addEventClick();

})();

gameBoard.display();
// players.filter((x)=> x.played==false)