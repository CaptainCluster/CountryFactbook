/** 
@author CaptainCluster
@link https://github.com/CaptainCluster
*/

//This file wraps up everything into functions that can be used to make the pages
//look exactly like what we want to show the user. 

import { getData } from "./datamanipulation.js";
import { createChart } from "./chartmanipulation.js";

/**
 * @function mainPageFunction
 * @description - The frontend process for index.js
 */
function mainPageFunction(){
    const capitalListButton = document.getElementById("capitalListButton");
    capitalListButton.addEventListener("click", function(){
      buttonVisualResponse(capitalListButton);
      capitalListButtonProcess();
    });
    const capitalChartButton = document.getElementById("capitalChartButton");
    capitalChartButton.addEventListener("click", function(){
      buttonVisualResponse(capitalChartButton);
      capitalChartButtonProcess();
    })
}

/**
 * @function capitalListButtonProcess
 * @description - Moves the user to the section where capitals are listed.
 */
function capitalListButtonProcess(){
  window.location.href = "../src/CountryFactbook/list.html";
}

/**
 * @function capitalChartButtonProcess
 * @description - Moves the user to the section where the chart is.
 */
function capitalChartButtonProcess(){
  window.location.href = "../src/CountryFactbook/chart.html";
}

/**
 * @function listPageFunction
 */
async function listPageFunction(){
  const data = await getData();
  const processedData = data.content;
  displayInformation(processedData);
  regionChange(processedData);
}

/**
 * @function displayInformation
 * @description - For the list.html, the function lists capitals and their population and countries 
 * @param {data} processedData 
 */
function displayInformation(processedData){
  const jsonTypes = ["country", "capital", "population"];

  const tbodyElement = document.getElementById("capitalTbody");
  for(let i = 0; i < processedData.length; i++){
    const trElement = document.createElement("tr");
    for(let n = 0; n < 3; n++){ //We want precisely 3 th elements
      const thElement = document.createElement("th");
      thElement.textContent = processedData[i][jsonTypes[n]];
      trElement.appendChild(thElement);
    }
    tbodyElement.appendChild(trElement);
  }
}
/**
 * @function regionChange
 * @description - The list will show "Country - Capital City - Population" to
 * separate the list into regions. The program will highlight this by changing
 * the color of these lines.
 * @param {array} processedData 
 */
function regionChange(processedData){
  const newRegionColor = "#b7d0ff"
  const tbodyElement = document.getElementById("capitalTbody");
  for(let i = 0; i < processedData.length; i++){
    if(tbodyElement.children[i].children[0].textContent == "Country"){
      for(let n = 0; n < 3; n++){
        tbodyElement.children[i].children[n].style.background = newRegionColor;
      }
    } 
  }
}

/**
 * @function chartPageFunction
 * @description - Wrapping up the chart creation process into a function that can
 * be exported to index.js
 */
function chartPageFunction(){
  createChart();
}

/**
 * @function buttonVisualResponse
 * @param {Button} button - Passing the button so the function can do its thing on it.
 */
function buttonVisualResponse(button){
  button.classList.add("clicked");
  setTimeout(function(){
      button.classList.remove("clicked");
  }, 100);
}

export { mainPageFunction, listPageFunction, chartPageFunction }