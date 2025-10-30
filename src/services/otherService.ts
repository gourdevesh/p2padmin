import axios from "axios";

export const realTimePrice = async () => {
    try {
        const response = await axios('https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum,tether,binancecoin&vs_currencies=inr');
        return response.data;


    }
    catch (error) {
        console.log(error);
    }
}