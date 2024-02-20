//INPUT FUNCTIONING
tl = new TimelineMax();
let finalInput = ""; // input array after filter
let finalInputLength = 0; //length of input array
var animation_area = document.querySelector(".animation-area"); //div containing all the boxes
// const tl = new TimelineMax();
gsap.registerPlugin(Flip);

let animation_active = false;

function input() {
    while (animation_area.hasChildNodes()) {
        animation_area.removeChild(animation_area.firstChild);
    }
    let inputArray = document.querySelector("#array-input").value;

    //   let inputArray = "6 5 3 9 1 7  ";
    finalInput = inputArray
        .split(/[ ,]+/) // split the string by spaces
        .filter((value) => Number.isInteger(parseFloat(value))) // filter only integer values
        .map((value) => parseInt(value));
    finalInputLength = finalInput.length;

    if (finalInputLength >= 3 && finalInputLength <= 15) {
        document.querySelector(".input-text-show").innerHTML =
            "Original Input -> " + finalInput;
        create_array();
        const holderAnimate = document.querySelectorAll(".holder")
        holderAnimate.forEach(hl => {
            tl.fromTo(hl, 0.1, { opacity: '0%' }, { opacity: '100%', ease: "Power2.easeInOut" })
                .fromTo(hl, 0.1, { y: '-50%' }, { y: '0%', ease: "Power2.easeInOut" })
        });
    } else {
        alert(
            "Please provide a valid input: \n \tArray should be separated by space  \n \tArray size must be between 3 and 15 \n \tArray should only contain Integer"
        );
    }
}

function create_array() {
    for (let i = 0; i < finalInputLength; i++) {
        // console.log(parseInt(input_array[i]));
        var box_id = "box-" + i;
        var box = document.createElement("span");
        box.setAttribute("id", box_id);
        box.setAttribute("class", "box");
        var holder_id = "holder-" + i;
        var holder = document.createElement("span");
        holder.setAttribute("id", holder_id);
        holder.setAttribute("class", "holder");
        box.appendChild(document.createTextNode(finalInput[i]));
        holder.appendChild(box);
        animation_area.appendChild(holder);

        // box.appendChild(box_li)
    }
}

const submitButton = document.getElementById("submit"); //submit button id
submitButton.addEventListener("click", () => {
    if (!animation_active) {
        input();
        document.querySelector("#holder-0").firstChild.classList.add("sorted");
    }
});

//SORTING
var time = true;
var current_sorted = finalInputLength - 1;

const animate = document.querySelector("#animate");
animate.addEventListener("click", async () => {
    current_sorted = finalInputLength;
    if (!animation_active) {
        animation_active = true;

        while (time) {
            time = await selection_sort();
        }
        time = true;

        animation_active = false;
    }
});

async function selection_sort() {
    if (current_sorted > 0) {

        for (var i = 0; i < current_sorted - 1; i++) {
            const next_element = document.querySelector(`#holder-${i + 1}`).firstChild;
            const current_element = document.querySelector(`#holder-${i}`).firstChild;

            await new Promise((resolve) => {
                tl.to(next_element, 0.6, {
                    backgroundColor: "#80d9ff",
                    transform: "scale(1.1,1.1)",
                }).to(current_element, 0.6, {
                    backgroundColor: "#80d9ff",
                    transform: "scale(1.1,1.1)",
                    onComplete: resolve,
                },
                    "-=.6"
                );
            });

            console.log(i)
            if (
                parseInt(next_element.textContent) <
                parseInt(current_element.textContent)
            ) {
                await new Promise((resolve) => {
                    tl.to(next_element, 0.1, {
                        backgroundColor: "#ff2e2e",
                    }).to(current_element, 0.1, {
                        backgroundColor: "#ff2e2e",
                        onComplete: resolve,
                    },
                        "-=.1"
                    );
                });
                const nextState = Flip.getState(next_element);
                const current_elementState = Flip.getState(current_element);

                document.querySelector(`#holder-${i}`).appendChild(next_element);
                document.querySelector(`#holder-${i + 1}`).appendChild(current_element);

                await new Promise((resolve) => {
                    Flip.from(nextState, {
                        duration: .5,
                        zIndex: 2,
                    });
                    Flip.from(current_elementState, {
                        duration: .5,
                        zIndex: 3,
                        onComplete: resolve,
                    });
                });
            }
            await new Promise((resolve) => {
                tl.to(next_element, 0.2, {
                    backgroundColor: "#fef6f6",
                    transform: "scale(1,1)",
                }).to(current_element, 0.2, {
                    backgroundColor: "#fef6f6",
                    transform: "scale(1,1)",
                    onComplete: resolve,
                },
                    "-=.2"
                );
            });
        }
        current_sorted--;
        tl.to(document.querySelector(`#holder-${current_sorted}`).firstChild, .4, {
            backgroundColor: "#81ff4f",
        })




        return true;
    } else {
        return false;
    }
}

// carausel animation

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
