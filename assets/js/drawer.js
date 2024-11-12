 const drawer = document.getElementById("drawer");
 document.getElementById("drawer-btn").addEventListener("click", function(event) {
    event.preventDefault();
    drawer.classList.toggle("open");
  });
  document.getElementById("close").addEventListener("click",function(event){
    event.preventDefault();
    drawer.classList.remove("open")  
  })
  