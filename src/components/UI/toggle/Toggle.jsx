const Toggle = ({label, callback}) => {
    return(
        <div>
            <input 
                class="form-check-input" 
                type="checkbox" 
                id="flexSwitchCheckChecked"
                defaultValue = {true} 
                onClick={callback}
            />
            <label 
                class="form-check-label" 
                for="flexSwitchCheckChecked">
                {label}
            </label>
        </div>
    );
}

export default Toggle;