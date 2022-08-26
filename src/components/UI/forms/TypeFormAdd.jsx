import { useState } from "react";

const TypeFormAdd = ({create}) =>{
    const [type, setType] = useState({TypeName:"", TypeVersion:"", ConfigTemplateJson:""})

    const addNewType =async (e) =>{
        e.preventDefault();
        await create(type);
        setType({TypeName:"", TypeVersion:"", ConfigTemplateJson:""});
      }

    return(
        <form class="needs-validation" novalidate onSubmit = {addNewType}>
            <div className="d-flex justify-content-center">
                <h4>Add application type</h4>
            </div>
            
            <div className="input-group mb-3">
                <span className="input-group-text" id="filter">TypeName</span>
                <input type="text" className="form-control"
                required
                id="filter"
                value={type.TypeName}
                onChange={e => setType({...type, TypeName: e.target.value})}/>                        
            </div>

            <div className="input-group mb-3">
                <span className="input-group-text" id="filter">TypeVersion</span>
                <input type="text" className="form-control"
                required
                id="filter"
                value={type.TypeVersion}
                onChange={e => setType({...type, TypeVersion: e.target.value})}/>                        
            </div>

            <div className="input-group mb-3">
                <span className="input-group-text" id="filter">ConfigTemplateJson</span>
                <textarea type="text" className="form-control" rows="10"
                required
                id="filter"
                value={type.ConfigTemplateJson}
                onChange={e => setType({...type, ConfigTemplateJson: e.target.value})}/>                        
            </div>

            <button type="submit" className="btn btn-primary float-start">Submit</button>
        </form>
    );
}

export default TypeFormAdd;