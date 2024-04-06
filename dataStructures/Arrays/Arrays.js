//global declarations----------------------------------------------------------------------------------
let arraySize, inputArray, numberOfValues, dataType, valueHolder;
let display = document.querySelector(".animation");


function defaultPrevention(element){
    element.addEventListener("click", (e)=>{
        e.preventDefault();
    })

}

let input = () => {

    while (display.hasChildNodes()) {
        display.removeChild(display.firstChild);
    }
    arraySize = document.querySelector("#array-size").value;
    let arrayString = document.querySelector("#array-string").value;
    let dataTypeArray = document.getElementsByName("data-type");

    for (let i = 0; i < dataTypeArray.length; i++) {
        if (dataTypeArray[i].checked) {
            dataType = dataTypeArray[i].value;
        }
    }
    if(arraySize==undefined||dataType==undefined){
        alert("ERROR: Either size of array or datatype field is not provided")
        return;
    }
    else if (arraySize < 1 || arraySize > 15) {
        alert("-array size must be greater than 1 and less than 15\n-please provide the data same as the selected data type");
        return;
    }
    switch (dataType) {
        case "0":
            inputArray = arrayString
            .split("")
            break;
        case "1":
            inputArray = arrayString
                .split(/[ ,]+/)
            break;
        case "2":
            inputArray = arrayString
                .split(/[ ,]+/)
                .filter((value) => parseInt(value));
            break;
        case "3":
            inputArray = arrayString
                .split(/[ ,]+/)
                .filter((value) => parseFloat(value));
            break;
    }

    numberOfValues = inputArray.length;
    if(arraySize<numberOfValues){
        alert("Error: Array index out of bound\n please provide values less than or equal to size of the declared array");
        return;
    }

    for (let i = 0; i < arraySize; i++) {
        // creating the ul element
        var arraybox = document.createElement("ul");
        var arrayBox_id = "arraybox-" + i;
        arraybox.setAttribute("id", arrayBox_id);
        arraybox.setAttribute("class", "arraybox");
        display.appendChild(arraybox);


        // creating the value element
        var value = document.createElement("li");
        var value_id = "value-" + i;
        value.setAttribute("id", value_id);

        // creating the value holder
        valueHolder= document.createElement("span");
        var valueHolder_id= "valueHolder-"+i;
        valueHolder.setAttribute("id", valueHolder_id);

        if (inputArray[i] == ""||inputArray[i]==undefined) {
            value.setAttribute("class", "novalue");
            value.appendChild(valueHolder);
        }
        else {
            // entering value in value element
            value.appendChild(valueHolder);
            value.setAttribute("class", "value");
            valueHolder.appendChild(document.createTextNode(inputArray[i]));
        }
        arraybox.appendChild(value);


        // creating the index element
        var index = document.createElement("li");
        var index_id = "index-" + i;
        index.setAttribute("id", index_id);
        index.setAttribute("class", "index-number");
        arraybox.appendChild(index);

        // entering value in index element
        index.appendChild(document.createTextNode(i));
    }

}

defaultPrevention(document.querySelector("#submit-input"));
document.querySelector("#submit-input").addEventListener("click", input);




//---------------------------------------------------------------------------------------------------------------------------

//Insert operation

let insertionMethodValue;
let insertionMethod= ()=>{
    let insertionMethodArray= document.getElementsByName("insert-position");
    //getting the insertion method
    for(let i=0; i<insertionMethodArray.length;i++){
        if(insertionMethodArray[i].checked){
        insertionMethodValue= insertionMethodArray[i].value;
        }
    }
    if(insertionMethodValue== "2"){
        document.querySelector("#insert-index").style.display="inline";
    }
    else{
        document.querySelector("#insert-index").style.display="none";
    }
}
let insertionMethodLabels= document.querySelector(".insert-label");
insertionMethodLabels.addEventListener("click", insertionMethod)


let insert= ()=>{

    // Insertion methods 
    
    let insertionAtStart= ()=>{
        let currentValue= document.querySelector(`#value-${pointer}`)
        while(pointer!=0){
            let newValueHolder= document.querySelector(`#value-${pointer-1}`).firstChild;
            // let oldValueHolder= document.querySelector(`#value-${pointer}`).firstChild;
            console.log(newValueHolder)
            // currentValue.appendChild(newValueHolder);
            document.querySelector(`#value-${pointer}`).replaceChildren(newValueHolder);
            pointer--;
            // setTimeout(shiftToStart, 1500);
            // setTimeout(shiftToStart, 1000)                    
        }
            currentValue.appendChild(valueHolder)
            currentValue.firstChild.appendChild(document.createTextNode(valueToInsert));
            numberOfValues++;
            return;
    }

    if(insertionMethodValue==undefined)
    alert("please select a desired insertion method");
        //creating a switch case for different conditions based on different insertion method
    if(numberOfValues<arraySize){
        let valueToInsert= document.querySelector("#insert-input").value;
        let pointer= numberOfValues
        switch(insertionMethodValue){
            case "0":               
            insertionAtStart();
            break;
            case "1":
            break;
            case "2":
            break;
        }
    }
    else alert("Array is already full");
}

defaultPrevention(document.querySelector("#insert"))
document.querySelector("#insert").addEventListener("click", insert);