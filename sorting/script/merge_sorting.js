const tl = new TimelineMax();
gsap.registerPlugin(Flip);
//INPUT FUNCTIONING
let finalInput = "";// input array
let finalInputLength = 0;//length of input array
var divergeArray = document.querySelector(".diverge-array")//div containing all the boxes
function input() {
    while (divergeArray.hasChildNodes()) {
        divergeArray.removeChild(divergeArray.firstChild);
    }
    let inputArray = document.querySelector("#array-input").value;
    finalInput = inputArray.split(" ");
    finalInputLength = finalInput.length;

    if (finalInputLength >= 3 && finalInputLength <= 15) {
        function create_array() {
            for (let i = 0; i < finalInputLength; i++) {
                // console.log(parseInt(input_array[i]));
                if (finalInput[i] == "" || isNaN(finalInput[i]))
                    continue;
                var box_id = "box-" + finalInput[i];
                var box = document.createElement("span");
                // var box_li = document.createElement("li");
                box.setAttribute('id', box_id);
                box.setAttribute("class", "box");
                var holder_id = "holder-" + finalInput[i];
                var holder = document.createElement("span");
                holder.setAttribute('id', holder_id);
                holder.setAttribute("class", "holder");
                box.appendChild(document.createTextNode(finalInput[i]));
                holder.appendChild(box);
                divergeArray.appendChild(holder);


                // box.appendChild(box_li)


            }
        }
        create_array()
        const holderAnimate = document.querySelectorAll(".holder")
        holderAnimate.forEach(hl => {
            tl.fromTo(hl, 0.1, { opacity: '0%' }, { opacity: '100%', ease: "Power2.easeInOut" })
                .fromTo(hl, 0.1, { y: '-50%' }, { y: '0%', ease: "Power2.easeInOut" })
        });

    }
    else {
        alert("Please provide a valid input: \n \tArray should be separated by space  \n \tarray size must be between 3 and 15")
    }
}

const submitButton = document.getElementById("submit");//submit button id
const inputReturn = document.getElementById("array-input");//submit button id
inputReturn.addEventListener('click', (event) => {
    event.preventDefault();
})
submitButton.addEventListener('click', () => {
    if (tl.isActive()) {
        e.preventDefault();
        e.stopImmediatePropagation();
        return false;
    }
    input();
})
let finished = 0;
//NOW IT'S TIME TO ANIMATE THIS
function animate() {
    //random color generator
    const hexValues = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 'A', 'B', 'C', 'D', 'E', 'F'];
    function changeHex(value) {
        let hex = '#';

        for (let i = 0; i < 6; i++) {
            const index = Math.floor(Math.random() * hexValues.length)
            hex += hexValues[index];
        }

        value.style.borderColor = hex
        value.style.color = hex

    }

    // let batch = Flip.batch(".holder");
    // DIVERGING THE INPUT ARRAY 
    let removeChild = document.querySelectorAll(".child");
    removeChild.forEach(childRemove => {
        childRemove.remove();
    });
    let iteration = 0;
    let it=1

    function divide(div) {
        const children = div.querySelectorAll('.holder');
        if (children.length === 0) {
            return;
        }
        else {
            if (children.length == 1) {
                return;
            }
            iteration++;
            const divisionIndex = Math.ceil(children.length / 2);
            // console.log(children.length)

            const leftDiv = document.createElement('div');
            leftDiv.setAttribute('class', `child child-iteration-${iteration} child-branch-left`);
            const rightDiv = document.createElement('div');
            rightDiv.setAttribute('class', `child child-iteration-${iteration} child-branch-right`);
            for (let i = 0; i < children.length; i++) {
                const child = children[i]
                if (i < divisionIndex) {
                    leftDiv.appendChild(child.cloneNode(true));

                }
                else {
                    rightDiv.appendChild(child.cloneNode(true));
                }
            }
            div.appendChild(leftDiv);
            div.appendChild(rightDiv);
            div.style.borderColor="#000000"
            let Div = `.child.child-iteration-${iteration}`
            DivElement = document.querySelectorAll(`.child-iteration-${iteration}`)
            tl.fromTo(Div, 1, {
                y: -100,
                opacity: 0,
                transform: "scale(0,0)",
            },
                {
                    y: 0,
                    opacity: 1,
                    transform: "scale(1,1)",
                })



            divide(leftDiv)
            divide(rightDiv)
            timeoutFlag = true;

        }


    }

    const parent = document.querySelector(".diverge-array");
    divide(parent)
    // console.log(?"concerge")
    tl.eventCallback('onComplete', converge)
    let k = iteration
    // converge()
    function converge() {
        changeOfIteration()
        function changeOfIteration() {

            let iteration_number = ".child-iteration-" + k;

            if (k >= 1) {
                let leftl = ".child-iteration-" + k + ".child-branch-left";
                let leftleaf = document.querySelector(leftl);
                let rightl = ".child-iteration-" + k + ".child-branch-right";
                let rightleaf = document.querySelector(rightl);
                let parentDiv = document.querySelector(iteration_number).parentElement;
                let indexCount = 0;

                let chitr= document.querySelector(`.child.child-iteration-${k}`)
                let parentDivChilds= parentDiv.children
                console.log(parentDivChilds)
                tl.fromTo(chitr,1.1,{
                    y: 0,
                    opacity: 1,
                    transform: "scale(1,1)",
                },
                {
                    y: -100,
                    opacity: 0,
                    transform: "scale(0,0)",}
                )
                .fromTo(parentDiv, 1.1,{
                    transform: "scale(0,0)",
                },
                {
                    transform: "scale(1,1)",
                },"-=1")


                //replaceholder function
                replaceHolders();
                function replaceHolders() {

                    if (leftleaf.children[0] != undefined && rightleaf.children[0] != undefined) {
                        const state = Flip.getState(parentDiv)
                        if (parseInt(leftleaf.children[0].textContent) <= parseInt(rightleaf.children[0].textContent)) {
                            parentDiv.replaceChild(leftleaf.children[0], parentDiv.childNodes[indexCount]);
                            if (leftleaf.children[0] == undefined) {
                                parentDiv.removeChild(leftleaf);
                            }
                            indexCount++;
                        }
                        else {
                            parentDiv.replaceChild(rightleaf.children[0], parentDiv.childNodes[indexCount]);
                            if (rightleaf.children[0] == undefined) {
                                parentDiv.removeChild(rightleaf);
                            }
                            indexCount++;
                        }
                        Flip.from(state,{
                            duration: 2,
                            nested: true,
                        })

                        replaceHolders()
                    }
                    else return;
                }

                //checking for remaining elements to remove now
                if (leftleaf.children[0] === undefined) {
                    replaceRemainingRight();
                    function replaceRemainingRight() {
                        if (rightleaf.children[0] != undefined) {
                            parentDiv.replaceChild(rightleaf.children[0], parentDiv.childNodes[indexCount])
                            indexCount++;
                            replaceRemainingRight()
                        }
                        else return;
                    }
                    parentDiv.removeChild(rightleaf);
                }
                else if (rightleaf.children[0] === undefined) {
                    replaceRemainingLeft()
                    function replaceRemainingLeft() {
                        if (leftleaf.children[0] != undefined) {
                            parentDiv.replaceChild(leftleaf.children[0], parentDiv.childNodes[indexCount])
                            indexCount++
                            replaceRemainingLeft()
                        }
                        else return;
                    }
                    parentDiv.removeChild(leftleaf);

                }

                k--
                tl.eventCallback('onComplete', changeOfIteration)

            }
            else return;

        }
    }


}

//carousel animation

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

const animateButton = document.getElementById("animate");//animate button id
animateButton.addEventListener('click', () => {
    if (tl.isActive()) {
        e.preventDefault();
        e.stopImmediatePropagation();
        return false;
    }
    animate();
})
