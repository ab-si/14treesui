import React, { useEffect, useState } from "react";
import ProfileDescription from "./profileDescription";
import TreesAndMemories from "./treesAndMemories";

const UserProfilePage = (props) => {
  console.log("props", props)

  const [profileInfo, setProfileInfo] = useState({
    name: props.saplingData?.name || "",
    organisation: props.saplingData?.organisation || "",
    profileImage: props.saplingData?.profile_image || "",
  })

  useEffect(() => {
    setProfileInfo({
      name: props.saplingData?.name || "",
      organisation: props.saplingData?.organisation || "",
      profileImage: props.saplingData?.profile_image || "",
      treesPlanted: props.saplingData.treesPlanted,
    })
  }, [props]);
  return <div className="profile-content">
    <ProfileDescription profileInfo={profileInfo}></ProfileDescription>
    <TreesAndMemories trees={profileInfo.treesPlanted}></TreesAndMemories>
  </div>
}

export default UserProfilePage;