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

var JSONPretty133 = require('react-json-pretty/dist/1337');

export class ApplicationInstance extends Component{
    
    constructor(props){
        super(props);
        
        this.state={
            appTypes:[],
            appInstances:[],
            modalTitle:"",
            InstanceID:0,
            TypeID:"",
            InstanceName:"",
            ConfigJson:"",

            InstanceIDFilter:"",
            TypeIDFilter:"",
            InstanceNameFilter:"",
            instanceWithoutFilter:[]}
    }

    filterFn(){
        var InstanceIDFilter = this.state.InstanceIDFilter;
        var TypeIDFilter = this.state.TypeIDFilter;
        var InstanceNameFilter = this.state.InstanceNameFilter;

        var filteredData = this.state.instanceWithoutFilter.filter(
            function(e1){
                return e1.InstanceID.toString().toLowerCase().includes(
                    InstanceIDFilter.toString().trim().toLowerCase()
                ) &&
                e1.TypeID.toString().toLowerCase().includes(
                    TypeIDFilter.toString().trim().toLowerCase()
                ) &&
                e1.InstanceName.toString().toLowerCase().includes(
                    InstanceNameFilter.toString().trim().toLowerCase()
                )
            }
        )

        this.setState({appInstances:filteredData});
    }

    sortResult(prop, asc){
        this.setState({appInstances:sort(this.state.appInstances, prop, asc)});
    }

    changeInstanceIDFilter =(e)=>{
        this.state.InstanceIDFilter = e.target.value;
        this.filterFn();
    }

    changeTypeIDFilter =(e)=>{
        this.state.TypeIDFilter = e.target.value;
        this.filterFn();
    }

    changeInstanceNameFilter =(e)=>{
        this.state.InstanceNameFilter = e.target.value;
        this.filterFn();
    }

    changeTypeID =(e)=>{
        this.setState({TypeID:e.target.value});
    }

    changeInstanceName =(e)=>{
        this.setState({InstanceName:e.target.value});
    }

    changeConfigJson =(e)=>{
        this.setState({ConfigJson:e.target.value});
    }

    addClick(){
        this.setState({
            modalTitle : "Add app Instance",
            InstanceID : 0,
            InstanceName : "",
            ConfigJson : ""
        })
    }

    editClick(type){
        this.setState({
            modalTitle : "Edit app Instance",
            InstanceID : type.InstanceID,
            TypeID : type.TypeID,
            InstanceName : type.InstanceName,
            ConfigJson : type.ConfigJson
        })
    }
    
    refreshList(){
        fetch(process.env.REACT_APP_API+'ApplicationTypes')
            .then(response=>response.json())
            .then(data=>{
                this.setState({appTypes:data.value, typeWithoutFilter:data.value});
        });
        
        fetch(process.env.REACT_APP_API+'ApplicationInstances')
            .then(response=>response.json())
            .then(data=>{
                this.setState({appInstances:data.value, instanceWithoutFilter:data.value});
        });
    }

    componentDidMount(){
        this.refreshList();
    }

    createClick(e){
        e.preventDefault();

        fetch(process.env.REACT_APP_API+
            `ApplicationInstances?TypeID=${this.state.TypeID}&InstanceName=${this.state.InstanceName}&ConfigJson=${this.state.ConfigJson}`,{
                method:"POST",
                headers:{
                    'Accept':'application/json',
                    'Content-Type':'application/json'
                }
            })
            .then(res=>res.json())
            .then((result)=>{                
                alert(`Entity created with id=${result.InstanceID}`);
                this.refreshList();
            },
            (error)=>{
                alert('Failed:'+error);            
        })
    }

    updateClick(e){
        e.preventDefault();

        var bd = JSON.stringify({
            InstanceID : this.state.InstanceID,
            TypeID : this.state.TypeID,
            InstanceName : this.state.InstanceName,
            ConfigJson : this.state.ConfigJson
        });

        fetch(process.env.REACT_APP_API+
        `ApplicationInstances?id=${this.state.InstanceID}`,{
            method:"PATCH",
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            },
            body:bd
        })
        .then(res=>{
            res.json();
            this.refreshList();
            if (res.ok){
                alert(`Record with id=${this.state.InstanceID} updated!`);
            }
        });
    }

    deleteClick(id){
        if(window.confirm('Are you shure?')){
            fetch(process.env.REACT_APP_API+
                `ApplicationInstances?id=${id}`,{
                    method:"DELETE",
                    headers:{
                        'Accept':'application/json',
                        'Content-Type':'application/json'
                    }                    
                })
                .then(res=>{
                    this.refreshList();
                    if (res.ok){
                       alert(`Recort with id=${id} has been deleted!`);
                    }
                    if (res.statusText==="Conflict"){
                        alert(`Recort with id=${id} can't be deleted!\nOne or more instances binded to this one!`);
                    };
                });        
            }
    }
    
    render(){
        const {
            appTypes,
            appInstances, 
            modalTitle,
            InstanceID,
            TypeID,
            InstanceName,
            ConfigJson            
        } = this.state;

        return(
            <div classNameme="appInstancesBody">
                <button type="button" className="btn mt-2 mb-2 bg-success text-white float-end"
                data-bs-toggle="modal"
                data-bs-target="#exampleModal"
                onClick={()=>this.addClick()}>
                    {addIcon()} Add                
                </button>

                <table className="table" id="content">
                    <thead>
                        <tr>
                            <th>
                                <div className="d-flex flex-row">
                                    <input className="form-control mb-2 w-85 h-75"
                                    onChange={this.changeInstanceIDFilter}
                                    id="filter"
                                    placeholder="Filter"/>
                                    
                                    <button type="button" className="btn btn-sm"
                                    onClick={()=>this.sortResult('InstanceID',true)}>
                                        {downIcon()}
                                    </button>
                                    
                                    <button type="button" className="btn btn-sm"
                                    onClick={()=>this.sortResult('InstanceID',false)}>
                                        {upIcon()}
                                    </button>
                                </div>
                                InstanceID
                            </th>
                            <th>
                                <div className="d-flex flex-row">   
                                    <input className="form-control mb-2 w-85 h-75"
                                    onChange={this.changeTypeIDFilter}
                                    id="filter"
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
                                    <input className="form-control mb-2 w-85 h-75 bg-current"
                                    onChange={this.changeInstanceNameFilter}
                                    id="filter"
                                    placeholder="Filter"/>
                                    
                                    <button type="button" className="btn btn-sm"
                                    onClick={()=>this.sortResult('InstanceName',true)}>
                                        {downIcon()}
                                    </button>
                                    
                                    <button type="button" className="btn btn-sm"
                                    onClick={()=>this.sortResult('InstanceName',false)}>
                                        {upIcon()}
                                    </button>
                                </div>
                                InstanceName
                            </th>
                            <th>ConfigJson</th>
                            <th>Options</th>
                        </tr>    
                    </thead>                    
                        {appInstances.map(inst=>
                            <tbody>
                                <tr data-toggle="collapse" data-target={"#demo"+inst.InstanceID} className="accordion-toggle" key={inst.InstanceID}>
                                    <td>{inst.InstanceID}</td>
                                    <td>{inst.TypeID}</td>
                                    <td>{inst.InstanceName}</td>
                                    <td>
                                        <p>
                                            <a class="btn mr-2 bg-info" 
                                                data-bs-toggle="collapse" 
                                                href={"#demo"+inst.InstanceID} 
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
                                        onClick={()=>this.editClick(inst)}>
                                            {editIcon()}
                                        </button>

                                        <button type="button"
                                        className="btn mx-2 bg-danger"
                                        onClick={()=>this.deleteClick(inst.InstanceID)}>
                                            {deleteIcon()}
                                        </button>                                   
                                    </td>                                    
                                </tr>
                                <tr>
                                    <td colSpan="12" className="hiddenRow">
                                        <div className="accordian-body collapse" id={"demo"+inst.InstanceID}>
                                            <JSONPretty id="json-pretty" data={inst.ConfigJson} theme={JSONPretty133}></JSONPretty> 
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
                        <h5 className="modal-title">{modalTitle}</h5>

                        <button type="button" className="btn-close bg-danger" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        <form class="needs-validation" novalidate onSubmit={e=>{InstanceID===0?this.createClick(e):this.updateClick(e)}}>    
                            <div className="input-group mb-3">
                                <span className="input-group-text" id="filter">TypeID</span>
                                <select className="form-select"
                                required
                                id="filter"
                                value={TypeID}
                                onChange={this.changeTypeID}>
                                    <option selected></option>
                                    {appTypes.map(typ=><option key={typ.TypeID}>
                                        {typ.TypeID}</option>)}
                                </select>                            
                            </div>

                            <div className="input-group has-error mb-3">
                                <span className="input-group-text" id="filter">InstanceName</span>
                                <input type="text" className="form-control" required
                                required
                                id="filter"
                                value={InstanceName}
                                onChange={this.changeInstanceName}/>                      
                            </div>

                            <div className="input-group mb-3">
                                <span className="input-group-text" id="filter">ConfigJson</span>
                                <textarea type="text" className="form-control" rows="10"
                                required
                                id="filter"
                                value={ConfigJson}
                                onChange={this.changeConfigJson}/>                        
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