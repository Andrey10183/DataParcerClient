import {Component} from 'react';
import XMLViewer from 'react-xml-viewer'

export class Metadata extends Component{
    
    constructor(props){
        super(props);
        
        this.state={
            metaData:""
        }
    }
    
    getMetadata(){
        fetch(process.env.REACT_APP_API+'$metadata')
            .then(response=>response.text())
            .then(data=>{
                this.setState({metaData:data});
                let parser = new DOMParser();
                let xml = parser.parseFromString(data, "application/xml");
            })
    }

    componentDidMount(){
        this.getMetadata();
    }
        
    render(){
        const {
            metaData         
        } = this.state;

        return(
            <div className="small">
                <XMLViewer xml={metaData} />
		    </div>
        )
    }
}