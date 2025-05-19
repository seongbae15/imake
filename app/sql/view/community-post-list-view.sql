create view community_post_list_view as
select
    post.post_id,
    post.title,
    post.created_at,
    topics.name as topic,
    profiles.name as author,
    profiles.avatar as author_avatar,
    profiles.username as author_username,
    count(post_upvotes.post_id) as upvotes
from post
inner join topics using (topic_id)
inner join profiles using (profile_id)
left join post_upvotes using (post_id)
group by post.post_id, topics.name, profiles.name, profiles.avatar, profiles.username;