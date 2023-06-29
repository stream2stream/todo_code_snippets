import React, { useState, useEffect } from 'react';
import PostView from './PostView';
import SuccessMessage from './SuccessMessage';
import BlogDataService from '../services/blog_service';
import { useParams } from "react-router-dom";


export default function DeletePost(props) {

    const [postID, setPostID] = useState('');
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [delete_success, setDeleteSuccess] = useState(false);
    const [get_success, setGetSuccess] = useState(false);

    let { post_id } = useParams();

    useEffect(() => {
        getPostByID(post_id);
    },
        [post_id]
    );

    function handleSubmit(e) {
        e.preventDefault();
        deletePost();
    }

    function getPostByID(postID) {

        BlogDataService.get(postID)
            .then(res => {
                setPostID(postID);
                setTitle(res.data.post[3]);
                setContent(res.data.post[4]);
                setGetSuccess(true);
            })
            .catch(err => {
                setPostID('');
                setTitle('');
                setContent('');
                setGetSuccess(false);
                console.log(err);
            });
    }

    function deletePost() {
        BlogDataService.delete(postID)
            .then(res => {
                setPostID(postID);
                setTitle('');
                setContent('');
                setDeleteSuccess(true);
            })
            .catch(err => {
                setPostID('');
                setTitle('');
                setContent('');
                setDeleteSuccess(false);
                console.log(err);
            })
            ;
    }
    return (
        <>
            {!delete_success && get_success &&
                <PostView content={content} title={title} postID={postID} btnText={`Confirm Delete Post`} hide={false} handleSubmit={handleSubmit} />
            }
            {delete_success &&
                <SuccessMessage postID={postID} action={`deleted`} link={`/`} link_text={`Show All Posts`} />
            }
        </>
    );
}

