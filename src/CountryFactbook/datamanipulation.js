/**
 * @author CaptainCluster
 * @link https://github.com/CaptainCluster
 */

/**
 * @function getData
 */
async function getData(){
    const fileName = "../data/capitals.json";
    const request = await fetch(fileName);
    const data = await request.json();
    return data;
}

export { getData }