// carausel animation
tl = new TimelineMax();
let toggle = true;

document.querySelector(".carousel").addEventListener("click", () => {
  tl.to(".input", 0.2, {
    opacity: toggle ? 0 : 1,
  }).to(
    ".input",
    0.2,
    {
      width: toggle ? 0 : "45%",
    },
    "-=0.1"
  );

  if (!toggle) {
    toggle = true;
    document.querySelector("#slider-svg").style.transform = "rotate(0deg)";
  } else {
    toggle = false;
    document.querySelector("#slider-svg").style.transform = "rotate(180deg)";
}
});

//animation

const queen = "<img src=\"queen.png\" class=\"queen\"></img>";
var n;

var queen_index=[];
var color = ["dark", "light"];
function create_grid(){
    // n = document.querySelector("#n-input").value;
    n=4
    if(n > 10 || n <= 0)
    {   
        // console.log(n_value+" "+n)
        alert("Provide a valid input\n\tSingle integer les then 10")
    }
    else{
        let grid = document.querySelector(".grid")
    while(grid.hasChildNodes())
    {
        grid.removeChild(grid.firstChild)
    }

        for(let i = 0; i < n; i++)
        {
            let row_div = document.createElement("div");
            row_div.setAttribute("class", `row-${i}`)
            row_div.style.width = `${100/n}%`;
            for(let j = 0; j < n; j++ )
            {
                let col_div = document.createElement("div")
                col_div.setAttribute("id", `r${j}c${i}`);
                if((i+j)%2 === 0){
                    col_div.setAttribute("class",color[0])
                }
                else{
                    col_div.setAttribute("class",color[1])
                }
                // col_div.innerHTML= queen;
                row_div.appendChild(col_div);
                col_div.style.height = `${100/n}%`;
                col_div.style.width = `${100}%`;
            }
            document.querySelector(".grid").appendChild(row_div);
        }
    }
    // console.log(n)
}

document.querySelector("#submit").addEventListener("click",()=>{
    // create_grid();
    // queen_index = new Array(parseInt(n));
    // queen_index.fill(-1)
});
    create_grid();
    queen_index = new Array(parseInt(n));
    queen_index.fill(-1)
//main problem,

var queen_count = 0; 
var isAttacked = false;

function animation(){
    if(queen_count < n)
    {
        console.log("queen no"+queen_count)
        var current_row = 0;
        if(queen_index[queen_count] == -1){
            queen_index[queen_count]= 0;
        }
        else{
            current_row = queen_index[queen_count];
            if(current_row >=n)
            {
                queen_index[queen_count] = -1;
                queen_count--;
                queen_index[queen_count]++;
                animation();
            }
        }
        var current_box = document.querySelector(`#r${current_row}c${queen_count}`);
        console.log(current_box.getAttribute("id"))
        current_box.innerHTML = queen;

        //is under attack
        isAttacked = false;

        for(let i = queen_count-1; i>=0; i--)
        {
            var left_box = document.querySelector(`#r${current_row}c${i}`);
            if(left_box.hasChildNodes)
            {      
                console.log(left_box)
                console.log("qc = "+i)
                isAttacked = true;

            }
        }
        
        if(isAttacked)
        {
            console.log(current_box)
            current_box.removeChild(current_box.firstChild);
            current_row++;
            if(current_row < n)
            {
                queen_index[queen_count] = current_row;
                animation();
            }
            else{
                queen_index[queen_count] = -1;
                queen_count--;
                queen_index[queen_count]++;
                animation();
            }
        }
        else{
            queen_count++;
            animation();
        }

    }
}
// let queenCount=0;
// function nQueen(){
//     if(queenCount==0){
//         document.querySelector("#r0c0").innerHTML= queen;
//         counter++;
//         nQueen();
//         let current_row= 0;
//         let current_col=1;
//     }
//     else{
//         while(current_row==-1||current_col==-1){
//             let leftUpperDiagonal= 
//         } 
//     }
// }

document.querySelector("#animate").addEventListener("click",()=>{
    // nQueen();
    animation();
});

