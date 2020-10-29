import Axios, { AxiosInstance, AxiosResponse } from "axios";
import { ILogin } from "./ILogin";
import { IToudoumResponse } from './IToudoumResponse';

/**
 * The Singleton class defines the `getInstance` method that lets clients access
 * the unique singleton instance.
 */
class ApiRequester {
    private static singleton: ApiRequester;
    private instanceAxios: AxiosInstance;
    private token: string | null;

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

    public static get instance(): ApiRequester {
        if (!ApiRequester.singleton) {
            this.singleton = new ApiRequester();
        }

        return ApiRequester.singleton;
    }

    public async login(credentials: ILogin): Promise<void> {
        this.instanceAxios
            .post("auth/login", credentials)
            .then((response: AxiosResponse) => {
                this.token = response.data.data.access_token;
            });
    }

    public register(): void {
        console.log("register");
    }

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
