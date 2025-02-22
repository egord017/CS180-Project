//title
//body
//user_id (supplied innately)
//channel_id (should be supplied ...in URL?)
//channel/id/submit ?


function ThreadPostForm(){


    return (
        <form action="http://localhost:5000/thread" method="post">
            <label for="title" require="true">Title* :</label>
            <input type="text" id="title"></input>

            <label for="body">Body:</label>
            <input type="text" id="body"></input>
            <button type="submit">Post Thread</button>
        </form>
    )
}

export default ThreadPostForm;
