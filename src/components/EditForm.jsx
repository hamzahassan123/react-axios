import { useState, useEffect } from 'react';

export const EditForm = ({ post, onUpdate, onCancel }) => {
    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');

    useEffect(() => {
        if (post) {
            setTitle(post.title);
            setBody(post.body);
        }
    }, [post]);

    const handleSubmit = (e) => {
        e.preventDefault();
        onUpdate(post.id, { ...post, title, body });
    };

    return (
        <li className="posts__item">
            <form onSubmit={handleSubmit} className="posts__item-form">
                <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="posts__item-input"
                />
                <textarea
                    value={body}
                    onChange={(e) => setBody(e.target.value)}
                    className="posts__item-textarea"
                />
                <div className="posts__item-actions">
                    <button type="submit" className="btn btn--edit">Save</button>
                    <button type="button" onClick={onCancel} className="btn btn--delete">Cancel</button>
                </div>
            </form>
        </li>
    );
};