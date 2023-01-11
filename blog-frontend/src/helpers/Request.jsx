export const Request = async (url, method, dataToSave = "", files = false) => {
  let loading = true;

  let options = {
    method: "GET",
  };

  if (method == "GET" || method == "DELETE") {
    options = {
      method: method,
    };
  }

  if (method == "POST" || method == "PUT") {
    let body = JSON.stringify(dataToSave);

    if (files) {
      options = {
        method: method,
        body: dataToSave,
      };
    } else {
      options = {
        method: method,
        body: JSON.stringify(dataToSave),
        files: true,
        headers: {
          "Content-Type": "application/json",
        },
      };
    }
  }

  const query = await fetch(url, options);
  const data = await query.json();

  loading = false;

  return {
    data,
    loading,
  };
};
