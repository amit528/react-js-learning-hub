import { DataGrid } from "@mui/x-data-grid";

function ListComponent(props) {
    return(
        <div style={{ height: 300, width: 'auto', left : "10%", marginTop : "10px" }}>
            <DataGrid
                rows={props.rows || []}
                columns={props.columns || []}
            />
        </div>
    )
}

export default ListComponent;