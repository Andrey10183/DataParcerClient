export default class InstanceService {
    static async getAll() {
        const responce = await fetch(process.env.REACT_APP_API+'ApplicationTypes')
            .then(response=>response.json());
        
        return responce.value;
    }
}