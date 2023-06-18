import React, {useState} from 'react'
import ManagePostView from "./ManagePostView"

const ManagePostContainer = () => {
    const [currentTap, setCurrnetTap] = useState("MyPost")
  return (
    <ManagePostView
        currentTap = {currentTap}
        setCurrnetTap = {setCurrnetTap}/>
  )
}

export default ManagePostContainer