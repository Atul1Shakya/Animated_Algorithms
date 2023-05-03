const tl = new TimelineMax();

var number_of_box = 0;


function input_array() {
    // let number_array = document.getElementById("number_array").value;
    let number_array = "1 6 5 7 8";

    const list = document.getElementById("arrayboxes");

    while (list.hasChildNodes()) {
        list.removeChild(list.firstChild);
    }
    // var input_array = number_array.split(",");
    var input_array = number_array.split(/[ ,]+/);
    const array_size = input_array.length;
    if (array_size >= 3 && array_size <= 15) {

        function create_array() {
            var arrayboxes = document.getElementById("arrayboxes")
            for (i = 0; i < array_size; i++) {
                // console.log(parseInt(input_array[i]));
                if (input_array[i] == "" || isNaN(input_array[i]))
                    continue;
                var box_id = "box-" + i;
                number_of_box++;
                var box = document.createElement("li");
                // var box_li = document.createElement("li");
                box.setAttribute('id', box_id);
                box.setAttribute("class", "array-box");
                box.appendChild(document.createTextNode(input_array[i]), box.childNodes[i]);
                arrayboxes.appendChild(box);
                // box.appendChild(box_li)


            }
        }
        create_array()

    }
    else {
        alert("Please provide a valid input: \n \tArray should be separated by space  \n \tarray size must be between 3 and 15")
    }
}

function target_input() {
    // const target_number = document.querySelector("#target_number").value;
    const target_number = "5";

    // console.log(target_number)
    const target = document.querySelector("#target");
    target.innerHTML = target_number;

    target.style.display = "flex";
    // document.getElementById("target")
}

const target = document.querySelector("#target");
let box_count = 0;


// function search(){
//     console.log(number_of_box);
//         for(let i=0; i<number_of_box; i++){
//             const box= document.querySelector("#box-"+i);
//             const target = document.querySelector("#target");

//             tl.to(box, 1, {backgroundColor: ""})
//             target.style.backgroundColor = "grey";
//             if(box.textContent == target.textContent)
//             {
//                 box.style.backgroundColor = "green";
//                 target.style.backgroundColor = "green";
//                 break;
//             }
//             else{
//                 box.style.backgroundColor = "red";
//                 target.style.backgroundColor = "red";

// delay daalna hai 


//                 box.style.backgroundColor = "white";
//                 target.style.backgroundColor = "white";
//             }
//         }
// }
let timer = null;
document.querySelector("#animate").addEventListener("click", () => {
    timer = setInterval(search, 1000);
});
function search() {
    const box = document.querySelector("#box-" + box_count);
    console.log(box_count);
    tl.to(
        box,
        1,
        {
            backgroundColor: "#888888",
        }
    ).to(
        target,
        1,
        {
            backgroundColor: "#888888",
        }, "-=1");
    if (box.textContent == target.textContent) {
        tl.to(
            box,
            1,
            {
                backgroundColor: "#06c915",
            }
        ).to(
            target,
            1,
            {
                backgroundColor: "#06c915",
            }, "-=1"
        );
        complete();
        return;

    }
    else {
        tl.to(
            box,
            1,
            {
                backgroundColor: "#eb012a",
            }
        )
            .to(
                target,
                1,
                {
                    backgroundColor: "#eb012a",
                }, "-=1"
            ).to(box, 1, {
                backgroundColor: "#fff"
            },)
            .to(target, 1, {
                backgroundColor: "#fff"
            }, "-=1");
    }
    box_count++;
}

function complete() {
    clearInterval(timer);
    console.log("complete")
    timer = null;
    return;

}






