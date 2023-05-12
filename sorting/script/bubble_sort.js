const tl = new TimelineMax();

let number_of_box = 0;
let low = 0;
let high = 0;
let mid = 0;
let target = 0;
let input_array = [];

function inputArray() {
    let number_array = document.getElementById("number_array").value;

    const list = document.getElementById("arrayboxes");

    while (list.hasChildNodes()) {
        list.removeChild(list.firstChild);
    }

    input_array = number_array.split(/[ ,]+/);
    const array_size = input_array.length;

    if (array_size >= 3 && array_size <= 15) {
        function create_array() {
            var arrayboxes = document.getElementById("arrayboxes");
            for (i = 0; i < array_size; i++) {
                if (input_array[i] == "" || isNaN(input_array[i])) continue;
                var box_id = "box-" + i;
                number_of_box++;
                var box = document.createElement("li");
                box.setAttribute("id", box_id);
                box.setAttribute("class", "array-box");
                box.appendChild(document.createTextNode(input_array[i]), box.childNodes[i]);
                arrayboxes.appendChild(box);
            }
        }
        create_array();
    } else {
        alert(
            "Please provide a valid input: \n \tArray should be separated by space  \n \tarray size must be between 3 and 15"
        );
    }
}

let unSortedBox = () => {
    return(
        tl.to(box1, 0.5, {
            backgroundColor: "#06c915",
            y: "+=30"
        })
            .to(box2, 0.5, {
                backgroundColor: "#06c915",
                y: "-=30"
            }, "-=0.5")
            .to(box1, 0.5, {
                backgroundColor: "#fff",
                y: "-=30"
            })
            .to(box2, 0.5, {
                backgroundColor: "#fff",
                y: "+=30"
            }, "-=0.5")
    )
}

let sortedBox = () => {
    return(
        tl.to(box1, 0.5, {
            backgroundColor: "#eb012a"
        })
            .to(box2, 0.5, {
                backgroundColor: "#eb012a"
            }, "-=0.5")
            .to(box1, 0.5, {
                backgroundColor: "#fff"
            })
            .to(box2, 0.5, {
                backgroundColor: "#fff"
            }, "-=0.5")
    )
}

let bubble_sort = async() => {
   try{
    let i, j;
    for (i = 0; i < input_array.length - 1; i++) {
        for (j = 0; j < input_array.length - i - 1; j++) {
            let box1 = document.querySelector("#box-" + j);
            let box2 = document.querySelector("#box-" + (j + 1));
            if (parseInt(input_array[j]) > parseInt(input_array[j + 1])) {
                 
                await unSortedBox()
                let temp = input_array[j];
                input_array[j] = input_array[j + 1];
                input_array[j + 1] = temp;

                let box1Text = box1.textContent;
                let box2Text = box2.textContent;

                box1.textContent = box2Text;
                box2.textContent = box1Text;
            } else {
                await sortedBox()
            }
        }
        complete();
    }
   }
   catch(e){
    console.log(e)
   }
    
}

let swapped = () => {
return(
    tl.to(box1, 0.5, {
        backgroundColor: "#06c915",
        y: "+=30",
    }).to(
        box2,
        0.5,
        {
            backgroundColor: "#06c915",
            y: "-=30",
        },
        "-=0.5"
    )
)
}

let afterSwapped = () => {
    return(
        tl.to(box1, 0.5, {
            backgroundColor: "#888888",
            y: "-=30",
        }).to(
            box2,
            0.5,
            {
                backgroundColor: "#888888",
                y: "+=30",
            },
            "-=0.5"
        )
    )
}

let notSwapped = () => {
    return(
        tl.to(box1, 0.5, {
            backgroundColor: "#eb012a",
        })
            .to(
                box2,
                0.5,
                {
                    backgroundColor: "#eb012a",
                },
                "-=0.5"
            )
            .to(box1, 0.5, {
                backgroundColor: "#fff",
            })
            .to(
                box2,
                0.5,
                {
                    backgroundColor: "#fff",
                },
                "-=0.5"
            )
    )
}

let timer = null;
document.querySelector("#animate").addEventListener("click", () => {
    let i = 0;
    let j = 0;
    let isSwapped = false;

    timer = setInterval( () => {
        let box1 = document.querySelector("#box-" + j);
        let box2 = document.querySelector("#box-" + (j + 1));
        if (parseInt(input_array[j]) > parseInt(input_array[j + 1])) {
            isSwapped = true;
            tl.to(box1, 0.5, {
                // backgroundColor: "#06c915",
                backgroundColor: "#FF0000",

                y: "+=30",
            }).to(
                box2,
                0.5,
                {
                    //backgroundColor: "#06c915",
                    backgroundColor: "#FF0000",
                    y: "-=30",
                },
                "-=0.5"
            )

            let temp = input_array[j];
            input_array[j] = input_array[j + 1];
            input_array[j + 1] = temp;

            let box1Text = box1.textContent;
            let box2Text = box2.textContent;

            box1.textContent = box2Text;
            box2.textContent = box1Text;
            tl.to(box1, 0.5, {
               // backgroundColor: "#888888",
               backgroundColor: "#00FF7F",
                y: "-=30",
            }).to(
                box2,
                0.5,
                {
                   // backgroundColor: "#888888",
                   backgroundColor: "#00FF7F",
                    y: "+=30",
                },
                "-=0.5"
            )
           
        } else {
            tl.to(box1, 0.5, {
                backgroundColor: "#00FF7F",
                //backgroundColor: "#eb012a",
            })
                .to(
                    box2,
                    0.5,
                    {
                        backgroundColor: "#00FF7F",
                        //backgroundColor: "#eb012a",
                    },
                    "-=0.5"
                )
                .to(box1, 0.5, {
                    backgroundColor: "#00FF7F",
                })
                .to(
                    box2,
                    0.5,
                    {
                        backgroundColor: "#00FF7F",
                    },
                    "-=0.5"
               )
        }

        j++;
        if (j >= input_array.length - i - 1) {
            if (!isSwapped) {
                complete();
                return;
            }
            isSwapped = false;
            i++;
            j = 0;
        }
    }, 1000);
});

function complete() {
    clearInterval(timer);
    timer = null;
    return;
}
