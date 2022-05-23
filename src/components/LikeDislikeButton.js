import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { API_URL } from '../api/config';
import '../assets/style/components/likeDislikeButton.scss';

export default function LikeDislikeButton({id, isLiked, isDisliked, likeCount, dislikeCount}) {
    const [isLikedState, setIsLikedState] = useState(false);
    const [isDislikedState, setIsDislikedState] = useState(false);
    const [likeCountState, setLikeCountState] = useState(0);
    const [dislikeCountState, setDislikeCountState] = useState(0);

    useEffect(() => {
        setIsLikedState(isLiked);
        setIsDislikedState(isDisliked);
        setLikeCountState(likeCount);
        setDislikeCountState(dislikeCount);
    }, [isLiked, isDisliked, likeCount, dislikeCount]);

    const handleLike = () => {
        if (isLikedState) {
            setLikeCountState(likeCountState - 1);
            setIsLikedState(false);
            axios.get(`${API_URL}/post/${id}/unlike`, {withCredentials: true})
        } else {
            setLikeCountState(likeCountState + 1);
            setIsLikedState(true);
            if (isDislikedState) {
                setDislikeCountState(dislikeCountState - 1);
                setIsDislikedState(false);
            }
            axios.get(`${API_URL}/post/${id}/like`, {withCredentials: true})
        }
    }

    const handleDislike = () => {
        if (isDislikedState) {
            setDislikeCountState(dislikeCountState - 1);
            setIsDislikedState(false);
            axios.get(`${API_URL}/post/${id}/undislike`, {withCredentials: true})
        } else {
            setDislikeCountState(dislikeCountState + 1);
            setIsDislikedState(true);
            if (isLikedState) {
                setLikeCountState(likeCountState - 1);
                setIsLikedState(false);
            }
            axios.get(`${API_URL}/post/${id}/dislike`, {withCredentials: true})
        }
    }

    return (
        <div className='like-dislike-btn'>
            <button className='btn-primary' aria-label='Like Button' onClick={handleLike}>{isLikedState ? 'Unlike': 'Like'}</button>
            <span aria-label='Like Count'>{likeCountState}</span>
            <button className='btn-secondary' aria-label='Dislike Button' onClick={handleDislike}>{isDislikedState ? 'Undislike': 'Dislike'}</button>
            <span aria-label='Dislike Count'>{dislikeCountState}</span>
        </div>
    )
}