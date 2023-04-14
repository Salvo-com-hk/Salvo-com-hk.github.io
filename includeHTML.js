function setInnerHTML(elm, html) { // sets innerHTML & runs scripts
  elm.innerHTML = html;
  
  Array.from(elm.querySelectorAll("script"))
    .forEach( oldScriptEl => {
      const newScriptEl = document.createElement("script");
      
      Array.from(oldScriptEl.attributes).forEach( attr => {
        newScriptEl.setAttribute(attr.name, attr.value) 
      });
      
      const scriptText = document.createTextNode(oldScriptEl.innerHTML);
      newScriptEl.appendChild(scriptText);
      
      oldScriptEl.parentNode.replaceChild(newScriptEl, oldScriptEl);
  });
}

function includeHTML() {
  var z, i, elmnt, file, xhttp;
  /* Loop through a collection of all HTML elements: */
  z = document.getElementsByTagName("*");
  for (i = 0; i < z.length; i++) {
    elmnt = z[i];
    /*search for elements with a certain atrribute:*/
    file = elmnt.getAttribute("w3-include-html");
    if (file) {
      /* Make an HTTP request using the attribute value as the file name: */
      xhttp = new XMLHttpRequest();
      xhttp.onreadystatechange = function() {
        if (this.readyState == 4) {
          if (this.status == 200) {setInnerHTML(elmnt,this.responseText);}
          if (this.status == 404) {elmnt.innerHTML = "Page not found.";}
          /* Remove the attribute, and call this function once more: */
          elmnt.removeAttribute("w3-include-html");
          includeHTML();
        }
      }
      xhttp.open("GET", file, true);
      xhttp.setRequestHeader("Cache-Control", "must-revalidate");
      xhttp.send();
      /* Exit the function: */
      return;
    }
  }
}

function includeBody() {
  var url = window.location.pathname;
  tabname = url.substring(url.lastIndexOf('/')+1); 
  tabname = tabname.substring(0,tabname.lastIndexOf('.'));
  if (tabname == "index" || tabname == "") {
    tabname = "about";
  }
  if (tabname == "about" || tabname == "trading" || tabname == "backtesting" || tabname == "optimization" || tabname == "leadership") {
    window.document.write("<div w3-include-html=\"");
    window.document.write(tabname);
    window.document.write("-body.html\"></div>");
    window.document.write("<style>table.menu td." + tabname + "Tab { border-left: 1px outset #DDD; border-bottom: 1px outset #DDD; background-color: #DDF; } </style>");
  } else {
    window.document.write("<xmp>Attempt to pass custom value to includeBody() in includeHTML.js. For security purposes, this is not allowed.</xmp>");
  }
}

