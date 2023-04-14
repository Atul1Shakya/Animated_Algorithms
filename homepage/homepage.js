
// SEARCHING
const algo_logo1 = document.getElementById("searching_logo");
const searching = document.getElementById("searching");

var position = 1;
var search_logo = ["/resources/homepage/Searching/Searching1.png", "/resources/homepage/Searching/Searching2.png", "/resources/homepage/Searching/Searching3.png", "/resources/homepage/Searching/Searching4.png", "/resources/homepage/Searching/Searching5.png","/resources/homepage/Searching/Searching5.png","/resources/homepage/Searching/Searching5.png" ]

var logo_traverse1=()=>{
    if(position>= search_logo.length)
        position=0;
    
    algo_logo1.src = search_logo[position]
    position++;
}
var start1=()=>{
    
    interval =window.setInterval(logo_traverse1, 350)
    return interval
}
var stop1=()=>{
    position = 0;
    algo_logo1.src = search_logo[position];
    clearInterval(interval)
}
searching.addEventListener("mouseenter", start1)
searching.addEventListener("mouseleave", stop1)

// SORTING 

const sorting = document.getElementById("sorting");
const algo_logo2=document.getElementById("sorting_logo");
var sorting_logo=["/resources/homepage/Sorting/sorting1.png","/resources/homepage/Sorting/sorting2.png","/resources/homepage/Sorting/sorting3.png","/resources/homepage/Sorting/sorting4.png","/resources/homepage/Sorting/sorting5.png","/resources/homepage/Sorting/sorting6.png","/resources/homepage/Sorting/sorting6.png","/resources/homepage/Sorting/sorting6.png"]


var logo_traverse2=()=>{
    if(position>= sorting_logo.length)
        position=0;
    
    algo_logo2.src = sorting_logo[position]
    position++;
}

var start2=()=>{
    
    interval =window.setInterval(logo_traverse2, 400)
    return interval
}
var stop2=()=>{
    position = 0;
    algo_logo2.src = sorting_logo[position];
    clearInterval(interval)
}

sorting.addEventListener("mouseenter", start2)
sorting.addEventListener("mouseleave", stop2)


// BACK TRACKING 

const back_tracking = document.getElementById("Backtracking");
const algo_logo3=document.getElementById("back_tracking_logo");
var back_tracking_logo=["/resources/homepage/BackTracking/BackTracking1.png","/resources/homepage/BackTracking/BackTracking2.png","/resources/homepage/BackTracking/BackTracking3.png","/resources/homepage/BackTracking/BackTracking4.png","/resources/homepage/BackTracking/BackTracking5.png","/resources/homepage/BackTracking/BackTracking5.png","/resources/homepage/BackTracking/BackTracking6.png","/resources/homepage/BackTracking/BackTracking7.png","/resources/homepage/BackTracking/BackTracking8.png","/resources/homepage/BackTracking/BackTracking8.png","/resources/homepage/BackTracking/BackTracking9.png","/resources/homepage/BackTracking/BackTracking9.png","/resources/homepage/BackTracking/BackTracking9.png"]


var logo_traverse3=()=>{
    if(position>= back_tracking_logo.length)
        position=0;
    
    algo_logo3.src = back_tracking_logo[position]
    position++;
}

var start3=()=>{
    
    interval =window.setInterval(logo_traverse3, 400)
    return interval
}
var stop3=()=>{
    position = 0;
    algo_logo3.src = back_tracking_logo[position];
    clearInterval(interval)
}

back_tracking.addEventListener("mouseenter", start3)
back_tracking.addEventListener("mouseleave", stop3)


// DIVIDE AND CONQUER

const divide_conquer = document.getElementById("Divide_and_conquer");
const algo_logo4=document.getElementById("Divide_and_conquer_logo");
var Divide_and_conquer_logo=["/resources/homepage/DandC/DandC1.png","/resources/homepage/DandC/DandC2.png","/resources/homepage/DandC/DandC3.png","/resources/homepage/DandC/DandC4.png","/resources/homepage/DandC/DandC5.png","/resources/homepage/DandC/DandC6.png","/resources/homepage/DandC/DandC7.png","/resources/homepage/DandC/DandC8.png","/resources/homepage/DandC/DandC9.png","/resources/homepage/DandC/DandC9.png","/resources/homepage/DandC/DandC9.png"]


var logo_traverse4=()=>{
    if(position>= Divide_and_conquer_logo.length)
        position=0;
    
    algo_logo4.src = Divide_and_conquer_logo[position]
    position++;
}

var start4=()=>{
    
    interval =window.setInterval(logo_traverse4, 400)
    return interval
}
var stop4=()=>{
    position = 0;
    algo_logo4.src = Divide_and_conquer_logo[position];
    clearInterval(interval)
}

divide_conquer.addEventListener("mouseenter", start4)
divide_conquer.addEventListener("mouseleave", stop4)


// 

