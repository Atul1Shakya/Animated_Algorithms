const tl = new TimelineMax();

var number_of_box = 0;

function input_array() {
  // let number_array = document.getElementById("number_array").value;
  let number_array = "1 6 5 7 8";

  document.querySelector(".found").style.display = "none";
  document.querySelector(".not-found").style.display = "none";
  const list = document.getElementById("arrayboxes");

  while (list.hasChildNodes()) {
    list.removeChild(list.firstChild);
  }
  // var input_array = number_array.split(",");
  var input_array = number_array.split(/[ ,]+/);
  const array_size = input_array.length;
  if (array_size >= 3 && array_size <= 15) {
    function create_array() {
      var arrayboxes = document.getElementById("arrayboxes");
      for (i = 0; i < array_size; i++) {
        // console.log(parseInt(input_array[i]));
        if (input_array[i] == "" || isNaN(input_array[i])) continue;
        var box_id = "box-" + i;
        number_of_box++;
        var box = document.createElement("li");
        // var box_li = document.createElement("li");
        box.setAttribute("id", box_id);
        box.setAttribute("class", "array-box");
        box.appendChild(
          document.createTextNode(input_array[i]),
          box.childNodes[i]
        );
        arrayboxes.appendChild(box);
        // box.appendChild(box_li)
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
  // const target_number = document.querySelector("#target_number").value;
  const target_number = "9";

  // console.log(target_number)
  const target = document.querySelector("#target");
  target.innerHTML = target_number;

  target.style.display = "flex";
  document.querySelector(".target_box").style.display = "flex";
  // document.getElementById("target")
}

const target = document.querySelector("#target");
let box_count = 0;

let timer = null;

document.querySelector("#animate").addEventListener("click", () => {
  if (tl.isActive()) {
    e.preventDefault();
    e.stopImmediatePropagation();
    return false;
  }

  document.querySelector(".found").style.display = "none";
  document.querySelector(".not-found").style.display = "none";
  box_count = 0;
  search();
  //   timer = setInterval(search, 1500);
});
function search() {
  const box = document.querySelector("#box-" + box_count);

  // needed to be removed 
  console.log(box_count);
  console.log(number_of_box);
  if (box_count == number_of_box) {
    complete();

    document.querySelector(".not-found").style.display = "flex";
    return;
  }
  tl.to(box, 0.5, {
    backgroundColor: "#888888",
  }).to(
    target,
    0.5,
    {
      backgroundColor: "#888888",
    },
    "-=0.5"
  );
  if (box.textContent == target.textContent) {
    tl.to(box, 0.5, {
      backgroundColor: "#06c915",
    }).to(
      target,
      0.5,
      {
        backgroundColor: "#06c915",
      },
      "-=0.5"
    );
    const found = document.querySelector(".found > h3");
    // needed to be removed
    console.log(found);
    found.innerHTML = "Target Found at Index " + box_count;
    document.querySelector(".found").style.display = "flex";

    complete();
    return;
  } else {
    tl.to(box, 0.5, {
      backgroundColor: "#eb012a",
    })
      .to(
        target,
        0.5,
        {
          backgroundColor: "#eb012a",
        },
        "-=0.5"
      )
      .to(box, 0.5, {
        backgroundColor: "#fff",
      })
      .to(
        target,
        0.5,
        {
          backgroundColor: "#fff",
        },
        "-=0.5"
      );
  }
  if (box_count == 0) timer = setInterval(search, 1500);
  box_count++;
}

function complete() {
  clearInterval(timer);
  console.log("complete");
  timer = null;
  return;
}
let toggle = true;

document.querySelector(".slider").addEventListener("click", () => {
  tl.to(".input_array", 0.2, {
    opacity: toggle ? 0 : 1,
  }).to(
    ".input_array",
    0.2,
    {
      width: toggle ? 0 : "75%",
    },
    "-=0.1"
  );

  if (!toggle) {
    toggle = true;
    document.querySelector("#slider_svg").style.transform = "rotate(0deg)";
  } else {
    toggle = false;
    document.querySelector("#slider_svg").style.transform = "rotate(180deg)";
  }
});



// Improved Animation 


