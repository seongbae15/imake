create or replace function get_dashboard_stats(user_id uuid)
returns table (
    views bigint,
    month text
) as $$
begin
    return query
    select
        count(*) as views,
        to_char(events.created_at, 'YYYY-MM') as month
    from public.events
    join public.profiles on profiles.profile_id = user_id
    where event_data ->> 'username' = profiles.username
    group by month;
end;
$$ language plpgsql;