//INPUT FUNCTIONING
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
    document.querySelector(".input-text-show").innerHTML = "Original Input -> "+finalInput;
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
  if(!animation_active){
    input();
    document.querySelector("#holder-0").firstChild.classList.add("sorted")
  }

});
var current_unchecked = 1;
var timer;
let count = 0;
var time = true;

const animate = document.getElementById("animate");
animate.addEventListener("click", async () => {

  if(!animation_active)
  {
    animation_active = true;
    count = 0;
    current_unchecked = 1;
    while(time){
      time = await insertion_sort();
      console.log("count : "+count)
    }
    time = true;
    animation_active = false;

  }
});

async function insertion_sort() {
  if (current_unchecked < finalInputLength) {
    console.log("call" + count++ + "unchecked= " + current_unchecked);
    let new_value_box, adj_left_element;
    new_value_box = document.querySelector(
      "#holder-" + current_unchecked
    ).firstChild;
    console.log(new_value_box)
    const new_value_state = Flip.getState(new_value_box);
    document
      .querySelector(".holding-area")
      .appendChild(new_value_box);
    await new Promise((resolve) => {
      Flip.from(new_value_state, {
        duration: 1,
        toggleClass: "hold", 
        absolute: true,
        ease: Power2.easeInOut,
        onComplete: resolve,
      });
    });
    new_value_box.classList.toggle("hold");
    let i;
    for (i = current_unchecked - 1; i >= 0; i--) {
      adj_left_element = document.querySelector("#holder-" + i).firstChild;
      const left_state = Flip.getState(adj_left_element);
      if (
        parseInt(new_value_box.textContent) <
        parseInt(adj_left_element.textContent)
      ) {
        document
          .querySelector("#holder-" + (i + 1))
          .appendChild(adj_left_element);
          await new Promise((resolve) => {
            Flip.from(left_state, {
              duration: .5,
              toggleClass: "checking",
              absolute: true,
              ease: Power2.easeInOut,
              onComplete: resolve,
            });
          });
        
      } else {
        break;
      }
    }
    var holded_value = document.querySelector(".holding-area").firstChild;
    console.log("holded : "+holded_value)
    const holded_state = Flip.getState(holded_value);
    document.querySelector("#holder-"+(i+1)).appendChild(holded_value);
    await new Promise((resolve) => {
      Flip.from(holded_state, {
        duration: 1,
        absolute: true,
        zIndex:1,
        ease: Power2.easeInOut,
        onComplete: resolve,
      });
    });
    new_value_box.classList.toggle("hold");
    holded_value.classList.add("sorted")

    current_unchecked++;
    return true;
  } else {
    // clearInterval(timer);
    return false;
  }

}
