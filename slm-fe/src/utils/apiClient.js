const ApiClient = async (url, username, password) => {

  const data = await fetch(url, {
    method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        username,
        password,
      },
    }).then(function(response) {
      return response.json() || false;
    });

  return data;
};

export default ApiClient;
