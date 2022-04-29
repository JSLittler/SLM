const SaveClient = async (url, username, game) => {

  const request = await fetch(url, {
    method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        username,
      },
      body: JSON.stringify(game),
    }).then(function(response) {
      return response.json();
    });

    return request;
};

export default SaveClient;
