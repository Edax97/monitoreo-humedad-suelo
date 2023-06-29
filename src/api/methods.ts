export const getMethod = async <T>(url: string) => {
  const user = null;

  const response = await fetch(url, {
    method: "GET",
    headers: {
      Accept: "application/json, text/plain, */*",
      "Content-Type": "application/json",
      Authorization: `Bearer ${user}`,
    },
  }).then<T>((data) => data.json());

  return response;
};

export const postMethod = async <T>(url: string, body?: any) => {
  const user = null;

  const response = await fetch(url, {
    method: "POST",
    headers: {
      Accept: "application/json, text/plain, */*",
      "Content-Type": "application/json",
      Authorization: `Bearer ${user}`,
    },
    body: JSON.stringify(body),
  }).then<T>((data) => data.json());

  return response;
};

export const deleteMethod = async <T>(url: string, body?: any) => {
  const user = null;

  const response = await fetch(url, {
    method: "DELETE",
    headers: {
      Accept: "application/json, text/plain, */*",
      "Content-Type": "application/json",
      Authorization: `Bearer ${user}`,
    },
    body: JSON.stringify(body),
  }).then<T>((data) => data.json());

  return response;
};

export const putMethod = async <T>(url: string, body?: any) => {
  const user = null;
  console.log("Body", body);
  const response = await fetch(url, {
    method: "PUT",
    headers: {
      Accept: "application/json, text/plain, */*",
      "Content-Type": "application/json",
      Authorization: `Bearer ${user}`,
    },
    body: JSON.stringify(body),
  }).then<T>((data) => data.json());

  return response;
};
