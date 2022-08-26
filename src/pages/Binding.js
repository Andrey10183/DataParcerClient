import {Component} from 'react';
import 'react-json-pretty/themes/1337.css';
import addIcon from '../components/Icons/addIcon';
import upIcon from '../components/Icons/upIcon';
import downIcon from '../components/Icons/downIcon';
import deleteIcon from '../components/Icons/deleteIcon';
import sort from '../components/Sorting';

export class Binding extends Component{

    constructor(props){
        super(props);
        
        this.state={
            bindings:[],
            appInstances:[],
            modalTitle:"",
            PublisherInstanceID:0,
            ConsumerInstanceID:0,

            PublisherInstanceIDFilter:"",
            ConsumerInstanceIDFilter:"",
            bindingsWithoutFilter:[],
        }
    }

    filterFn(){
        var PublisherInstanceIDFilter = this.state.PublisherInstanceIDFilter;
        var ConsumerInstanceIDFilter = this.state.ConsumerInstanceIDFilter;

        var filteredData = this.state.bindingsWithoutFilter.filter(
            function(e1){
                return e1.publisherInstanceID.toString().toLowerCase().includes(
                    PublisherInstanceIDFilter.toString().trim().toLowerCase()
                ) &&
                e1.consumerInstanceID.toString().toLowerCase().includes(
                    ConsumerInstanceIDFilter.toString().trim().toLowerCase()
                )
            }
        )

        this.setState({bindings:filteredData});
    }

    sortResult(prop, asc){
        this.setState({bindings:sort(this.state.bindings, prop, asc)});
    }

    changePublisherInstanceIDFilter =(e)=>{
        this.state.PublisherInstanceIDFilter = e.target.value;
        this.filterFn();
    }

    changeConsumerInstanceIDFilter =(e)=>{
        this.state.ConsumerInstanceIDFilter = e.target.value;
        this.filterFn();
    }

    changePublisherInstanceID =(e)=>{
        this.setState({PublisherInstanceID:e.target.value});
    }

    changeConsumerInstanceID =(e)=>{
        this.setState({ConsumerInstanceID:e.target.value});
    }

    addClick(){
        this.setState({
            modalTitle : "Add Binding",
            PublisherInstanceID : 0,
            ConsumerInstanceID : 0,
        })
    }
    
    refreshList(){
        fetch(process.env.REACT_APP_API+'Binding')
            .then(response=>response.json())
            .then(data=>{
                this.setState({bindings:data, bindingsWithoutFilter:data});
        });
        
        fetch(process.env.REACT_APP_API+'ApplicationInstances')
            .then(response=>response.json())
            .then(data=>{
                this.setState({appInstances:data.value});
        });
    }

    componentDidMount(){
        this.refreshList();
    }

    createClick(e){
        e.preventDefault();

        fetch(process.env.REACT_APP_API+
            `Binding?PublisherInstanceID=${this.state.PublisherInstanceID}&ConsumerInstanceID=${this.state.ConsumerInstanceID}`,{
                method:"POST",
                headers:{
                    'Accept':'application/json',
                    'Content-Type':'application/json'
                }
            })
        .then(res=>{
            this.refreshList();
            if (res.statusText==='OK'){
                alert(`Record with id's=${this.state.PublisherInstanceID}/${this.state.ConsumerInstanceID} created!`);
            }
            if (res.statusText==='Conflict'){
                alert(`Record with id's=${this.state.PublisherInstanceID}/${this.state.ConsumerInstanceID} already exist!`);
            }
        })
    }

    deleteClick(publisherId, consumerId){
        if(window.confirm('Are you shure?')){
            fetch(process.env.REACT_APP_API+
                `Binding?keyPublisherInstanceID=${publisherId}&keyConsumerInstanceID=${consumerId}`,{
                    method:"DELETE",
                    headers:{
                        'Accept':'application/json',
                        'Content-Type':'application/json'
                }                    
            })
            .then(res=>{
                this.refreshList();
                if (res.statusText==='No Content'){
                    alert(`Record with id's=${publisherId}/${consumerId} deleted!`);
                }
            })        
        }
    }
    
    render(){
        const {
            bindings,
            appInstances, 
            modalTitle,
            PublisherInstanceID,
            ConsumerInstanceID,          
        } = this.state;

        return(
            <div classNameme="appBindingsBody">
                <button type="button" className="btn mt-2 mb-2 bg-success text-white float-end"
                    data-bs-toggle="modal"
                    data-bs-target="#exampleModal"
                    onClick={()=>this.addClick()}>{addIcon()} Add
                </button>

                <table className="table" id="content">
                    <thead>
                        <tr>
                            <th>
                                <div className="d-flex flex-row">
                                    <input className="form-control mb-2 w-85 h-75"
                                        onChange={this.changePublisherInstanceIDFilter}
                                        id="filter"
                                        placeholder="Filter"/>
                                    
                                    <button type="button" className="btn btn-sm"
                                        onClick={()=>this.sortResult('publisherInstanceID',true)}>
                                        {downIcon()}
                                    </button>
                                    
                                    <button type="button" className="btn btn-sm"
                                        onClick={()=>this.sortResult('publisherInstanceID',false)}>
                                        {upIcon()}
                                    </button>
                                </div>
                                PublisherInstanceID
                            </th>
                            <th>
                                <div className="d-flex flex-row">   
                                    <input className="form-control mb-2 w-85 h-75"
                                        onChange={this.changeConsumerInstanceIDFilter}
                                        id="filter"
                                        placeholder="Filter"/>
                                    
                                    <button type="button" className="btn btn-sm"
                                        onClick={()=>this.sortResult('consumerInstanceID',true)}>
                                        {downIcon()}
                                    </button>
                                    
                                    <button type="button" className="btn btn-sm"
                                        onClick={()=>this.sortResult('consumerInstanceID',false)}>
                                        {upIcon()}
                                    </button>
                                </div>
                                ConsumerInstanceID
                            </th>
                            <th>Options</th>
                        </tr>    
                    </thead>
                    <tbody>
                        {bindings.map(bind=>                            
                            <tr >
                                <td>{bind.publisherInstanceID}</td>
                                <td>{bind.consumerInstanceID}</td>
                                <td>
                                    <button type="button"
                                        className="btn mx-2 bg-danger"
                                        onClick={()=>this.deleteClick(bind.publisherInstanceID, bind.consumerInstanceID)}>
                                        {deleteIcon()}
                                    </button>                                    
                                </td>                                
                            </tr>                                                                
                        )}
                    </tbody>                                            
                </table>

                <div className="modal fade" id="exampleModal" tabIndex="-1" aria-hidden="true">
                <div className="modal-dialog modal-lg modal-dialog-centered">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">{modalTitle}</h5>
                        
                        <button type="button" className="btn-close bg-danger" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        <form class="needs-validation" novalidate onSubmit={e=>this.createClick(e)}>                            
                            <div className="input-group mb-3">
                                <div class="container">
                                    <div className="row">
                                        <span className="col-auto input-group-text" id="filter">PublisherInstanceID</span>
                                        <select className="col form-select"
                                            required
                                            id="filter"
                                            value={PublisherInstanceID}
                                            onChange={this.changePublisherInstanceID}>
                                            <option selected></option>
                                            {appInstances.map(inst=><option key={inst.InstanceID}>
                                                {inst.InstanceID}</option>)}                                        
                                        </select>
                                    </div>

                                    {(PublisherInstanceID==="" || PublisherInstanceID===0)?
                                    <div className="row">
                                        <div className="small text-danger">Please choose publisher ID!</div>
                                    </div>                          
                                    :null}
                                </div>
                            </div>
                                                    
                            <div className="input-group mb-3">
                                <div class="container">
                                    <div className="row">
                                        <span className="col-auto input-group-text" id="filter">ConsumerInstanceID</span>
                                        <select className="col form-select"
                                            required
                                            id="filter"
                                            value={ConsumerInstanceID}
                                            onChange={this.changeConsumerInstanceID}>
                                            <option selected></option>
                                            {appInstances.map(inst=><option key={inst.InstanceID}>
                                                {inst.InstanceID}</option>)}
                                        </select>
                                    </div>

                                    {(ConsumerInstanceID==="" || ConsumerInstanceID===0)?
                                    <div className="row">
                                        <div className="small text-danger">Please choose consumer ID!</div>
                                    </div>                          
                                    :null}
                                </div>                            
                            </div>

                            {(PublisherInstanceID===ConsumerInstanceID)?
                            <p class="small text-danger">PublisherID and ConsumerID can't be the same</p>:null} 
                            
                            <button 
                                id="Create"
                                type="submit"
                                //data-bs-dismiss="modal"
                                className="btn btn-primary float-start">
                                Create
                            </button>
                        </form>    
                    </div>
                </div>
                </div>
                </div>            
            </div>
        )
    }
}