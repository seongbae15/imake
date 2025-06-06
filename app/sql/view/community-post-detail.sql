create or replace view community_post_detail as 
select
    posts.post_id,
    posts.title,
    posts.content,
    posts.upvotes,
    posts.created_at,
    topics.topic_id,
    topics.name as toptic_name,
    topics.slug as topic_slug,
    count(post_replies.post_reply_id) as replies,
    profiles.name as author_name,
    profiles.avatar as author_avatar,
    profiles.role as author_role,
    profiles.created_at as author_created_at,
    (select count(*) from products where products.profile_id = profiles.profile_id) as products,
    (select exists (select 1 from public.post_upvotes where post_upvotes.post_id = posts.post_id and post_upvotes.profile_id = auth.uid())) as is_upvoted
from posts
inner join topics using (topic_id)
left join post_replies using (post_id)
inner join profiles on (profiles.profile_id = posts.profile_id)
group by posts.post_id, topics.topic_id, topics.name, topics.slug, profiles.name, profiles.avatar, profiles.role, profiles.created_at, profiles.profile_id;
