export default interface IAuth {
    login: (email: string) => Promise<any>;
}
