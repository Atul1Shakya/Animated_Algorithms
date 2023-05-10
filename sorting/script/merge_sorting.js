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
                var holder_id = "holder-" + i;
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

//NOW IT'S TIME TO ANIMATE THIS
function animate() {

    // DIVERGING THE INPUT ARRAY 
    let removeChild = document.querySelectorAll(".child");
    removeChild.forEach(childRemove => {
        childRemove.remove();
    });
    let iteration = 0;

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


            divide(leftDiv)
            divide(rightDiv)
            
        }

    }

    const parent = document.querySelector(".diverge-array");
    divide(parent);
    // console.log(?"concerge")

    function converge() {
        for (let k = iteration; k >= 1; k--) {
            let leftl = ".child-iteration-" + k + ".child-branch-left";
            let iteration_number = ".child-iteration-" + k;
            let leftleaf = document.querySelector(leftl);
            let rightl = ".child-iteration-" + k + ".child-branch-right";
            let rightleaf = document.querySelector(rightl);
            let parentDiv = document.querySelector(iteration_number).parentElement;
            let indexCount = 0;
            while (leftleaf.children[0] != undefined && rightleaf.children[0] != undefined) {
                if (parseInt(leftleaf.children[0].textContent) <= parseInt(rightleaf.children[0].textContent)) {
                    // console.log(leftleaf.children[0])
                    // console.log(rightleaf.children[0])
                    console.log(parentDiv.childNodes[indexCount])
                    parentDiv.replaceChild(leftleaf.children[0], parentDiv.childNodes[indexCount]);
                    if (leftleaf.children[0] == undefined) {
                        parentDiv.removeChild(leftleaf);
                    }
                    // leftleaf.removeChild(leftleaf.children[0])
                    // console.log(leftleaf.children[0])
                    // console.log(rightleaf.children[0])
                    console.log(parentDiv.childNodes[indexCount])
                    console.log("index count-" + indexCount + "done")
                    indexCount++;
                }
                else {
                    // console.log(leftleaf.children[0])
                    // console.log(rightleaf.children[0])
                    console.log(parentDiv.childNodes[indexCount])
                    parentDiv.replaceChild(rightleaf.children[0], parentDiv.childNodes[indexCount]);
                    if (rightleaf.children[0] == undefined) {
                        parentDiv.removeChild(rightleaf);
                    }
                    // rightleaf.removeChild(rightleaf.children[0])
                    // console.log(leftleaf.children[0])
                    // console.log(rightleaf.children[0])
                    console.log(parentDiv.childNodes[indexCount])
                    console.log("index count-" + indexCount + "done")
                    indexCount++;
                }
                // console.log(iteration)            
            }
            if (leftleaf.children[0] === undefined) {
                while (rightleaf.children[0] != undefined) {
                    parentDiv.replaceChild(rightleaf.children[0], parentDiv.childNodes[indexCount])
                    indexCount++
                }
                parentDiv.removeChild(rightleaf);
                console.log("Appendl" + parentDiv.innerHTML)
            }
            else if (rightleaf.children[0] === undefined) {
                while (leftleaf.children[0] != undefined) {
                    parentDiv.replaceChild(leftleaf.children[0], parentDiv.childNodes[indexCount])
                    indexCount++
                }
                parentDiv.removeChild(leftleaf);
                console.log("Appendr" + parentDiv.innerHTML)
            }
            console.log("iteration-" + k + "done")
        }

    }

    // const convergeDelay= setTimeout(converge, 5000);

}

const animateButton = document.getElementById("animate");//animate button id
animateButton.addEventListener('click', () => {
    if (tl.isActive()) {
        e.preventDefault();
        e.stopImmediatePropagation();
        return false;
    }
    animate();
})
