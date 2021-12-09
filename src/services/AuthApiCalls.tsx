
type loginBody = {
    username?: string,
    password?: string,
    organization_id:number

}

const LoginApiCall = async (endPoint: string, body: loginBody, params: any, method: string): Promise<any> => {
    const requestOptions = {
        method: method || 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(body)
    };
    if (params && Object.keys(params).length > 0) {
        const qs = (Object.keys(params)).map((k: string) => `${k}=${params[k]}`).join('&')
        endPoint = `${endPoint}?${qs}`
    }
    const response = await fetch(`https://7713-2400-adc7-108-3b00-cbc2-229a-d1e4-9f7c.ngrok.io/${endPoint}`, requestOptions);
    const data = await response.json();
    if (!response.ok) throw data.message
    return data
}



export {
    LoginApiCall,
}





