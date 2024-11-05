class ApiService {

    static makeCall(url, authString, client, method, body) {

        let call;

        if(window.Liferay !== undefined) {

            call = window.Liferay.OAuth2Client
                .FromUserAgentApplication(client)
                .fetch(url, {
                    method: method,
                    ...(body ? { headers: { 'Content-Type': 'application/json'} } : {}),
                    ...(body ? { body: JSON.stringify(body) } : {})
                });

        } else {
            let headers = new Headers();
            if(body) {
                headers.set('Content-Type', 'application/json');
            }
            headers.set('Authorization', 'Basic ' + btoa(authString));

            call = fetch(url, {
                method: method,
                headers: headers,
                ...(body ? { body: JSON.stringify(body) } : {})
            }).then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok ' + response.statusText);
                }

                if (response.status === 204) {
                    return null;
                }

                return response.json();
            });

        }

        return call.then(data => {
            return data;
        });

    }

}

export default ApiService;