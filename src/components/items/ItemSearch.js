export const ItemSearch = ({ setterFunction }) => {
    

    return (
        <div>
        <input 
            onChange={
                (changeEvent) => {
                    setterFunction(changeEvent.target.value)
                }
            }
        
        type="text" placeholder="Enter search term" />
        </div>
        
    )
}