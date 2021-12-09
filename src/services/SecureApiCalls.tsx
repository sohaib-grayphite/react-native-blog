import { BACKEND_URL as BackendUrl  } from '../constants/EndPoints'

const PostApiCall = async (endPoint: String, body: Object, token: String): Promise<any> => {
    const requestOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(body)
    };
    const response = await fetch(`${BackendUrl}/${endPoint}`, requestOptions);
    const data = await response.json();
    if (!response.ok) throw data.Message
    return data
}

const GetApiCall =async (endPoint: String, params: any, token: String, urlParams: Array<any> = []): Promise<any> => {
    const requestOptions = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        },
    };
    if (urlParams && urlParams.length) {
        const up = urlParams.join('/')
        endPoint = `${endPoint}/${up}`
    }
    if (params && Object.keys(params).length > 0) {
        const qs = (Object.keys(params)).map((k:string) => `${k}=${params[k]}`).join('&')
        endPoint = `${endPoint}?${qs}`
    }
    const response = await fetch(`https://7713-2400-adc7-108-3b00-cbc2-229a-d1e4-9f7c.ngrok.io/${endPoint}`, requestOptions);
    console.log(response.json())
    const data = await response.json();
    // if (!response.ok) throw data.Message
    return data
}

const PutApiCall = async (endPoint: String, body: Object, token: String): Promise<any> => {
    const requestOptions = {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(body)
    };
    const response = await fetch(`${BackendUrl}/${endPoint}`, requestOptions);
    const data = await response.json();
    if (!response.ok) throw data.Message
    return data
}

const DeleteApiCall = async (endPoint: String, body: Object, token: String): Promise<any> => {
    console.log(body)
    const requestOptions = {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(body)
    };
    console.log(requestOptions.headers)
    const response = await fetch(`https://c2f1-2400-adc7-108-3b00-7d7b-9ae0-c201-be21.ngrok.io/${endPoint}`, requestOptions);
    // const data = await response.json();
    // if (!response.ok) throw data.Message
    return response
}

export {
    PostApiCall,
    GetApiCall,
    PutApiCall,
    DeleteApiCall
}
