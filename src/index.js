/** 
@author CaptainCluster
@link https://github.com/CaptainCluster
*/

import { 
  mainPageFunction, 
  listPageFunction, 
  chartPageFunction,  
} from "./CountryFactbook/frontend.js";

if (document.readyState !== "loading") {
    mainFunction();
  } else {
    document.addEventListener("DOMContentLoaded", function () {
      mainFunction();
    });
}

/**
 * @function mainFunction
 */
function mainFunction(){
  if(window.location.pathname == "/src/index.html"){
    mainPageFunction();
  } else if(window.location.pathname == "/src/CountryFactbook/list.html"){
    listPageFunction();
  } else if(window.location.pathname == "/src/CountryFactbook/chart.html"){
    chartPageFunction();
  }
}

