create or replace view community_post_list_view as
select
    post.post_id,
    post.title,
    post.created_at,
    topics.name as topic,
    profiles.name as author,
    profiles.avatar as author_avatar,
    profiles.username as author_username,
    post.upvotes,
    topics.slug as topic_slug
from post
inner join topics using (topic_id)
inner join profiles using (profile_id)
