import React from 'react'
import {connect} from 'react-redux'
import {add, remove, filter} from './reducers.js'


const mapStateToProps = (state) => ({
    data: state.database.data,
    filter: state.database.filter,
})

const mapDispatchToProps = (dispatch) => ({
    onAdd() {
        const new_key = document.getElementById('new-key').value
        const new_value = document.getElementById('new-val').value
        
        // clear input field text
        document.getElementById('new-key').value = ''
        document.getElementById('new-val').value = ''

        dispatch(add(new_key, new_value))
    },
    onRemove(event) {
        dispatch(remove(event.target.id))
    },
    onFilter(event) {
        dispatch(filter(event.target.value))
    },
})

const filteredData = (data, filter) =>
    Object.keys(data).reduce((results, key) => {
        // rows where or the key or value matches the filter string
        const val = data[key]
        if (key.includes(filter) || val.includes(filter)) {
            results[key] = val
        }
        return results
    }, {})

const DataTableComponent = ({data, filter, onAdd, onRemove, onFilter}) =>
    <div className="data-table">
        <input type="search" placeholder="Filters..." value={filter} onChange={onFilter}/>
        <table>
            <thead>
                <tr>
                    <th>Key</th>
                    <th>Value</th>
                    <th><center>Action</center></th>
                </tr>
            </thead>
            <tbody>
                {Object.keys(filteredData(data, filter)).map(key =>
                    <tr key={key}>
                        <td>{key}</td>
                        <td>{data[key]}</td>
                        <td><center><button id={key} onClick={onRemove}>X</button></center></td>
                    </tr>)}
            </tbody>
        </table>
        <input id="new-key" type="text" placeholder="New Key..."/>
        <input id="new-val" type="text" placeholder="New Value..."/>
        <button onClick={onAdd}>Add +</button><br />
        <a href={"data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(data,null,4))} download="data.json">Download JSON</a>
    </div>

export const DataTable = connect(
    mapStateToProps,
    mapDispatchToProps,
)(DataTableComponent)
