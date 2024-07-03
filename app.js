// const column = document.querySelectorAll(".column"); 

const main = document.querySelector("#main"); //For Button Div 
const addCardBtn = document.querySelector("#addCard");  //Button 

const addTask = (event) => {
    // page refresh par remove nahi hoga
    event.preventDefault();
    // /input
    const currentForm = event.target;
    //   input elements konsay index par ha ya pata karay ga
    const value = currentForm.elements[0].value;
  
    const parent = currentForm.parentElement;
  
    // extra empty div add hojayegi
    const ticket = createTicket(value);
  
    //  form say phelay jo input may add kara hoga woh add hojayega colum may
    parent.insertBefore(ticket, currentForm);
  
    //   ya variable colum ki heading ha issay ya pata chalay ga local storage may jo save ho raha ha woh konsay colum say aaya ha
    const h3Value = parent.children[0].innerText;
  
    if (!Array.isArray(savedTasks[h3Value])) {
      // agar array nhi hy tw khali array show karwado q kay push nahi ho sakta
      savedTasks[h3Value] = [];
    }
  
    savedTasks[h3Value].push(value);
    //   jason string may convert hokar show hoga local storage may
  
    localStorage.setItem("savedTasks", JSON.stringify(savedTasks));
  
    //    input clear kay liya use hoa ha
    currentForm.reset();
  };
  const myCreateCard = (cardTitle) => {
    //colum div reference 
    /* <div class="column">
             <h3>smit</h3>
    
             <form>
                 <input type="text" placeholder="add task" />
             </form>
       </div> */
       
    const myDiv = document.createElement("div");
    const myH3 = document.createElement("h3");
    const myForm = document.createElement("form");
    const myInput = document.createElement("input");
  
    const h3Text = document.createTextNode(cardTitle); // Colum h3 Heading 
    console.log(h3Text);
    
  
    myDiv.setAttribute("class", "column");
    myInput.setAttribute("type", "text");
    myInput.setAttribute("placeholder", "add task");
  
    myH3.appendChild(h3Text);
    myForm.appendChild(myInput);
    myDiv.appendChild(myH3);
    myDiv.appendChild(myForm);
  
    myForm.addEventListener("submit", addTask); // event kay submit honay par Run hoga 
  
    return myDiv;
  };
  const createTicket = (value) => {
    // paragraph add hojayega new input may jo add karengay
  
    const ticket = document.createElement("p");
  
    // console.log(ticket);
    const elementText = document.createTextNode(value);
    // console.log(elementText);
  
    ticket.setAttribute("draggable", "true");
    ticket.appendChild(elementText);
  
    return ticket;
  };
  let savedTasks = JSON.parse(localStorage.getItem("savedTasks"));
  // console.log(savedTasks);
  
  if (!savedTasks) {
    savedTasks = {};
  }
  
  
  // Displaying the tasks already saved in localStorage
  

for (const title in savedTasks) {
    const card = myCreateCard(title);
  
    const arrayOfTasks = savedTasks[title];
  
    for (let i = 0; i < arrayOfTasks.length; i++) {
      const p = createTicket(arrayOfTasks[i]); 
  
      card.insertBefore(p, card.lastElementChild);
    }
  
    main.insertBefore(card, addCardBtn);
  }

  addCardBtn.addEventListener("click", () => {
    const cardTitle = prompt("enter card name?");// button kay click honay par ek propmt aayega 
  
    const yourDiv = myCreateCard(cardTitle); // prompt may jo add karengay us name say colum create hojayega 
  
    main.insertBefore(yourDiv, addCardBtn); // button sy phalay colum create hoga
  });
 

