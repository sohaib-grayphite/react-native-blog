import { BACKEND_URL as BackendUrl  } from '../constants/EndPoints'


const PostApiCall = async (endPoint: String, body: Object): Promise<any> => {
    console.log(body)
    const requestOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(body)
    };
    console.log(body)
    const response = await fetch(`https://50bd-2400-adc7-108-3b00-e80a-1278-e954-f1d1.ngrok.io/location/blog/?organization_id=12`, requestOptions);
    const data = await response.json();
    if (!response.ok) throw data.Message
    return data
}

const GetApiCall =async (endPoint: String, params: any, urlParams: Array<any> = []): Promise<any> => {
    const requestOptions = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
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
    const response = await fetch(`https://5086-2400-adc7-108-3b00-6b5c-ede3-ab8-5771.ngrok.io/location/blog/?organization_id=12`, {
        method: 'GET'
    });
    const data = await response.json()
    return data
}

const PutApiCall = async (endPoint: String, body: Object): Promise<any> => {
    const requestOptions = {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
    };
    const response = await fetch(`https://5086-2400-adc7-108-3b00-6b5c-ede3-ab8-5771.ngrok.io/location/blog/?organization_id=12`, requestOptions);
    const data = await response.json();
    return data
}

const DeleteApiCall = async (endPoint: String, body: Object): Promise<any> => {
    const requestOptions = {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
    };
    const response = await fetch(`https://50bd-2400-adc7-108-3b00-e80a-1278-e954-f1d1.ngrok.io/location/blog/?organization_id=12`, requestOptions);
    // const data = await response.json();
    return response
}

export {
    PostApiCall,
    GetApiCall,
    PutApiCall,
    DeleteApiCall
}
