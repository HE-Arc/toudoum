import Axios, { AxiosInstance, AxiosResponse } from "axios";
import { ILogin } from "./ILogin";
import { IRegister } from './IRegister';
import { IToudoumResponse } from './IToudoumResponse';

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
                Accept: "application/json",
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
    public async login(credentials: ILogin): Promise<void> {
        await this.instanceAxios
            .post("auth/login", credentials)
            .then((response: AxiosResponse) => {
                this.token = response.data.data.access_token;
            });
    }

    /**
     * Register an Account
     * @param account Account information to register in Toudoum
     * @return Promise with information about registration
     */
    public async register(account: IRegister): Promise<void> {
        await this.instanceAxios
            .post("auth/login", account)
            .then((response: AxiosResponse) => {
                this.token = response.data.data.access_token;
            });
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
            console.log(error.response);
            throw new Error(error);
        }
    }

    public post(): void {
        console.log("post");
    }

    public put(): void {
        console.log("put");
    }

    public delete(): void {
        console.log("delete");
    }

    public patch(): void {
        console.log("patch");
    }
}

export default ApiRequester.instance;
