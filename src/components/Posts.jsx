import { useEffect, useState } from "react";
import { createPost, deletePost, getPosts, updatePost } from "../api/PostApi";
import { Form } from "./Form";
import { EditForm } from "./EditForm";

export const Posts = () => {
    const [data, setData] = useState([])
    const [editingPost, setEditingPost] = useState(null);
    //function to get data from api
    const getPostsData = async () => {
        try {
            const response = await getPosts();
            setData(response.data);
        } catch (error) {
            console.log(error);
        }
    }

    //function to delete functionality
    const handleOnDelete = async (id) => {
        try {
            const response = await deletePost(id);
            if (response.status === 200) {
                const updatedData = data.filter((currElem) => currElem.id !== id)
                setData(updatedData)
            }

        } catch (error) {
            console.log(error);
        }
    }

    //function to careate new post
    const handleOnCreate = async (newPostData) => {
        try {
            const response = await createPost(newPostData);
            // The API returns the newly created post, often with a new ID.
            // We add it to our local state to update the UI.
            if (response.status === 201) { // 201 Created is the standard success status for POST
                setData(prevData => [response.data, ...prevData]);
            }
        } catch (error) {
            console.log(error);
        }
    }

    // function to handle edit button click
    const handleEditClick = (post) => {
        setEditingPost(post);
    };

    // function to cancel editing
    const handleCancelEdit = () => {
        setEditingPost(null);
    };

    // function to update a post
    const handleOnUpdate = async (id, updatedPostData) => {
        try {
            const response = await updatePost(id, updatedPostData);
            if (response.status === 200) {
                // The API returns the updated post.
                // We update our local state to reflect the changes.
                const updatedData = data.map((post) =>
                    post.id === id ? response.data : post
                );
                setData(updatedData);
                setEditingPost(null); // Exit editing mode
            }
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getPostsData()
    }, [])

    //show data in UI
    return (
        <>
            <section><Form onCreatePost={handleOnCreate} /></section>

            <section className="posts">
                <h1 className="posts__heading">All Posts</h1>
                <ul className="posts__list">
                    {
                        data.map((currElem) => {
                            const { id, title, body } = currElem;
                            return editingPost && editingPost.id === id ? (
                                <EditForm key={id} post={editingPost} onUpdate={handleOnUpdate} onCancel={handleCancelEdit} />
                            ) : (
                                <li key={id} className="posts__item">
                                    <h2 className="posts__item-title">{title}</h2>
                                    <p className="posts__item-body">{body}</p>
                                    <div className="posts__item-actions">
                                        <button onClick={() => handleEditClick(currElem)} className="btn btn--edit">Edit</button>
                                        <button onClick={() => handleOnDelete(id)} className="btn btn--delete">Delete</button>
                                    </div>
                                </li>
                            )
                        })
                    }
                </ul>
            </section>
        </>
    )
}
