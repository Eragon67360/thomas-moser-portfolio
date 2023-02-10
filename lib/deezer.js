export const BASE_URL = 'https://api.deezer.com';
export const getCharts = async () => {


    const data = await fetch(`${BASE_URL}/user/${process.env.DEEZER_ID}/history&access_token=${process.env.DEEZER_TOKEN}`, {
        method: 'GET',
        headers: {
            Authorization: `Bearer ${process.env.DEEZER_TOKEN}`,
            "Content-Type": "application/json",
            "Access-Control-Allow-Credentials": true,
        },
    }).then(response => response.json());

    return data;
};

export const getUser = async () => {
    const data = await fetch(`${BASE_URL}/user/me&access_token=${process.env.DEEZER_TOKEN}`, {//
      method: 'GET',
      credentials: 'include',
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.DEEZER_TOKEN}`,
        
        "Access-Control-Allow-Credentials": true,
      },
    }).then(response => response.json());
  
    return data;
  };
