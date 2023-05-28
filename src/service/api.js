const host = "https://api.bimtours.dev";

async function request(method, url, data) {
    const options = {
        method,
        headers : {}
    };
    
    if(data !== undefined) {
    options.headers["Content-Type"] = "application/json";
    options.body = JSON.stringify(data);
    }

    try{
        const response = await fetch(host+url, options);
        let result;
        if(response.status !== 204) {
            result = await response.json();
        }
        if(response.ok === false)  {
            const error = result;
            throw error;
        }
        return result;
    } catch(error) {
        alert(error.message);
        throw error;
    }
}

export const get = request.bind(null, 'GET');
export const post = request.bind(null, 'POST');
export const put = request.bind(null, 'PUT');
export const del = request.bind(null, 'DELETE');
