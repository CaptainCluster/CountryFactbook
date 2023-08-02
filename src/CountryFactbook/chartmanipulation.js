/**
 * @author CaptainCluster
 * @link https://github.com/CaptainCluster
 */
import { getData } from "./datamanipulation.js";

/**
 * @function createChart
 * @description - Using the functions below to create a function that can be conveniently exported.
 */
async function createChart(){
    const data = await getData();
    buildChart(data.content);
}

/**
 * @function buildChart
 * @description - Builds a bar chart using frappe-charts 
 * @param {JSON} data 
 */
function buildChart(data){
    //Although we got all the necessary data as a parameter, we want to process the 
    //data so that, for example, the population numbers are in valid format (no commas).
    const capitals = [];
    const populations = [];
    for(let i = 0; i < data.length; i++){
        if(data[i].capital != "Capital City"){
            capitals.push(data[i].capital);
            populations.push(data[i].population.replace(/,/g, ""));
        }
    }
    const chartData = {
        labels: capitals, //A label below each bar that indicates which capital is represented
        datasets: [{values: populations}] //Assigning the population values
    };

    new frappe.Chart("#chart", {
        title: "Populations for Different Capitals",
        data: chartData,
        type: "bar",
        height: 550,
        axisOptions: {
            xIsSeries: true,
        },
        colors: ['red'],
        barOptions: {
            spaceRatio: 0.1,
          },
          
    });
}

export{ createChart }