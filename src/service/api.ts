const host: string = "https://api.bimtours.dev";

async function request(method: string, url: string, data?: any): Promise<any> {
    const options: any = {
        method,
        headers: {}
    };

    if(data !== undefined) {
        options.headers["Content-Type"] = "application/json";
        options.body = JSON.stringify(data);
    }

    try {
        const response = await fetch(host + url, options);
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
        if (error instanceof Error) {
            // Type guard to arrow down the type to Error
            alert(error.message);
            throw error;
          } else {
            console.log('An unknown error occurred');
          }
    }
}

export const get = request.bind(null, 'GET');
export const post = request.bind(null, 'POST');
export const put = request.bind(null, 'PUT');
export const del = request.bind(null, 'DELETE');