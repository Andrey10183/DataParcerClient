import { useEffect, useState } from "react";
import JSONPretty from 'react-json-pretty';
import 'react-json-pretty/themes/1337.css';
import addIcon from '../components/Icons/addIcon';
import gearIcon from '../components/Icons/gearIcon';
import upIcon from '../components/Icons/upIcon';
import downIcon from '../components/Icons/downIcon';
import editIcon from '../components/Icons/editIcon';
import deleteIcon from '../components/Icons/deleteIcon';
import sorting from '../components/Sorting';
import TypeService from '../API/TypeService';
import useFetching from "../hooks/useFetching";
import MyModal from "../components/UI/modal/MyModal";
import TypeFormAdd from "../components/UI/forms/TypeFormAdd";
import TypeFormEdit from "../components/UI/forms/TypeFormEdit";

const ApplicationType1 = () => {
    var JSONPretty133 = require('react-json-pretty/dist/1337');

    const [appTypes, setAppTypes] = useState([]);
    const [modalTitle, setModalTitle] = useState("");
    
    const [TypeID, setTypeID] = useState(0);
    const [TypeName, setTypeName] = useState("");
    const [TypeVersion, setTypeVersion] = useState("");
    const [ConfigTemplateJson, setConfigTemplateJson] = useState("");
    
    const [TypeIDFilter, setTypeIDFilter] = useState("");
    const [TypeNameFilter, setTypeNameFilter] = useState("");
    const [TypeVersionFilter, setTypeVersionFilter] = useState("");
    const [typeWithoutFilter, settypeWithoutFilter] = useState([])

    const [modalAdd, setModalAdd] = useState(false);
    const [modalEdit, setModalEdit] = useState(false);

    const [fetchTypes, isTypesLoading, typesError] = useFetching(async () => {
        const fetchData = await TypeService.getAll();
        setAppTypes(fetchData);
        settypeWithoutFilter(fetchData);
      });

    useEffect(() =>{
        fetchTypes()
    }, [])

    const filterFn = () => {
        var _TypeIDFilter = TypeIDFilter;
        var _TypeNameFilter = TypeNameFilter;
        var _TypeVersionFilter = TypeVersionFilter;

        var filteredData = typeWithoutFilter.filter(
            function(e1){
                return e1.TypeID.toString().toLowerCase().includes(
                    _TypeIDFilter.toString().trim().toLowerCase()
                ) &&
                e1.TypeName.toString().toLowerCase().includes(
                    _TypeNameFilter.toString().trim().toLowerCase()
                ) &&
                e1.TypeVersion.toString().toLowerCase().includes(
                    _TypeVersionFilter.toString().trim().toLowerCase()
                )
            }
        )

        setAppTypes(filteredData)
    }
    
    const sortResult = (prop, asc) => {
        setAppTypes(sorting([...appTypes], prop, asc))
    }

    const changeTypeIDFilter =(e)=>{
        setTypeIDFilter(e.target.value);
        filterFn();
    }

    const changeTypeNameFilter =(e)=>{
        setTypeNameFilter(e.target.value); 
        filterFn();
    }

    const changeTypeVersionFilter =(e)=>{
        setTypeVersionFilter(e.target.value); 
        filterFn();
    }

    const changeTypeName =(e)=>{
        setTypeName(e.target.value);
    }

    const changeTypeVersion =(e)=>{
        setTypeVersion(e.target.value);
    }

    const changeConfigTemplateJson =(e)=>{
        setConfigTemplateJson(e.target.value);
    }

    const addClick = () => {
            setModalTitle("Add app Type");
            setTypeID(0);
            setTypeName("");
            setTypeVersion("");
            setConfigTemplateJson("");
    }

    const editClick = (type) => {
        setModalTitle("Edit app Type");
        setTypeID(type.TypeID);
        setTypeName(type.TypeName);
        setTypeVersion(type.TypeVersion);
        setConfigTemplateJson(type.ConfigTemplateJson);
    }
    
    const refreshList = async () => {
        const fetchData = await TypeService.getAll();
        setAppTypes(fetchData);
        settypeWithoutFilter(fetchData);
    }

    // componentDidMount (){
    //     this.refreshList();
    // }
    const createClickAlt =async (type) =>{
        const fetchData = await TypeService.create({
            TypeName: type.TypeName,
            TypeVersion:type.TypeVersion,
            ConfigTemplateJson:type.ConfigTemplateJson
        });
        setModalAdd(false);  
        alert(`Entity created with id=${fetchData.TypeID}`);
        refreshList(); 
         
    }

    const createClick = async (e) => {

        e.preventDefault();
        const fetchData = await TypeService.create({
            TypeName: TypeName,
            TypeVersion:TypeVersion,
            ConfigTemplateJson:ConfigTemplateJson
        });

        alert(`Entity created with id=${fetchData.TypeID}`);
        refreshList();
    }

    const updateClick = async (e) => {

        e.preventDefault();

        const fetchData = await TypeService.update({
            TypeID : TypeID,
            TypeName : TypeName,
            TypeVersion : TypeVersion,
            ConfigTemplateJson : ConfigTemplateJson    
        })
        
        alert(`Recort with id=${TypeID} has been updated!`);
        refreshList();
    }

    const updateEditForm = (entity) => {

    }

    const updateClickAlt = async (type) => {
        const fetchData = await TypeService.update({
            TypeID : type.TypeID,
            TypeName : type.TypeName,
            TypeVersion : type.TypeVersion,
            ConfigTemplateJson : type.ConfigTemplateJson    
        })
        
        alert(`Recort with id=${TypeID} has been updated!`);
        refreshList();
    }

    const deleteClick = async (id) => {
        if (window.confirm('Are you shure?')) {
            const fetchData = await TypeService.delete(id)
            
            if (fetchData.ok){
                alert(`Recort with id=${id} has been deleted!`);
                await refreshList();
            }
            if (fetchData.statusText==='Conflict'){
                alert(`Record with id=${id} can't be deleted!\nThis type bined to existing app instances!`);
            } 
        }
    }

    return(
        <div classNameme="appTypesBody">                
                
                <button type="button" className="btn mt-2 mb-2 bg-success text-white float-end"
                data-bs-toggle="modal"
                data-bs-target="#exampleModal"
                onClick={()=>setModalAdd(true)}>
                   {addIcon()}
                    Add                
                </button>
                {isTypesLoading?
                    <div class="d-flex justify-content-center mt-5">
                    <div class="spinner-border" role="status">
                        <span class="sr-only"></span>
                    </div>
                    </div>
                :
                <table className="table" id="content">
                    <thead>
                        <tr>
                            <th>
                                <div className="d-flex flex-row">
                                    <input className="form-control mb-2 w-85 h-75"
                                    id="filter"
                                    onChange={changeTypeIDFilter}
                                    placeholder="Filter"/>

                                    <button type="button" className="btn btn-sm"
                                    onClick={()=>sortResult('TypeID',true)}>
                                        {downIcon()}
                                    </button>

                                    <button type="button" className="btn btn-sm"
                                    onClick={()=>sortResult('TypeID',false)}>
                                        {upIcon()}
                                    </button>
                                </div>
                                TypeID
                            </th>
                            <th>
                                <div className="d-flex flex-row">   
                                    <input className="form-control mb-2 w-85 h-75"
                                    onChange={changeTypeNameFilter}
                                    id="filter"
                                    placeholder="Filter"/>
                                    
                                    <button type="button" className="btn btn-sm"
                                    onClick={()=>sortResult('TypeName',true)}>
                                        {downIcon()}
                                    </button>
                                    
                                    <button type="button" className="btn btn-sm"
                                    onClick={()=>sortResult('TypeName',false)}>
                                        {upIcon()}
                                    </button>
                                </div>
                                TypeName
                            </th>
                            <th>
                                <div className="d-flex flex-row">   
                                    <input className="form-control mb-2 w-85 h-75 bg-current"
                                    onChange={changeTypeVersionFilter}
                                    id="filter"
                                    placeholder="Filter"/>
                                    
                                    <button type="button" className="btn btn-sm"
                                    onClick={()=>sortResult('TypeVersion',true)}>
                                        {downIcon()}
                                    </button>
                                    
                                    <button type="button" className="btn btn-sm"
                                    onClick={()=>sortResult('TypeVersion',false)}>
                                        {upIcon()}
                                    </button>
                                </div>
                                TypeVersion
                            </th>
                            <th>ConfigTemplateJson</th>
                            <th>Options</th>
                        </tr>    
                    </thead>                    
                        {appTypes.map(type=>
                            <tbody key = {type.id}>
                                <tr data-toggle="collapse" data-target={"#demo"+type.TypeID} className="accordion-toggle" key={type.TypeID}>
                                    <td>{type.TypeID}</td>
                                    <td>{type.TypeName}</td>
                                    <td>{type.TypeVersion}</td>
                                    <td>
                                        <p>
                                            <a class="btn mr-2 bg-info" 
                                                data-bs-toggle="collapse" 
                                                href={"#demo"+type.TypeID} 
                                                role="button" 
                                                aria-expanded="false" 
                                                aria-controls="exa">
                                                {gearIcon()}
                                            </a>
                                        </p>                                    
                                    </td>
                                    <td>
                                        <button type="button"
                                        className="btn mx-2 bg-warning"
                                        data-bs-toggle="modal"
                                        data-bs-target="#exampleModal"
                                        onClick={()=>{
                                                editClick(type)
                                                setModalEdit(true)
                                            }}>
                                            {editIcon()}
                                        </button>

                                        <button type="button"
                                        className="btn mx-2 bg-danger"
                                        onClick={()=>deleteClick(type.TypeID)}>
                                            {deleteIcon()}
                                        </button>                                    
                                    </td>                                
                                </tr>
                                <tr>
                                    <td colSpan="12" className="hiddenRow">
                                        <div className="accordian-body collapse" id={"demo"+type.TypeID}>
                                            <JSONPretty id="json-pretty" data={type.ConfigTemplateJson} theme={JSONPretty133}></JSONPretty> 
                                        </div>
                                    </td>
                                </tr>                            
                            </tbody>        
                        )}                                              
                </table>
            }

            <MyModal visible={modalAdd} setVisible={setModalAdd}>
                <TypeFormAdd create = {createClickAlt} />
            </MyModal>

            <MyModal visible={modalEdit} setVisible={setModalEdit}>
                <TypeFormEdit 
                    edit = {updateClickAlt}
                    updateState = {updateEditForm}
                    entity = {{
                        TypeID: TypeID,
                        TypeName: TypeName, 
                        TypeVersion: TypeVersion,
                        ConfigTemplateJson: ConfigTemplateJson   
                    }}
                />
            </MyModal>
        
        </div>    
    );
}

export default ApplicationType1;