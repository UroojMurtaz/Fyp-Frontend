import React, { useEffect, useState } from 'react'
import './user.scss'
import { DataGrid } from '@mui/x-data-grid';
import { Link } from 'react-router-dom'
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import CreateOutlinedIcon from '@mui/icons-material/CreateOutlined';
import axios from "axios"
import {toast} from "react-toastify"

const userColumns=[
    // { field: 'id', headerName: 'ID', width: 70},
    {
        field:"name",headerName:"User",width:230,renderCell:(params)=>{
            return(
                <div className="cellWithImage">
                    <img src={params.row.img} alt="avatar" className="cellImg" />
                    {params.row.name}
                </div>
            )
        }
    },
    {
        field:"email",
        headerName:"Email",
        width:230,
    },
    {
        field: "role",
        headerName: "Role",
        width: 100,
      },
      {
        field: "Status",
        headerName: "Status",
        width: 130,
        renderCell: (params) => {
          return (
            <div className={`cellWithStatus ${params.row.Status}`}>
              {params.row.Status}
            </div>
          );
        },
      },
]

function User() {
    const [users, setUsers] = useState([])
    const [refresh,setRefresh]=useState("")

  async function getUser() {
        await axios.get(`http://localhost:5000/api/admin/user?`,{ params: { role: "user" } })
            .then(function (response) {
                setUsers(response.data.users);
            })
    }

    useEffect(() => {
        getUser()
    }, [refresh])

    console.log("Users", users)

    const DeleteUser=async(id)=>{
        console.log(id)
        const {data}=await axios.delete(`http://localhost:5000/api/admin/user/${id}`)
        if(data.success===true){
          toast.success(data.message)
          setRefresh(!refresh)
        }else{
          toast.error(data.message)
        }
      }

    const rows = users.map((user) => {
        return {
            id: user._id,
            name: user.name,
            img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQOApFCSVByzhZorHUAP-J851JAYyOPtI1jdg&usqp=CAU",
            email: user.email,
            role: user.role,
            Status:user.Status,
        }
    }

    )
    console.log("rows", rows)

   
    const actionColumn = [
        {
            field: "action",
            headerName: "Action",
            width: 200,
            renderCell: (params) => {
                return (
                    <div className="cellAction">
                    <DeleteOutlineOutlinedIcon  className='icon' onClick={()=>DeleteUser(params.row.id)} />
        
        
                  </div>
                )
            }
        }
    ];


    return (
        <div className='userTable'>
            <DataGrid
                className="datagrid"
                rows={rows}
                columns={userColumns.concat(actionColumn)}
                pageSize={9}
                rowsPerPageOptions={[9]}
                checkboxSelection
            />
 
            
        </div>
    )
}

export default User