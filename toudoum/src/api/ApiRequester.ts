import Axios, { AxiosInstance, AxiosResponse } from 'axios';

/**
 * The Singleton class defines the `getInstance` method that lets clients access
 * the unique singleton instance.
 */
class ApiRequester {
    private static singleton: ApiRequester;
    private instanceAxios: AxiosInstance;

    private constructor() {
        this.instanceAxios = Axios.create({
            baseURL: "http://localhost:8000/api/",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            }
        });
     }

    public static get instance(): ApiRequester {
        if (!ApiRequester.singleton) {
            this.singleton = new ApiRequester();
            console.log("Created");   
        }
        
        return ApiRequester.singleton;
    }

    public login(): void {
        console.log("login");
    }

    public register(): void {
        console.log("register");
    }

    public getStateServer(): Promise<AxiosResponse> {
        return this.instanceAxios.get("state");
    }

    public get(): void {
        console.log("get");
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