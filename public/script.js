document.addEventListener('DOMContentLoaded', () => {
    const leftArrow = document.querySelector(".left-arrow");
    const rightArrow = document.querySelector(".right-arrow");
    
    let mainarray = window.hourlyData || [];
    
   

    
    function getInitialArray() {
        const now = new Date();
        const currentHour = now.getHours();
        
        // Find the starting index in mainarray
        const startIndex = currentHour;
        
        // Return 6 items from the current time
        return mainarray.slice(startIndex, startIndex + 6);
    }

    
    let array = getInitialArray();
    console.log(array);

    function updateHourlyDisplay() {
        const containers = document.querySelectorAll(".hourly-container");
        containers.forEach((container, index) => {
            if (array[index]) {
                const timeObj = {time: array[index].time,m: array[index].m} ;
                container.querySelector(".t").textContent = `${timeObj.time} ${timeObj.m}`;
                container.querySelector(".te").innerHTML = `${array[index].temp} <sup>o</sup>`;
                container.querySelector("img").src = array[index].icon;
            }
        });
    }

    leftArrow.addEventListener("click", () => {
        if (mainarray.length !== 0 && array.length !== 0) {
            let currentFirstId = array[0].id;
            
           
            if (currentFirstId > 1) {
                
                let ind = currentFirstId - 2;
                array = mainarray.slice(ind, ind + 6);
                updateHourlyDisplay();
            }
        }
    });

    rightArrow.addEventListener("click", () => {
        if (mainarray.length !== 0 && array.length !== 0) {
            let currentLastId = array[array.length - 1].id;
            let currentFirstId = array[0].id;
            
            
            if (currentLastId < 29) {
               
                let ind = currentFirstId;
                array = mainarray.slice(ind, ind + 6);
                updateHourlyDisplay();
            }
        }
    });

   
    updateHourlyDisplay();
});