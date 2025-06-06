create or replace view gpt_ideas_view as
select
    gpt_ideas.gpt_idea_id,
    case when gpt_ideas.claimed_at is null then gpt_ideas.idea else 'ClaimedClaimedClaimedClaimedClaimedClaimedClaimedClaimedClaimedClaimedClaimedClaimed' end as idea,
    gpt_ideas.views,
    case when gpt_ideas.claimed_at is null then false else true end as is_claimed,
    count(gpt_ideas_likes) as likes,
    gpt_ideas.created_at
from public.gpt_ideas
left join public.gpt_ideas_likes using (gpt_idea_id)
group by gpt_ideas.gpt_idea_id;
