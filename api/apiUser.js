import client from "./client";

/**
 * @param {string} _username
 * @param {string} _password
 * @returns {import("axios").AxiosPromise}
 */
export const loginUser = (_username, _password) =>
    client.post("user/login", {
        username: _username,
        password: _password,
    });
