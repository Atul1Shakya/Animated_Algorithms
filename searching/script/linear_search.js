const tl = new TimelineMax();

var number_of_box = 0;

// INPUT ARRAY CODE

function input_array() {
  const target_number = document.querySelector("#target_number").value;
  // const target_number = "9";
  if(target_number===""){
    alert("target cannot be empty please provide a value")
    return
  }

  let number_array = document.getElementById("number_array").value;
  // let number_array = "1 6 5 777 9 ";
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

// SUBMISSION OF ARRAY
let animation_flag = false;

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
  animation_flag=false;

});

//TARGET INPUT

function target_input() {
  const target_number = document.querySelector("#target_number").value;
  // const target_number = "9";
  if(target_number===""){
    // alert("target cannot be empty please provide a value")
  }
  else{

  const target = document.querySelector("#target");
  target.innerHTML = target_number;

  target.style.display = "flex";
  document.querySelector(".target_box").style.display = "flex";
  f();
  }

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

const target = document.querySelector("#target");
let box_count = 0;

let timer = null;

// ANIMATION SECTION


document.querySelector("#animate").addEventListener("click", () => {
  if (tl.isActive()) {
    e.preventDefault();
    e.stopImmediatePropagation();
    return false;
  }
  box_count=0;
  if(animation_flag==false){
    search();
    animation_flag= true;
  }
  else{
    for(let count=0;count<number_of_box;count++){
      let array_li= document.querySelector("#box-"+count);
      array_li.style.backgroundColor="";
      array_li.style.borderColor="#bdbdbd";
      array_li.style.transform="scale(1,1)";
            
      console.log(document.querySelector("#box-"+count).value)
    }
    search();
  }

  
  
  //   timer = setInterval(search, 1500);
});


function search() {
  const box = document.querySelector("#box-" + box_count);

  // needed to be removed
  // console.log(box_count);
  // console.log(number_of_box);
  if (box_count == number_of_box) {
    complete();

    document.querySelector(".not-found").style.display = "flex";
    return;
  }
  console.log("reached"+ box_count)
  tl.to(box, 0.5, {
    backgroundColor: "none",
    borderColor: "#3a91ba",
    transform: "scale(1.1, 1.1)"

  }).to(
    target,
    0.5,
    {
      backgroundColor: "none",
      borderColor: "#3a91ba",
      transform: "scale(1.1, 1.1)"
    },
    "-=0.5"
  );
  if (box.textContent == target.textContent) {
    tl.to(box, 0.5, {
      
      backgroundColor: "#32cf4e",
      borderColor: "#32cf4e",
    }).to(
      target,
      0.5,
      {
        
      backgroundColor: "#32cf4e",
        borderColor: "#32cf4e",
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
      backgroundColor: "#ff4545",
      borderColor: "#eb012a",

    })
      .to(
        target,
        0.5,
        {
          backgroundColor: "#ff4545",
          borderColor: "#eb012a",
        },
        "-=0.5"
      )
      .to(box, 0.5, {
        borderColor: "#ff4545",
        transform: "scale(1, 1)"
      })
      .to(
        target,
        0.5,
        {
          borderColor: "#fff",
          transform: "scale(1, 1)"
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

// const tween = new TimelineMax();

// function beautify() {

//   const animate_timer = setInterval(animate, 200);
//   var box_no = 0;
//   function animate() {
//     tween.fromTo(
//       "#box-" + box_no,
//       0.3,
//       {
//         y: -100,
//         opacity: 0,
//         ease: "easeOut",
//       },
//       {
//         y: 0,
//         opacity: 1,
//       }
//     );
//     box_no++;
//   }
// }

// document.querySelector("#submit").addEventListener("click", () => {
//   // beautify()
//   if (tween.isActive()) {
    
//     return false;
//   }
// });