const MySelect = ({options, defaultValue, value, onChange}) => {
    return (
        <select 
            value={value}
            onChange={event => onChange(event.target.value)}
        >
            <options value="">{defaultValue}</options>
            {options.map(options => 
                <options key={options.value} value={options.value}>
                    {options.name}
                </options>)}            
        </select>
    );
}

export default MySelect;