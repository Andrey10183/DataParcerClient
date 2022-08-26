import {Component} from 'react';

export class Home extends Component{            
    render(){
        return(
            <div className="big">
                This UI represents the client application (front-end) for ConfigDatabaseApi server application (back-end). Start server-side application first, after that, you can navigate through pages and check client app functionality. You can manipulate data (create, delete, update entities) as well as check the contents of each item. All data contains inside tables for better visualization. Metadata page contains xml representation of metadata of ConfigDatabaseApi app.
		    </div>
        )
    }
}