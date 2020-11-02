import store from '@/store';
import Axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";
import { ILogin } from "./ILogin";
import { IRegister } from './IRegister';
import { IToudoumResponse } from './IToudoumResponse';
import { ToudoumError } from './ToudoumError';
import { ToudoumError422 } from './ToudoumError422';

/**
 * API Service to link Front-End and Back-End
 * Allow developer to contact an APi with a Singleton pattern
 * 
 * @author Lucas Fridez <lucas.fridez@he-arc.ch>
 * @class ApiRequester
 */
class ApiRequester {
    // Properties
    private static singleton: ApiRequester;
    private instanceAxios: AxiosInstance;
    private token: string | null;

    /**
     * Creates an instance of ApiRequester.
     * @author Lucas Fridez <lucas.fridez@he-arc.ch>
     */
    private constructor() {
        this.token = null;
        this.instanceAxios = Axios.create({
            baseURL: "http://localhost:8000/api/",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
            },
        });
    }

    /**
     * Get ApiRequester Instance (or create it if inexistant)
     *
     * @author Lucas Fridez <lucas.fridez@he-arc.ch>
     * @readonly
     * @static
     * @type {ApiRequester}
     */
    public static get instance(): ApiRequester {
        if (!ApiRequester.singleton) {
            this.singleton = new ApiRequester();
        }

        return ApiRequester.singleton;
    }

    public setToken(token: string) {
        this.token = token;
    }

    /**
     * Log User in Application and store his token
     *
     * @author Lucas Fridez <lucas.fridez@he-arc.ch>
     * @param {ILogin} credentials credentials to log
     * @return {*}  {Promise<IToudoumResponse>} API Response
     */
    public async login(credentials: ILogin): Promise<IToudoumResponse> {
        try {
            const response = await this.instanceAxios.post("auth/login", credentials);
            this.token = response.data.data.access_token;

            // Store user in Vuex store and sessionStorage
            store.actions.logUser(response.data.data.user);
            window.sessionStorage.setItem("user", JSON.stringify(response.data.data.user));
            window.sessionStorage.setItem("token", response.data.data.access_token);
            return response.data as IToudoumResponse;
        } catch (error) {
            const data = error.response.data;
            if (data.data == undefined) {
                throw new ToudoumError(data.code, data.message, data.status);
            } else {
                throw new ToudoumError422(data.code, data.message, data.status, data.data);
            }
        }
    }

    /**
     * Register an Account
     *
     * @author Lucas Fridez <lucas.fridez@he-arc.ch>
     * @param {IRegister} account account to register
     * @return {*}  {Promise<AxiosResponse>} API Response
     */
    public async register(account: IRegister): Promise<AxiosResponse> {
        try {
            const response = await this.instanceAxios.post("auth/signup", account);
            this.token = response.data.data.access_token;
            store.actions.logUser(response.data.data.user);
            return response;
        } catch (error) {
            const data = error.response.data;
            if (data.data == undefined) {
                throw new ToudoumError(data.code, data.message, data.status);
            } else {
                throw new ToudoumError422(data.code, data.message, data.status, data.data);
            }
        }
    }

    /**
     * Check if API server is UP
     *
     * @author Lucas Fridez <lucas.fridez@he-arc.ch>
     * @return {*}  {Promise<AxiosResponse>} API Response
     */
    public getStateServer(): Promise<AxiosResponse> {
        return this.instanceAxios.get("state");
    }


    /**
     * Request a GET Method
     *
     * @author Lucas Fridez <lucas.fridez@he-arc.ch>
     * @template T type to cast the data got from API
     * @param {string} url url to request 
     * @return {*}  {Promise<T>} Promise of type T
     */
    public async get<T>(url: string): Promise<T> {
        try {
            const response: AxiosResponse = await this.instanceAxios.get(url, {
                headers: { Authorization: `Bearer ${this.token}` }
            });
            return response.data as T;
        } catch (error) {
            const data = error.response.data;
            if (data.data == undefined) {
                throw new ToudoumError(data.code, data.message, data.status);
            } else {
                throw new ToudoumError422(data.code, data.message, data.status, data.data);
            }
        }
    }

    /**
     * Request the API
     *
     * @author Lucas Fridez <lucas.fridez@he-arc.ch>
     * @private
     * @param {("GET" | "POST" | "PUT" | "DELETE" | "PATCH")} method string method to use
     * @param {string} url url to request
     * @param {*} [body] body to add in request
     * @return {*}  {Promise<IToudoumResponse>} Api Response
     */
    private async request(method: "GET" | "POST" | "PUT" | "DELETE" | "PATCH", url: string, body?: any): Promise<IToudoumResponse> {

        const requestConfig: AxiosRequestConfig = {
            method: method,
            url: url,
            headers: { Authorization: `Bearer ${this.token}` }
        };

        if (body) {
            requestConfig.data = body;
        }

        try {
            const response: AxiosResponse = await this.instanceAxios(requestConfig);
            return response.data as IToudoumResponse;
        } catch (error) {
            const data = error.response.data;
            if (data.data == undefined) {
                throw new ToudoumError(data.code, data.message, data.status);
            } else {
                throw new ToudoumError422(data.code, data.message, data.status, data.data);
            }
        }
    }

    /**
     * POST data to API
     *
     * @author Lucas Fridez <lucas.fridez@he-arc.ch>
     * @param {string} url url to request
     * @param {*} body body to post
     * @return {*}  {Promise<IToudoumResponse>} API Response
     */
    public async post(url: string, body: any): Promise<IToudoumResponse> {
        return this.request("POST", url, body);
    }

    /**
     * PUT data to API
     *
     * @author Lucas Fridez <lucas.fridez@he-arc.ch>
     * @param {string} url url to request
     * @param {*} body body to put
     * @return {*}  {Promise<IToudoumResponse>} API Response
     */
    public async put(url: string, body: any): Promise<IToudoumResponse> {
        return this.request("PUT", url, body);
    }

    /**
     * DELETE method to API
     *
     * @author Lucas Fridez <lucas.fridez@he-arc.ch>
     * @param {string} url url to request
     * @return {*}  {Promise<IToudoumResponse>} API Response
     */
    public delete(url: string): Promise<IToudoumResponse> {
        return this.request("DELETE", url);
    }

    /**
     * PATCH method to API
     *
     * @author Lucas Fridez <lucas.fridez@he-arc.ch>
     * @param {string} url url to request
     * @param {*} body body to PATCH
     * @return {*}  {Promise<IToudoumResponse>} API Response
     */
    public async patch(url: string, body: any): Promise<IToudoumResponse> {
        return this.request("PATCH", url, body);
    }
}

export default ApiRequester.instance;
