const tl = new TimelineMax();

var number_of_box = 0;
var start = 0;
var end = 0;
var mid = 0;
var target = 0;
var target_number;
var final_array; //stores the array to check binary search

function input_array() {
  target_number = document.querySelector("#target_number").value;
  if (target_number === "") {
    alert("Provide a Valid Target to Search.")
    return
  }
  // let number_array = document.getElementById("number_array").value;
  let number_array = "1 2 3 5 8 4 6 7";
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
  input_array.sort();
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

        function f() {
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
    final_array=input_array;

  } else {
    alert(
      "Please provide a valid input: \n \tArray should be separated by space  \n \tarray size must be between 3 and 15"
    );
  }
}

function target_input() 
{
  target_number = document.querySelector("#target_number").value;
  if (target_number === "") {
    // alert("Provide a Valid Target to Search.")
  }
  else {

    const target = document.querySelector("#target");
    target.innerHTML = target_number;

    target.style.display = "flex";
    document.querySelector(".target_box").style.display = "flex";

    f();
  }

  function f() {
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
  target.style.background = "none";
  target.style.transform = "scale(1, 1)";
  target.style.borderColor = "#bdbdbd";

});

function binary_search() { 
  start = 0;
  end = final_array.length;
  while(start<=end)
  {
    mid = Math.floor((start+end) / 2);
    const mid_box=document.querySelector("#box-"+mid)
    const final_target=document.querySelector("#target")
    tl.to(final_target,1,{
      backgroundColor: "#888888"
    })
    if(final_array[mid]==target_number)
    {
      tl.to(mid_box,1,{
        backgroundColor: "#888888"
      })
      
      tl.to(mid_box,1,{
        backgroundColor: "#00F720"
      })
      // tl.to(final_target,1,{
      //   backgroundColor: "#00F720"
      // })
      break;
    }
    else
    if(final_array[mid]>target_number)
    {
      end=mid-1;
      
      tl.to(mid_box,1,{
        backgroundColor: "#FF0000"
      })
    }
    else
    {
      tl.to(mid_box,1,{
        backgroundColor: "#FF0000"
      })
      start=mid+1;
    }
  }
}


document.querySelector("#animate").addEventListener("click", () => {
  binary_search();
});
