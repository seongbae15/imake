create or replace view community_post_list_view as
select
    posts.post_id,
    posts.title,
    posts.created_at,
    topics.name as topic,
    profiles.name as author,
    profiles.avatar as author_avatar,
    profiles.username as author_username,
    posts.upvotes,
    topics.slug as topic_slug,
    (select exists (select 1 from public.post_upvotes where post_upvotes.post_id = posts.post_id and post_upvotes.profile_id = auth.uid())) as is_upvoted
from posts
inner join topics using (topic_id)
inner join profiles using (profile_id);

select * from community_post_list_view;

select auth.uid();