/*Immediately invoked function*/

(function(){

    function Start(){
        console.log("The App has started");
        let deleteButtons = document.getElementsByName('deleteButton');

        for(button of deleteButtons)
        {
            button.addEventListener('click', (event)=>{
                if(!confirm("Are you sure you want to delete this entry?")) 
                {
                    event.preventDefault();
                    window.location.assign('/list-surveys');
                }
            });
        }
    }
    
    window.addEventListener("load",Start);
    
    })();