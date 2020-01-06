const squares=document.querySelectorAll('.square');

const newPlayer = (name,mark)=>{
    return{name,mark}
};

const player1= newPlayer('Player1','X');
const player2= newPlayer('Player2','O');

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

    const playerTurn=()=>{
        turn= (turn ==0)? 1: 0;
    };

    function updateElement(i,n){ //update gBoard
        gBoard[i]=n;
    };

    return{
        display,
        updateElement,
        playerTurn,
        getTurn
    }
})();


const domManage = (()=>{

    function clickBox(){
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
        //console.table(gBoard);
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