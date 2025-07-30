import { useState } from 'react';
import './Form.css';

export const Form = ({ onCreatePost }) => {
    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!title.trim() || !body.trim()) {
            alert('Please enter both a title and a body for the post.');
            return;
        }
        // console.log(onCreatePost);

        // Call the function passed from the parent component
        onCreatePost({ title, body });

        // Clear the form fields
        setTitle('');
        setBody('');
    };

    return (
        <form className="form" onSubmit={handleSubmit}>
            <h2 className="form__heading">Create a New Post</h2>
            <div className="form__group">
                <label htmlFor="title" className="form__label">Title</label>
                <input
                    type="text"
                    name="title"
                    id="title"
                    className="form__input"
                    placeholder="Enter post title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                />
            </div>
            <div className="form__group">
                <label htmlFor="body" className="form__label">Body</label>
                <textarea
                    name="body"
                    id="body"
                    className="form__textarea"
                    placeholder="Enter post content"
                    value={body}
                    onChange={(e) => setBody(e.target.value)}
                    required
                />
            </div>
            <button type="submit" className="btn btn--primary">Add Post</button>
        </form>
    )
}