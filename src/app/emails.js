import axios from "axios";

//given a game's gameID
export async function setAlert(gameID, email)
{
	//get game's retail price
	const priceResponse = await axios.get(`https://www.cheapshark.com/api/1.0/games?id=${gameID}`);
	const price = parseFloat(priceResponse.data.deals[0].retailPrice);
	//output
	console.log("retailPrice : " + priceResponse.data.deals[0].retailPrice);

	//set threshold price to wait for to alert user
	const threshold = (price * 0.85).toFixed(2); //15% off
	
	//output
	console.log("price : " + price);
	console.log("threshold : " + threshold);

	//set alert, output, return
	const alertResponse = await axios.get(`https://www.cheapshark.com/api/1.0/alerts?action=set&email=${email}&gameID=${gameID}&price=${threshold}`);
	console.log(`https://www.cheapshark.com/api/1.0/alerts?action=set&email=${email}&gameID=${gameID}&price=${threshold}`);
	return alertResponse;
}

export async function getAlert(email)
{
	const manageResponse = await axios.get(`https://www.cheapshark.com/api/1.0/alerts?action=manage&email=${email}`);
	return manageResponse;
}

export async function deleteAlert(gameID, email)
{
	const deleteResponse = await axios.get(`https://www.cheapshark.com/api/1.0/alerts?action=delete&email=${email}&gameID=${gameID}&price=0.0`);
	console.log(`https://www.cheapshark.com/api/1.0/alerts?action=delete&email=${email}&gameID=${gameID}&price=0.0`);
	return deleteResponse;
}