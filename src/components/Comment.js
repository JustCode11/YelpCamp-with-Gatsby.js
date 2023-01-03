import React from 'react';

function getTimeDifference(date) {
    const DAY_UNIT_IN_MILLISECONDS = 24 * 3600 * 1000;
    let created_at = date;
    let dateNow = new Date();
    let now = dateNow.toISOString();
    let diff = new Date(now).getTime() - new Date(created_at).getTime();
    let diffInDays = Math.floor(diff / DAY_UNIT_IN_MILLISECONDS);
    if (diffInDays > 0) {
        return `${diffInDays} days ago`;
    } else {
        return `${Math.floor((diff / 60e3) / 60)}h ago`;
    }
}

export default function Comment({ comment }) {
    return (
        <div className="comment">
            <div className="comment__header">
                <span className="comment__header__user">{comment.user}</span>
                <span>{getTimeDifference(comment.created_at)}</span>
            </div>
            <div className="comment__content">{comment.content}</div>
        </div>
    )
}
