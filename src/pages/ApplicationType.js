import {Component} from 'react';
import JSONPretty from 'react-json-pretty';
import 'react-json-pretty/themes/1337.css';
import addIcon from '../components/Icons/addIcon';
import gearIcon from '../components/Icons/gearIcon';
import upIcon from '../components/Icons/upIcon';
import downIcon from '../components/Icons/downIcon';
import editIcon from '../components/Icons/editIcon';
import deleteIcon from '../components/Icons/deleteIcon';
import sort from '../components/Sorting';
import TypeService from '../API/TypeService';

var JSONPretty133 = require('react-json-pretty/dist/1337');

export class ApplicationType extends Component{
    
    constructor(props){
        super(props);
        
        this.state={
            appTypes:[],
            modalTitle:"",
            TypeID:0,
            TypeName:"",
            TypeVersion:"",
            ConfigTemplateJson:"",

            TypeIDFilter:"",
            TypeNameFilter:"",
            TypeVersionFilter:"",
            typeWithoutFilter:[],
        }
    }

    filterFn(){
        var TypeIDFilter = this.state.TypeIDFilter;
        var TypeNameFilter = this.state.TypeNameFilter;
        var TypeVersionFilter = this.state.TypeVersionFilter;

        var filteredData = this.state.typeWithoutFilter.filter(
            function(e1){
                return e1.TypeID.toString().toLowerCase().includes(
                    TypeIDFilter.toString().trim().toLowerCase()
                ) &&
                e1.TypeName.toString().toLowerCase().includes(
                    TypeNameFilter.toString().trim().toLowerCase()
                ) &&
                e1.TypeVersion.toString().toLowerCase().includes(
                    TypeVersionFilter.toString().trim().toLowerCase()
                )
            }
        )

        this.setState({appTypes:filteredData});
    }

    

    sortResult(prop, asc){
        this.setState({appTypes:sort(this.state.appTypes, prop, asc)});
    }

    changeTypeIDFilter =(e)=>{
        this.state.TypeIDFilter = e.target.value;
        this.filterFn();
    }

    changeTypeNameFilter =(e)=>{
        this.state.TypeNameFilter = e.target.value; 
        this.filterFn();
    }

    changeTypeVersionFilter =(e)=>{
        this.state.TypeVersionFilter = e.target.value; 
        this.filterFn();
    }

    changeTypeName =(e)=>{
        this.setState({TypeName:e.target.value});
    }

    changeTypeVersion =(e)=>{
        this.setState({TypeVersion:e.target.value});
    }

    changeConfigTemplateJson =(e)=>{
        this.setState({ConfigTemplateJson:e.target.value});
    }

    addClick(){
        this.setState({
            modalTitle : "Add app Type",
            TypeID : 0,
            TypeName : "",
            TypeVersion : "",
            ConfigTemplateJson : ""
        })
    }

    editClick(type){
        this.setState({
            modalTitle : "Edit app Type",
            TypeID : type.TypeID,
            TypeName : type.TypeName,
            TypeVersion : type.TypeVersion,
            ConfigTemplateJson : type.ConfigTemplateJson
        })
    }
    
    async refreshList(){
        // fetch(process.env.REACT_APP_API+'ApplicationTypes')
        //     .then(response=>response.json())
        //     .then(data=>{
        //         this.setState({appTypes:data.value, typeWithoutFilter:data.value});
        // });
        const fetchData = await TypeService.getAll();
        this.setState({appTypes:fetchData, typeWithoutFilter:fetchData});
    }

    componentDidMount(){
        this.refreshList();
    }

    async createClick(e){
        // e.preventDefault();

        // fetch(process.env.REACT_APP_API+
        //     `ApplicationTypes?TypeName=${this.state.TypeName}&TypeVersion=${this.state.TypeVersion}&ConfigTemplateJson=${this.state.ConfigTemplateJson}`,{
        //         method:"POST",
        //         headers:{
        //             'Accept':'application/json',
        //             'Content-Type':'application/json'
        //         }
        //     })
        //     .then(res=>res.json())
        //     .then((result)=>{                
        //         alert(`Entity created with id=${result.TypeID}`);
        //         this.refreshList();
        //     },
        //     (error)=>{
        //         alert('Failed:'+error);            
        //     })

        e.preventDefault();
        const fetchData = await TypeService.create({
            TypeName: this.state.TypeName,
            TypeVersion: this.state.TypeVersion,
            ConfigTemplateJson: this.state.ConfigTemplateJson
        });

        alert(`Entity created with id=${fetchData.TypeID}`);
        this.refreshList();
    }

    async updateClick(e){
        // e.preventDefault();

        // var bd = JSON.stringify({
        //     TypeID : this.state.TypeID,
        //     TypeName : this.state.TypeName,
        //     TypeVersion : this.state.TypeVersion,
        //     ConfigTemplateJson : this.state.ConfigTemplateJson
        // });

        // fetch(process.env.REACT_APP_API+
        // `ApplicationTypes?id=${this.state.TypeID}`,{
        //     method:"PATCH",
        //     headers:{
        //         'Accept':'application/json',
        //         'Content-Type':'application/json'
        //     },
        //     body:bd
        // })
        // .then(res=>{
        //     this.refreshList();
        //     if (res.ok){
        //         alert(`Recort with id=${this.state.TypeID} has been updated!`);
        //     }
        // });

        e.preventDefault();

        const fetchData = await TypeService.update({
            TypeID : this.state.TypeID,
            TypeName : this.state.TypeName,
            TypeVersion : this.state.TypeVersion,
            ConfigTemplateJson : this.state.ConfigTemplateJson    
        })
        
        alert(`Recort with id=${this.state.TypeID} has been updated!`);
        this.refreshList();
    }

    async deleteClick(id){
        // if(window.confirm('Are you shure?')){
        //     fetch(process.env.REACT_APP_API+
        //         `ApplicationTypes?id=${id}`,{
        //             method:"DELETE",
        //             headers:{
        //                 'Accept':'application/json',
        //                 'Content-Type':'application/json'
        //         }                    
        //     })
        //     .then(res=>{
        //         this.refreshList();
        //         if (res.ok){
        //             alert(`Recort with id=${id} has been deleted!`);
        //         }
        //         if (res.statusText==='Conflict'){
        //             alert(`Record with id=${id} can't be deleted!\nThis type bined to existing app instances!`);
        //         }
        //     })       
        // }
        if (window.confirm('Are you shure?')) {
            const fetchData = await TypeService.delete(id)
            
            if (fetchData.ok){
                alert(`Recort with id=${id} has been deleted!`);
                this.refreshList();
            }
            if (fetchData.statusText==='Conflict'){
                alert(`Record with id=${id} can't be deleted!\nThis type bined to existing app instances!`);
            } 
        }
    }
    
    render(){
        const {
            appTypes, 
            modalTitle,
            TypeID,
            TypeName,
            TypeVersion,
            ConfigTemplateJson            
        } = this.state;

        return(
            <div classNameme="appTypesBody">                
                
                <button type="button" className="btn mt-2 mb-2 bg-success text-white float-end"
                data-bs-toggle="modal"
                data-bs-target="#exampleModal"
                onClick={()=>this.addClick()}>
                   {addIcon()}
                    Add                
                </button>

                <table className="table" id="content">
                    <thead>
                        <tr>
                            <th>
                                <div className="d-flex flex-row">
                                    <input className="form-control mb-2 w-85 h-75"
                                    id="filter"
                                    onChange={this.changeTypeIDFilter}
                                    placeholder="Filter"/>

                                    <button type="button" className="btn btn-sm"
                                    onClick={()=>this.sortResult('TypeID',true)}>
                                        {downIcon()}
                                    </button>

                                    <button type="button" className="btn btn-sm"
                                    onClick={()=>this.sortResult('TypeID',false)}>
                                        {upIcon()}
                                    </button>
                                </div>
                                TypeID
                            </th>
                            <th>
                                <div className="d-flex flex-row">   
                                    <input className="form-control mb-2 w-85 h-75"
                                    onChange={this.changeTypeNameFilter}
                                    id="filter"
                                    placeholder="Filter"/>
                                    
                                    <button type="button" className="btn btn-sm"
                                    onClick={()=>this.sortResult('TypeName',true)}>
                                        {downIcon()}
                                    </button>
                                    
                                    <button type="button" className="btn btn-sm"
                                    onClick={()=>this.sortResult('TypeName',false)}>
                                        {upIcon()}
                                    </button>
                                </div>
                                TypeName
                            </th>
                            <th>
                                <div className="d-flex flex-row">   
                                    <input className="form-control mb-2 w-85 h-75 bg-current"
                                    onChange={this.changeTypeVersionFilter}
                                    id="filter"
                                    placeholder="Filter"/>
                                    
                                    <button type="button" className="btn btn-sm"
                                    onClick={()=>this.sortResult('TypeVersion',true)}>
                                        {downIcon()}
                                    </button>
                                    
                                    <button type="button" className="btn btn-sm"
                                    onClick={()=>this.sortResult('TypeVersion',false)}>
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
                                        onClick={()=>this.editClick(type)}>
                                            {editIcon()}
                                        </button>

                                        <button type="button"
                                        className="btn mx-2 bg-danger"
                                        onClick={()=>this.deleteClick(type.TypeID)}>
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

        <div className="modal fade" id="exampleModal" tabIndex="-1" aria-hidden="true">
        <div className="modal-dialog modal-lg modal-dialog-centered">
        <div className="modal-content">
            <div className="modal-header">
                <h5 className="modal-title">
                    {modalTitle}
                </h5>
                <button type="button" className="btn-close bg-danger" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body" >
                <form class="needs-validation" novalidate onSubmit={e=>{TypeID===0?this.createClick(e):this.updateClick(e)}}>
                    <div className="input-group mb-3">
                        <span className="input-group-text" id="filter">TypeName</span>
                        <input type="text" className="form-control"
                        required
                        id="filter"
                        value={TypeName}
                        onChange={this.changeTypeName}/>                        
                    </div>

                    <div className="input-group mb-3">
                        <span className="input-group-text" id="filter">TypeVersion</span>
                        <input type="text" className="form-control"
                        required
                        id="filter"
                        value={TypeVersion}
                        onChange={this.changeTypeVersion}/>                        
                    </div>

                    <div className="input-group mb-3">
                        <span className="input-group-text" id="filter">ConfigTemplateJson</span>
                        <textarea type="text" className="form-control" rows="10"
                        required
                        id="filter"
                        value={ConfigTemplateJson}
                        onChange={this.changeConfigTemplateJson}/>                        
                    </div>

                    <button type="submit" className="btn btn-primary float-start">Submit</button>
                </form>
            </div>
            </div>
        </div>
        </div>
        </div>
        )
    }
}