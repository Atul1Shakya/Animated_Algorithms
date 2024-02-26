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
var current_sorted = 0;

const animate = document.querySelector("#animate");
animate.addEventListener("click", async () => {
  current_sorted = 0;
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
  if (current_sorted < finalInputLength) {
    var min = current_sorted;
    await new Promise((resolve) => {
      tl.to(document.querySelector(`#holder-${min}`).firstChild, 0.4, {
        backgroundColor: "#ff2e2e",
        onComplete: resolve,
      });
    });

    for (var i = current_sorted + 1; i < finalInputLength; i++) {
      const min_element = document.querySelector(`#holder-${min}`).firstChild;
      const current_element = document.querySelector(`#holder-${i}`).firstChild;
      tl.to(current_element, 0.4, {
        backgroundColor: "#80d9ff",
        transform: "scale(1.1,1.1)",
      });
      if (
        parseInt(min_element.textContent) >
        parseInt(current_element.textContent)
      ) {
        await new Promise((resolve) => {
          tl.to(min_element, 0.4, {
            backgroundColor: "#fef6f6",
            transform: "scale(1,1)",
          }).to(
            current_element,
            0.4,
            {
              backgroundColor: "#ff2e2e",
              onComplete: resolve,
              transform: "scale(1.1,1.1)",
            },
            "-=.4"
          );
        });

        min = i;


      } else {
        await new Promise((resolve) => {
          tl.to(current_element, 0.4, {
            backgroundColor: "#fef6f6",
            transform: "scale(1,1)",
            onComplete: resolve,
          });
        });
      }
    }

    const min_element = document.querySelector(`#holder-${min}`);
    const current_element = document.querySelector(`#holder-${current_sorted}`);

    const minState = Flip.getState(min_element.firstChild);
    const current_elementState = Flip.getState(current_element.firstChild);

    current_element.appendChild(min_element.firstChild);
    min_element.appendChild(current_element.firstChild);

    await new Promise((resolve) => {
      Flip.from(minState, {
        duration: 1,
        zIndex: 2,
      });
      Flip.from(current_elementState, {
        duration: 1,
        zIndex: 3,
        onComplete: resolve,
      });
    });

    tl.to(document.querySelector(`#holder-${current_sorted}`).firstChild, 0.4, {
      backgroundColor: "#81ff4f",
      transform: "scale(1,1)",
    });

    current_sorted++;
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
