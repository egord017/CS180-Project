import React from "react";
import { useParams } from "react-router-dom";

function GroupPage() {
  const { group_id } = useParams();

  return (
    <div>
      <h1>Group Page</h1>
      <p>Group ID: {group_id}</p>
    </div>
  );
}

export default GroupPage;
