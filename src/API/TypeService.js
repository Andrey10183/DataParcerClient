export default class TypeService {
    static async getAll () {
        const responce = await fetch(process.env.REACT_APP_API +
            'ApplicationTypes')
            .then(response=>response.json());

        return responce.value;
    }

    static async create (entity) {
        const responce = await fetch(process.env.REACT_APP_API+
            `ApplicationTypes?TypeName=${entity.TypeName}&TypeVersion=${entity.TypeVersion}&ConfigTemplateJson=${entity.ConfigTemplateJson}`,{
                method:"POST",
                headers:{
                    'Accept':'application/json',
                    'Content-Type':'application/json'
                }
            })
            .then(res=>res.json());
        
        return responce;
    }

    static async update(entity) {
        var bd = JSON.stringify({
            TypeID : entity.TypeID,
            TypeName : entity.TypeName,
            TypeVersion : entity.TypeVersion,
            ConfigTemplateJson : entity.ConfigTemplateJson
        });

        const responce = await fetch(process.env.REACT_APP_API +
        `ApplicationTypes?id=${entity.TypeID}`,{
            method:"PATCH",
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            },
            body:bd
        });

        return responce;
    }

    static async delete(id) {
        const responce = await fetch(process.env.REACT_APP_API+
            `ApplicationTypes?id=${id}`,{
                method:"DELETE",
                headers:{
                    'Accept':'application/json',
                    'Content-Type':'application/json'
            }                    
        })
        
        return responce;
    }
}