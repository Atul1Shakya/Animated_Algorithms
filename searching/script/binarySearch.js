const tl = new TimelineMax();

var number_of_box = 0;
var low = 0;
var high = 0;
var mid = 0;
var target = 0;

function input_array() {
    // let number_array = document.getElementById("number_array").value;
    let number_array = "1 2 3 4 5 6 7 8 9 ";
    number_of_box = 0;
  
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
            f();
  
          function f(){
            tl.fromTo(
              box,
              0.3,
              {
                y: -100,
                opacity: 0,
                ease: "easeOut",
              },
              {
                y: 0,
                opacity: 1,
              }
            );
          }
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
  
    f();
  
          function f(){
            tl.fromTo(
              ".target_box",
              0.3,
              {
                x: -100,
                opacity: 0,
                ease: "easeOut",
              },
              {
                x: 0,
                opacity: 1,
              }
            );
          }
  
  
    // document.getElementById("target")
  }

  document.querySelector("#submit").addEventListener("click", () => {
    if (tl.isActive()) {
      e.preventDefault();
      e.stopImmediatePropagation();
      return false;
    }
    input_array();
    target_input();
    const target = document.querySelector("#target");
    target.style.background= "none";
    target.style.transform = "scale(1, 1)";
    target.style.borderColor = "#bdbdbd";
  
  });

function binary_search() {
    if (low <= high) {
        mid = Math.floor((low + high) / 2);
        console.log(high)
        const box = document.querySelector("#box-" + mid);

        tl.to(box, 1, {
            backgroundColor: "#888888",
        }).to(
            document.querySelector("#target"),
            1, {
            backgroundColor: "#888888",
        }, "-=1");

        if (box.textContent == target) {
            tl.to(box, 1, {
                backgroundColor: "#06c915",
            }).to(
                document.querySelector("#target"),
                1, {
                backgroundColor: "#06c915",
            }, "-=1");

            complete();
            return;
        }
        else if (box.textContent < target) {
            low = mid + 1;
        }
        else {
            high = mid - 1;
        }

        tl.to(box, 1, {
            backgroundColor: "#eb012a",
        }).to(
            document.querySelector("#target"),
            1, {
            backgroundColor: "#eb012a",
        }, "-=1").to(box, 1, {
            backgroundColor: "#fff"
        }, "-=1").to(
            document.querySelector("#target"),
            1, {
            backgroundColor: "#fff",
        }, "-=1");

        setTimeout(binary_search, 1000);
    }
    else {
        complete();
    }
}

let timer = null;
document.querySelector("#animate").addEventListener("click", () => {
    timer = setInterval(binary_search, 1000);
});

function complete() {
    clearInterval(timer);
    timer = null;
    return;
}
