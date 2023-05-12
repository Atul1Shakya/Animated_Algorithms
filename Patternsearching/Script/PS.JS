const tl = new TimelineMax();

let number_of_box = 0;

function input_array() {
  const number_array = document.getElementById("number_array").value;
  // const number_array = "1! 6@ 5# 7& 8*";

  const list = document.getElementById("arrayboxes");

  while (list.hasChildNodes()) {
    list.removeChild(list.firstChild);
  }

  const input_array = number_array.split(/[ ,]+/);
  const array_size = input_array.length;

  if (array_size >= 3 && array_size <= 15) {
    function create_array() {
      const arrayboxes = document.getElementById("arrayboxes");

      for (let i = 0; i < array_size; i++) {
        if (input_array[i] == "") {
          continue;
        }

        const regex = /^[A-Za-z0-9_!@#$%^&*()]*$/;
        if (!regex.test(input_array[i])) {
          alert(
            `Invalid input: ${input_array[i]} is not allowed. Please only use alphanumeric and special characters like !,@,#,$,%,^,&,*,(,)`
          );
          return;
        }

        const box_id = "box-" + i;
        number_of_box++;

        const box = document.createElement("li");
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

function target_input() {
  const target_number = document.querySelector("#target_number").value;
  // const target_number = "5@";

  const target = document.querySelector("#target");
  target.innerHTML = target_number;

  target.style.display = "flex";
}

const target = document.querySelector("#target");
let box_count = 0;

function search() {
  const box = document.querySelector("#box-" + box_count);
  console.log(box_count);

  tl.to(box, 1, {
    backgroundColor: "#888888",
  }).to(target, 1, {
    backgroundColor: "#888888",
  }, "-=1");

  if (box.textContent == target.textContent) {
    tl.to(box, 1, {
      backgroundColor: "#06c915",
    }).to(target, 1, {
      backgroundColor: "#06c915",
    }, "-=1");

    complete();
    return;
  } else {
    tl.to(box, 1, {
        backgroundColor: "#eb012a",
      })
      .to(target, 1, {
        backgroundColor: "#eb012a",
      }, "-=1")
      .to(box, 1, {
        backgroundColor: "#fff"
      })
      .to(target, 1, {
        backgroundColor: "#fff"
      }, "-=1");
  }

  box_count++;

  if (box_count >= number_of_box) {
    complete();
  }
}

function complete() {
  clearInterval(timer);
  console.log("complete");
  timer = null;
}

let timer = null;
document.querySelector("#animate").addEventListener("click", () => {
  timer = setInterval(search, 1000);
});
