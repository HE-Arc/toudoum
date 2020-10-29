import Axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";
import { ILogin } from "./ILogin";
import { IRegister } from './IRegister';
import { IToudoumResponse } from './IToudoumResponse';
import { ToudoumError } from './ToudoumError';
import { ToudoumError422 } from './ToudoumError422';

/**
 * Api Requester
 * Allow developer to contact an APi with a Singleton pattern
 */
class ApiRequester {
    // Properties
    private static singleton: ApiRequester;
    private instanceAxios: AxiosInstance;
    private token: string | null;

    /**
     * Instanciate a new ApiRequester
     */
    private constructor() {
        this.token = null;
        this.instanceAxios = Axios.create({
            baseURL: "http://localhost:8000/api/",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
            },
        });
    }

    /**
     * Get the ApiRequester instance
     * If does not exist; it will be initialized
     * @returns instance of ApiRequester
     */
    public static get instance(): ApiRequester {
        if (!ApiRequester.singleton) {
            this.singleton = new ApiRequester();
        }

        return ApiRequester.singleton;
    }

    /**
     * Log a User in the Web App
     * @param credentials {email, password}
     * @return Promise with information about login
     */
    public async login(credentials: ILogin): Promise<IToudoumResponse> {
        try {
            const response = await this.instanceAxios.post("auth/login", credentials);
            this.token = response.data.data.access_token;
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
     * @param account Account information to register in Toudoum
     * @return Promise with information about registration
     */
    public async register(account: IRegister): Promise<AxiosResponse> {
        try {
            const response = await this.instanceAxios.post("auth/signup", account);
            this.token = response.data.data.access_token;
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
     * Check if API server is up
     * @return Promise
     */
    public getStateServer(): Promise<AxiosResponse> {
        return this.instanceAxios.get("state");
    }

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

    public async post(url: string, body: any): Promise<IToudoumResponse> {
        return this.request("POST", url, body);
    }

    public async put(url: string, body: any): Promise<IToudoumResponse> {
        return this.request("PUT", url, body);
    }

    public delete(url: string): Promise<IToudoumResponse> {
        return this.request("DELETE", url);
    }

    public async patch(url: string, body: any): Promise<IToudoumResponse> {
        return this.request("PATCH", url, body);
    }
}

export default ApiRequester.instance;
